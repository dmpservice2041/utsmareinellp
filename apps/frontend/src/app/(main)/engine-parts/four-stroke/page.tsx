"use client";

import Link from 'next/link';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function FourStrokePage() {
    const engineBrands = [
        {
            name: 'Yanmar',
            models: ['EY18', 'EY22', 'EY26', 'N165', 'N18', 'N21', 'N260', 'N280', 'N330', 'T220', 'T240', 'T260', 'M200', 'M220', 'S165', 'S185', 'HL', 'RL', 'ML', 'UL', 'GL', 'KFL', 'SC60N'],
            icon: '⚙️',
            description: 'Japanese precision engineering for auxiliary power'
        },
        {
            name: 'Daihatsu',
            models: ['DC32', 'DC17A', 'DC17', 'DK20', 'DK26', 'DK28', 'DK32', 'DL19', 'DL20', 'DL22', 'DL24', 'DL26', 'DL28', 'DS18', 'DS22', 'DS26', 'DS26A DS28', 'DS32', 'PS18', 'PS20', 'PS26', 'PS30'],
            icon: '🔧',
            description: 'Reliable four-stroke engines for marine applications'
        },
        {
            name: 'MaK',
            models: ['M20', 'M25', 'M32', 'M43', 'M20C', 'M25C', 'M32C', 'M43C', 'M281AK', 'M332AK', 'M453AK', 'M551Ak', 'M552AK', 'M453C', 'M552C', 'M601C'],
            icon: '🚢',
            description: 'German engineering excellence in marine propulsion'
        },
        {
            name: 'Wartsila',
            models: ['L20', 'L20C', 'L20D', 'L26', 'L32', 'L46', 'L46B', 'L46C', 'Vasa 20', 'Vasa 22', 'Vasa 22/26', 'Vasa 32', 'Vasa 46', 'V25', 'V32', 'V32LN', 'V46', 'R20', 'R22', 'R22HF', 'R22/26', 'R32', 'R32LN'],
            icon: '⚡',
            description: 'Finnish innovation in marine power solutions'
        },
        {
            name: 'MAN B&W',
            models: ['L16/24', 'L21/31', 'L23/30', 'L23/30H', 'L27/38', 'L28/32', 'L28/32H', 'L32/40', 'L40/54', 'L48/60', 'L52/55', 'L52/55B', 'L58/64', 'V23/30A', 'V28/32A', 'V32/40', 'V48/60'],
            icon: '🔩',
            description: 'World-leading four-stroke engine technology'
        },
        {
            name: 'Bergen',
            models: ['C25:33', 'B32:40', 'KRG', 'KRM', 'KVG', 'KVM', 'KRGB', 'KRMB', 'KVGB', 'KVMB', 'BRM', 'BRG', 'BVG', 'BVM', 'LDG', 'LDM', 'LDMB', 'LSG'],
            icon: '⚓',
            description: 'Norwegian quality in marine diesel engines'
        },
        {
            name: 'Sulzer',
            models: ['S20', 'AL20', 'AL25', 'ASL25', 'ATL25', 'ZL40', 'ZA40', 'ZA40S', 'ZAL40S'],
            icon: '🛠️',
            description: 'Swiss precision in four-stroke engine design'
        },
        {
            name: 'Pielstick',
            models: ['PC2', 'PC2.2', 'PC2.5', 'PC2.6', 'PC3', 'PC4', 'PC4.2'],
            icon: '🔨',
            description: 'French engineering for marine applications'
        },
        {
            name: 'Stork Werkspoor',
            models: ['TM410', 'TM610', 'TM620', 'TM410C', 'TM620C'],
            icon: '⚒️',
            description: 'Dutch heritage in marine engine manufacturing'
        },
        {
            name: 'Hanshin',
            models: ['EL30', 'EL32', 'EL35', 'EL40', 'EL44', 'ELS32', 'ELS35', 'ELS44', 'L26', 'L26BSH', 'L26BGSH', 'L28RG', 'L46SH', 'LF50A', 'LH24', 'LH26', 'LH26G', 'LH28', 'LH31', 'LH31G', 'LH34', 'LH34LA', 'LH41', 'LU28', 'LU28A', 'LU28R', 'LU28G', 'LU32', 'LU35', 'LU38', 'LU40', 'LU46', 'LU46A', 'LU50', 'LU54', 'LUD24', 'LUD26', 'LUD32', 'LUD35', 'LUS28', 'LUS38', 'LUS40', 'LUS58'],
            icon: '🏭',
            description: 'Comprehensive range of Japanese marine engines'
        },
        {
            name: 'Caterpillar',
            models: ['C12', 'C13', 'C15', 'C18', 'C30', 'C32', '3406', '3408', '3412', '3508', '3512', '3516', '3606', '3608', '3612', '3616', '3618'],
            icon: '🐱',
            description: 'American reliability in marine power systems'
        },
        {
            name: 'Nigata',
            models: ['L25HX', 'L26HX', 'L28HX', 'L22HLX', 'L26HLX', 'L28AHX', 'MG22HLX', 'MG26HX', 'MG28HLX', 'MG32CLX', 'MG34HX', 'MG41HX'],
            icon: '🌊',
            description: 'Japanese innovation in auxiliary power generation'
        }
    ];

    const components = [
        'Cylinders Liners',
        'Piston Crowns',
        'Piston Skirts',
        'Cylinder Heads',
        'Exhaust Valve Spindles',
        'Valve Seats',
        'Valve Cages',
        'Plungers',
        'Fuel Pumps',
        'Bearings',
        'Piston Rings'
    ];

    const totalModels = engineBrands.reduce((sum, brand) => sum + brand.models.length, 0);

    const stats = [
        { number: '12', label: 'Engine Brands', icon: '🏭' },
        { number: `${totalModels}+`, label: 'Engine Models', icon: '⚙️' },
        { number: '11', label: 'Component Types', icon: '🔧' }
    ];

    return (
        <main>
            {/* Banner Header */}
            <section className="relative h-[400px] lg:h-[500px] overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/Four_Stroke.jpeg')" }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
                </div>
                <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center">
                        <ScrollReveal delay={0}>
                            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">Four Stroke Engines</h1>
                            <p className="text-xl lg:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto">
                                Auxiliary power and generator engines with superior fuel economy
                            </p>
                            <div className="flex justify-center text-sm text-gray-300 space-x-2">
                                <Link href="/" className="hover:text-teal-400 transition-colors">Home</Link>
                                <span>/</span>
                                <Link href="/engine-parts" className="hover:text-teal-400 transition-colors">Engine Parts</Link>
                                <span>/</span>
                                <span className="text-white">Four Stroke</span>
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

            {/* Introduction Section */}
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
                                            <svg className="w-32 h-32 text-teal-600 relative z-10" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Engine Components</h3>
                                    <ul className="space-y-3 mb-6">
                                        {components.map((component, index) => (
                                            <li key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-teal-50 transition-colors">
                                                <div className="w-2 h-2 rounded-full bg-teal-600"></div>
                                                <span className="text-sm text-gray-700 font-medium">{component}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="pt-6 border-t border-gray-300">
                                        <p className="text-sm text-gray-600 mb-3">Need two-stroke engine parts?</p>
                                        <Link href="/engine-parts/two-stroke" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold text-sm transition-colors">
                                            View Two-Stroke Parts
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
                                            ⚡
                                        </div>
                                        <div className="flex-1">
                                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Four-Stroke Marine Diesel Engines</h2>
                                            <p className="text-lg text-gray-700 leading-relaxed">
                                                Four-stroke marine diesel engines are commonly used for auxiliary power generation, smaller main engines, and generator sets. These engines offer <strong className="text-teal-600">better fuel economy at lower loads</strong> and are <strong className="text-teal-600">easier to maintain</strong>. We maintain extensive inventory of genuine and OEM parts for all major four-stroke engine brands.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        <Link href="/engine-parts" className="px-6 py-3 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                                            Explore Engine Parts Catalog
                                        </Link>
                                        <Link href="/services" className="px-6 py-3 bg-white border-2 border-teal-600 text-teal-600 font-semibold rounded-lg hover:bg-teal-50 transition-all">
                                            Quality Testing Services
                                        </Link>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <div className="space-y-12">
                                {engineBrands.map((brand, brandIndex) => (
                                    <ScrollReveal key={brandIndex} delay={300 + (brandIndex * 80)}>
                                        <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500">
                                            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-8 pb-6 border-b border-gray-200">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                                                        {brand.icon}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{brand.name}</h3>
                                                        <p className="text-gray-600">{brand.description}</p>
                                                    </div>
                                                </div>
                                                <div className="ml-auto">
                                                    <div className="bg-teal-100 rounded-xl px-6 py-3 text-center">
                                                        <div className="text-2xl font-bold text-teal-600">{brand.models.length}</div>
                                                        <div className="text-sm text-gray-600 font-medium">Models</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                                {brand.models.map((model, modelIndex) => (
                                                    <div 
                                                        key={modelIndex}
                                                        className="group relative bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl text-center text-sm font-semibold text-gray-700 border-2 border-gray-200 hover:border-teal-500 hover:bg-gradient-to-br hover:from-teal-50 hover:to-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                                                    >
                                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                        {brand.name} {model}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
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
                                Need Specific Four-Stroke Engine Parts?
                            </h2>
                            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                                With over {totalModels}+ engine models in our inventory, we can supply parts for virtually any four-stroke marine engine. Contact our team for detailed specifications, availability, and competitive pricing.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link 
                                    href="/contact"
                                    className="px-8 py-4 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    Request a Quote
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
