"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function EnginePartsPage() {
    const features = [
        {
            title: 'Genuine & OEM Parts',
            description: 'All parts are quality-checked and certified',
            icon: '✓'
        },
        {
            title: 'Large Warehouse Stock',
            description: 'Fast delivery of in-stock items',
            icon: '📦'
        },
        {
            title: 'NDT Testing Facility',
            description: 'In-house quality testing and certification',
            icon: '🔬'
        },
        {
            title: '24/7 Emergency Support',
            description: 'Always available for urgent requirements',
            icon: '🛟'
        }
    ];

    return (
        <main className="pt-24 sm:pt-28">
            {/* Banner Header */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/Engine_Parts_header.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                </div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <ScrollReveal delay={0}>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">Engine Parts</h1>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">Engine Parts</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Inventory</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Marine Engine Spare Parts
                            </h2>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                We supply genuine and OEM spare parts for all major marine engine manufacturers. Our extensive inventory includes parts for both two-stroke and four-stroke engines, ensuring we can meet your requirements quickly and efficiently.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto mb-20">
                        <ScrollReveal delay={200}>
                            <Link href="/engine-parts/two-stroke" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Two-Stroke Engines
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        Parts for main propulsion engines from MAN B&W, Sulzer, and Mitsubishi. High power output for large commercial vessels.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Two-Stroke Parts
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <Link href="/engine-parts/four-stroke" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Four-Stroke Engines
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        Parts for auxiliary engines and generators from Yanmar, Daihatsu, MaK, Wartsila, and more. Better fuel economy at lower loads.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Four-Stroke Parts
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>
                    </div>

                    {/* Why Choose Section */}
                    <ScrollReveal delay={600}>
                        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-50 via-white to-teal-50/30 rounded-2xl p-8 lg:p-12 shadow-2xl border border-gray-200">
                            <div className="text-center mb-10">
                                <div className="inline-block mb-4 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose UTS Marine for Engine Parts?</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {features.map((feature, index) => (
                                    <ScrollReveal key={index} delay={700 + (index * 100)}>
                                        <div className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                                    {feature.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                                                        {feature.title}
                                                    </h4>
                                                    <p className="text-gray-600 leading-relaxed">
                                                        {feature.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}
