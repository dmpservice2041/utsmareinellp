"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';
import FAQ from '@/components/home/FAQ';



export default function ServicesContent() {
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
            image: '/images/service/MPI.jpg'
        },
        {
            title: 'Ultrasonic Testing (UT)',
            description: 'For internal flaw detection and thickness measurements',
            image: '/images/service/UT.jpg'
        },
        {
            title: 'Hardness Testing',
            description: 'Brinell, Rockwell, and Vickers hardness testing for material verification',
            image: '/images/service/Hardness_Testing.jpg'
        },
        {
            title: 'Hydraulic Pressure Testing',
            description: 'For valves, pumps, and hydraulic components',
            image: '/images/service/LDT.jpg'
        },
        {
            title: 'Calibration Services',
            description: 'Precision calibration for instruments and equipment',
            image: '/images/service/Calibration_Services.jpg'
        },
        {
            title: 'Trueness Testing',
            description: 'Dimensional accuracy verification',
            image: '/images/service/Trueness_Testing.jpg'
        },
        {
            title: 'Leak Detection Testing',
            description: 'For valves, heat exchangers, and pressure vessels',
            image: '/images/service/Leak_Detection_Testing.jpg'
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
        <main>
            {/* Banner Header */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/images/service/service_back.webp')" }}
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
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-teal-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gray-50/50 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <ScrollReveal delay={0}>
                            <div>
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-100 rounded-full mb-8">
                                    <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                                    <span className="text-teal-700 text-sm font-semibold uppercase tracking-wider">Our Commitment</span>
                                </div>

                                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Uncompromising <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-teal-800">Quality Assurance</span>
                                </h2>

                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    At UTS Marine LLP, quality isn't just a checkbox—it's the foundation of everything we do. From rigorous material selection to final inspection, we adhere to the highest international standards to ensure reliability at sea.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                                    {[
                                        { title: 'ISO 9001:2015', desc: 'Certified Management System' },
                                        { title: 'IMPA Member', desc: 'Certified Supplier Member' },
                                        { title: 'IACS Compliant', desc: 'Meeting Class Requirements' },
                                        { title: 'Expert Team', desc: 'Level II & III Engineers' }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 group">
                                            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-100 group-hover:bg-teal-600 transition-colors duration-300 flex items-center justify-center text-teal-600 group-hover:text-white">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                                                <p className="text-xs text-gray-500">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal delay={200}>
                            <div className="relative">
                                {/* Abstract background shape */}
                                <div className="absolute inset-0 bg-teal-600/5 rounded-[2rem] rotate-3 scale-105" />

                                <div className="relative bg-white/60 backdrop-blur-xl rounded-[2rem] p-8 border border-white/50 shadow-2xl">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        {/* Certificates */}
                                        {[
                                            { src: '/images/service/ISO_CERTIFICATE.jpg', title: 'ISO 9001:2015', sub: 'Quality Management' },
                                            { src: '/images/service/IMPA_Certificate.jpg', title: 'IMPA Member', sub: 'Certified Supplier' }
                                        ].map((cert, idx) => (
                                            <div key={idx} className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100">
                                                <div className="aspect-[210/297] relative overflow-hidden bg-gray-50">
                                                    <img
                                                        src={cert.src}
                                                        alt={cert.title}
                                                        className="relative z-10 w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                    <div className="absolute inset-0 z-20 bg-gradient-to-t from-teal-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                                        <span className="px-4 py-2 bg-white/95 backdrop-blur text-teal-900 text-xs font-bold uppercase tracking-wider rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg">
                                                            Verified
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="p-4 text-center bg-white border-t border-gray-50 relative z-10">
                                                    <h3 className="font-bold text-gray-900 text-sm mb-0.5 group-hover:text-teal-600 transition-colors">{cert.title}</h3>
                                                    <p className="text-xs text-gray-500">{cert.sub}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* NDT Facility Section */}
            <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
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
                                We maintain a state-of-the-art testing facility with qualified Level II and Level III NDT engineers in our premises.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="space-y-24 mb-24">
                        {ndtServices.map((service, index) => (
                            <ScrollReveal key={index} delay={0}>
                                <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-20`}>
                                    {/* Image Side */}
                                    <div className="w-full lg:w-1/2">
                                        <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
                                            <div className="aspect-[4/3] overflow-hidden">
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-teal-900/10 group-hover:bg-transparent transition-colors duration-300" />

                                            {/* Watermark */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 group-hover:opacity-10 transition-opacity duration-300">
                                                <img
                                                    src="/logo.png"
                                                    alt="UTS Marine Watermark"
                                                    className="w-1/2 max-w-[200px] h-auto object-contain filter grayscale brightness-200"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full lg:w-1/2">
                                        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:items-start text-left' : 'lg:items-end lg:text-right text-left items-start'}`}>
                                            <div className="inline-block p-3 bg-teal-50 rounded-xl mb-6">
                                                <span className="text-3xl filter grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                                                    ✨
                                                </span>
                                            </div>
                                            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                                                {service.title}
                                            </h3>
                                            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-xl">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>

                    <ScrollReveal delay={700}>
                        <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-xl p-6 border-l-4 border-teal-600 w-full">
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
