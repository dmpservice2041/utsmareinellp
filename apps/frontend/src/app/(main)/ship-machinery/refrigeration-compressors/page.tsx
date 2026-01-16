"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function RefrigerationCompressorsPage() {
    const compressorBrands = [
        {
            name: 'Carrier & Sabroe',
            description: 'Industry leaders in container and bulk cooling'
        },
        {
            name: 'Daikin & Mitsubishi',
            description: 'Precision-engineered Japanese technology'
        },
        {
            name: 'Bitzer & Bock',
            description: 'Robust German engineering for reliable refrigeration'
        },
        {
            name: 'York & Mycom',
            description: 'Specialized solutions for industrial-scale marine HVAC'
        },
        {
            name: 'Copeland',
            description: 'Reliable reciprocating and scroll technology'
        }
    ];

    const qualityAssurance = [
        {
            title: 'Rigorous Quality Testing',
            description: 'Performance trials under simulated load conditions',
            icon: '🔬'
        },
        {
            title: 'NDT Inspection',
            description: 'Comprehensive Non-Destructive Testing (NDT) to ensure structural and casting integrity',
            icon: '🔍'
        },
        {
            title: 'Certification',
            description: 'We provide internal test certificates for all units',
            icon: '📋'
        },
        {
            title: 'Class Inspection',
            description: 'Upon request, we can coordinate inspections by IACS member classification societies (such as DNV, ABS, LR, or BV) to provide third-party verification of quality',
            icon: '✓'
        }
    ];

    const whyChoose = [
        {
            title: 'Immediate Availability',
            description: 'Skip the long lead times of new factory orders with our "Ready Stock"',
            icon: '⚡'
        },
        {
            title: 'Sustainability',
            description: 'Reconditioned units offer a circular economy solution, reducing environmental impact without sacrificing performance',
            icon: '♻️'
        },
        {
            title: 'Technical Support',
            description: 'Our team ensures you receive the correct model and providing the necessary spares for seamless integration',
            icon: '🔧'
        }
    ];

    const advantages = [
        'Reconditioned & reusable units',
        'World\'s leading manufacturers',
        'Ready-to-ship stock',
        'Strict validation process',
        'Mission-critical cooling'
    ];

    const stats = [
        { number: '5', label: 'Global Brands', icon: '🏭' },
        { number: '4', label: 'Quality Assurance Steps', icon: '✓' },
        { number: '100%', label: 'Validated Units', icon: '🔬' }
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
                                Refrigeration Compressors
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/90 mb-6 leading-relaxed">
                                Certified Performance & Reliable Cooling
                            </p>
                            <p className="text-lg text-white/80 max-w-3xl mx-auto leading-relaxed">
                                We provide a comprehensive inventory of <strong className="text-white">Reconditioned and Reusable Refrigeration Compressors</strong> specifically engineered for the demanding environments of the marine and offshore industries. We understand that maintaining the cold chain and crew comfort is critical, which is why we specialize in high-availability, mission-critical cooling solutions.
                            </p>
                            <div className="flex justify-center text-sm text-white/80 space-x-2 mt-8">
                                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/ship-machinery" className="hover:text-white transition-colors">Ship Machinery</Link>
                                <span>/</span>
                                <span className="text-white">Refrigeration Compressors</span>
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
                                                {/* Refrigeration Icon */}
                                                <g transform="translate(600, 337.5)">
                                                    <rect x="-70" y="-90" width="140" height="180" rx="8" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.4" />
                                                    <path d="M-50 -70 L50 -70 M-50 -40 L50 -40 M-50 -10 L50 -10 M-50 20 L50 20 M-50 50 L50 50" stroke="currentColor" strokeWidth="2" opacity="0.3" />
                                                    <circle cx="0" cy="-60" r="8" fill="currentColor" opacity="0.3" />
                                                    <path d="M-30 -100 L-30 -120 M0 -100 L0 -120 M30 -100 L30 -120" stroke="currentColor" strokeWidth="3" opacity="0.4" />
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
                                            ❄️
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Mission-Critical Cooling Solutions</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed mb-4">
                                                We provide a comprehensive inventory of Reconditioned and Reusable Refrigeration Compressors specifically engineered for the demanding environments of the marine and offshore industries.
                                            </p>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                We understand that maintaining the cold chain and crew comfort is critical, which is why we specialize in <strong className="text-teal-600">high-availability, mission-critical cooling solutions</strong>.
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

                            {/* Global Brands Section */}
                            <ScrollReveal delay={300}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Unmatched Inventory of Global Brands</h3>
                                        <p className="text-gray-600">We maintain a ready-to-ship stock of compressors from the world's leading manufacturers, ensuring compatibility with your existing onboard systems:</p>
                                    </div>
                                    <div className="space-y-6">
                                        {compressorBrands.map((brand, index) => (
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

                            {/* Quality Assurance Section */}
                            <ScrollReveal delay={400}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 mb-12">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Quality Assurance & Technical Integrity</h3>
                                        <p className="text-gray-600">Reliability is our baseline. Every refrigeration compressor in our facility undergoes a <strong className="text-teal-600">strict validation process</strong> before it is cleared for dispatch:</p>
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

                            {/* Why Choose Section */}
                            <ScrollReveal delay={500}>
                                <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                    <div className="mb-8 pb-6 border-b border-gray-200">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Why Choose Our Reconditioned Compressors?</h3>
                                        <p className="text-gray-600">Performance, sustainability, and support you can count on</p>
                                    </div>
                                    <div className="space-y-6">
                                        {whyChoose.map((item, index) => (
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
                                Contact us with your refrigeration compressor requirements today. Our team will provide you with detailed information, pricing, and availability for certified reconditioned refrigeration compressors from world-leading manufacturers.
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
