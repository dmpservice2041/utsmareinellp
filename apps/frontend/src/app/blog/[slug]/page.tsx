import Link from 'next/link';
import { API_ENDPOINTS } from '@/config/api';

async function getBlog(slug: string) {
    const res = await fetch(API_ENDPOINTS.blogs.detail(slug), { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const blog = await getBlog(params.slug);
    if (!blog) return { title: 'Article Not Found' };

    return {
        title: blog.seo_title || blog.title,
        description: blog.seo_description,
    };
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const blog = await getBlog(params.slug);

    if (!blog) {
        return (
            <div className="pt-36 text-center text-gray-600">
                <h1 className="text-2xl font-bold">Article Not Found</h1>
                <Link href="/blog" className="text-teal-600 hover:underline mt-4 block">Back to Blog</Link>
            </div>
        );
    }

    return (
        <main className="pt-24 sm:pt-28">
            <div className="bg-gray-900 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-3xl sm:text-5xl font-bold mb-6 max-w-4xl mx-auto">{blog.title}</h1>
                    <div className="flex justify-center items-center text-sm text-gray-400 space-x-4">
                        <span>{new Date(blog.published_at).toLocaleDateString()}</span>
                        <span>|</span>
                        <span className="text-teal-400">{blog.tags}</span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {blog.thumbnail && (
                    <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
                        <img src={blog.thumbnail} alt={blog.title} className="w-full h-auto" />
                    </div>
                )}

                <div className="prose prose-lg max-w-none text-gray-700" dangerouslySetInnerHTML={{ __html: blog.content }} />

                <div className="mt-12 pt-8 border-t border-gray-200">
                    <Link href="/blog" className="text-teal-600 font-semibold hover:underline">
                        &larr; Back to Articles
                    </Link>
                </div>
            </div>
        </main>
    );
}
