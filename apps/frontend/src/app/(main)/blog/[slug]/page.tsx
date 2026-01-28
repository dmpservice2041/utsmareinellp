import Link from 'next/link';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { API_ENDPOINTS, getUploadUrl } from '@/config/api';
import ProductInquiryForm from '@/components/products/ProductInquiryForm';

async function getBlog(slug: string, preview?: boolean) {
    try {
        const url = preview
            ? `${API_ENDPOINTS.PUBLIC_BLOG_BY_SLUG(slug)}?preview=true`
            : API_ENDPOINTS.PUBLIC_BLOG_BY_SLUG(slug);
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) return null;
        const data = await res.json();
        // Handle both direct blog object and wrapped response
        return data.data || data;
    } catch (error) {
        console.error('Error fetching blog:', error);
        return null;
    }
}

export async function generateMetadata({ params, searchParams }: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ preview?: string }>;
}) {
    const { slug } = await params;
    const { preview } = await searchParams;
    const blog = await getBlog(slug, preview === 'true');
    if (!blog) return { title: 'Article Not Found' };

    return {
        title: blog.seo_title || blog.meta_title || blog.title,
        description: blog.seo_description || blog.meta_description || blog.excerpt,
        openGraph: {
            title: blog.seo_title || blog.meta_title || blog.title,
            description: blog.seo_description || blog.meta_description || blog.excerpt,
            type: 'article',
            publishedTime: blog.published_at,
            authors: ['UTS Marine LLP'],
            images: blog.featured_image ? [getUploadUrl(blog.featured_image)] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: blog.seo_title || blog.meta_title || blog.title,
            description: blog.seo_description || blog.meta_description || blog.excerpt,
            images: blog.featured_image ? [getUploadUrl(blog.featured_image)] : [],
        }
    };
}

export default async function BlogPost({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ preview?: string }>;
}) {
    const { slug } = await params;
    const searchParamsData = searchParams ? await searchParams : { preview: undefined };
    const { preview } = searchParamsData;
    const blog = await getBlog(slug, preview === 'true');

    if (!blog) {
        notFound();
    }

    const featuredImage = blog.thumbnail || blog.featured_image
        ? getUploadUrl(blog.thumbnail || blog.featured_image)
        : null;

    // JSON-LD Schema
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.excerpt,
        image: featuredImage ? [featuredImage] : [],
        datePublished: blog.published_at,
        dateModified: blog.updatedAt || blog.published_at,
        author: {
            '@type': 'Organization',
            name: 'UTS Marine LLP',
            url: 'https://utsmarinellp.com'
        },
        publisher: {
            '@type': 'Organization',
            name: 'UTS Marine LLP',
            logo: {
                '@type': 'ImageObject',
                url: 'https://utsmarinellp.com/logo.png'
            }
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://utsmarinellp.com/blog/${blog.slug}`
        }
    };

    return (
        <main className="pt-24 sm:pt-28 bg-gray-50 min-h-screen">
            {/* Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <nav className="text-sm text-gray-600">
                        <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/blog" className="hover:text-teal-600 transition-colors">Blog</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-semibold">{blog.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-teal-600 to-cyan-700 text-white p-8 lg:p-12">
                        <div className="max-w-4xl mx-auto text-center">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                                {blog.title}
                            </h1>
                            <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-teal-100">
                                {blog.published_at && (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date(blog.published_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                )}
                                {blog.category && (
                                    <span className="px-3 py-1 bg-teal-500/30 rounded-full font-semibold">
                                        {blog.category}
                                    </span>
                                )}
                                {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
                                    <span className="flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        {blog.tags.join(', ')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-6 lg:p-12">
                        <div className="max-w-4xl mx-auto">
                            {/* Featured Image */}
                            {featuredImage && (
                                <div className="mb-10 rounded-lg overflow-hidden shadow-lg">
                                    <img
                                        src={featuredImage}
                                        alt={blog.title}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                            )}

                            {/* Excerpt */}
                            {blog.excerpt && (
                                <div className="mb-8 p-6 bg-teal-50 border-l-4 border-teal-600 rounded-r-lg">
                                    <p className="text-lg text-gray-700 italic leading-relaxed">
                                        {blog.excerpt}
                                    </p>
                                </div>
                            )}

                            {/* Content */}
                            <div
                                className="prose prose-lg max-w-none text-gray-700 leading-relaxed blog-content"
                                dangerouslySetInnerHTML={{
                                    __html: DOMPurify.sanitize(blog.content || '')
                                }}
                            />

                            {/* Tags */}
                            {blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0 && (
                                <div className="mt-12 pt-8 border-t border-gray-200">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.tags.map((tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-teal-100 hover:text-teal-700 transition-colors"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Inquiry Form */}
                            <div className="mt-12">
                                <ProductInquiryForm productTitle={blog.title} />
                            </div>

                            {/* Back Link */}
                            <div className="mt-12 pt-8 border-t border-gray-200">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Articles
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
