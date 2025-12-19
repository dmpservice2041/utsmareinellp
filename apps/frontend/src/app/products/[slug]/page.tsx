import Link from 'next/link';
import { API_ENDPOINTS } from '@/config/api';

async function getProduct(slug: string) {
    const res = await fetch(API_ENDPOINTS.products.detail(slug), { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);
    if (!product) return { title: 'Product Not Found' };

    return {
        title: product.seo_title || product.title,
        description: product.seo_description || product.short_description,
    };
}

export default async function ProductDetail({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug);

    if (!product) {
        return (
            <div className="pt-36 text-center text-gray-600">
                <h1 className="text-2xl font-bold">Product Not Found</h1>
                <Link href="/products" className="text-teal-600 hover:underline mt-4 block">Back to Products</Link>
            </div>
        );
    }

    const mainImage = product.images && product.images.length > 0
        ? product.images[0].url
        : 'https://placehold.co/800x600?text=No+Image';

    return (
        <main className="pt-24 sm:pt-28">
            {/* Breadcrumb */}
            <div className="bg-gray-100 py-4">
                <div className="container mx-auto px-4 text-sm text-gray-600">
                    <Link href="/" className="hover:text-teal-600">Home</Link> &gt;
                    <Link href="/products" className="hover:text-teal-600 ml-1">Products</Link> &gt;
                    <span className="ml-1 text-gray-900 font-semibold">{product.title}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery (Simplified to single image for now) */}
                    <div className="rounded-lg overflow-hidden border border-gray-200">
                        <img src={mainImage} alt={product.title} className="w-full h-auto object-cover" />
                    </div>

                    {/* details */}
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>
                        <div className="text-lg text-gray-700 mb-6 italic">{product.short_description}</div>

                        <div className="prose max-w-none text-gray-600 mb-8" dangerouslySetInnerHTML={{ __html: product.long_description }} />

                        {/* Inquiry CTA */}
                        <div className="bg-teal-50 border border-teal-100 p-6 rounded-lg">
                            <h3 className="text-xl font-bold text-teal-800 mb-2">Interested in this part?</h3>
                            <p className="text-teal-700 mb-4">Contact us for pricing and availability. We verify standard and condition for every inquiry.</p>
                            <Link
                                href={`/contact?subject=Inquiry: ${product.title}`}
                                className="inline-block px-6 py-3 bg-teal-600 text-white font-bold rounded hover:bg-teal-700 transition"
                            >
                                Request Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
