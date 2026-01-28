import { MetadataRoute } from 'next';
import { API_ENDPOINTS } from '@/config/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://utsmarinellp.com';

    // 1. Static Routes
    const routes = [
        '',
        '/about',
        '/services',
        '/contact',
        '/blog',
        '/new-arrival',
        '/ship-machinery',
        '/engine-parts',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // 2. Fetch Blogs
    let blogRoutes: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_ENDPOINTS.PUBLIC_BLOGS}?limit=1000`);
        const data = await res.json();
        const blogs = data.data || [];
        blogRoutes = blogs.map((blog: any) => ({
            url: `${baseUrl}/blog/${blog.slug}`,
            lastModified: new Date(blog.updatedAt || blog.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Sitemap Error: Failed to fetch blogs', error);
    }

    // 3. Fetch Products (New Arrivals)
    let productRoutes: MetadataRoute.Sitemap = [];
    try {
        const res = await fetch(`${API_ENDPOINTS.PUBLIC_PRODUCTS}?limit=1000`);
        const data = await res.json();
        const products = data.data || [];
        productRoutes = products.map((product: any) => ({
            url: `${baseUrl}/products/${product.slug}`,
            lastModified: new Date(product.updatedAt || product.createdAt),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }));
    } catch (error) {
        console.error('Sitemap Error: Failed to fetch products', error);
    }

    return [...routes, ...blogRoutes, ...productRoutes];
}
