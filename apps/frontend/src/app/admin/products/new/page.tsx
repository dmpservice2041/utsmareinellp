"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { API_ENDPOINTS } from '@/config/api';

export default function NewProduct() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        short_description: '',
        long_description: '',
        seo_title: '',
        seo_description: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');

        try {
            const res = await fetch(API_ENDPOINTS.products.create, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/products');
            } else {
                alert('Failed to create product');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Product</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900 outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900 outline-none focus:ring-teal-500 focus:border-teal-500"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Short Description</label>
                    <textarea
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleChange}
                        rows={2}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900 outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Long Description (HTML)</label>
                    <textarea
                        name="long_description"
                        value={formData.long_description}
                        onChange={handleChange}
                        rows={6}
                        className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900 outline-none focus:ring-teal-500 focus:border-teal-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">Accepts basic HTML tags.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Title</label>
                        <input
                            type="text"
                            name="seo_title"
                            value={formData.seo_title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900 outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">SEO Description</label>
                        <input
                            type="text"
                            name="seo_description"
                            value={formData.seo_description}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 text-gray-900 outline-none focus:ring-teal-500 focus:border-teal-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                    >
                        Create Product
                    </button>
                </div>
            </form>
        </div>
    );
}
