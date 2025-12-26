'use client';

import { useEffect, useState } from 'react';
import { Package, FileText, Image as ImageIcon, TrendingUp } from 'lucide-react';
import { API_ENDPOINTS } from '@/config/api';

interface Stats {
  newArrivals: {
    total: number;
    published: number;
    draft: number;
    disabled: number;
  };
  blogs: {
    total: number;
    published: number;
    draft: number;
    disabled: number;
  };
  mediaCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.DASHBOARD_STATS, {
        credentials: 'include', // Use HttpOnly cookie
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats?.newArrivals.total || 0,
      subtitle: `${stats?.newArrivals.published || 0} published`,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Blogs',
      value: stats?.blogs.total || 0,
      subtitle: `${stats?.blogs.published || 0} published`,
      icon: FileText,
      color: 'bg-green-500',
    },
    {
      title: 'Media Files',
      value: stats?.mediaCount || 0,
      subtitle: 'Total uploads',
      icon: ImageIcon,
      color: 'bg-purple-500',
    },
    {
      title: 'Draft Items',
      value: (stats?.newArrivals.draft || 0) + (stats?.blogs.draft || 0),
      subtitle: 'Pending review',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to UTS Marine LLP Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${card.color} p-3 rounded-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-sm text-gray-500">{card.subtitle}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Products Overview</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Published</span>
              <span className="font-semibold text-green-600">{stats?.newArrivals.published || 0}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Draft</span>
              <span className="font-semibold text-yellow-600">{stats?.newArrivals.draft || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Disabled</span>
              <span className="font-semibold text-red-600">{stats?.newArrivals.disabled || 0}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Blogs Overview</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Published</span>
              <span className="font-semibold text-green-600">{stats?.blogs.published || 0}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Draft</span>
              <span className="font-semibold text-yellow-600">{stats?.blogs.draft || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Disabled</span>
              <span className="font-semibold text-red-600">{stats?.blogs.disabled || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
