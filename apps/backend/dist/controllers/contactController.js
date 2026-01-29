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
exports.getMessages = exports.submitContact = void 0;
const Message_1 = __importDefault(require("../models/Message"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const submitContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, subject, message, productTitle } = req.body;
        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }
        // Save to DB
        const newMessage = yield Message_1.default.create({ name, email, subject, message });
        // Send Email Notification
        // Admin email (where inquiries are sent) - defaults to EMAIL_USER if not set
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'sales@utsmarinellp.com';
        if (adminEmail && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                // Configure SMTP transporter
                const transporterConfig = {
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS,
                    },
                };
                // Use custom SMTP if host is provided, otherwise use service
                if (process.env.SMTP_HOST) {
                    transporterConfig.host = process.env.SMTP_HOST;
                    transporterConfig.port = parseInt(process.env.SMTP_PORT || '587');
                    transporterConfig.secure = process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465'; // true for 465, false for 587/25
                }
                else if (process.env.EMAIL_SERVICE) {
                    transporterConfig.service = process.env.EMAIL_SERVICE;
                }
                else {
                    // Default to custom SMTP
                    transporterConfig.host = process.env.SMTP_HOST || 'mail.dpinfoserver.co.in';
                    transporterConfig.port = parseInt(process.env.SMTP_PORT || '587');
                    transporterConfig.secure = false;
                }
                const transporter = nodemailer_1.default.createTransport(transporterConfig);
                // Email content
                const mailOptions = {
                    from: `"${process.env.EMAIL_FROM_NAME || 'UTS Marine LLP'}" <${process.env.EMAIL_USER}>`,
                    to: adminEmail,
                    replyTo: email, // Allow admin to reply directly to customer
                    subject: `New Product Inquiry${productTitle ? `: ${productTitle}` : subject ? ` - ${subject}` : ''}`,
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #0d9488;">New Product Inquiry</h2>
                            <div style="background-color: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                                <p><strong>From:</strong> ${name}</p>
                                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                                <p><strong>Product:</strong> ${productTitle || 'General Inquiry'}</p>
                                <p><strong>Subject:</strong> ${subject || 'Product Inquiry'}</p>
                            </div>
                            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                                <h3 style="color: #374151;">Message:</h3>
                                <p style="white-space: pre-wrap; color: #4b5563;">${message}</p>
                            </div>
                            <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
                                This inquiry was submitted through the UTS Marine LLP website.
                            </p>
                        </div>
                    `,
                    text: `New Product Inquiry\n\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject || 'Product Inquiry'}\n\nMessage:\n${message}`,
                };
                yield transporter.sendMail(mailOptions);
                console.log(`✅ Inquiry email sent to ${adminEmail}`);
            }
            catch (emailError) {
                console.error('❌ Failed to send email:', emailError.message);
                // Don't fail the request if email fails - message is still saved to DB
            }
        }
        else {
            console.log('⚠️  Email not sent: SMTP credentials not configured. Message saved to database.');
            console.log('   Configure EMAIL_USER, EMAIL_PASS, and ADMIN_EMAIL in .env file');
        }
        return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    }
    catch (error) {
        console.error('Contact error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.submitContact = submitContact;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;
        const { count, rows } = yield Message_1.default.findAndCountAll({
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });
        return res.json({
            success: true,
            data: rows,
            meta: {
                page,
                limit,
                total: count,
                pages: Math.ceil(count / limit),
            }
        });
    }
    catch (error) {
        console.error('Get messages error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.getMessages = getMessages;
