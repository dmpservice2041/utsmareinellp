import { Request, Response } from 'express';
import Message from '../models/Message';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const submitContact = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message, productTitle } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        // Save to DB
        const newMessage = await Message.create({ name, email, subject, message });

        // Send Email Notification
        // Admin email (where inquiries are sent) - defaults to EMAIL_USER if not set
        const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'sales@utsmarinellp.com';
        
        if (adminEmail && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            try {
                // Configure SMTP transporter
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
                    transporterConfig.secure = process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465'; // true for 465, false for 587/25
                } else if (process.env.EMAIL_SERVICE) {
                    transporterConfig.service = process.env.EMAIL_SERVICE;
                } else {
                    // Default to custom SMTP
                    transporterConfig.host = process.env.SMTP_HOST || 'mail.dpinfoserver.co.in';
                    transporterConfig.port = parseInt(process.env.SMTP_PORT || '587');
                    transporterConfig.secure = false;
                }

                const transporter = nodemailer.createTransport(transporterConfig);

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

                await transporter.sendMail(mailOptions);
                console.log(`✅ Inquiry email sent to ${adminEmail}`);
            } catch (emailError: any) {
                console.error('❌ Failed to send email:', emailError.message);
                // Don't fail the request if email fails - message is still saved to DB
            }
        } else {
            console.log('⚠️  Email not sent: SMTP credentials not configured. Message saved to database.');
            console.log('   Configure EMAIL_USER, EMAIL_PASS, and ADMIN_EMAIL in .env file');
        }

        return res.status(201).json({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        console.error('Contact error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.findAll({ order: [['createdAt', 'DESC']] });
        return res.json(messages);
    } catch (error) {
        console.error('Get messages error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
