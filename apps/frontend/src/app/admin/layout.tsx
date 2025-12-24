'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Package,
  FileText,
  Image,
  LogOut,
  Menu,
  X,
  Settings,
} from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (pathname === '/admin/login') {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(API_ENDPOINTS.GET_CURRENT_USER, {
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await fetch(API_ENDPOINTS.LOGOUT, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
    router.push('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
    { icon: Package, label: 'New Arrivals', href: '/admin/products' },
    { icon: FileText, label: 'Blogs', href: '/admin/blogs' },
    { icon: Image, label: 'Media', href: '/admin/media' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`${isSidebarOpen ? 'w-64' : 'w-20'
          } bg-gray-900 text-white transition-all duration-300 flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen && (
            <div>
              <h1 className="text-xl font-bold text-teal-400">UTS Marine</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          )}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                <Icon size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 w-full text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
