"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            router.push('/admin/login');
        } else {
            setAuthorized(true);
        }
    }, [router]);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    if (!authorized) return null;

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white flex-shrink-0">
                <div className="p-6">
                    <h2 className="text-xl font-bold">Marine Admin</h2>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    <Link
                        href="/admin/dashboard"
                        className={`block px-4 py-2 rounded transition ${pathname === '/admin/dashboard' ? 'bg-teal-600' : 'hover:bg-gray-800'}`}
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/admin/products"
                        className={`block px-4 py-2 rounded transition ${pathname.startsWith('/admin/products') ? 'bg-teal-600' : 'hover:bg-gray-800'}`}
                    >
                        Products
                    </Link>
                    <Link
                        href="/admin/blogs"
                        className={`block px-4 py-2 rounded transition ${pathname.startsWith('/admin/blogs') ? 'bg-teal-600' : 'hover:bg-gray-800'}`}
                    >
                        Blogs
                    </Link>
                    <Link
                        href="/admin/messages"
                        className={`block px-4 py-2 rounded transition ${pathname.startsWith('/admin/messages') ? 'bg-teal-600' : 'hover:bg-gray-800'}`}
                    >
                        Messages
                    </Link>

                    <div className="pt-8 mt-8 border-t border-gray-700">
                        <button
                            onClick={() => {
                                localStorage.removeItem('adminToken');
                                router.push('/admin/login');
                            }}
                            className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-800 rounded transition"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
