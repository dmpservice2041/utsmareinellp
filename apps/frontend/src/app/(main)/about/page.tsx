"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQ from '@/components/home/FAQ';
import { countries } from '@/data/countries';

export default function About() {
    const targetClients = [
        'Ship Owners',
        'Industrial Power Plants',
        'Offshore Clients',
        'Ship Repairers'
    ];

    const missionValues = [
        { name: 'Excellence', description: 'Delivering the highest quality outcomes in every project' },
        { name: 'Consistency', description: 'Reliable service and products across all operations' },
        { name: 'Flexibility', description: 'Adapting to meet diverse client needs and requirements' },
        { name: 'Expertise', description: '10+ years of in-depth work experience in marine industry' }
    ];

    const stats = [
        { number: '10+', title: 'Years of Excellence', description: 'Years of excellence in marine spare parts supply and technical solutions' },
        { number: `${countries.length}+`, title: 'Countries Served', description: 'Countries served globally with quality products and exceptional service' },
        { number: '1000+', title: 'Products in Stock', description: 'Products in stock ensuring fastest delivery worldwide' }
    ];

    const ndtServices = [
        { name: 'Magnetic Particle Inspection (MPI)', icon: '🔍' },
        { name: 'Ultrasonic Testing (UT)', icon: '📡' },
        { name: 'Hardness Testing', icon: '⚙️' },
        { name: 'Hydraulic Pressure Testing', icon: '💧' },
        { name: 'Trueness Testing', icon: '📐' },
        { name: 'Leak Detection', icon: '🔬' }
    ];

    const qualityFeatures = [
        { title: 'Global Compliance', description: 'Meeting international standards and regulations' },
        { title: 'Expert Auditing', description: 'Qualified Level II and Level III NDT Engineers' },
        { title: 'Traceability Assurance', description: 'Complete documentation and test certificates' }
    ];

    const productCategories = [
        {
            title: 'Oil Purifiers',
            brands: ['Alfa Laval', 'Mitsubishi', 'Westfalia'],
            description: 'High-quality oil purification systems for marine applications',
            features: ['Marine engine lubrication', 'Fuel oil treatment', 'Hydraulic oil cleaning']
        },
        {
            title: 'Air Compressors',
            brands: ['Tanabe', 'Yanmar', 'Sperre', 'Atlas Copco', 'Ingersoll Rand'],
            description: 'Reliable air compression solutions with comprehensive spare parts availability',
            features: ['Starting air systems', 'Service air supply', 'Control air systems']
        },
        {
            title: 'Marine Turbochargers',
            brands: ['ABB', 'Mitsubishi', 'MAN B&W', 'KBB', 'IHI', 'Ningbo C.S.I'],
            description: 'Critical turbocharger spares and complete units for all major brands',
            features: ['Complete turbocharger units', 'Critical spares', 'Reconditioned units']
        },
        {
            title: 'Refrigeration Compressors',
            brands: ['Carrier', 'Sabroe', 'Daikin', 'York', 'Trane'],
            description: 'Marine refrigeration systems with quality assurance and certification',
            features: ['Container refrigeration', 'Cargo cooling systems', 'Air conditioning']
        },
        {
            title: 'Marine Pumps',
            brands: ['Japanese Brands', 'European Brands', 'Grundfos', 'KSB', 'Ebara'],
            description: 'Comprehensive range of marine pumps with strict quality control',
            features: ['Centrifugal pumps', 'Positive displacement pumps', 'Emergency pumps']
        },
        {
            title: 'Hydraulic Pumps & Motors',
            brands: ['Kawasaki', 'Nachi', 'Vickers', 'Rexroth', 'Parker', 'Denison'],
            description: 'Extensive range of hydraulic systems with technical specifications',
            features: ['Variable displacement pumps', 'Fixed displacement pumps', 'Hydraulic motors']
        },
        {
            title: 'Fresh Water Generators & Heat Exchangers',
            brands: ['Alfa Laval', 'Nirex', 'Sasakura', 'Atlas Danmark', 'Sartorius'],
            description: 'Fresh water generation systems and heat exchangers for marine use',
            features: ['Fresh water generators', 'Plate heat exchangers', 'Shell and tube exchangers']
        }
    ];

    const galleryImages = [
        '/ABout_us_1.jpg',
        '/ABout_us_2.jpg',
        '/ABout_us_3.jpg',
        '/ABout_us_4.jpg',
        '/ABout_us_5.jpg',
    ];



    return (
        <main className="pt-24 sm:pt-28">
            {/* Hero Banner Section */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/About_us_header.jpg')" }}
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

            {/* Who We Are Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal delay={0}>
                            <div className="relative">
                                <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/service/ABT_srq.jpg"
                                        alt="UTS Marine"
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-600 rounded-full opacity-20 blur-2xl" />
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div>
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Who We Are</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Leading Marine Spare Parts Supplier
                                </h2>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    We are well-known Exporter & Stockiest of Marine Ship Spare Parts (Genuine & OEM). Today we are an independent, modern and <strong className="text-teal-600">ISO 9001 certified</strong> company providing one-stop technical Solutions for Diesel engines.
                                </p>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    With our work experiences in the Ship Breaking Yard, Repair and Workshop Shipping Business for Diesel engines, the decision to establish <strong className="text-gray-900">UTS MARINE LLP</strong> was made. With more than <strong className="text-teal-600">10+ years</strong> of in-depth work experience, Consistency and Flexibility are the center of attention of all our Services and Products.
                                </p>

                                <div className="mb-6">
                                    <p className="text-lg font-semibold text-gray-900 mb-4">We are proud <strong className="text-teal-600">IMPA Member</strong> and serve:</p>
                                    <ul className="space-y-3">
                                        {targetClients.map((client, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center mt-1">
                                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <span className="text-lg text-gray-700">{client}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-teal-50 rounded-xl p-6 border-l-4 border-teal-600">
                                    <p className="text-gray-700 leading-relaxed">
                                        <strong className="text-teal-600">Warehouse & Workshop:</strong> Our state-of-the-art facilities enable us to maintain large inventory and provide comprehensive workshop services for testing and reconditioning.
                                    </p>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* The UTS Advantage Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Advantage</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                The UTS Advantage
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                                What sets us apart in the marine spare parts industry
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <ScrollReveal delay={0}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Large Warehouse</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Extensive inventory of genuine and OEM marine spare parts ensuring immediate availability for urgent requirements.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">In-House Workshop</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Complete workshop facilities for testing, reconditioning, and quality assurance of all spare parts before delivery.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={400}>
                            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">Fast Delivery</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    End-to-end service with fastest delivery times worldwide, minimizing vessel downtime and operational disruptions.
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Mission</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Excellence in Every Endeavor
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
                                Our mission is excellence, both in the realization of our products and in the ability to supply our customers with a working system and a &quot;KNOW HOW&quot;, which have been a distinguishing sign and a mark of UTS MARINE all over the globe.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {missionValues.map((value, index) => (
                            <ScrollReveal key={index} delay={index * 150}>
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-lg flex items-center justify-center mb-4">
                                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.name}</h3>
                                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Commitment Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Quality Commitment</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Quality Assurance & Certification
                                </h2>
                                <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                                    All spares procured in our stock are <strong className="text-teal-600">Genuine OEM</strong>. All of the spares are New (Un-Used), Reusable, Used and Reconditioned. For the Used and Reusable spares, we carry out <strong className="text-teal-600">tests/crack detection</strong> prior to supply.
                                </p>
                            </div>

                            {/* Certifications */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                                <ScrollReveal delay={0}>
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                                        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">ISO 9001:2015</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            Certified Quality Management System ensuring consistent quality standards across all operations.
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={200}>
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                                        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">IMPA Member</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            Active member of the International Marine Purchasing Association, ensuring industry best practices.
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal delay={400}>
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-all duration-300">
                                        <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">QMS Certified</h3>
                                        <p className="text-gray-700 leading-relaxed">
                                            Comprehensive Quality Management System with expert auditing and traceability assurance.
                                        </p>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Quality Features */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {qualityFeatures.map((feature, index) => (
                                    <ScrollReveal key={index} delay={index * 150}>
                                        <div className="bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-lg transition-all duration-300">
                                            <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                                            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* In-House NDT Facility Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">NDT Facility</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                In-House NDT Facility
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-4">
                                We have qualified <strong className="text-teal-600">Level II and Level III NDT Engineers</strong> for all kinds of Non-Destructive Testing. All testing is conducted in accordance with <strong className="text-teal-600">ASTM, ISO, and Classification Society</strong> standards.
                            </p>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Test Certificates are provided with each tested component, ensuring full traceability and compliance.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {ndtServices.map((service, index) => (
                            <ScrollReveal key={index} delay={index * 100}>
                                <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="text-4xl mb-4">{service.icon}</div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Product/Service Sections */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Products & Services</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                Comprehensive Product Range
                            </h2>
                            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                                We supply genuine and OEM marine spare parts for all major brands across multiple product categories
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="space-y-8 max-w-6xl mx-auto">
                        {productCategories.map((category, index) => (
                            <ScrollReveal key={index} delay={index * 100}>
                                <details className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                    <summary className="cursor-pointer list-none">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                                                    {category.title}
                                                </h3>
                                                <p className="text-gray-700 mb-4">{category.description}</p>
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {category.brands.slice(0, 5).map((brand, brandIndex) => (
                                                        <span key={brandIndex} className="px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-sm font-medium">
                                                            {brand}
                                                        </span>
                                                    ))}
                                                    {category.brands.length > 5 && (
                                                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                                                            +{category.brands.length - 5} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0 ml-4 w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center transition-all duration-300 group-open:rotate-180">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="mt-6 pt-6 border-t border-gray-200">
                                        <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features:</h4>
                                            <ul className="space-y-2">
                                                {category.features.map((feature, featureIndex) => (
                                                    <li key={featureIndex} className="flex items-start gap-3">
                                                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-teal-600 flex items-center justify-center mt-0.5">
                                                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </div>
                                                        <span className="text-gray-700">{feature}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {category.title === 'Hydraulic Pumps & Motors' && (
                                            <div className="mt-6 overflow-x-auto">
                                                <h4 className="text-lg font-semibold text-gray-900 mb-3">Technical Specifications:</h4>
                                                <div className="bg-gray-50 rounded-lg p-4">
                                                    <p className="text-gray-700">
                                                        Available in various displacement ranges, pressure ratings, and configurations.
                                                        Compatible with all major hydraulic systems including variable displacement,
                                                        fixed displacement, and servo-controlled systems.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </details>
                            </ScrollReveal>
                        ))}
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

            {/* Stats Section */}
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

            {/* Global Presence Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Global Reach</span>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">UTS Global Presence</h3>
                            <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-4">
                                We have a very strong global presence and serve many international clients across the world
                            </p>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Our network spans across <strong className="text-teal-600">{countries.length}+ countries</strong> and continues to grow
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 lg:gap-6 max-w-6xl mx-auto">
                        {countries.map((country, index) => (
                            <ScrollReveal key={index} delay={index * 50}>
                                <div className="group bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
                                    <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                        {country.flag}
                                    </div>
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                        {country.name}
                                    </h4>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={countries.length * 50 + 100}>
                        <div className="mt-12 text-center">
                            <div className="inline-flex items-center gap-2 px-6 py-3 bg-teal-50 rounded-full border border-teal-200">
                                <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-teal-700 font-semibold">And many more countries worldwide</span>
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

