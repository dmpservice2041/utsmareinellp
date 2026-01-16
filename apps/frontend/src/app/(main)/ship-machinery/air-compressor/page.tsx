"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function AirCompressorPage() {
    const compressorBrands = [
        'Tanabe',
        'Yanmar',
        'Sperre',
        'Hatlapa',
        'Hamworthy',
        'J.P. Sauer & Sohn',
        'Atlas Copco'
    ];

    const spareParts = [
        {
            title: 'Valves & Gaskets',
            description: 'Suction and delivery valves, copper gaskets, and O-ring kits',
            icon: '🔩'
        },
        {
            title: 'Pistons & Rings',
            description: 'High-precision piston assemblies and compression rings',
            icon: '⚙️'
        },
        {
            title: 'Crankshafts & Bearings',
            description: 'Main bearings, big-end bearings, and connecting rods',
            icon: '🔧'
        },
        {
            title: 'Coolers & Components',
            description: 'Air intake filters, oil filters, and intercooler/aftercooler elements',
            icon: '❄️'
        }
    ];

    const whyChooseUs = [
        {
            title: 'Fully Tested Units',
            description: 'We don\'t just sell equipment; we sell reliability. Every reconditioned compressor is load-tested and certified by our technical team',
            icon: '✓'
        },
        {
            title: 'Immediate Availability',
            description: 'Our "Ready Stock" status means we can bypass the long lead times of new factory orders',
            icon: '⚡'
        },
        {
            title: 'Technical Expertise',
            description: 'Our engineers can help you identify the exact model or part number required for your specific vessel or plant',
            icon: '🔬'
        },
        {
            title: 'Global Logistics',
            description: 'We handle the complexities of international shipping to ensure your equipment reaches you at any major port or industrial hub',
            icon: '🌍'
        }
    ];

    const advantages = [
        'New, Reconditioned & Reusable units',
        'Rigorous multi-point testing',
        'Rapid global delivery',
        'Most reliable industry brands',
        'Complete units & spare parts'
    ];

    const stats = [
        { number: '7', label: 'Leading Brands', icon: '🏭' },
        { number: '4', label: 'Spare Parts Categories', icon: '🔧' },
        { number: '100%', label: 'Load Tested', icon: '✓' }
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
                                Air Compressor
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
                                High-Performance. Rigorously Tested. Globally Available.
                            </p>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                                We are a leading global supplier of high-performance air compression solutions. Our extensive inventory features a wide range of <strong className="text-white">New, Reconditioned, and Reusable Air Compressors</strong>, specifically curated for marine, offshore, and industrial applications.
                            </p>
                            <div className="flex justify-center text-sm text-white/80 space-x-2 mt-8">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/ship-machinery" className="hover:text-white transition-colors">Ship Machinery</Link>
                                <span>/</span>
                                <span className="text-white">Air Compressor</span>
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
                                                {/* Compressor Icon */}
                                                <g transform="translate(600, 337.5)">
                                                    <rect x="-80" y="-60" width="160" height="120" rx="10" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.4" />
                                                    <circle cx="-40" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                                                    <circle cx="40" cy="0" r="25" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.3" />
                                                    <path d="M-20 -60 L-20 -100 M20 -60 L20 -100" stroke="currentColor" strokeWidth="3" opacity="0.4" />
                                                    <path d="M-30 -100 L30 -100" stroke="currentColor" strokeWidth="4" opacity="0.4" />
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
                                            💨
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">High-Performance Air Compression Solutions</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                                We are a leading global supplier of high-performance air compression solutions. Our extensive inventory features a wide range of New, Reconditioned, and Reusable Air Compressors, specifically curated for marine, offshore, and industrial applications.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                Every unit in our stock undergoes a <strong className="text-teal-600">rigorous multi-point testing process</strong> to ensure it meets original manufacturer specifications. Whether you require a replacement unit for an emergency breakdown or are looking for a cost-effective reconditioned unit, we offer <strong className="text-teal-600">rapid global delivery</strong> to keep your operations running without interruption.
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
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Leading Brands</h3>
                                        <p className="text-gray-600">We stock a most reliable names in the industry. Our ready-to-ship stock includes models from:</p>
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {compressorBrands.map((brand, index) => (
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

                            {/* Spare Parts Section */}
                            <ScrollReveal delay={400}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Comprehensive Air Compressor Spare Parts</h3>
                                        <p className="text-gray-600">Minimizing downtime is our priority. In addition to complete units, we maintain a <strong className="text-teal-600">massive ready-stock of genuine and high-quality OEM spare parts</strong>.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {spareParts.map((part, index) => (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <div className="flex items-start gap-4">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                                                        {part.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="text-xl font-bold text-gray-900 mb-2">{part.title}</h4>
                                                        <p className="text-gray-700 text-sm">{part.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </ScrollReveal>

                            {/* Why Choose Us Section */}
                            <ScrollReveal delay={500}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Why Source Your Compressors From Us?</h3>
                                        <p className="text-gray-600">Reliability, availability, and expertise you can count on</p>
                                    </div>
                                    <div className="space-y-6">
                                        {whyChooseUs.map((item, index) => (
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
                                Contact us with your air compressor requirements today. Our team will provide you with detailed information, pricing, and availability for premium air compressors including complete units and comprehensive spare parts.
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
