'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';
import { API_ENDPOINTS, getUploadUrl } from '@/config/api';
import MediaGalleryPicker from '@/components/admin/MediaGalleryPicker';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    short_description: '',
    long_description: '',
    category: '',
    status: 'draft',
    priority: 0,
    is_featured: false,
    meta_title: '',
    meta_description: '',
    tags: '',
    featured_image: '',
    featured_image_id: null as number | null,
  });
  const [showMediaPicker, setShowMediaPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const productData = {
        title: formData.title,
        short_description: formData.short_description || null,
        long_description: formData.long_description || null,
        category: formData.category || null,
        featured_image: formData.featured_image || null,
        status: formData.status,
        priority: parseInt(String(formData.priority)) || 0,
        is_featured: formData.is_featured,
        meta_title: formData.meta_title || null,
        meta_description: formData.meta_description || null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(t => t) : [],
      };

      const response = await fetch(API_ENDPOINTS.PRODUCTS, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/products');
      } else {
        setError(data.error?.message || 'Failed to create product');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Products
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-1">Create a new product listing</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Enter product title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  name="short_description"
                  value={formData.short_description}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Description
                </label>
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Detailed description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                {formData.featured_image ? (
                  <div className="relative">
                    <img
                      src={getUploadUrl(formData.featured_image)}
                      alt="Featured"
                      className="w-full h-48 object-contain rounded-lg border border-gray-300 bg-gray-50"
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        console.error('Image failed to load:', getUploadUrl(formData.featured_image));
                        // Try direct URL as fallback
                        if (!img.src.includes('placeholder')) {
                          const baseUrl = API_ENDPOINTS.MEDIA.split('/api')[0];
                          const directUrl = `${baseUrl}${formData.featured_image}`;
                          console.log('Trying fallback URL:', directUrl);
                          img.src = directUrl;
                        } else {
                          img.src = '/placeholder-image.png';
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, featured_image: '', featured_image_id: null }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 shadow-lg"
                    >
                      <X size={16} />
                    </button>
                    <div className="mt-2 text-xs text-gray-500">
                      Selected: {formData.featured_image}
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowMediaPicker(true)}
                    className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-teal-500 hover:bg-teal-50 transition-colors"
                  >
                    <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to select image from gallery</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    placeholder="e.g., Engine Parts"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority
                  </label>
                  <input
                    type="number"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SEO */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="meta_title"
                  value={formData.meta_title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="SEO title (auto-generated if empty)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  name="meta_description"
                  value={formData.meta_description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="SEO description (auto-generated if empty)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="marine, engine, parts"
                />
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_featured"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                />
                <label htmlFor="is_featured" className="text-sm font-medium text-gray-700">
                  Featured Product
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end gap-3">
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors disabled:bg-gray-400"
          >
            <Save size={20} />
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>

      <MediaGalleryPicker
        isOpen={showMediaPicker}
        onClose={() => setShowMediaPicker(false)}
        onSelect={(mediaId, url) => {
          setFormData(prev => ({
            ...prev,
            featured_image: url,
            featured_image_id: mediaId,
          }));
          setShowMediaPicker(false);
        }}
        multiple={false}
      />
    </div>
  );
}
