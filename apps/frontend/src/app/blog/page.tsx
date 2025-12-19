import Link from 'next/link';
import BlogCard from '@/components/shared/BlogCard';
import { API_ENDPOINTS } from '@/config/api';

async function getBlogs() {
    const res = await fetch(API_ENDPOINTS.blogs.list(10), { cache: 'no-store' });
    if (!res.ok) return { blogs: [] };
    return res.json();
}

export default async function BlogPage() {
    const data = await getBlogs();
    const blogs = data.blogs || [];

    return (
        <main className="pt-24 sm:pt-28">
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h1>
                    <div className="flex justify-center text-sm text-gray-600 space-x-2">
                        <Link href="/" className="hover:text-teal-600">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900">Blog</span>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    {blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((b: any) => (
                                <BlogCard
                                    key={b.id}
                                    title={b.title}
                                    excerpt={b.seo_description || 'Click to read more...'} // Using SEO desc as excerpt
                                    image={b.thumbnail || 'https://placehold.co/600x400?text=No+Image'}
                                    date={new Date(b.published_at).toLocaleDateString()}
                                    slug={b.slug}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <p>No articles found.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
