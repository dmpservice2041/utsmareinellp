"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function HydraulicPumpsMotorsPage() {
    const brandCategories = [
        {
            category: 'Primary Makes',
            brands: ['Rexroth', 'Kawasaki Staffa', 'IHI', 'Mitsubishi', 'Hagglunds']
        },
        {
            category: 'Specialized Marine Brands',
            brands: ['Ulstein Norwinch', 'Fukushima', 'Brattvaag', 'Hatlapa', 'Kayaba']
        },
        {
            category: 'Industrial Standards',
            brands: ['Vickers', 'Parker', 'Denison', 'Nachi', 'Volvo', 'Sauer']
        }
    ];

    const technicalStock = [
        {
            brand: 'Kawasaki / Staffa',
            items: [
                'Motors: BZ Series (740 S1008, 725, 732), Staffa SX 510-110, SX 508 AM'
            ]
        },
        {
            brand: 'Fukushima',
            items: [
                'Motors: MA5, MA7, MA8B/C, MA10B/C, MGA8, DC 17',
                'Pumps: D14-18 to G-20, EG Series, G-318'
            ]
        },
        {
            brand: 'Norwinch',
            items: [
                'Motors: M 380, M 204, M 540, M 140',
                'Pumps: PH-8, PH-11'
            ]
        },
        {
            brand: 'IHI',
            items: [
                'Motors: 55S, HNK, HLA, KMV, HVL Series',
                'Pumps: HPS 4-8, HPD Series, 6S N 48-48'
            ]
        },
        {
            brand: 'Hydromatik / Rexroth',
            items: [
                'Motors: A2F Series (24 to 1000)',
                'Pumps: A2V Series (28 to 225)'
            ]
        },
        {
            brand: 'Kayaba / Nikko Sauer / Danfoss',
            items: [
                'Motors: MK 180DT/90DT, Nikko ThermoHex PTV 40 to PTV 330',
                'Motors: SMF 21, 23, 24',
                'Pumps: SPV/OPV 27, 23, 21, 24. Danfoss 50/100/150'
            ]
        }
    ];

    const qualityAssurance = [
        {
            title: 'Precision Testing',
            description: 'All pumps and motors are pressure-tested to ensure volumetric efficiency and torque conformance',
            icon: '🔬'
        },
        {
            title: 'NDT Inspection',
            description: 'Comprehensive Non-Destructive Testing on casings and shafts to ensure zero structural fatigue',
            icon: '🔍'
        }
    ];

    const advantages = [
        'Reconditioned & reusable units',
        'High-torque, high-pressure',
        'World-leading manufacturers',
        'Extensive stock availability',
        'Rigorous quality testing'
    ];

    const stats = [
        { number: '16', label: 'Global Brands', icon: '🏭' },
        { number: '6', label: 'Brand Categories', icon: '📦' },
        { number: '100%', label: 'Pressure Tested', icon: '✓' }
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
                                Hydraulic Pumps & Motors
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
                                Industry's Most Extensive Inventories
                            </p>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                                We house the industry's most extensive inventories of <strong className="text-white">Reconditioned and Reusable Hydraulic Pumps and Motors</strong>. Specializing in high-torque, high-pressure systems for deck machinery, winches, and steering gear, we provide a vital lifeline for vessels requiring rapid parts replacement without the long lead times of new manufacturing.
                            </p>
                            <div className="flex justify-center text-sm text-white/80 space-x-2 mt-8">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/ship-machinery" className="hover:text-white transition-colors">Ship Machinery</Link>
                                <span>/</span>
                                <span className="text-white">Hydraulic Pumps & Motors</span>
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
                                        <div className="w-full h-64 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-teal-600/20"></div>
                                            {/* SVG Placeholder */}
                                            <svg
                                                className="w-full h-full text-teal-600/30"
                                                fill="none"
                                                viewBox="0 0 1200 675"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect width="1200" height="675" fill="url(#gradient)" />
                                                <defs>
                                                    <linearGradient id="gradient" x1="0" y1="0" x2="1200" y2="675" gradientUnits="userSpaceOnUse">
                                                        <stop offset="0%" stopColor="#f0fdfa" />
                                                        <stop offset="100%" stopColor="#ccfbf1" />
                                                    </linearGradient>
                                                </defs>
                                                {/* Hydraulic Icon */}
                                                <g transform="translate(600, 337.5)">
                                                    <rect x="-60" y="-40" width="120" height="80" rx="6" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.4" />
                                                    <circle cx="0" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                                                    <path d="M-60 -20 L-90 -20 M60 -20 L90 -20 M-60 20 L-90 20 M60 20 L90 20" stroke="currentColor" strokeWidth="4" opacity="0.4" />
                                                    <path d="M-15 -10 L15 -10 L15 10 L-15 10 Z" fill="currentColor" opacity="0.3" />
                                                </g>
                                            </svg>
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
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">High-Torque, High-Pressure Systems</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                                We house the industry's most extensive inventories of Reconditioned and Reusable Hydraulic Pumps and Motors. Specializing in high-torque, high-pressure systems for deck machinery, winches, and steering gear, we provide a vital lifeline for vessels requiring rapid parts replacement.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                Our extensive stock ensures you can avoid <strong className="text-teal-600">the long lead times of new manufacturing</strong>, keeping your operations running smoothly.
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

                            {/* Brand Portfolio Section */}
                            <ScrollReveal delay={300}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Our Extensive Brand Portfolio</h3>
                                        <p className="text-gray-600">We are global specialists in sourcing and restoring hydraulic components from world-leading manufacturers:</p>
                                    </div>
                                    <div className="space-y-8">
                                        {brandCategories.map((category, index) => (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <h4 className="text-2xl font-bold text-gray-900 mb-4">{category.category}</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {category.brands.map((brand, brandIndex) => (
                                                        <span
                                                            key={brandIndex}
                                                            className="px-4 py-2 bg-gradient-to-br from-teal-50 to-white rounded-lg border-2 border-teal-200 text-teal-700 font-semibold text-sm hover:border-teal-500 transition-all"
                                                        >
                                                            {brand}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Technical Stock Section */}
                            <ScrollReveal delay={400}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Technical Stock List & Model Availability</h3>
                                        <p className="text-gray-600">We maintain ready stock for the following <strong className="text-teal-600">high-demand series and models</strong>:</p>
                                    </div>
                                    <div className="space-y-6">
                                        {technicalStock.map((stock, index) => (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <h4 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b border-gray-200">{stock.brand}</h4>
                                                <ul className="space-y-2">
                                                    {stock.items.map((item, itemIndex) => (
                                                        <li key={itemIndex} className="flex items-start gap-3">
                                                            <div className="w-2 h-2 rounded-full bg-teal-600 mt-2 flex-shrink-0"></div>
                                                            <span className="text-gray-700">{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Quality Assurance Section */}
                            <ScrollReveal delay={500}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Rigorous Testing & Quality Assurance</h3>
                                        <p className="text-gray-600 mb-4">Hydraulic systems operate under extreme pressure; therefore, <strong className="text-teal-600">reliability is our primary focus</strong>. Every unit undergoes strict technical evaluation before delivery:</p>
                                    </div>
                                    <div className="space-y-6">
                                        {qualityAssurance.map((item, index) => (
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
                                Contact us with your hydraulic pumps and motors requirements today. Our team will provide you with detailed information, pricing, and availability for reconditioned hydraulic components from world-leading manufacturers, backed by rigorous testing and quality assurance.
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
