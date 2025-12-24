'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Image as ImageIcon, X } from 'lucide-react';
import Link from 'next/link';
import { API_ENDPOINTS, getUploadUrl } from '@/config/api';
import MediaGalleryPicker from '@/components/admin/MediaGalleryPicker';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    status: 'draft',
    author: '',
    meta_title: '',
    meta_description: '',
    focus_keyword: '',
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
      const token = localStorage.getItem('adminToken');
      const blogData = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      };

      const response = await fetch(API_ENDPOINTS.BLOGS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(blogData),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/admin/blogs');
      } else {
        setError(data.error?.message || 'Failed to create blog post');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <Link
          href="/admin/blogs"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft size={20} />
          Back to Blogs
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Add New Blog Post</h1>
        <p className="text-gray-600 mt-1">Create a new blog article</p>
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
                  Blog Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <RichTextEditor
                  value={formData.content}
                  onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                  placeholder="Write your blog content here..."
                />
                <p className="text-sm text-gray-500 mt-2">Use the toolbar above to format your text (bold, italic, colors, fonts, etc.)</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                  placeholder="Brief summary (auto-generated if empty)"
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
                      className="w-full h-48 object-cover rounded-lg border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, featured_image: '', featured_image_id: null }));
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X size={16} />
                    </button>
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
                    placeholder="e.g., News, Technical"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    placeholder="Author name"
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Keyword
                  </label>
                  <input
                    type="text"
                    name="focus_keyword"
                    value={formData.focus_keyword}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none"
                    placeholder="Primary keyword"
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
                    placeholder="marine, news, guide"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h2>
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
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl flex justify-end gap-3">
          <Link
            href="/admin/blogs"
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
            {loading ? 'Saving...' : 'Save Blog'}
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
