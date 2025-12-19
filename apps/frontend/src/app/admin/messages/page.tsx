"use client";

import { useEffect, useState } from 'react';
import { API_ENDPOINTS } from '@/config/api';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(API_ENDPOINTS.contact, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                const data = await res.json();
                setMessages(data || []);
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
        </div>
    );
}
