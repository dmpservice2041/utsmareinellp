"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function ShipMachineryPage() {
    const features = [
        {
            title: 'Complete Engines',
            description: 'Thoroughly inspected and ready for installation',
            icon: '✓'
        },
        {
            title: 'Global Shipping',
            description: 'Worldwide delivery to shipowners and facilities',
            icon: '🌍'
        },
        {
            title: 'Technical Expertise',
            description: 'Expert support for all engine requirements',
            icon: '🔧'
        },
        {
            title: 'Competitive Pricing',
            description: 'Best value for premium used marine engines',
            icon: '💰'
        }
    ];

    return (
        <main className="pt-24 sm:pt-28">
            {/* Banner Header */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/Ship_machinery_1.jpg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                </div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <ScrollReveal delay={0}>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">Ship Machinery</h1>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">Ship Machinery</span>
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
                                Marine Ship Machinery
                            </h2>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                UTSMARINE LLP supplies premium used marine main and auxiliary engines to shipowners, power plants, and industrial facilities worldwide. Every engine is thoroughly inspected, complete, and ready for installation.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto mb-20">
                        <ScrollReveal delay={200}>
                            <Link href="/ship-machinery/main-auxiliary-engine" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Main/Auxiliary Engine
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        Premium used marine main and auxiliary engines from industry-leading manufacturers. Complete engines in excellent working condition, ready for installation.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Main/Auxiliary Engines
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <Link href="/ship-machinery/oil-purifiers" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.586V5L7 4z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Oil Purifiers
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        High-quality, pre-owned oil purifiers for lubricating oil and fuel oil applications. Industry-standard models in "good-as-new" condition.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Oil Purifiers
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={600}>
                            <Link href="/ship-machinery/air-compressor" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Air Compressor
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        High-performance air compression solutions. New, reconditioned, and reusable units from leading brands, rigorously tested and ready to ship.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Air Compressors
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={800}>
                            <Link href="/ship-machinery/marine-turbochargers" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Marine Turbochargers
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        Reconditioned and reusable turbochargers with precision spare parts. Rigorously inspected to meet strict operational standards.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Marine Turbochargers
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={1000}>
                            <Link href="/ship-machinery/refrigeration-compressors" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v6m0 0a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Refrigeration Compressors
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        Certified reconditioned refrigeration compressors for marine and offshore. Mission-critical cooling solutions with strict quality validation.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Refrigeration Compressors
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={1200}>
                            <Link href="/ship-machinery/marine-pumps" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Marine Pumps
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        Certified reconditioned marine pumps from leading Japanese and European brands. Peak hydraulic performance with rigorous quality control.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Marine Pumps
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={1400}>
                            <Link href="/ship-machinery/hydraulic-pumps-motors" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Hydraulic Pumps & Motors
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        Extensive inventory of reconditioned hydraulic components. High-torque, high-pressure systems for deck machinery, winches, and steering gear.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View Hydraulic Pumps & Motors
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </ScrollReveal>

                        <ScrollReveal delay={1600}>
                            <Link href="/ship-machinery/fresh-water-generators-heat-exchangers" className="group block">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-xl hover:shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-500 transform hover:-translate-y-3 h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="p-8 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-xl">
                                            <svg className="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors">
                                        Fresh Water Generators & Heat Exchangers
                                    </h3>
                                    <p className="text-lg text-gray-700 mb-6 text-center leading-relaxed">
                                        High-efficiency desalination systems from industry leaders. Complete FWG units and plate heat exchanger components for marine applications.
                                    </p>
                                    <div className="flex items-center justify-center gap-2 text-teal-600 font-semibold group-hover:gap-4 transition-all">
                                        View FWG & Heat Exchangers
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
                                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Why Choose UTS Marine for Ship Machinery?</h3>
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

