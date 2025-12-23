"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function Services() {
    const services = [
        {
            title: 'Engine Parts',
            description: 'Two-Stroke and Four-Stroke engine parts',
            link: '/engine-parts',
            icon: (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: 'Ship Machinery',
            description: 'Complete range of ship machinery and equipment',
            link: '/ship-machinery',
            icon: (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" clipRule="evenodd" />
                </svg>
            )
        },
        {
            title: 'Quality Assurance',
            description: 'NDT testing and quality certification',
            link: '/services',
            icon: (
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            )
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-teal-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-50/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <ScrollReveal delay={0}>
                <div className="text-center mb-16">
                        <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full shadow-sm">
                            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Services</span>
                        </div>
                        <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Solutions tailored to your
                            <span className="block text-teal-600 mt-2">business needs</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                            Providing quality marine spare parts and exceptional service to clients worldwide
                        </p>
                </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
                    {services.map((service, index) => (
                        <ScrollReveal key={index} delay={index * 150}>
                            <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 overflow-hidden">
                                {/* Hover Effect Background */}
                                <div className="absolute inset-0 bg-gradient-to-br from-teal-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                
                                <div className="relative z-10">
                                    <div className="mb-6 flex justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                        <div className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl text-teal-600 shadow-md group-hover:shadow-xl transition-all duration-500">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center group-hover:text-teal-600 transition-colors duration-300">
                                        {service.title}
                                </h3>
                                    <p className="text-gray-600 text-center mb-6 leading-relaxed">
                                        {service.description}
                                    </p>
                                    <Link
                                        href={service.link}
                                        className="flex items-center justify-center gap-2 text-teal-600 font-semibold hover:text-teal-700 transition-all group-hover:gap-4 duration-300"
                                    >
                                        + View Details
                                        <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
