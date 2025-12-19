import BlogCard from '../shared/BlogCard';

export default function BlogPreview() {
    const blogs = [
        {
            title: "Optimizing Marine Engine Efficiency for Long-Haul Voyages",
            excerpt: "Discover key strategies to maintain optimal engine performance and reduce fuel consumption during extended maritime operations.",
            date: "Dec 08, 2025",
            image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2576&auto=format&fit=crop",
            slug: "optimizing-engine-efficiency"
        },
        {
            title: "The Importance of Genuine Spare Parts in Ship Safety",
            excerpt: "Why compromising on spare parts quality involves significant risks to vessel safety and operational continuity.",
            date: "Nov 25, 2025",
            image: "https://images.unsplash.com/photo-1595166668734-703df77df83c?q=80&w=2670&auto=format&fit=crop",
            slug: "importance-genuine-parts"
        },
        {
            title: "Trends in Marine Machinery Maintenance 2025",
            excerpt: "Exploring the latest technologies and predictive maintenance trends shaping the future of the shipping industry.",
            date: "Oct 12, 2025",
            image: "https://images.unsplash.com/photo-1519802772250-a52a9af0eacb?q=80&w=2668&auto=format&fit=crop",
            slug: "maintenance-trends-2025"
        }
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <span className="text-teal-600 font-semibold tracking-wider uppercase">Latest Insights</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900">Marine Industry Blog</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((b, i) => (
                        <BlogCard key={i} {...b} />
                    ))}
                </div>
            </div>
        </section>
    );
}
