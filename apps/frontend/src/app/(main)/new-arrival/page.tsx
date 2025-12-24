import Link from 'next/link';
import { API_ENDPOINTS, getUploadUrl } from '@/config/api';
import ProductCard from '@/components/shared/ProductCard';
import ScrollReveal from '@/components/shared/ScrollReveal';

async function getProducts() {
    try {
        const res = await fetch(`${API_ENDPOINTS.PUBLIC_PRODUCTS}?limit=100`, { 
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function NewArrival() {
    const products = await getProducts();

    return (
        <main className="pt-24 sm:pt-28">
            {/* Banner Header */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580910543623-1d9865672808?q=80&w=2070&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                </div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <ScrollReveal delay={0}>
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-500/20 backdrop-blur-sm rounded-full border border-teal-400/30">
                                <span className="text-teal-300 text-sm font-semibold uppercase tracking-wider">New Arrival</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">New Arrivals</h1>
                            <p className="text-xl text-gray-200 mb-6 max-w-2xl mx-auto">
                                Explore our latest marine engine parts and components
                            </p>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">New Arrivals</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    {products.length > 0 ? (
                        <>
                            <ScrollReveal delay={0}>
                                <div className="text-center mb-16">
                                    <span className="inline-block px-4 py-2 bg-teal-100 rounded-full text-teal-600 font-semibold tracking-wider uppercase text-sm mb-4">
                                        Our Products
                                    </span>
                                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-gray-900">
                                        Latest Arrivals
                                    </h2>
                                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                                        Browse through our collection of quality marine engine parts and components
                                    </p>
                                </div>
                            </ScrollReveal>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                                {products.map((product: any, index: number) => {
                                    // Pass the raw path, or empty string if no image - ProductCard will show placeholder
                                    const imagePath = product.featured_image && product.featured_image.trim() !== ''
                                        ? product.featured_image
                                        : product.images && product.images.length > 0 && product.images[0].url && product.images[0].url.trim() !== ''
                                        ? product.images[0].url
                                        : '';
                                    
                                    return (
                                        <ScrollReveal key={product.id} delay={index * 50}>
                                            <ProductCard
                                                title={product.title}
                                                image={imagePath}
                                                category={product.category || 'Uncategorized'}
                                                slug={product.slug}
                                            />
                                        </ScrollReveal>
                                    );
                                })}
                            </div>
                        </>
                    ) : (
                        <ScrollReveal delay={0}>
                            <div className="text-center py-20">
                                <div className="inline-block mb-6 px-6 py-3 bg-gray-100 rounded-full">
                                    <span className="text-gray-600 text-sm font-semibold uppercase tracking-wider">No Products</span>
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                    No Products Available
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Check back soon for new arrivals!
                                </p>
                            </div>
                        </ScrollReveal>
                    )}
                </div>
            </section>
        </main>
    );
}
