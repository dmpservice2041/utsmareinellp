import Link from 'next/link';
import ProductCard from '@/components/shared/ProductCard';
import { API_ENDPOINTS } from '@/config/api';

async function getProducts() {
    // SSR fetch to backend - URL configured via environment variable
    const res = await fetch(API_ENDPOINTS.products.list(12), { cache: 'no-store' });

    if (!res.ok) {
        // Fallback or empty struct if backend is down
        return { products: [] };
    }
    return res.json();
}

export default async function Products() {
    const data = await getProducts();
    const products = data.products || [];

    return (
        <main className="pt-24 sm:pt-28">
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">New Arrivals</h1>
                    <div className="flex justify-center text-sm text-gray-600 space-x-2">
                        <Link href="/" className="hover:text-teal-600">Home</Link>
                        <span>/</span>
                        <span className="text-gray-900">Products</span>
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    {/* Controls like Search/Filter could go here */}

                    {products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {products.map((p: any) => (
                                <ProductCard
                                    key={p.id}
                                    title={p.title}
                                    category="Marine Spares" // Static for now, or add category to DB
                                    slug={p.slug}
                                    image={p.images && p.images.length > 0 ? p.images[0].url : 'https://placehold.co/600x400?text=No+Image'}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-gray-500">
                            <p>No products found at the moment.</p>
                        </div>
                    )}

                    {/* Pagination Placeholder */}
                    {/* <div className="mt-12 flex justify-center">...</div> */}
                </div>
            </section>
        </main>
    );
}
