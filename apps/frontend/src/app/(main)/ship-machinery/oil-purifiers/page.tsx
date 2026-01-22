"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function OilPurifiersPage() {
    const purifierBrands = [
        'Alfa Laval',
        'Mitsubishi',
        'Westfalia'
    ];

    const applications = [
        {
            title: 'Marine Vessels',
            description: 'Solutions tailored for marine vessels requiring reliable fluid purity',
            icon: '🚢'
        },
        {
            title: 'Power Plants',
            description: 'Critical oil purification systems for power generation facilities',
            icon: '⚡'
        },
        {
            title: 'Industrial Manufacturing',
            description: 'Industrial manufacturing operations requiring clean lubricants',
            icon: '🏭'
        }
    ];

    const inventory = [
        {
            type: 'Lubricating Oil (LO)',
            description: 'High-quality purifiers ensuring optimal lubrication system performance'
        },
        {
            type: 'Fuel Oil (FO)',
            description: 'Reliable purification for clean, efficient fuel combustion'
        }
    ];

    const advantages = [
        'Industry-standard models from leading brands',
        '"Good-as-new" condition guarantee',
        'Complete units to spare parts',
        'Rigorously inspected units',
        'Cost-effective alternatives'
    ];

    const stats = [
        { number: '3', label: 'Leading Brands', icon: '🏭' },
        { number: '2', label: 'Application Types', icon: '🔧' },
        { number: '100%', label: 'Quality Inspected', icon: '✓' }
    ];

    return (
        <main className="pt-24 sm:pt-28">
            {/* Hero Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <ScrollReveal delay={0}>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
                                Oil Purifiers
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
                                Quality. Reliability. Cost-Effective.
                            </p>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                                We specialize in the supply of high-quality, pre-owned <strong className="text-white">Oil Purifiers</strong> for both <strong className="text-white">Lubricating Oil (LO)</strong> and <strong className="text-white">Fuel Oil (FO)</strong> applications. Recognizing the critical role of fluid purity in engine performance and machinery longevity, we provide rigorously inspected units that offer a cost-effective alternative to new equipment without compromising on operational integrity.
                            </p>
                            <div className="flex justify-center text-sm text-white/80 space-x-2 mt-8">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/ship-machinery" className="hover:text-white transition-colors">Ship Machinery</Link>
                                <span>/</span>
                                <span className="text-white">Oil Purifiers</span>
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

            {/* Main Content Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Sidebar */}
                        <ScrollReveal delay={0}>
                            <div className="lg:col-span-1">
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-xl border border-gray-200 sticky top-28">
                                    <div className="mb-6">
                                        <div className="w-full h-64 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl overflow-hidden relative">
                                            <img
                                                src="/images/service/OIL_P.jpg"
                                                alt="Oil Purifier"
                                                className="w-full h-full object-cover rounded-xl"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-teal-600/20"></div>
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
                                            🔧
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">High-Quality Oil Purifiers</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                                We specialize in the supply of high-quality, pre-owned Oil Purifiers for both Lubricating Oil (LO) and Fuel Oil (FO) applications. Recognizing the critical role of fluid purity in engine performance and machinery longevity, we provide rigorously inspected units that offer a cost-effective alternative to new equipment without compromising on operational integrity.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                Every unit in our inventory is selected for its <strong className="text-teal-600">"good-as-new"</strong> condition, ensuring your operations remain seamless and efficient.
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

                            {/* Core Inventory Section */}
                            <ScrollReveal delay={300}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Our Core Inventory Includes:</h3>
                                        <p className="text-gray-600">Comprehensive range of oil purification solutions</p>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl">🏭</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">Leading Brands:</h4>
                                                    <p className="text-gray-700 leading-relaxed mb-4">
                                                        We stock a comprehensive range of industry-standard models from:
                                                    </p>
                                                    <div className="flex flex-wrap gap-3">
                                                        {purifierBrands.map((brand, index) => (
                                                            <span
                                                                key={index}
                                                                className="px-4 py-2 bg-gradient-to-br from-teal-50 to-white rounded-lg border-2 border-teal-200 text-teal-700 font-semibold text-sm hover:border-teal-500 transition-all"
                                                            >
                                                                {brand}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl">🔧</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">Versatile Applications:</h4>
                                                    <p className="text-gray-700 leading-relaxed mb-3">
                                                        Solutions tailored for:
                                                    </p>
                                                    <ul className="space-y-2">
                                                        <li className="flex items-center gap-2 text-gray-700">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0"></div>
                                                            <span>Marine vessels</span>
                                                        </li>
                                                        <li className="flex items-center gap-2 text-gray-700">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0"></div>
                                                            <span>Power plants</span>
                                                        </li>
                                                        <li className="flex items-center gap-2 text-gray-700">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0"></div>
                                                            <span>Industrial manufacturing</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                                    <span className="text-2xl">✓</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-3">Full-Spectrum Support:</h4>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        From complete, ready-to-install purifier units to a vast inventory of genuine spare parts.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Applications Section */}
                            <ScrollReveal delay={400}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Application Types</h3>
                                        <p className="text-gray-600">Purification solutions for all your needs</p>
                                    </div>
                                    <div className="space-y-6">
                                        {inventory.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                                                    💧
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.type}</h4>
                                                    <p className="text-gray-700">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Industries Section */}
                            <ScrollReveal delay={500}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Industries We Serve</h3>
                                        <p className="text-gray-600">Trusted purification solutions across multiple sectors</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {applications.map((app, index) => (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300 text-center">
                                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-3xl shadow-lg mx-auto mb-4">
                                                    {app.icon}
                                                </div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-2">{app.title}</h4>
                                                <p className="text-sm text-gray-600">{app.description}</p>
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
                                Contact us with your oil purifier requirements today. Our team will provide you with detailed information, pricing, and availability for premium used oil purifiers including complete units and spare parts.
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
