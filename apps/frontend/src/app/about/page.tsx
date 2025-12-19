"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQ from '@/components/home/FAQ';

export default function About() {
    const stockItems = [
        'MAIN & AUX. ENGINES',
        'GAS TURBINE ENGINES',
        'DIESEL GENERATOR',
        'MAIN & AUX. ENGINES SPARES',
        'TURBOCHARGES',
        'NAVIGATION & SAFETY EQUIPMENTS',
        'AIR / CHILLING COMPRESSORS',
        'HYDRAULIC PUMPS / MOTORS',
        'GOVERNORS',
        'DECK EQUIPMENTS',
        'LASHING MATERIAL',
    ];

    const values = [
        'Integrate a diverse range of ideas',
        'Deliver the highest quality outcomes',
        'Believe in power of implication'
    ];

    const stats = [
        { number: '9+', title: 'Our Mission', description: 'Years of excellence in marine spare parts supply and technical solutions' },
        { number: '50+', title: 'Our Vision', description: 'Countries served globally with quality products and exceptional service' },
        { number: '1000+', title: 'Our Awards', description: 'Products in stock ensuring fastest delivery worldwide' }
    ];

    const galleryImages = [
        'https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1970&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1549106765-3d312a9425e1?q=80&w=2076&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1580910543623-1d9865672808?q=80&w=2070&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1565492987258-45ec33918544?q=80&w=2670&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1574689049597-7e6fabd218d5?q=80&w=2669&auto=format&fit=crop',
    ];

    return (
        <main className="pt-24 sm:pt-28">
            {/* Banner Header */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1970&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                </div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <ScrollReveal delay={0}>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">About Us</h1>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">About Us</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Our Company Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal delay={0}>
                            <div className="relative">
                                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1558486012-817176f84c6d?q=80&w=1970&auto=format&fit=crop"
                                        alt="UTS Marine Engine"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                {/* Decorative element */}
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-600 rounded-full opacity-20 blur-2xl" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div>
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Company</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Redesigning business for solutions
                                </h2>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are well-known Exporter & Stockiest of Marine Ship Spare Parts (Genuine & OEM). Today we are an independent, modern and ISO 9001 certified company providing one-stop technical Solutions for Diesel engines.
                                </p>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    With our work experiences in the Ship Breaking Yard, Repair and Workshop Shipping Business for Diesel engines were the Decision to establish <strong className="text-gray-900">UTS MARINE LLP</strong>. Since more than 9 years in-depth Work Experience, Consistency and Flexibility are the center of attention of all our Services and Products.
                                </p>
                                
                                <ul className="space-y-4 mb-8">
                                    {values.map((value, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-1">
                                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-lg text-gray-700">{value}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    More About Us
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Scrolling Gallery */}
            <section className="py-12 bg-gray-50 overflow-hidden relative">
                <div className="flex gap-6 animate-scroll" style={{ width: 'max-content' }}>
                    {[...galleryImages, ...galleryImages].map((img, index) => (
                        <div key={index} className="flex-shrink-0 w-64 h-48 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <img src={img} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal delay={0}>
                            <div className="relative">
                                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1549106765-3d312a9425e1?q=80&w=2076&auto=format&fit=crop"
                                        alt="Why Choose Us"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div>
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Supporting Growth on a Global Scale
                                </h2>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    We provide dependable and tailored consulting services that help your business navigate challenges, seize opportunities, and achieve sustainable growth in the marine industry.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed">
                                    With our large stock we can deliver required spare parts in shortest possible time. Our mission is the excellence, both in the realization of our products and in the ability to supply our customers with a working system and a &quot;KNOW HOW&quot;, which have been a distinguishing sign and a mark of UTS MARINE all over the globe.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Stats Section - Mission, Vision, Awards */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                        {stats.map((stat, index) => (
                            <ScrollReveal key={index} delay={index * 150}>
                                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                    <div className="text-6xl lg:text-7xl font-bold text-white mb-4">{stat.number}</div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{stat.title}</h3>
                                    <p className="text-white/90 leading-relaxed">{stat.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Global Presence & Stock List */}
            <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    {/* Global Presence */}
                    <ScrollReveal delay={0}>
                        <div className="mb-20">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Global Reach</span>
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-6">UTS Global Presence</h3>
                            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl">
                                We also have a very strong global presence and have many international clients in the countries like Greece, Italy, Germany, Cyprus, Netherlands, USA, UK, Poland, Turkey, U.A.E, South Africa, Singapore, Bangladesh, Philippines, Indonesia, Sri Lanka & many more...
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Stock List */}
                    <ScrollReveal delay={200}>
                        <div>
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Inventory</span>
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-8">UTS Marine - Stock Includes</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {stockItems.map((item, index) => (
                                    <ScrollReveal key={index} delay={index * 50}>
                                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 transform hover:-translate-y-1">
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-600 flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-gray-700 font-medium text-lg">{item}</span>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Quality Assurance Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="max-w-6xl mx-auto">
                            {/* Quality Card */}
                            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl border border-gray-100 mb-12 hover:shadow-3xl transition-all duration-500">
                                <div className="flex items-start gap-6 mb-6">
                                    <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Quality Assurance & Certification</h3>
                                        <p className="text-lg text-gray-700 leading-relaxed">
                                            All spares procured in our stock are <strong className="text-teal-600">Genuine OEM</strong>. All of the spares are New (Un-Used), Reusable, Used and Reconditioned also. For the Used and Reusable spares, we carry out <strong className="text-teal-600">tests/crack detection</strong> prior to supply and make sure that our customer receives the best.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Expansion Scope Section */}
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-2xl border border-gray-100">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-1 h-12 bg-gradient-to-b from-teal-500 to-teal-600 rounded-full"></div>
                                    <div>
                                        <div className="inline-block mb-2 px-4 py-1 bg-teal-100 rounded-full">
                                            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Services</span>
                                        </div>
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900">Expansion in Scope of Work</h3>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    {[
                                        { 
                                            title: 'Steering gear assembly',
                                            icon: '⚙️',
                                            description: 'Complete steering gear systems and components'
                                        },
                                        { 
                                            title: 'Hull outfitting items',
                                            icon: '🚢',
                                            description: 'Bollards, windows, hatches, air vent valves, bull rings, drain plugs, flanges, loose tanks'
                                        },
                                        { 
                                            title: 'Anchor windlass',
                                            icon: '⚓',
                                            description: 'Anchor handling equipment and systems'
                                        },
                                        { 
                                            title: 'Cot nozzles',
                                            icon: '🔧',
                                            description: 'Specialized nozzle systems and components'
                                        },
                                        { 
                                            title: 'Starting air bottles',
                                            icon: '💨',
                                            description: 'Compressed air systems and storage solutions'
                                        }
                                    ].map((item, index) => (
                                        <ScrollReveal key={index} delay={index * 100}>
                                            <div className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                                        {item.icon}
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                                                                {index + 1}
                                                            </span>
                                                            <h4 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                                {item.title}
                                                            </h4>
                                                        </div>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    ))}
                                </div>

                                {/* IACS Certification Notice */}
                                <ScrollReveal delay={500}>
                                    <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-bold text-gray-900 mb-2">IACS Member Inspection</h4>
                                                <p className="text-gray-700 leading-relaxed">
                                                    All this new supply. And if any <strong className="text-teal-600">IACS MEMBER inspection</strong> required will be conducted from our end.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FAQ Section */}
            <FAQ />
        </main>
    );
}
