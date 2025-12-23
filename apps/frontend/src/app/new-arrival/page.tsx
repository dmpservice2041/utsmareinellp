"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function NewArrival() {
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
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">New Arrival</h1>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">New Arrival</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Content Section - Blank for now */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Coming Soon</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                New Arrival
                            </h2>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                Content will be added here soon.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
