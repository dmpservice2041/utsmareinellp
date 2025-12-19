import Link from 'next/link';

interface BlogCardProps {
    title: string;
    excerpt: string;
    date: string;
    image: string;
    slug: string;
}

export default function BlogCard({ title, excerpt, date, image, slug }: BlogCardProps) {
    return (
        <div className="bg-white border rounded-lg overflow-hidden group hover:shadow-lg transition-shadow">
            <div className="relative h-52 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded shadow">
                    {date}
                </div>
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors line-clamp-2">
                    {title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {excerpt}
                </p>
                <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center text-sm font-semibold text-teal-600 hover:text-teal-800"
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
