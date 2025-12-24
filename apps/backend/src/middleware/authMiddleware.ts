import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export interface AuthRequest extends Request {
    user?: {
        id: number;
        email: string;
        role: string;
    };
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers['authorization'];
    let token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token && req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            error: {
                code: 'UNAUTHORIZED',
                message: 'Access denied. No token provided.'
            }
        });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string) as any;
        req.user = {
            id: verified.id,
            email: verified.email,
            role: verified.role,
        };
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: {
                code: 'INVALID_TOKEN',
                message: 'Invalid or expired token.'
            }
        });
    }
};
