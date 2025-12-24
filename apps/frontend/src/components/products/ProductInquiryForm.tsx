'use client';

import { useState } from 'react';
import { API_ENDPOINTS } from '@/config/api';

interface ProductInquiryFormProps {
    productTitle: string;
}

export default function ProductInquiryForm({ productTitle }: ProductInquiryFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch(API_ENDPOINTS.CONTACT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    subject: `Inquiry: ${productTitle}`,
                    message: formData.message,
                    productTitle: productTitle,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
                // Reset success message after 5 seconds
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(data.message || 'Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('Connection error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-auto bg-gradient-to-r from-teal-50 to-teal-100 border-2 border-teal-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-teal-900 mb-2">Interested in this part?</h3>
            <p className="text-teal-800 mb-6 leading-relaxed text-sm">
                Fill out the form below and we'll get back to you with pricing and availability.
            </p>

            {success && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg">
                    <p className="font-semibold">✓ Message sent successfully!</p>
                    <p className="text-sm mt-1">We'll get back to you soon.</p>
                </div>
            )}

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg">
                    <p className="font-semibold">Error</p>
                    <p className="text-sm mt-1">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-teal-900 mb-2">
                        Your Name *
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
                        placeholder="Enter your name"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-teal-900 mb-2">
                        Your Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-teal-900 mb-2">
                        Your Message *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none bg-white resize-none"
                        placeholder="Tell us about your requirements, quantity needed, or any questions..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                >
                    {loading ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            Submit Inquiry
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
