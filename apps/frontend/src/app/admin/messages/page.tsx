"use client";

import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/config/api';
import Pagination from '@/components/admin/Pagination';

export default function AdminMessages() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchMessages();
    }, [currentPage]);

    const fetchMessages = async () => {
        try {
            const params = new URLSearchParams();
            params.append('page', currentPage.toString());
            params.append('limit', '20');

            const res = await fetch(`${API_ENDPOINTS.CONTACT}?${params.toString()}`, {
                credentials: 'include',
            });
            if (res.ok) {
                const result = await res.json();
                // Handle both old array format (fallback) and new object format
                if (Array.isArray(result)) {
                    setMessages(result);
                } else {
                    setMessages(result.data || []);
                    if (result.meta) {
                        setTotalPages(result.meta.pages || 1);
                    }
                }
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

            <div className="bg-white rounded shadow text-gray-900">
                {messages.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No messages found.</div>
                ) : (
                    <table className="min-w-full">
                        <thead>
                            <tr className="border-b border-gray-200">
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">From</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Subject</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {messages.map((m: any) => (
                                <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(m.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-medium">
                                        {m.name} <br />
                                        <span className="text-xs text-gray-400 font-normal">{m.email}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-800">{m.subject}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                        {m.message}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
