import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
import { sendPasswordResetOTP, sendTwoFactorOTP } from '../utils/emailUtils';
import speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import { AuthRequest } from '../middleware/authMiddleware';

dotenv.config();

import { generateCsrfToken } from '../middleware/csrfMiddleware';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password, otp } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check 2FA
        if (user.two_factor_enabled) {
            if (!otp) {
                // If 2FA is enabled but no OTP provided, request it
                let message = '2FA verification required';

                if (user.two_factor_method === 'email') {
                    // Send OTP to email
                    const generatedOtp = generateOTP();
                    const expiry = new Date();
                    expiry.setMinutes(expiry.getMinutes() + 10);

                    user.two_factor_otp = generatedOtp;
                    user.two_factor_otp_expiry = expiry;
                    await user.save();

                    await sendTwoFactorOTP(user.email, generatedOtp);
                    message = 'An OTP has been sent to your email';
                }

                return res.status(200).json({
                    require2FA: true,
                    method: user.two_factor_method,
                    message
                });
            } else {
                // Verify OTP
                let verified = false;

                if (user.two_factor_method === 'email') {
                    if (user.two_factor_otp && user.two_factor_otp_expiry && new Date() <= user.two_factor_otp_expiry) {
                        if (user.two_factor_otp === otp) {
                            verified = true;
                            // Clear OTP after use (optional but good security)
                            user.two_factor_otp = null;
                            user.two_factor_otp_expiry = null;
                            await user.save();
                        }
                    }
                } else {
                    // App method
                    if (user.two_factor_secret) {
                        verified = speakeasy.totp.verify({
                            secret: user.two_factor_secret,
                            encoding: 'base32',
                            token: otp,
                            window: 2,
                        });
                    }
                }

                if (!verified) {
                    return res.status(401).json({ message: 'Invalid 2FA code' });
                }
            }
        }

        // Generate JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );



        // Generate CSRF Token
        const csrfToken = generateCsrfToken();

        // Set HttpOnly cookie for JWT
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict' // CSRF protection helper
        });

        // Set Non-HttpOnly cookie for CSRF (readable by frontend)
        res.cookie('csrf_token', csrfToken, {
            httpOnly: false, // JS needs to read this
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        });

        return res.json({
            user: { id: user.id, email: user.email, role: user.role },
            message: 'Login successful',
            // Token removed from response body for security
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req: Request, res: Response) => {
    // Registration disabled for security. Use database access or enable temporarily if needed.
    return res.status(403).json({ message: 'Registration is currently disabled.' });

    /* 
    // OLD LOGIC (Disabled)
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({ email, password, role: 'admin' });

        return res.status(201).json({ message: 'User created successfully', userId: user.id });
    } catch (error) {
        console.error('Register error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
    */
};

// Generate 6-digit OTP
const generateOTP = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export const forgotPassword = async (req: Request, res: Response) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            // Don't reveal if user exists or not for security
            return res.json({ message: 'If the email exists, a password reset OTP has been sent.' });
        }

        // Generate OTP and set expiry (10 minutes)
        const otp = generateOTP();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 10);

        user.password_reset_otp = otp;
        user.password_reset_expiry = expiry;
        await user.save();

        // Send OTP via email
        const emailSent = await sendPasswordResetOTP(email, otp);
        if (!emailSent) {
            return res.status(500).json({ message: 'Failed to send OTP email. Please try again later.' });
        }

        return res.json({ message: 'If the email exists, a password reset OTP has been sent.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;

        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP, and new password are required' });
        }

        if (newPassword.length < 12) {
            return res.status(400).json({ message: 'Password must be at least 12 characters long' });
        }

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP is valid and not expired
        if (!user.password_reset_otp || user.password_reset_otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        if (!user.password_reset_expiry || new Date() > user.password_reset_expiry) {
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Reset password
        user.set('password', newPassword);
        user.password_reset_otp = null;
        user.password_reset_expiry = null;
        await user.save();

        return res.json({ message: 'Password has been reset successfully' });
    } catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }

        if (newPassword.length < 12) {
            return res.status(400).json({ message: 'Password must be at least 12 characters long' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify current password
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }

        // Update password
        user.set('password', newPassword);
        await user.save();

        return res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const enable2FA = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        const { method } = req.body; // 'app' or 'email'

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (method === 'email') {
            const otp = generateOTP();
            const expiry = new Date();
            expiry.setMinutes(expiry.getMinutes() + 10);

            user.two_factor_method = 'email';
            user.two_factor_otp = otp;
            user.two_factor_otp_expiry = expiry;
            await user.save();

            const sent = await sendTwoFactorOTP(user.email, otp);
            if (!sent) {
                return res.status(500).json({ message: 'Failed to send OTP email' });
            }

            return res.json({
                message: 'OTP sent to your email',
                method: 'email'
            });
        } else {
            // Default to Authenticator App
            // Generate secret
            const secret = speakeasy.generateSecret({
                name: `UTS Marine LLP (${user.email})`,
                issuer: 'UTS Marine LLP',
            });

            // Generate QR code
            const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url || '');

            // Save secret but don't enable yet (user needs to verify first)
            user.two_factor_method = 'app';
            user.two_factor_secret = secret.base32 || '';
            await user.save();

            return res.json({
                secret: secret.base32,
                qrCode: qrCodeUrl,
                manualEntryKey: secret.base32,
                method: 'app'
            });
        }
    } catch (error) {
        console.error('Enable 2FA error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const verify2FASetup = async (req: AuthRequest, res: Response) => {
    try {
        const { token } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        let verified = false;

        if (user.two_factor_method === 'email') {
            if (!user.two_factor_otp || !user.two_factor_otp_expiry) {
                return res.status(400).json({ message: 'No OTP generated. Please request a new one.' });
            }

            if (new Date() > user.two_factor_otp_expiry) {
                return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
            }

            if (user.two_factor_otp === token) {
                verified = true;
                // Clear OTP after successful use
                user.two_factor_otp = null;
                user.two_factor_otp_expiry = null;
            }
        } else {
            // App method
            if (!user.two_factor_secret) {
                return res.status(400).json({ message: '2FA setup not initiated.' });
            }

            verified = speakeasy.totp.verify({
                secret: user.two_factor_secret,
                encoding: 'base32',
                token: token,
                window: 2, // Allow 2 time steps before/after
            });
        }

        if (!verified) {
            return res.status(400).json({ message: 'Invalid token. Please try again.' });
        }

        // Enable 2FA
        user.two_factor_enabled = true;
        await user.save();

        return res.json({ message: '2FA has been enabled successfully' });
    } catch (error) {
        console.error('Verify 2FA setup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const disable2FA = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.two_factor_enabled = false;
        user.two_factor_secret = null;
        await user.save();

        return res.json({ message: '2FA has been disabled successfully' });
    } catch (error) {
        console.error('Disable 2FA error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const get2FAStatus = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            twoFactorEnabled: user.two_factor_enabled || false,
            twoFactorMethod: user.two_factor_method || 'app',
            twoFactorSecret: user.two_factor_secret ? true : false, // Don't send actual secret
        });
    } catch (error) {
        console.error('Get 2FA status error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.json({
            email: user.email,
            role: user.role,
        });
    } catch (error: any) {
        console.error('Get current user error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

export const changeEmail = async (req: AuthRequest, res: Response) => {
    try {
        const { newEmail } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!newEmail) {
            return res.status(400).json({ message: 'New email is required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(newEmail)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if new email already exists
        const existingUser = await User.findOne({ where: { email: newEmail } });
        if (existingUser && existingUser.id !== userId) {
            return res.status(400).json({ message: 'Email address is already in use' });
        }

        // Update email
        user.email = newEmail;
        await user.save();

        // Generate new JWT with updated email
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        // Set HttpOnly cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            sameSite: 'strict'
        });

        return res.json({
            message: 'Email changed successfully',
            email: user.email
            // Token is now in cookie, no need to send in body
        });
    } catch (error: any) {
        console.error('Change email error:', error);
        console.error('Error stack:', error?.stack);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return res.status(500).json({
            message: 'Internal server error',
            error: error?.message || 'Unknown error',
            stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
        });
    }
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.clearCookie('csrf_token');
    return res.json({ message: 'Logged out successfully' });
};

export const getCsrfToken = (req: Request, res: Response) => {
    const csrfToken = generateCsrfToken();

    // Set Non-HttpOnly cookie for CSRF
    res.cookie('csrf_token', csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    });

    return res.json({ csrfToken });
};

