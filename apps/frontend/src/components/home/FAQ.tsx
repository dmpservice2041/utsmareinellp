"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function FAQ() {
    const faqs = [
        {
            question: "What types of marine parts do you supply?",
            answer: "UTS Marine LLP supplies genuine and OEM marine spare parts including two-stroke and four-stroke engine parts, ship machinery, auxiliary engine components, turbochargers, navigation equipment, hydraulic pumps, governors, deck equipment, and lashing materials for all major brands like MAN B&W, Sulzer, Wartsila, Yanmar, and more."
        },
        {
            question: "Do you offer genuine OEM parts?",
            answer: "Yes, we specialize in both genuine and OEM (Original Equipment Manufacturer) marine ship spare parts. All our parts are quality-checked and certified. We source from authorized manufacturers and conduct NDT testing to ensure authenticity and reliability."
        },
        {
            question: "What is your delivery time for marine spare parts?",
            answer: "With our large warehouse stock in Bhavnagar, Gujarat, we can deliver most parts in the shortest possible time. For in-stock items, we offer same-day or next-day dispatch. International shipping typically takes 3-7 business days depending on the destination. We provide 24/7 emergency support for urgent requirements."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship marine spare parts worldwide. We serve clients in over 50 countries including Greece, Italy, Germany, Cyprus, Netherlands, USA, UK, Turkey, UAE, Singapore, Bangladesh, Philippines, and many more. We handle all export documentation and provide door-to-door delivery services."
        },
        {
            question: "How do I request a quote for marine parts?",
            answer: "You can request a quote by filling out our contact form on the website, calling our 24/7 emergency hotline at +91 9558424949, or emailing us at sales@utsmarinellp.com. Our team will respond with a detailed quotation including pricing, availability, and delivery time."
        },
        {
            question: "Do you provide quality certification for spare parts?",
            answer: "Yes, we are ISO 9001 certified and provide quality certificates with all our shipments. We have qualified engineers for all kinds of Non-Destructive Testing (NDT) including Calibration, MPI, Ultrasonic, Hardness, Hydraulic, Trueness, and Leak detection testing. Test certificates are provided with each part."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various payment methods including bank transfers (Wire/SWIFT), Letters of Credit (L/C), and other secure international payment methods. Payment terms can be discussed based on order value and customer relationship."
        },
        {
            question: "Do you offer emergency services for ship parts?",
            answer: "Yes, we provide 24/7 emergency support for urgent marine spare parts requirements. Contact our emergency hotline at +91 9558424949 for immediate assistance. We understand the critical nature of ship operations and strive to minimize vessel downtime."
        }
    ];

    return (
        <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-16">
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full shadow-sm">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Questions</span>
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Have any questions?
                                <span className="block text-teal-600 mt-2">here some answers.</span>
                            </h2>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                Get answers to common questions about our marine spare parts and services
                            </p>
                        </div>
                    </ScrollReveal>
                    
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
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
                                Still have questions? We're here to help!
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center px-8 py-4 bg-teal-600 text-white font-semibold text-lg rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                            >
                                Ask Your Question
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
