'use client';

import { useState, useEffect } from 'react';
import BlogCard from '../shared/BlogCard';
import { API_ENDPOINTS } from '../../config/api';

export default function BlogPreview() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(`${API_ENDPOINTS.PUBLIC_BLOGS}?limit=3`);
                const data = await response.json();
                if (data.success) {
                    setBlogs(data.data);
                }
            } catch (error) {
                console.error('Failed to fetch blogs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-teal-600 font-semibold tracking-wider uppercase">Latest Insights</span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900">Marine Industry Blog</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (blogs.length === 0) {
        return null; // Or show a default message/placeholder
    }

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-teal-600 font-semibold tracking-wider uppercase">Latest Insights</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900">Marine Industry Blog</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog.id}
                            title={blog.title}
                            excerpt={blog.excerpt}
                            date={blog.published_at || blog.createdAt || new Date().toISOString()}
                            image={blog.featured_image || 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2576&auto=format&fit=crop'}
                            slug={blog.slug}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
