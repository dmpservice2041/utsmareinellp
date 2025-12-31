'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/config/api';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Check authentication via API instead of localStorage
    const checkAuth = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.GET_CURRENT_USER, {
          credentials: 'include',
        });
        
        if (response.ok) {
          router.replace('/admin/dashboard');
        } else {
          router.replace('/admin/login');
        }
      } catch (error) {
        router.replace('/admin/login');
      }
    };
    
    checkAuth();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
