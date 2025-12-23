"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Close mobile menu and dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            
            // Close mobile menu
            if (!target.closest('.mobile-menu') && !target.closest('.mobile-menu-button')) {
                setIsMobileMenuOpen(false);
            }
            
            // Close dropdowns
            if (!target.closest('.dropdown-menu') && !target.closest('.dropdown-button')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMobileMenuOpen, activeDropdown]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleDropdownToggle = (menu: string) => {
        setActiveDropdown(activeDropdown === menu ? null : menu);
    };

    return (
        <header className="fixed w-full top-0 z-50 py-3 px-4 sm:px-6">
            <div className="container mx-auto">
                {/* White Rounded Navigation Bar */}
                <nav className="bg-white rounded-2xl shadow-lg px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                        <img 
                            src="/logo.png" 
                            alt="UTS Marine LLP" 
                            className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1 xl:gap-2 flex-1 justify-center">
                        <Link 
                            href="/" 
                            className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
                        >
                            Home
                        </Link>
                        
                        <Link 
                            href="/about" 
                            className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
                        >
                            About Us
                        </Link>

                        <Link 
                            href="/services" 
                            className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
                        >
                            Services
                        </Link>

                        {/* Engine Parts Dropdown */}
                        <div className="relative group dropdown-menu">
                            <button
                                onClick={() => handleDropdownToggle('engine')}
                                className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50 flex items-center gap-1 dropdown-button"
                            >
                                Engine Parts
                                <svg 
                                    className={`w-4 h-4 transition-transform ${activeDropdown === 'engine' ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {activeDropdown === 'engine' && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <Link 
                                        href="/engine-parts/two-stroke" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Two Stroke
                                    </Link>
                                    <Link 
                                        href="/engine-parts/four-stroke" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Four Stroke
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Ship Machinery Dropdown */}
                        <div className="relative group dropdown-menu">
                            <button
                                onClick={() => handleDropdownToggle('ship')}
                                className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50 flex items-center gap-1 dropdown-button"
                        >
                            Ship Machinery
                                <svg 
                                    className={`w-4 h-4 transition-transform ${activeDropdown === 'ship' ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    viewBox="0 0 24 24" 
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {activeDropdown === 'ship' && (
                                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                    <Link 
                                        href="/products?category=turbochargers" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Turbochargers
                                    </Link>
                                    <Link 
                                        href="/products?category=generators" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Generators
                                    </Link>
                                    <Link 
                                        href="/products?category=pumps" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Pumps & Motors
                                    </Link>
                                    <Link 
                                        href="/products?category=navigation" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Navigation Equipment
                                    </Link>
                                    <Link 
                                        href="/products?category=deck" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors"
                                        onClick={() => setActiveDropdown(null)}
                                    >
                                        Deck Equipment
                        </Link>
                        <Link 
                                        href="/products" 
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-900 transition-colors font-semibold"
                                        onClick={() => setActiveDropdown(null)}
                        >
                                        View All Products
                        </Link>
                                </div>
                            )}
                        </div>

                        <Link 
                            href="/new-arrival" 
                            className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
                        >
                            New Arrival
                        </Link>
                        <Link 
                            href="/blog" 
                            className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
                        >
                            Blog
                        </Link>
                        <Link 
                            href="/contact" 
                            className="px-4 py-2 text-sm font-semibold tracking-wide text-blue-900 hover:text-blue-700 transition-colors rounded-lg hover:bg-blue-50"
                        >
                            Contact Us
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="lg:hidden p-2 text-blue-900 hover:bg-blue-50 rounded-lg transition-colors mobile-menu-button"
                        aria-label="Toggle menu"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </nav>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl border border-gray-100 py-4 mobile-menu">
                        <div className="flex flex-col">
                            <Link 
                                href="/" 
                                className="px-6 py-3 text-sm font-semibold tracking-wide text-blue-900 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Home
                            </Link>
                            <Link 
                                href="/about" 
                                className="px-6 py-3 text-sm font-semibold tracking-wide text-blue-900 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                About Us
                            </Link>
                            <Link 
                                href="/services" 
                                className="px-6 py-3 text-sm font-semibold tracking-wide text-blue-900 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Services
                            </Link>
                            
                            {/* Engine Parts Mobile Submenu */}
                            <div className="px-6 py-3">
                                <button
                                    onClick={() => handleDropdownToggle('engine-mobile')}
                                    className="w-full flex items-center justify-between text-sm font-semibold tracking-wide text-blue-900"
                                >
                                    Engine Parts
                                    <svg 
                                        className={`w-4 h-4 transition-transform ${activeDropdown === 'engine-mobile' ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeDropdown === 'engine-mobile' && (
                                    <div className="mt-2 pl-4 space-y-2">
                                        <Link 
                                            href="/engine-parts/two-stroke" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Two Stroke
                                        </Link>
                                        <Link 
                                            href="/engine-parts/four-stroke" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Four Stroke
                                        </Link>
                                    </div>
                                )}
                            </div>

                            {/* Ship Machinery Mobile Submenu */}
                            <div className="px-6 py-3">
                                <button
                                    onClick={() => handleDropdownToggle('ship-mobile')}
                                    className="w-full flex items-center justify-between text-sm font-semibold tracking-wide text-blue-900"
                                >
                                    Ship Machinery
                                    <svg 
                                        className={`w-4 h-4 transition-transform ${activeDropdown === 'ship-mobile' ? 'rotate-180' : ''}`} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {activeDropdown === 'ship-mobile' && (
                                    <div className="mt-2 pl-4 space-y-2">
                                        <Link 
                                            href="/products?category=turbochargers" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Turbochargers
                                        </Link>
                                        <Link 
                                            href="/products?category=generators" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Generators
                                        </Link>
                                        <Link 
                                            href="/products?category=pumps" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Pumps & Motors
                                        </Link>
                                        <Link 
                                            href="/products?category=navigation" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Navigation Equipment
                                        </Link>
                            <Link 
                                            href="/products?category=deck" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                            Deck Equipment
                            </Link>
                            <Link 
                                            href="/products" 
                                            className="block py-2 text-sm text-gray-700 hover:text-blue-900 transition-colors font-semibold"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                            View All Products
                            </Link>
                                    </div>
                                )}
                            </div>

                            <Link 
                                href="/new-arrival" 
                                className="px-6 py-3 text-sm font-semibold tracking-wide text-blue-900 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                New Arrival
                            </Link>
                            <Link 
                                href="/blog" 
                                className="px-6 py-3 text-sm font-semibold tracking-wide text-blue-900 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Blog
                            </Link>
                            <Link 
                                href="/contact" 
                                className="px-6 py-3 text-sm font-semibold tracking-wide text-blue-900 hover:bg-blue-50 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Contact Us
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
