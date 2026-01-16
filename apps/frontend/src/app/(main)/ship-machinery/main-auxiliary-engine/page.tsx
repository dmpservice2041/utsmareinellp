"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function MainAuxiliaryEnginePage() {
    const engineBrands = [
        'MAK',
        'Wärtsilä',
        'MAN B&W',
        'Sulzer',
        'Yanmar',
        'Daihatsu',
        'Mitsubishi',
        'Pielstick',
        'Niigata',
        'Bergen',
        'Himsen',
        'Deutz',
        'Caterpillar',
        'MWM',
        'SKL',
        'Stork',
        'Mirrlees'
    ];

    const applications = [
        {
            title: 'Marine Vessels',
            items: ['Cargo ships', 'Tankers', 'Bulk carriers', 'Offshore vessels'],
            icon: '🚢'
        },
        {
            title: 'Land-Based Power Generation',
            items: ['Power plants', 'Generator sets'],
            icon: '⚡'
        },
        {
            title: 'Industrial & Manufacturing Facilities',
            items: ['Manufacturing plants', 'Industrial facilities'],
            icon: '🏭'
        }
    ];

    const advantages = [
        'Complete engines in excellent working condition',
        'Competitive pricing',
        'Global shipping',
        'Technical expertise',
        'Fast turnaround'
    ];

    const stats = [
        { number: '17', label: 'Engine Brands', icon: '🏭' },
        { number: '100+', label: 'Engine Models', icon: '⚙️' },
        { number: '3', label: 'Application Types', icon: '🔧' }
    ];

    return (
        <main>
            {/* Hero Section - With Banner Image */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/engine-hero.jpg"
                        alt="Marine Engine"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <ScrollReveal delay={0}>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                                Main/Auxiliary Engine
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
                                Marine Engines – Quality. Reliability. Value.
                            </p>
                            <div className="flex justify-center text-sm text-white/80 space-x-2 mt-8">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/ship-machinery" className="hover:text-white transition-colors">Ship Machinery</Link>
                                <span>/</span>
                                <span className="text-white">Main/Auxiliary Engine</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <ScrollReveal key={index} delay={index * 150}>
                                <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                    <div className="text-4xl mb-3">{stat.icon}</div>
                                    <div className="text-5xl lg:text-6xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-white/90 font-semibold">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Sidebar */}
                        <ScrollReveal delay={0}>
                            <div className="lg:col-span-1">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-200 sticky top-28">
                                    <div className="mb-6">
                                        <div className="w-full h-64 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl overflow-hidden relative shadow-lg">
                                            <img
                                                src="/engine-sidebar.jpg"
                                                alt="Main/Auxiliary Engine"
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Advantage</h3>
                                    <ul className="space-y-3 mb-6">
                                        {advantages.map((advantage, index) => (
                                            <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                                                <span className="text-sm text-gray-700 font-medium">{advantage}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-6 border-t border-gray-300">
                                        <p className="text-sm text-gray-600 mb-3">Looking for engine parts?</p>
                                        <Link href="/engine-parts" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors">
                                            View Engine Parts
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <ScrollReveal delay={200}>
                                <div className="bg-gradient-to-br from-teal-50 via-white to-teal-50/30 rounded-2xl p-8 lg:p-10 mb-12 shadow-xl border border-gray-200">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-3xl shadow-lg">
                                            ⚙️
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Main/Auxiliary Marine Diesel Engines</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                UTSMARINE LLP supplies premium used marine main and auxiliary engines to shipowners, power plants, and industrial facilities worldwide. Every engine is thoroughly inspected, complete, and ready for installation. We maintain an extensive inventory of used marine diesel engines from <strong className="text-teal-600">industry-leading manufacturers</strong>.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/contact" className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                                            Request a Quote
                                        </Link>
                                        <Link href="/services" className="px-6 py-3 bg-white border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all">
                                            Our Services
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Engine Brands Section */}
                            <ScrollReveal delay={300}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Our Engine Portfolio</h3>
                                        <p className="text-gray-600">We maintain an extensive inventory of used marine diesel engines from industry-leading manufacturers</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {engineBrands.map((brand, index) => (
                                            <div
                                                key={index}
                                                className="group relative bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl text-center text-sm font-semibold text-gray-700 border-2 border-gray-200 hover:border-teal-500 hover:bg-gradient-to-br hover:from-teal-50 hover:to-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                            >
                                                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                {brand}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Applications Section */}
                            <ScrollReveal delay={400}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Applications</h3>
                                        <p className="text-gray-600">Where our engines power success across various industries</p>
                                    </div>
                                    <div className="space-y-6">
                                        {applications.map((app, index) => (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                                                    {app.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">{app.title}</h4>
                                                    <ul className="space-y-2">
                                                        {app.items.map((item, itemIndex) => (
                                                            <li key={itemIndex} className="flex items-center gap-2 text-gray-700">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0"></div>
                                                                <span>{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
                <div className="container mx-auto px-4">
                    <ScrollReveal delay={0}>
                        <div className="max-w-4xl mx-auto text-center bg-white rounded-2xl p-8 lg:p-12 shadow-2xl border border-gray-200">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                Request a Quote
                            </h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                Contact us with your engine requirements today. Our team will provide you with detailed information, pricing, and availability for premium used marine main and auxiliary engines.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link
                                    href="/contact"
                                    className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Contact Us Today
                                </Link>
                                <Link
                                    href="/services"
                                    className="px-8 py-4 bg-white border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all"
                                >
                                    Learn About Our Services
                                </Link>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </main>
    );
}

