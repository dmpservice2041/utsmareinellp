"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function MarinePumpsPage() {
    const brandPortfolio = [
        {
            category: 'Japanese Brands',
            brands: ['Taiko', 'Shinko', 'Naniwa', 'Teitoku', 'Heishin']
        },
        {
            category: 'European Brands',
            brands: ['Desmi', 'Hamworthy', 'Iron', 'Allweiler', 'Thune Eureka', 'Kvaerner']
        }
    ];

    const qualityControl = [
        {
            title: 'NDT Inspection',
            description: 'Non-Destructive Testing of pump casings and shafts to detect any structural fatigue',
            icon: '🔬'
        },
        {
            title: 'Performance Testing',
            description: 'Hydrostatic and flow testing to verify pressure parameters and leak-free operation',
            icon: '⚙️'
        },
        {
            title: 'Internal Test Certification',
            description: 'All units are supplied with our standard test certificates',
            icon: '📋'
        },
        {
            title: 'IACS Classification',
            description: 'We can coordinate third-party inspections and certifications by IACS members (DNV, ABS, LR, BV) upon client request',
            icon: '✓'
        }
    ];

    const pumpTypes = [
        'Main Cooling Water Pump',
        'Fire & General Service Pump',
        'Ballast Pump',
        'Fuel Oil Transfer Pump'
    ];

    const strategicSupport = [
        {
            title: 'Rapid Delivery',
            description: 'Our "Ready Stock" status allows for immediate dispatch to major global ports',
            icon: '⚡'
        },
        {
            title: 'Spares Availability',
            description: 'We also supply critical spares including mechanical seals, impellers, and wear rings for all supported brands',
            icon: '🔧'
        }
    ];

    const advantages = [
        'Reconditioned & reusable pumps',
        'Japanese & European brands',
        'Ready-to-ship inventory',
        'Peak hydraulic performance',
        'Rigorous quality testing'
    ];

    const stats = [
        { number: '11', label: 'Global Brands', icon: '🏭' },
        { number: '4', label: 'Quality Control Steps', icon: '✓' },
        { number: '4', label: 'Pump Types', icon: '💧' }
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
                                Marine Pumps
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
                                Certified Reconditioned & Ready-to-Ship
                            </p>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                                In the marine and industrial sectors, fluid handling is critical to operational success. <strong className="text-white">UTS MARINE LLP</strong> offers an extensive inventory of <strong className="text-white">Reconditioned and Reusable Marine Pumps</strong>, providing a reliable and cost-effective alternative to new equipment. From centrifugal and gear pumps to screw and piston models, our units are sourced and restored to ensure peak hydraulic performance.
                            </p>
                            <div className="flex justify-center text-sm text-white/80 space-x-2 mt-8">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/ship-machinery" className="hover:text-white transition-colors">Ship Machinery</Link>
                                <span>/</span>
                                <span className="text-white">Marine Pumps</span>
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
                                                {/* Pump Icon */}
                                                <g transform="translate(600, 337.5)">
                                                    <circle cx="0" cy="0" r="70" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.4" />
                                                    <rect x="-30" y="-15" width="60" height="30" rx="4" fill="currentColor" opacity="0.3" />
                                                    <path d="M-70 0 L-100 0 M70 0 L100 0" stroke="currentColor" strokeWidth="6" opacity="0.4" />
                                                    <circle cx="-85" cy="0" r="5" fill="currentColor" opacity="0.4" />
                                                    <circle cx="85" cy="0" r="5" fill="currentColor" opacity="0.4" />
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
                                            💧
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Peak Hydraulic Performance</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                                In the marine and industrial sectors, fluid handling is critical to operational success. UTS MARINE LLP offers an extensive inventory of Reconditioned and Reusable Marine Pumps, providing a reliable and cost-effective alternative to new equipment.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                From centrifugal and gear pumps to screw and piston models, our units are <strong className="text-teal-600">sourced and restored to ensure peak hydraulic performance</strong>.
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
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Our Brand Portfolio</h3>
                                        <p className="text-gray-600">We maintain a comprehensive stock of the industry's most respected Japanese and European pump manufacturers:</p>
                                    </div>
                                    <div className="space-y-8">
                                        {brandPortfolio.map((portfolio, index) => (
                                            <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                                <h4 className="text-2xl font-bold text-gray-900 mb-4">{portfolio.category}</h4>
                                                <div className="flex flex-wrap gap-3">
                                                    {portfolio.brands.map((brand, brandIndex) => (
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

                            {/* Quality Control Section */}
                            <ScrollReveal delay={400}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Rigorous Quality Control & Testing</h3>
                                        <p className="text-gray-600">Every pump that leaves our facility is backed by a <strong className="text-teal-600">stringent quality assurance protocol</strong>. We ensure that our equipment can withstand the harsh conditions of engine rooms and pump rooms:</p>
                                    </div>
                                    <div className="space-y-6">
                                        {qualityControl.map((item, index) => (
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

                            {/* Strategic Support Section */}
                            <ScrollReveal delay={500}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Strategic Support for All Applications</h3>
                                        <p className="text-gray-600 mb-4">Whether you are looking for a <strong className="text-teal-600">Main Cooling Water Pump, Fire & General Service Pump, Ballast Pump, or Fuel Oil Transfer Pump</strong>, our technical team is ready to assist.</p>
                                        <div className="flex flex-wrap gap-3 mb-6">
                                            {pumpTypes.map((type, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-gradient-to-br from-teal-50 to-white rounded-lg border-2 border-teal-200 text-gray-700 font-semibold text-sm"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-6">
                                        {strategicSupport.map((item, index) => (
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
                                Contact us with your marine pump requirements today. Our team will provide you with detailed information, pricing, and availability for certified reconditioned marine pumps from the world's leading manufacturers, complete with critical spare parts.
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
