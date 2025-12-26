'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { getUploadUrl } from '@/config/api';

interface BlogCardProps {
    title: string;
    excerpt: string;
    date: string;
    image: string;
    slug: string;
    category?: string;
}

export default function BlogCard({ title, excerpt, date, image, slug, category }: BlogCardProps) {
    // Check if image exists and is not empty
    const hasImage = image && image.trim() !== '' && !image.includes('placehold.co');
    const imageUrl = hasImage ? getUploadUrl(image) : null;
    const imgRef = useRef<HTMLImageElement>(null);
    const [imageError, setImageError] = useState(false);
    
    useEffect(() => {
        if (imgRef.current) {
            const img = imgRef.current;
            const handleError = () => {
                setImageError(true);
                img.style.display = 'none';
            };
            img.addEventListener('error', handleError);
            return () => img.removeEventListener('error', handleError);
        }
    }, [imageUrl]);

    // Format date
    const formatDate = (dateString: string) => {
        try {
            if (!dateString) {
                return '';
            }
            const date = new Date(dateString);
            // Check if date is valid
            if (isNaN(date.getTime())) {
                return '';
            }
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        } catch {
            return '';
        }
    };

    return (
        <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative h-64 bg-white overflow-hidden flex items-center justify-center p-4">
                {hasImage && imageUrl && !imageError ? (
                    <img
                        ref={imgRef}
                        src={imageUrl}
                        alt={title}
                        className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                    />
                ) : null}
                {/* No Image Placeholder */}
                <div className={`no-image-placeholder absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 ${hasImage && imageUrl && !imageError ? 'hidden' : ''}`}>
                    <svg className="w-16 h-16 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-gray-500">No Image</p>
                    <p className="text-xs text-gray-400 mt-1">Available</p>
                </div>
                {category && (
                    <span className="absolute top-4 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded z-10">
                        {category}
                    </span>
                )}
                {formatDate(date) && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1 rounded shadow z-10">
                        {formatDate(date)}
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {title}
                </h3>
                {excerpt && (
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                        {excerpt}
                    </p>
                )}
                <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors"
                >
                    Read Article
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
