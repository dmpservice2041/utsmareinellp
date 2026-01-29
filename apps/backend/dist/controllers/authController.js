"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCsrfToken = exports.logout = exports.changeEmail = exports.getCurrentUser = exports.get2FAStatus = exports.disable2FA = exports.verify2FASetup = exports.enable2FA = exports.changePassword = exports.resetPassword = exports.forgotPassword = exports.register = exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
const emailUtils_1 = require("../utils/emailUtils");
const speakeasy_1 = __importDefault(require("speakeasy"));
const qrcode_1 = __importDefault(require("qrcode"));
dotenv_1.default.config();
const csrfMiddleware_1 = require("../middleware/csrfMiddleware");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, otp } = req.body;
        // Validation
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }
        const user = yield User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
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
                    yield user.save();
                    yield (0, emailUtils_1.sendTwoFactorOTP)(user.email, generatedOtp);
                    message = 'An OTP has been sent to your email';
                }
                return res.status(200).json({
                    require2FA: true,
                    method: user.two_factor_method,
                    message
                });
            }
            else {
                // Verify OTP
                let verified = false;
                if (user.two_factor_method === 'email') {
                    if (user.two_factor_otp && user.two_factor_otp_expiry && new Date() <= user.two_factor_otp_expiry) {
                        if (user.two_factor_otp === otp) {
                            verified = true;
                            // Clear OTP after use (optional but good security)
                            user.two_factor_otp = null;
                            user.two_factor_otp_expiry = null;
                            yield user.save();
                        }
                    }
                }
                else {
                    // App method
                    if (user.two_factor_secret) {
                        verified = speakeasy_1.default.totp.verify({
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
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        // Generate CSRF Token
        const csrfToken = (0, csrfMiddleware_1.generateCsrfToken)();
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
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
});
exports.register = register;
// Generate 6-digit OTP
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }
        const user = yield User_1.default.findOne({ where: { email } });
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
        yield user.save();
        // Send OTP via email
        const emailSent = yield (0, emailUtils_1.sendPasswordResetOTP)(email, otp);
        if (!emailSent) {
            return res.status(500).json({ message: 'Failed to send OTP email. Please try again later.' });
        }
        return res.json({ message: 'If the email exists, a password reset OTP has been sent.' });
    }
    catch (error) {
        console.error('Forgot password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            return res.status(400).json({ message: 'Email, OTP, and new password are required' });
        }
        if (newPassword.length < 12) {
            return res.status(400).json({ message: 'Password must be at least 12 characters long' });
        }
        const user = yield User_1.default.findOne({ where: { email } });
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
        yield user.save();
        return res.json({ message: 'Password has been reset successfully' });
    }
    catch (error) {
        console.error('Reset password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.resetPassword = resetPassword;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current password and new password are required' });
        }
        if (newPassword.length < 12) {
            return res.status(400).json({ message: 'Password must be at least 12 characters long' });
        }
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Verify current password
        const isValidPassword = yield bcrypt_1.default.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Current password is incorrect' });
        }
        // Update password
        user.set('password', newPassword);
        yield user.save();
        return res.json({ message: 'Password changed successfully' });
    }
    catch (error) {
        console.error('Change password error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.changePassword = changePassword;
const enable2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { method } = req.body; // 'app' or 'email'
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = yield User_1.default.findByPk(userId);
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
            yield user.save();
            const sent = yield (0, emailUtils_1.sendTwoFactorOTP)(user.email, otp);
            if (!sent) {
                return res.status(500).json({ message: 'Failed to send OTP email' });
            }
            return res.json({
                message: 'OTP sent to your email',
                method: 'email'
            });
        }
        else {
            // Default to Authenticator App
            // Generate secret
            const secret = speakeasy_1.default.generateSecret({
                name: `UTS Marine LLP (${user.email})`,
                issuer: 'UTS Marine LLP',
            });
            // Generate QR code
            const qrCodeUrl = yield qrcode_1.default.toDataURL(secret.otpauth_url || '');
            // Save secret but don't enable yet (user needs to verify first)
            user.two_factor_method = 'app';
            user.two_factor_secret = secret.base32 || '';
            yield user.save();
            return res.json({
                secret: secret.base32,
                qrCode: qrCodeUrl,
                manualEntryKey: secret.base32,
                method: 'app'
            });
        }
    }
    catch (error) {
        console.error('Enable 2FA error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.enable2FA = enable2FA;
const verify2FASetup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { token } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!token) {
            return res.status(400).json({ message: 'Token is required' });
        }
        const user = yield User_1.default.findByPk(userId);
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
        }
        else {
            // App method
            if (!user.two_factor_secret) {
                return res.status(400).json({ message: '2FA setup not initiated.' });
            }
            verified = speakeasy_1.default.totp.verify({
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
        yield user.save();
        return res.json({ message: '2FA has been enabled successfully' });
    }
    catch (error) {
        console.error('Verify 2FA setup error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.verify2FASetup = verify2FASetup;
const disable2FA = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.two_factor_enabled = false;
        user.two_factor_secret = null;
        yield user.save();
        return res.json({ message: '2FA has been disabled successfully' });
    }
    catch (error) {
        console.error('Disable 2FA error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.disable2FA = disable2FA;
const get2FAStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({
            twoFactorEnabled: user.two_factor_enabled || false,
            twoFactorMethod: user.two_factor_method || 'app',
            twoFactorSecret: user.two_factor_secret ? true : false, // Don't send actual secret
        });
    }
    catch (error) {
        console.error('Get 2FA status error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.get2FAStatus = get2FAStatus;
const getCurrentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({
            email: user.email,
            role: user.role,
        });
    }
    catch (error) {
        console.error('Get current user error:', error);
        return res.status(500).json({
            message: 'Internal server error',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});
exports.getCurrentUser = getCurrentUser;
const changeEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { newEmail } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
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
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if new email already exists
        const existingUser = yield User_1.default.findOne({ where: { email: newEmail } });
        if (existingUser && existingUser.id !== userId) {
            return res.status(400).json({ message: 'Email address is already in use' });
        }
        // Update email
        user.email = newEmail;
        yield user.save();
        // Generate new JWT with updated email
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
    }
    catch (error) {
        console.error('Change email error:', error);
        console.error('Error stack:', error === null || error === void 0 ? void 0 : error.stack);
        console.error('Error details:', JSON.stringify(error, null, 2));
        return res.status(500).json({
            message: 'Internal server error',
            error: (error === null || error === void 0 ? void 0 : error.message) || 'Unknown error',
            stack: process.env.NODE_ENV === 'development' ? error === null || error === void 0 ? void 0 : error.stack : undefined
        });
    }
});
exports.changeEmail = changeEmail;
const logout = (req, res) => {
    res.clearCookie('token');
    res.clearCookie('csrf_token');
    return res.json({ message: 'Logged out successfully' });
};
exports.logout = logout;
const getCsrfToken = (req, res) => {
    const csrfToken = (0, csrfMiddleware_1.generateCsrfToken)();
    // Set Non-HttpOnly cookie for CSRF
    res.cookie('csrf_token', csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'strict'
    });
    return res.json({ csrfToken });
};
exports.getCsrfToken = getCsrfToken;
