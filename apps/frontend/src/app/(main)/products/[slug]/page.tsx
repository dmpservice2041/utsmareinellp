import Link from 'next/link';
import { notFound } from 'next/navigation';
import DOMPurify from 'isomorphic-dompurify';
import { API_ENDPOINTS, getUploadUrl } from '@/config/api';
import ProductInquiryForm from '@/components/products/ProductInquiryForm';
import ProductImage from '@/components/products/ProductImage';

async function getProduct(slug: string, preview?: boolean) {
    try {
        const url = preview
            ? `${API_ENDPOINTS.PUBLIC_PRODUCT_BY_SLUG(slug)}?preview=true`
            : API_ENDPOINTS.PUBLIC_PRODUCT_BY_SLUG(slug);
        const res = await fetch(url, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) return null;
        const data = await res.json();
        // Handle both direct product object and wrapped response
        return data.data || data;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function generateMetadata({ params, searchParams }: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ preview?: string }>;
}) {
    const { slug } = await params;
    const { preview } = await searchParams;
    const product = await getProduct(slug, preview === 'true');
    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.seo_title || product.meta_title || product.title,
        description: product.seo_description || product.meta_description || product.short_description,
    };
}

export default async function ProductDetail({
    params,
    searchParams
}: {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ preview?: string }>;
}) {
    const { slug } = await params;
    const { preview } = await searchParams;
    const product = await getProduct(slug, preview === 'true');

    if (!product) {
        notFound();
    }

    // Get image from featured_image first, then from images array
    let mainImage: string | null = null;

    if (product.featured_image && product.featured_image.trim() !== '') {
        mainImage = getUploadUrl(product.featured_image);
    } else if (product.images && product.images.length > 0 && product.images[0].url && product.images[0].url.trim() !== '') {
        mainImage = getUploadUrl(product.images[0].url);
    }

    // Format long description to preserve line breaks, bullets, and hyphens
    const formatDescription = (text: string | null | undefined): string => {
        if (!text) return '';

        // If already HTML, return as is
        if (text.includes('<')) {
            return text;
        }

        // Split into lines and process
        const lines = text.split('\n');
        let result = '';
        let inList = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const trimmed = line.trim();

            // Check if line starts with bullet/hyphen marker
            const isListItem = trimmed.match(/^[-*•]\s/);

            if (isListItem) {
                // Start list if not already in one
                if (!inList) {
                    result += '<ul class="list-disc list-inside space-y-2 my-4">';
                    inList = true;
                }
                // Add list item (remove the - or * and space)
                result += `<li>${trimmed.substring(2)}</li>`;
            } else {
                // End list if we were in one
                if (inList) {
                    result += '</ul>';
                    inList = false;
                }
                // Add paragraph for non-empty lines
                if (trimmed) {
                    result += `<p class="mb-4">${trimmed}</p>`;
                } else {
                    // Empty line becomes spacing
                    result += '<br>';
                }
            }
        }

        // Close list if still open
        if (inList) {
            result += '</ul>';
        }

        return result;
    };

    const formattedDescription = product.long_description
        ? formatDescription(product.long_description)
        : '';

    return (
        <main className="pt-24 sm:pt-28 bg-gray-50 min-h-screen">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-3">
                    <nav className="text-sm text-gray-600">
                        <Link href="/" className="hover:text-teal-600 transition-colors">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/products" className="hover:text-teal-600 transition-colors">Products</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-900 font-semibold">{product.title}</span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-12">
                        {/* Image Gallery */}
                        <div className="relative">
                            <div className="relative bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 p-6">
                                <div className="w-full flex items-center justify-center" style={{ minHeight: '400px', maxHeight: '600px' }}>
                                    {mainImage ? (
                                        <ProductImage
                                            src={mainImage}
                                            alt={product.title}
                                            className="max-w-full max-h-full w-auto h-auto object-contain"
                                            style={{ maxWidth: '100%', maxHeight: '600px' }}
                                        />
                                    ) : (
                                        <div className="no-image-placeholder absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                                            <svg className="w-24 h-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-lg font-medium text-gray-500">No Image Available</p>
                                            <p className="text-sm text-gray-400 mt-2">Product image will be displayed here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {product.category && (
                                <div className="mt-4">
                                    <span className="inline-block px-4 py-2 bg-teal-600 text-white text-sm font-semibold rounded-full">
                                        {product.category}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div className="flex flex-col">
                            <div className="mb-6">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                    {product.title}
                                </h1>
                                {product.short_description && (
                                    <p className="text-lg text-gray-600 italic mb-6 leading-relaxed">
                                        {product.short_description}
                                    </p>
                                )}
                            </div>

                            {/* Long Description with preserved formatting */}
                            {product.long_description && (
                                <div className="mb-8">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
                                    <div
                                        className="text-gray-700 leading-relaxed product-description"
                                        dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(formattedDescription)
                                        }}
                                    />
                                </div>
                            )}

                            {/* Tags */}
                            {product.tags && product.tags.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Tags</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {product.tags.map((tag: string, index: number) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Inquiry Form */}
                            <ProductInquiryForm productTitle={product.title} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
