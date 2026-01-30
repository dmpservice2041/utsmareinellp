'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Search,
  Trash2,
  X,
  Image as ImageIcon,
  FileImage,
  Edit,
  Eye,
  Download,
} from 'lucide-react';
import { API_ENDPOINTS, getUploadUrl } from '@/config/api';
import Pagination from '@/components/admin/Pagination';

interface MediaItem {
  id: number;
  filename: string;
  original_filename: string;
  file_path: string;
  optimized_path: string;
  thumbnail_path: string;
  file_size: number;
  optimized_size: number;
  thumbnail_size: number;
  mime_type: string;
  width: number;
  height: number;
  alt_text?: string;
  caption?: string;
  processing_status: string;
  created_at: string;
  urls: {
    original: string;
    optimized: string;
    thumbnail: string;
  };
}

export default function MediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({ alt_text: '', caption: '' });
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when search changes
  }, [searchTerm]);

  useEffect(() => {
    fetchMedia();
  }, [searchTerm, currentPage]);

  const fetchMedia = async () => {
    try {
      const params = new URLSearchParams();
      params.append('page', currentPage.toString());
      params.append('limit', '20');

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`${API_ENDPOINTS.MEDIA}?${params.toString()}`, {
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        setMedia(result.data);
        if (result.meta) {
          setTotalPages(result.meta.pages || 1);
        }
      }
    } catch (error) {
      console.error('Error fetching media:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(API_ENDPOINTS.MEDIA_UPLOAD, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (response.ok) {
        await fetchMedia();
      } else {
        const error = await response.json();
        alert(`Upload failed: ${error.error?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      // Read CSRF token from cookie
      const csrfToken = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrf_token='))
        ?.split('=')[1];

      const response = await fetch(API_ENDPOINTS.MEDIA_ITEM(id), {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-CSRF-Token': csrfToken || '',
        },
      });

      if (response.ok) {
        setMedia(media.filter((item) => item.id !== id));
        setShowPreview(false);
      }
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  const handleEditSubmit = async () => {
    if (!selectedMedia) return;

    try {
      const response = await fetch(
        API_ENDPOINTS.MEDIA_ITEM(selectedMedia.id),
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        await fetchMedia();
        setShowEditModal(false);
        setShowPreview(false);
      }
    } catch (error) {
      console.error('Error updating media:', error);
    }
  };

  const openPreview = (item: MediaItem) => {
    setSelectedMedia(item);
    setShowPreview(true);
  };

  const openEdit = (item: MediaItem) => {
    setSelectedMedia(item);
    setEditData({
      alt_text: item.alt_text || '',
      caption: item.caption || '',
    });
    setShowEditModal(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading media...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 flex items-center gap-2"
        >
          <Upload size={18} />
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      {/* Upload Area */}
      <div
        className={`mb-6 border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
          ? 'border-teal-500 bg-teal-50'
          : 'border-gray-300 bg-gray-50'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
        <FileImage className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600 mb-2">
          Drag and drop images here, or click to select
        </p>
        <p className="text-sm text-gray-500">
          Supports JPG, PNG, GIF, WebP. Max 10MB. Auto-optimizes on upload.
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search images..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Media Grid */}
      {media.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">
            {searchTerm ? 'No images found' : 'No images uploaded yet'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square relative bg-gray-100">
                  <img
                    src={getUploadUrl(item.urls.thumbnail)}
                    alt={item.alt_text || item.original_filename}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => openPreview(item)}
                      className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100"
                      title="Preview"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => openEdit(item)}
                      className="p-2 bg-white text-gray-700 rounded-lg hover:bg-gray-100"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="p-2">
                  <p className="text-xs text-gray-600 truncate" title={item.original_filename}>
                    {item.original_filename}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(item.file_size)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {/* Preview Modal */}
      {showPreview && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Image Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <img
                src={getUploadUrl(selectedMedia.urls.optimized)}
                alt={selectedMedia.alt_text || selectedMedia.original_filename}
                className="w-full rounded-lg mb-4"
              />

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Original Filename:</p>
                  <p className="font-medium">{selectedMedia.original_filename}</p>
                </div>
                <div>
                  <p className="text-gray-600">File Size:</p>
                  <p className="font-medium">{formatFileSize(selectedMedia.file_size)}</p>
                </div>
                <div>
                  <p className="text-gray-600">Dimensions:</p>
                  <p className="font-medium">{selectedMedia.width} × {selectedMedia.height}</p>
                </div>
                <div>
                  <p className="text-gray-600">Mime Type:</p>
                  <p className="font-medium">{selectedMedia.mime_type}</p>
                </div>
                {selectedMedia.alt_text && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Alt Text:</p>
                    <p className="font-medium">{selectedMedia.alt_text}</p>
                  </div>
                )}
                {selectedMedia.caption && (
                  <div className="col-span-2">
                    <p className="text-gray-600">Caption:</p>
                    <p className="font-medium">{selectedMedia.caption}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-6">
                <a
                  href={getUploadUrl(selectedMedia.urls.original)}
                  download
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  <Download size={18} />
                  Download Original
                </a>
                <button
                  onClick={() => openEdit(selectedMedia)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  <Edit size={18} />
                  Edit Metadata
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && selectedMedia && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold">Edit Image Metadata</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={editData.alt_text}
                  onChange={(e) =>
                    setEditData({ ...editData, alt_text: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder="Descriptive alt text for accessibility"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Caption
                </label>
                <textarea
                  value={editData.caption}
                  onChange={(e) =>
                    setEditData({ ...editData, caption: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Optional caption"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleEditSubmit}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
