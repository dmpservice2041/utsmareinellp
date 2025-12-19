"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_ENDPOINTS } from '@/config/api';

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await fetch(API_ENDPOINTS.blogs.list(100));
            const data = await res.json();
            setBlogs(data.blogs || []);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Blogs</h1>
                <Link
                    href="/admin/blogs/new"
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                >
                    New Article
                </Link>
            </div>

            <div className="bg-white rounded shadow text-gray-900">
                <table className="min-w-full">
                    <thead>
                        <tr className="border-b border-gray-200">
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Title</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Published At</th>
                            <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogs.map((b: any) => (
                            <tr key={b.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm">{b.id}</td>
                                <td className="px-6 py-4 text-sm font-medium">{b.title}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                    {new Date(b.published_at).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-right">
                                    <button className="text-teal-600 hover:text-teal-800 mr-3">Edit</button>
                                    <button className="text-red-600 hover:text-red-800">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
