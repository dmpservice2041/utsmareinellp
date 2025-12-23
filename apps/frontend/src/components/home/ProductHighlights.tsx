"use client";

import ProductCard from '../shared/ProductCard';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ProductHighlights() {
    const products = [
        { title: "Main Engine Piston", category: "Engine Parts", slug: "piston-ring", image: "/piston.jpg" },
        { title: "Turbocharger Unit", category: "Machinery", slug: "turbo-unit", image: "/turbocharger.jpg" },
        { title: "Hydraulic Pump", category: "Hydraulics", slug: "hydraulic-pump", image: "/hydraulic-pump.jpg" },
        { title: "Air Compressor", category: "Compressors", slug: "air-compressor", image: "/air-compressor.jpg" },
    ];

    return (
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal delay={0}>
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-teal-100 rounded-full text-teal-600 font-semibold tracking-wider uppercase text-sm mb-4">
                            Recent Projects
                        </span>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 text-gray-900">
                            Explore the Recent Works
                            <span className="block text-teal-600 mt-2">We Have Done!</span>
                        </h2>
                    </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((p, i) => (
                        <ScrollReveal key={i} delay={i * 100}>
                            <ProductCard {...p} />
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
