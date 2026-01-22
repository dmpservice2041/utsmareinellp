"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function FreshWaterGeneratorsHeatExchangersPage() {
    const leadingBrands = [
        {
            name: 'Alfa Laval / Nirex',
            description: 'Industry-leading JWP, DPU, and JWSP series'
        },
        {
            name: 'Sasakura',
            description: 'Reliable AFGU and KM series desalination plants'
        },
        {
            name: 'Atlas & Rumia',
            description: 'Robust units for various vessel capacities'
        }
    ];

    const stockList = [
        {
            manufacturer: 'Alfa Laval',
            models: [
                'DPR-36-C 125, DPR-36A-125, JWP-36 (125/150/200)',
                'JWP-26 (C80/C100), JWSP-26, HWL series'
            ]
        },
        {
            manufacturer: 'Nirex',
            models: [
                'JWP-36-125, JWSP 36-150, JWSP 36A-36-200',
                'JWP-26C 80, 120DH42 series'
            ]
        },
        {
            manufacturer: 'Sasakura',
            models: [
                'AFGU-3, AFGU-4, AFGU-5, AFGU-6, AFGU-7',
                'AFGU-S-51, KM-30'
            ]
        },
        {
            manufacturer: 'Atlas',
            models: [
                'FWG AFGU through AFGU 7'
            ]
        },
        {
            manufacturer: 'Rumia',
            models: [
                'AW 12-5, SY250A-2'
            ]
        }
    ];

    const qualityCertification = [
        {
            title: 'NDT & Pressure Testing',
            description: 'All shells, plates, and gaskets are subjected to Non-Destructive Testing (NDT) and hydrostatic pressure trials to ensure leak-free operation',
            icon: '🔬'
        },
        {
            title: 'Technical Data Support',
            description: 'We provide full technical documentation and service history for reconditioned units',
            icon: '📋'
        },
        {
            title: 'Certification',
            description: 'Internal test certificates are standard. Upon request, we can facilitate inspections by IACS member classification societies (DNV, ABS, Lloyd\'s Register, BV) to ensure full vessel compliance',
            icon: '✓'
        }
    ];

    const advantages = [
        'Fresh Water Generators (FWG)',
        'Plate Heat Exchangers (PHE)',
        'New & reconditioned units',
        'Leading marine brands',
        'Rigorous validation process'
    ];

    const stats = [
        { number: '5', label: 'Manufacturers', icon: '🏭' },
        { number: '3', label: 'Leading Brands', icon: '⭐' },
        { number: '100%', label: 'Validated Units', icon: '✓' }
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
                                Fresh Water Generators & Heat Exchangers
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
                                Essential Marine Desalination Solutions
                            </p>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                                Fresh water is the most critical resource on board a vessel. At <strong className="text-white">UTS MARINE LLP</strong>, we specialize in the supply of high-efficiency <strong className="text-white">Fresh Water Generators (FWG) and Heat Exchangers</strong>. Whether you are looking for new installations or high-quality reconditioned units, we provide the technical expertise and inventory required to ensure a continuous supply of potable water at sea.
                            </p>
                            <div className="flex justify-center text-sm text-white/80 space-x-2 mt-8">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/ship-machinery" className="hover:text-white transition-colors">Ship Machinery</Link>
                                <span>/</span>
                                <span className="text-white">Fresh Water Generators & Heat Exchangers</span>
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
                                                src="/images/service/heat_ex.jpg"
                                                alt="Heat Exchanger"
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
                                            💧
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Advanced Desalination & Heat Transfer Technology</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                                Our equipment is specifically engineered for marine applications, including air conditioning, refrigeration, chillers, and heat pump systems. We provide comprehensive support from the industry's leading brands.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                Whether you need <strong className="text-teal-600">new installations or high-quality reconditioned units</strong>, our technical expertise ensures a continuous supply of potable water at sea.
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

                            {/* Leading Brands Section */}
                            <ScrollReveal delay={300}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Industry-Leading Brands</h3>
                                        <p className="text-gray-600">We provide access to comprehensive support from the industry's leading brands:</p>
                                    </div>
                                    <div className="space-y-6">
                                        {leadingBrands.map((brand, index) => (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                                        <span className="text-2xl text-white font-bold">{index + 1}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{brand.name}</h4>
                                                        <p className="text-gray-700">{brand.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Stock List Section */}
                            <ScrollReveal delay={400}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Extensive Stock List: Models & Series</h3>
                                        <p className="text-gray-600">We maintain a vast inventory of <strong className="text-teal-600">complete units and plate heat exchanger (PHE) components</strong> ready for immediate dispatch:</p>
                                    </div>
                                    <div className="space-y-6">
                                        {stockList.map((stock, index) => (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">{stock.manufacturer}</h4>
                                                <ul className="space-y-2">
                                                    {stock.models.map((model, modelIndex) => (
                                                        <li key={modelIndex} className="flex items-start gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-teal-600 mt-2 flex-shrink-0"></div>
                                                            <span className="text-gray-700">{model}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Quality Certification Section */}
                            <ScrollReveal delay={500}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Uncompromising Quality & Certification</h3>
                                        <p className="text-gray-600 mb-4">In the marine environment, equipment durability is non-negotiable. Every <strong className="text-teal-600">Fresh Water Generator and Heat Exchanger undergoes a rigorous validation process</strong>:</p>
                                    </div>
                                    <div className="space-y-6">
                                        {qualityCertification.map((item, index) => (
                                            <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                                                    {item.icon}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                                    <p className="text-gray-700">{item.description}</p>
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
                                Contact us with your Fresh Water Generator and Heat Exchanger requirements today. Our team will provide you with detailed information, pricing, and availability for high-efficiency marine desalination solutions from the industry's leading brands.
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
