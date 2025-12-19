import { Request, Response } from 'express';
import Message from '../models/Message';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const submitContact = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        // Save to DB
        const newMessage = await Message.create({ name, email, subject, message });

        // Send Email (Mock/Real)
        // In a real scenario, use actual SMTP credentials
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to admin
            subject: `New Contact from ${name}: ${subject || 'No Subject'}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        };

        // We won't block the response on email sending for this demo, or we can await it if critical.
        // wrapping in try/catch to not fail the request if email fails (unless critical)
        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
            } else {
                console.log('Email credentials not set, skipping email send.');
            }
        } catch (emailError) {
            console.error('Failed to send email:', emailError);
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
