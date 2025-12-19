export default function Dashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 font-medium">Total Products</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
                    {/* Static for now, can perform fetch */}
                </div>

                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 font-medium">Published Blogs</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
                </div>

                <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
                    <h3 className="text-gray-500 font-medium">New Messages</h3>
                    <p className="text-3xl font-bold text-gray-900 mt-2">2</p>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="flex gap-4">
                    {/* Add buttons here */}
                    <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Add New Product</button>
                    <button className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700">Write New Article</button>
                </div>
            </div>
        </div>
    );
}
