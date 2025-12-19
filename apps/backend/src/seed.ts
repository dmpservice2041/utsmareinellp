import sequelize from './config/database';
import { User, Product, ProductImage, Blog } from './models';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const seed = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true }); // Reset DB

        // Create Admin
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('admin123', salt);
        await User.create({
            email: 'admin@marinellp.com',
            password: 'admin123', // Will be hashed by hook if using create, but let's be safe
            role: 'admin',
        });
        console.log('Admin user created');

        // Create Products
        const p1 = await Product.create({
            title: 'Main Engine Piston Ring',
            slug: 'main-engine-piston-ring',
            short_description: 'High quality piston rings for various marine engine makes.',
            long_description: '<p>Standard size and oversize piston rings available for MAN B&W, Sulzer, and Wartsila engines.</p>',
            seo_title: 'Marine Engine Piston Rings | UTS Marine LLP',
            seo_description: 'Buy genuine and OEM piston rings for marine main engines.',
        });
        await ProductImage.create({ product_id: p1.id, url: 'https://images.unsplash.com/photo-1549106765-3d312a9425e1?q=80&w=2076&auto=format&fit=crop' });

        const p2 = await Product.create({
            title: 'Turbocharger TPL 77',
            slug: 'turbocharger-tpl-77',
            short_description: 'Complete turbocharger unit TPL 77 type.',
            long_description: '<p>Reconditioned turbocharger unit with 6 months warranty. Balanced and tested.</p>',
            seo_title: 'ABB Turbocharger TPL 77 | UTS Marine LLP',
            seo_description: 'Reconditioned ABB TPL 77 turbocharger for sale.',
        });
        await ProductImage.create({ product_id: p2.id, url: 'https://images.unsplash.com/photo-1580910543623-1d9865672808?q=80&w=2070&auto=format&fit=crop' });

        const p3 = await Product.create({
            title: 'Hydraulic Pump A10VSO',
            slug: 'hydraulic-pump-a10vso',
            short_description: 'Rexroth hydraulic pump A10VSO series.',
            long_description: '<p>Rexroth axial piston variable pump A10VSO. Pressure up to 280 bar.</p>',
            seo_title: 'Rexroth Hydraulic Pump A10VSO | UTS Marine LLP',
            seo_description: 'Genuine Rexroth hydraulic pumps for marine cranes and steering gear.',
        });
        await ProductImage.create({ product_id: p3.id, url: 'https://images.unsplash.com/photo-1565492987258-45ec33918544?q=80&w=2670&auto=format&fit=crop' });

        console.log('Sample products created');

        // Create Blogs
        await Blog.create({
            title: 'Optimizing Marine Engine Efficiency',
            slug: 'optimizing-marine-engine-efficiency',
            content: '<p>Regular maintenance of fuel injection systems is crucial for maintaining engine efficiency...</p><h3>Key Steps:</h3><ul><li>Monitor exhaust temperatures</li><li>Check injection timing</li></ul>',
            thumbnail: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2576&auto=format&fit=crop',
            tags: 'Maintenance,Engine',
            seo_title: 'Optimizing Marine Engine Efficiency | UTS Marine Blog',
            seo_description: 'Learn how to improve marine engine performance and fuel efficiency.',
            published_at: new Date(),
        });

        await Blog.create({
            title: 'Importance of Genuine Spare Parts',
            slug: 'importance-genuine-parts',
            content: '<p>Using non-genuine parts can lead to catastrophic failures. Genuine parts ensure compatibility and longevity...</p>',
            thumbnail: 'https://images.unsplash.com/photo-1595166668734-703df77df83c?q=80&w=2670&auto=format&fit=crop',
            tags: 'Safety,Spares',
            seo_title: 'Why Use Genuine Marine Spare Parts? | UTS Marine Blog',
            seo_description: 'Understanding the risks of aftermarket parts in marine machinery.',
            published_at: new Date(),
        });
        console.log('Sample blogs created');

        process.exit(0);
    } catch (error) {
        console.error('Seed error:', error);
        process.exit(1);
    }
};

seed();
