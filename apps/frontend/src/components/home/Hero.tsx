"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
    const [isMobile, setIsMobile] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 20% 50%, rgba(20, 184, 166, 0.3) 0%, transparent 50%),
                                    radial-gradient(circle at 80% 80%, rgba(20, 184, 166, 0.2) 0%, transparent 50%)`,
                }} />
            </div>

            {/* Video Background - Desktop Only */}
            {!isMobile && (
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        onLoadedData={() => setVideoLoaded(true)}
                        onError={(e) => {
                            const target = e.target as HTMLVideoElement;
                            target.style.display = 'none';
                        }}
                    >
                        <source src="/drone-video.webm" type="video/webm" />
                        <source src="/drone-video.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                </div>
            )}

            {/* Image Background - Mobile Only */}
            {isMobile && (
                <div className="absolute inset-0 z-0">
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559136555-930b7e476149?q=80&w=2073&auto=format&fit=crop')" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                </div>
            )}

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 bg-teal-500/20 rounded-full blur-xl animate-float delay-200" />
            <div className="absolute bottom-20 right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl animate-float delay-500" />

            {/* Content */}
            <div className="container mx-auto px-4 z-10 text-center sm:text-left relative pt-20 sm:pt-24">
                <span className="inline-block text-teal-400 font-semibold tracking-wider uppercase mb-6 px-4 py-2 bg-teal-500/10 rounded-full backdrop-blur-sm border border-teal-500/20 animate-fade-in-up">
                    Expert Marine Solutions
                </span>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-6 max-w-4xl animate-fade-in-up delay-100">
                    Steering Your Business
                    <span className="block text-teal-400 mt-2">Toward Success</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 max-w-3xl leading-relaxed animate-fade-in-up delay-200">
                    We provide dependable and tailored consulting services that help your business navigate challenges, seize opportunities, and achieve sustainable growth in the marine industry.
                </p>
                <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-3xl leading-relaxed animate-fade-in-up delay-300">
                    UTS Marine LLP is a leading exporter and stockiest of marine ship spare parts, specializing in genuine and OEM parts for main engines, auxiliary engines, and ship machinery. We serve clients globally with quality products and exceptional service.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start animate-fade-in-up delay-400">
                
                   
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
                <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>
        </section>
    );
}
