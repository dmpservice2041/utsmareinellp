import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Routes
import authRoutes from './routes/authRoutes';
import contactRoutes from './routes/contactRoutes';
import productRoutes from './routes/productRoutes';
import blogRoutes from './routes/blogRoutes';

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Marine LLP Backend Running');
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
