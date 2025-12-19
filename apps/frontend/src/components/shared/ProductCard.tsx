import Link from 'next/link';

interface ProductCardProps {
    title: string;
    image: string;
    category: string;
    slug: string;
}

export default function ProductCard({ title, image, category, slug }: ProductCardProps) {
    return (
        <div className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-60 bg-gray-100 overflow-hidden">
                {/* Placeholder for Next/Image or just standard img for now */}
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded">
                    {category}
                </span>
            </div>
            <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 truncate">{title}</h3>
                <Link
                    href={`/products/${slug}`}
                    className="inline-block text-sm font-semibold text-teal-600 hover:text-teal-800"
                >
                    View Details →
                </Link>
            </div>
        </div>
    );
}
