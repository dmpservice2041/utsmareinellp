import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const getEmailTransporter = () => {
    const transporterConfig: any = {
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    };

    // Use custom SMTP if host is provided, otherwise use service
    if (process.env.SMTP_HOST) {
        transporterConfig.host = process.env.SMTP_HOST;
        transporterConfig.port = parseInt(process.env.SMTP_PORT || '587');
        transporterConfig.secure = process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465';
    } else if (process.env.EMAIL_SERVICE) {
        transporterConfig.service = process.env.EMAIL_SERVICE;
    } else {
        // Default to custom SMTP
        transporterConfig.host = process.env.SMTP_HOST || 'mail.dpinfoserver.co.in';
        transporterConfig.port = parseInt(process.env.SMTP_PORT || '587');
        transporterConfig.secure = false;
    }

    return nodemailer.createTransport(transporterConfig);
};

/**
 * Basic HTML encoding to prevent XSS in email templates
 */
export const encodeHTML = (str: string): string => {
    return str.replace(/[&<>"']/g, (tag) => {
        const chars: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
        };
        return chars[tag] || tag;
    });
};

export const sendPasswordResetOTP = async (email: string, otp: string): Promise<boolean> => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email configuration missing');
            return false;
        }

        const transporter = getEmailTransporter();

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'UTS Marine LLP'}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset OTP - UTS Marine LLP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0d9488;">Password Reset Request</h2>
                    <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p>You have requested to reset your password for UTS Marine LLP Admin Panel.</p>
                        <p>Please use the following OTP to reset your password:</p>
                        <div style="background-color: #ffffff; padding: 20px; border: 2px solid #0d9488; border-radius: 8px; text-align: center; margin: 20px 0;">
                            <h1 style="color: #0d9488; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
                        </div>
                        <p style="color: #6b7280; font-size: 14px;">This OTP will expire in 10 minutes.</p>
                        <p style="color: #dc2626; font-size: 14px; margin-top: 20px;">If you did not request this password reset, please ignore this email.</p>
                    </div>
                    <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                        This is an automated message from UTS Marine LLP Admin Panel.
                    </p>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending password reset OTP email:', error);
        return false;
    }
};

export const sendTwoFactorOTP = async (email: string, otp: string): Promise<boolean> => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('Email configuration missing');
            return false;
        }

        const transporter = getEmailTransporter();

        const mailOptions = {
            from: `"${process.env.EMAIL_FROM_NAME || 'UTS Marine LLP'}" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Two-Factor Authentication OTP - UTS Marine LLP',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #0d9488;">Two-Factor Authentication</h2>
                    <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p>Your OTP for Two-Factor Authentication is:</p>
                        <div style="background-color: #ffffff; padding: 20px; border: 2px solid #0d9488; border-radius: 8px; text-align: center; margin: 20px 0;">
                            <h1 style="color: #0d9488; font-size: 32px; letter-spacing: 8px; margin: 0;">${otp}</h1>
                        </div>
                        <p style="color: #6b7280; font-size: 14px;">This OTP will expire in 10 minutes.</p>
                        <p style="color: #dc2626; font-size: 14px; margin-top: 20px;">If you did not request this OTP, please ignore this email.</p>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending 2FA OTP email:', error);
        return false;
    }
};
