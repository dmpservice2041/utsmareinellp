"use client";

import ScrollReveal from '@/components/shared/ScrollReveal';
import { useEffect, useRef, useState } from 'react';
import { countries } from '@/data/countries';

export default function FeaturesIntro() {
    const stats = [
        { number: '10+', label: 'Years Experience', icon: '🏆' },
        { number: '1000+', label: 'Products', icon: '📦' },
        { number: `${countries.length}+`, label: 'Countries', icon: '🌍' },
        { number: '24/7', label: 'Support', icon: '🛟' }
    ];

    return (
        <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
                    {stats.map((stat, index) => (
                        <ScrollReveal key={index} delay={index * 100}>
                            <div className="group text-center p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                                <div className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.icon}
                                </div>
                                <div className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent mb-2 transform group-hover:scale-110 transition-transform duration-300">
                                    {stat.number}
                                </div>
                                <div className="text-lg font-semibold text-gray-700">{stat.label}</div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* About Section */}
                <ScrollReveal delay={200}>
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-block mb-6 px-6 py-3 bg-teal-100 rounded-full shadow-sm">
                            <span className="text-teal-600 text-sm font-semibold uppercase tracking-wider">Why Choose Us</span>
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
                            Supporting Growth on a
                            <span className="block text-teal-600 mt-2">Global Scale</span>
                        </h2>
                        <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                            We are well-known Exporter & Stockiest of Marine Ship Spare Parts (Genuine & OEM). Today we are an independent, modern and ISO 9001 certified company providing one-stop technical Solutions for Diesel engines to our Shipping, Industrial Power Plants and Offshore Clients which includes Ship Owners, Ship Managers, Ship Repairers, Traders/Stockiest all over the globe with our own Warehouse and Workshop.
                        </p>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            With our large stock we can deliver required spare parts in shortest possible time. With more than 10+ years in-depth Work Experience, Consistency and Flexibility are the center of attention of all our Services and Products.
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
