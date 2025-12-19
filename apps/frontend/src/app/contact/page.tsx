"use client";

import { useState } from 'react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/config/api';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const res = await fetch(API_ENDPOINTS.contact, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactFAQs = [
        {
            question: "What is your delivery time for marine spare parts?",
            answer: "With our large warehouse stock in Bhavnagar, Gujarat, we can deliver most in-stock items within 24-48 hours for domestic orders. International shipping typically takes 3-7 business days depending on the destination country. For urgent requirements, we offer expedited shipping options. Contact our team for immediate assistance."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship marine spare parts worldwide to over 50 countries including Greece, Italy, Germany, Cyprus, Netherlands, USA, UK, Turkey, UAE, Singapore, Bangladesh, Philippines, Indonesia, Sri Lanka, and many more. We handle all export documentation, customs clearance, and provide door-to-door delivery services. Our experienced logistics team ensures smooth international shipping."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept various secure payment methods including bank transfers (Wire/SWIFT), Letters of Credit (L/C), and other international payment methods. Payment terms can be discussed based on order value and customer relationship. We work with established customers to provide flexible payment solutions."
        },
        {
            question: "How do I request a quote for marine parts?",
            answer: "You can request a quote by filling out our contact form on this page, calling our sales team at +91 9723298676 or +91 8460565550, emailing us at sales@utsmarinellp.com, or contacting Yashin Lakhani at +91 9825750060. Please provide part numbers, engine model, quantity, and delivery location for accurate pricing."
        },
        {
            question: "Do you offer emergency services for urgent vessel requirements?",
            answer: "Yes, we provide support for urgent marine spare parts requirements. Contact Yashin Lakhani at +91 9825750060 for assistance with critical vessel situations. We understand the importance of minimizing vessel downtime and can arrange expedited processing and shipping for emergency orders."
        },
        {
            question: "What information should I provide when requesting parts?",
            answer: "For accurate quotes and faster service, please provide: part number or description, engine manufacturer and model (e.g., MAN B&W K98MC-C, Sulzer RTA84), quantity required, vessel name and location, delivery port or address, and any specific certification requirements (IACS inspection, material certificates, etc.)."
        }
    ];

    const stats = [
        { number: 'Expert', label: 'Team Support', icon: '👥' },
        { number: '50+', label: 'Countries Served', icon: '🌍' },
        { number: '<24hrs', label: 'Response Time', icon: '⚡' }
    ];

    return (
        <main className="pt-24 sm:pt-28">
            {/* Banner Header */}
            <section className="relative h-[450px] lg:h-[550px] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                </div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,184,166,0.1),transparent_50%)]" />
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <ScrollReveal delay={0}>
                            <div className="inline-block mb-6 px-6 py-3 bg-teal-500/20 backdrop-blur-sm rounded-full border border-teal-400/30">
                                <span className="text-teal-300 text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
                            </div>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                                Let's Start a Conversation
                            </h1>
                            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                                We're here to help you find the perfect marine spare parts solution for your needs
                            </p>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <span className="text-white">Contact</span>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gradient-to-br from-teal-600 via-teal-700 to-teal-800 relative overflow-hidden -mt-20 z-20">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <ScrollReveal key={index} delay={index * 150}>
                                <div className="text-center bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                                    <div className="text-5xl mb-4">{stat.icon}</div>
                                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                    <div className="text-white/90 font-semibold text-lg">{stat.label}</div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Information - Modern Premium Design */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-gray-50/50 to-teal-50/30 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-teal-400/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <ScrollReveal delay={0}>
                        <div className="text-center mb-20">
                            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-teal-100 to-teal-50 rounded-full border border-teal-200/50">
                                <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Get In Touch</span>
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                                Contact Information
                            </h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Reach out to us through any of these channels
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Modern Grid Layout */}
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Side - Addresses */}
                            <div className="space-y-6">
                                {/* Office Address Card */}
                                <ScrollReveal delay={0}>
                                    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-teal-200 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl" />
                                        <div className="relative z-10">
                                            <div className="flex items-start gap-5">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">Office Address</h3>
                                                    <div className="space-y-2">
                                                        <p className="font-bold text-gray-900 text-lg">UTS Marine LLP</p>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            Plot No. 2/A-1, 2/A-2, 2/B, 4/A,<br />
                                                            Tf Office No. 301,<br />
                                                            Sumeru Prime, Parimal Chowk,<br />
                                                            Bhavnagar - 364002<br />
                                                            Gujarat, India
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Works Address Card */}
                                <ScrollReveal delay={150}>
                                    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-teal-200 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl" />
                                        <div className="relative z-10">
                                            <div className="flex items-start gap-5">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">Works Address</h3>
                                                    <div className="space-y-2">
                                                        <p className="font-bold text-gray-900 text-lg">UTS Marine LLP</p>
                                                        <p className="text-gray-600 leading-relaxed">
                                                            Survey No. 55,<br />
                                                            Village: Tansa, Taluko: Ghogha,<br />
                                                            Tansa, Bhavnagar - 364120<br />
                                                            Gujarat, India
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Right Side - Phone & Email */}
                            <div className="space-y-6">
                                {/* Phone Contacts Card */}
                                <ScrollReveal delay={300}>
                                    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-teal-200 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl" />
                                        <div className="relative z-10">
                                            <div className="flex items-start gap-5 mb-6">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-teal-600 transition-colors">Phone Contacts</h3>
                                                    <div className="space-y-4">
                                                        <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-50/50 rounded-xl border border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group/contact">
                                                            <div className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">Contact Person</div>
                                                            <div className="font-bold text-gray-900 mb-2 text-base">Shrenik Mehta</div>
                                                            <a href="tel:919723298676" className="text-teal-600 hover:text-teal-700 font-bold transition-colors text-base inline-flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                                </svg>
                                                                +91 9723298676
                                                            </a>
                                                        </div>
                                                        <div className="p-4 bg-gradient-to-r from-teal-50 to-teal-50/50 rounded-xl border border-teal-100 hover:border-teal-300 hover:shadow-lg transition-all duration-300 group/contact">
                                                            <div className="text-xs text-gray-500 mb-1.5 font-semibold uppercase tracking-wide">Contact Person</div>
                                                            <div className="font-bold text-gray-900 mb-2 text-base">Dharmesh Zala</div>
                                                            <a href="tel:918460565550" className="text-teal-600 hover:text-teal-700 font-bold transition-colors text-base inline-flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                                </svg>
                                                                +91 8460565550
                                                            </a>
                                                        </div>
                                                        <div className="p-4 bg-gradient-to-r from-teal-100 via-teal-50 to-teal-100 rounded-xl border-2 border-teal-300 shadow-md hover:shadow-lg transition-all duration-300 group/contact">
                                                            <div className="text-xs text-gray-600 mb-1.5 font-bold uppercase tracking-wide">Contact Person</div>
                                                            <div className="font-bold text-gray-900 mb-2 text-base">Yashin Lakhani</div>
                                                            <a href="tel:919825750060" className="text-teal-700 hover:text-teal-800 font-bold transition-colors text-base inline-flex items-center gap-2">
                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                                                </svg>
                                                                +91 9825750060
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Email Contact Card */}
                                <ScrollReveal delay={450}>
                                    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:border-teal-200 transition-all duration-500 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-teal-500/5 to-transparent rounded-full blur-2xl" />
                                        <div className="relative z-10">
                                            <div className="flex items-start gap-5">
                                                <div className="flex-shrink-0">
                                                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex-1 pt-1">
                                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-teal-600 transition-colors">Email Us</h3>
                                                    <div className="p-5 bg-gradient-to-br from-teal-50 via-teal-50/80 to-teal-50 rounded-xl border-2 border-teal-200 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                                                        <a 
                                                            href="mailto:sales@utsmarinellp.com" 
                                                            className="text-teal-700 hover:text-teal-800 font-bold transition-colors flex items-center gap-3 group/email text-lg"
                                                        >
                                                            <svg className="w-6 h-6 group-hover/email:scale-110 transition-transform flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                                            </svg>
                                                            <span className="break-all">sales@utsmarinellp.com</span>
                                                        </a>
                                                    </div>
                                                    <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
                                                        <svg className="w-4 h-4 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                                        </svg>
                                                        <span className="font-medium">We typically respond within 24 hours</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Form and Map Section */}
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Contact Form */}
                        <ScrollReveal delay={0}>
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                                <div className="relative bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl p-8 lg:p-10 shadow-2xl border border-gray-200">
                                    <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                        <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Send Message</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
                                        Ready to Get Started?
                                    </h2>
                                    <p className="text-gray-600 mb-8 leading-relaxed">
                                        Fill out the form below and our team will get back to you within 24 hours.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="relative">
                                            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Your Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white hover:border-teal-300"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white hover:border-teal-300"
                                                placeholder="your.email@example.com"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Subject
                                            </label>
                                            <input
                                                type="text"
                                                name="subject"
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white hover:border-teal-300"
                                                placeholder="What is this regarding?"
                                            />
                                        </div>

                                        <div className="relative">
                                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                                Message <span className="text-red-500">*</span>
                                            </label>
                                            <textarea
                                                name="message"
                                                id="message"
                                                rows={6}
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all bg-white resize-none hover:border-teal-300"
                                                placeholder="Tell us about your requirements..."
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={status === 'loading'}
                                            className={`w-full py-4 px-6 text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed ${
                                                status === 'loading' 
                                                    ? 'bg-gray-400' 
                                                    : 'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800'
                                            }`}
                                        >
                                            {status === 'loading' ? (
                                                <span className="flex items-center justify-center gap-3">
                                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    Sending your message...
                                                </span>
                                            ) : (
                                                <span className="flex items-center justify-center gap-2">
                                                    Send Message
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                                    </svg>
                                                </span>
                                            )}
                                        </button>

                                        {status === 'success' && (
                                            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 rounded-xl border-2 border-green-200 animate-fade-in">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <div>
                                                        <div className="font-semibold">Message sent successfully!</div>
                                                        <div className="text-sm">We will get back to you soon.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {status === 'error' && (
                                            <div className="p-4 bg-gradient-to-r from-red-50 to-rose-50 text-red-700 rounded-xl border-2 border-red-200 animate-fade-in">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                                    </svg>
                                                    <div>
                                                        <div className="font-semibold">Failed to send message</div>
                                                        <div className="text-sm">Please try again later or contact us directly.</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Map Section */}
                        <ScrollReveal delay={200}>
                            <div>
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Our Location</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                                    Visit Our Office
                                </h2>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    Located in the heart of Bhavnagar, our office is easily accessible and welcomes visitors.
                                </p>
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 hover:border-teal-500 transition-all duration-300 group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none"></div>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3705.466705652098!2d72.14452661477667!3d21.76219118560565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395f5b982f091887%3A0x8b279e85e5c64a43!2sUTS%20MARINE%20LLP!5e0!3m2!1sen!2sin!4v1654498046750!5m2!1sen!2sin"
                                        width="100%"
                                        height="600"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="w-full h-[600px]"
                                    />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <ScrollReveal delay={0}>
                            <div className="text-center mb-16">
                                <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full">
                                    <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Questions</span>
                                </div>
                                <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    Frequently Asked
                                    <span className="block text-teal-600 mt-2">Questions</span>
                                </h2>
                                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                                    Find answers to common questions about our services, shipping, and ordering process
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        <div className="space-y-4">
                            {contactFAQs.map((faq, index) => (
                                <ScrollReveal key={index} delay={index * 100}>
                                    <details
                                        className="group bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-teal-200"
                                    >
                                        <summary className="flex items-center justify-between cursor-pointer list-none">
                                            <h3 className="text-lg lg:text-xl font-bold text-gray-900 pr-4 group-hover:text-teal-600 transition-colors leading-relaxed">
                                                {faq.question}
                                            </h3>
                                            <span className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center transition-all duration-300 group-open:rotate-180 group-hover:from-teal-600 group-hover:to-teal-700 group-hover:scale-110 shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </summary>
                                        <div className="mt-6 text-gray-700 leading-relaxed text-base lg:text-lg animate-fade-in border-t border-gray-100 pt-6">
                                            {faq.answer}
                                        </div>
                                    </details>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
