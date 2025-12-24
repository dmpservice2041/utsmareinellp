"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQ from '@/components/home/FAQ';

export default function ServicesPage() {
    const serviceFAQs = [
        {
            question: "What types of NDT testing do you provide?",
            answer: "We provide comprehensive Non-Destructive Testing services including Magnetic Particle Inspection (MPI), Ultrasonic Testing (UT), Hardness Testing (Brinell, Rockwell, Vickers), Hydraulic Pressure Testing, Calibration Services, Trueness Testing, and Leak Detection Testing. All tests are conducted by qualified Level II and Level III NDT engineers according to ASTM, ISO, and classification society standards."
        },
        {
            question: "Do you provide test certificates with your testing services?",
            answer: "Yes, we provide detailed test certificates with all our testing services. Each certificate includes test data, technician signatures, our quality stamp, and compliance with international standards. Test certificates are essential for IACS member classification society inspections and vessel documentation."
        },
        {
            question: "How long does NDT testing take?",
            answer: "Our in-house testing facility allows us to complete most NDT tests within 24-48 hours. This eliminates the need for external testing services and significantly reduces turnaround time. For urgent requirements, we offer expedited testing services. Contact us for specific timelines based on your testing needs."
        },
        {
            question: "Can you arrange IACS member classification society inspection?",
            answer: "Yes, we can arrange IACS (International Association of Classification Societies) member inspection upon request. This includes inspections from major classification societies like DNV, ABS, Lloyd's Register, BV, and others. We coordinate with classification society surveyors and ensure all documentation meets their requirements."
        },
        {
            question: "What quality certifications do you hold?",
            answer: "UTS Marine LLP is ISO 9001:2015 certified, demonstrating our commitment to quality management systems. We maintain rigorous quality control processes, material traceability, and comprehensive documentation. All our parts come with necessary certifications including material certificates (EN 10204 3.1/3.2) when required."
        },
        {
            question: "Do you offer warranty on your parts and services?",
            answer: "Yes, all parts come with manufacturer's warranty and our quality guarantee. We stand behind the quality of our products and services. Our warranty coverage includes defects in materials and workmanship. We also provide technical support for installation and troubleshooting."
        }
    ];

    const ndtServices = [
        {
            title: 'Magnetic Particle Inspection (MPI)',
            description: 'For detecting surface and near-surface discontinuities in ferromagnetic materials',
            icon: '🔍'
        },
        {
            title: 'Ultrasonic Testing (UT)',
            description: 'For internal flaw detection and thickness measurements',
            icon: '📡'
        },
        {
            title: 'Hardness Testing',
            description: 'Brinell, Rockwell, and Vickers hardness testing for material verification',
            icon: '⚖️'
        },
        {
            title: 'Hydraulic Pressure Testing',
            description: 'For valves, pumps, and hydraulic components',
            icon: '💧'
        },
        {
            title: 'Calibration Services',
            description: 'Precision calibration for instruments and equipment',
            icon: '🎯'
        },
        {
            title: 'Trueness Testing',
            description: 'Dimensional accuracy verification',
            icon: '📏'
        },
        {
            title: 'Leak Detection Testing',
            description: 'For valves, heat exchangers, and pressure vessels',
            icon: '🔬'
        }
    ];

    const additionalServices = [
        {
            title: 'Material Traceability',
            description: 'Complete documentation from manufacturer to delivery, including material certificates (EN 10204 3.1/3.2)',
            icon: '📋'
        },
        {
            title: 'Third-Party Inspection',
            description: 'IACS member classification society inspection can be arranged upon request',
            icon: '✅'
        },
        {
            title: 'Warranty Coverage',
            description: 'All parts come with manufacturer\'s warranty and our quality guarantee',
            icon: '🛡️'
        },
        {
            title: 'Technical Support',
            description: 'Pre-sales and post-sales technical assistance from our experienced engineers',
            icon: '🔧'
        }
    ];

    return (
        <main className="pt-24 sm:pt-28">
            {/* Banner Header */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1580910543623-1d9865672808?q=80&w=2070&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                </div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <ScrollReveal delay={0}>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">Services</h1>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">Services</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Quality Assurance Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <ScrollReveal delay={0}>
                            <div>
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Commitment</span>
                                </div>
                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    UTS Quality Assurance
                                </h2>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    At UTS Marine LLP, we believe that the correct path towards sustainable business growth is through continuous improvement in product quality and service excellence. We adhere to international quality standards at all levels of our operations, from procurement and storage to testing and delivery.
                                </p>
                                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                    Our dedicated team of quality auditors and certified engineers conduct stringent tests at every stage, ensuring that only the best quality products reach our customers. As an <strong className="text-teal-600">ISO 9001:2015 certified</strong> company, we maintain rigorous quality management systems that govern every aspect of our operations.
                                </p>
                                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                    Our vision is to be the leading marine ship spares supplier globally, setting the highest standards in the industry. We continuously enhance our service levels and maintain strict adherence to international maritime standards, ensuring compliance with <strong className="text-teal-600">IACS</strong> (International Association of Classification Societies) requirements.
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl p-8 lg:p-12 shadow-2xl border border-gray-100 h-full flex flex-col items-center justify-center">
                                    <div className="w-32 h-32 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                                        <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className="text-3xl font-bold text-gray-900 mb-3">ISO 9001:2015</h3>
                                    <p className="text-xl text-gray-600 text-center">Certified Quality Management System</p>
                                    <div className="mt-6 flex items-center gap-2 text-teal-600">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="font-semibold">Certified</span>
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* NDT Facility Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Facilities</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Comprehensive Non-Destructive Testing (NDT) Facility
                            </h2>
                            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                                We maintain a state-of-the-art testing facility with qualified Level II and Level III NDT engineers in our premises. This in-house capability eliminates the need for external testing services, significantly reducing turnaround time and ensuring faster delivery of parts to our clients.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                        {ndtServices.map((service, index) => (
                            <ScrollReveal key={index} delay={index * 100}>
                                <div className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-gray-600 leading-relaxed text-sm">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={700}>
                        <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600 max-w-4xl mx-auto">
                            <p className="text-gray-700 leading-relaxed">
                                <strong className="text-teal-600">All tests are conducted</strong> according to ASTM, ISO, and classification society standards. We provide detailed test certificates with each tested component, complete with test data, technician signatures, and our quality stamp.
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Additional Quality Services */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Additional Services</span>
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                                Additional Quality Services
                            </h2>
                            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                                Beyond NDT testing, we offer comprehensive quality assurance services to ensure complete customer satisfaction
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                        {additionalServices.map((service, index) => (
                            <ScrollReveal key={index} delay={index * 150}>
                                <div className="group bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border-2 border-gray-200 hover:border-teal-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            {service.icon}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 text-white flex items-center justify-center text-sm font-bold shadow-lg">
                                                    {index + 1}
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                                                    {service.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quality Process Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-teal-600 to-teal-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
                                Quality Assurance Process
                            </h2>
                            <p className="text-xl text-white/90 leading-relaxed mb-12">
                                Our quality assurance process includes comprehensive documentation, traceability of all parts from source to delivery, and detailed inspection reports. We work closely with ship owners, ship managers, and shipping companies worldwide to understand their specific requirements and deliver parts that meet or exceed OEM specifications.
                            </p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { title: 'Documentation', desc: 'Complete traceability' },
                                    { title: 'Inspection', desc: 'Detailed reports' },
                                    { title: 'Delivery', desc: 'OEM specifications' }
                                ].map((item, index) => (
                                    <ScrollReveal key={index} delay={index * 200}>
                                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                            <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                                            <p className="text-white/80">{item.desc}</p>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <ScrollReveal delay={0}>
                            <div className="text-center mb-16">
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Questions</span>
                                </div>
                                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                    Service-Related Questions
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed">
                                    Common questions about our quality assurance and testing services
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        <div className="space-y-6">
                            {serviceFAQs.map((faq, index) => (
                                <ScrollReveal key={index} delay={index * 100}>
                                    <details
                                        className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-teal-200"
                                    >
                                        <summary className="flex items-center justify-between cursor-pointer list-none">
                                            <h3 className="text-lg font-bold text-gray-900 pr-4 group-hover:text-teal-600 transition-colors">
                                                {faq.question}
                                            </h3>
                                            <span className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center transition-all duration-300 group-open:rotate-180 group-hover:bg-teal-700 group-hover:scale-110">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="mt-4 text-gray-700 leading-relaxed animate-fade-in">
                                            {faq.answer}
                                        </div>
                                    </details>
                                </ScrollReveal>
                            ))}
                        </div>
                        
                        <ScrollReveal delay={600}>
                            <div className="mt-12 text-center">
                                <p className="text-lg text-gray-700 mb-6">
                                    Need more information about our services?
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-semibold text-lg rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Contact Our Team
                                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>
        </main>
    );
}
