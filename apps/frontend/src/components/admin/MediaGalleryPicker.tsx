'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { X, Image as ImageIcon, Check, Search } from 'lucide-react';
import { API_ENDPOINTS, getUploadUrl } from '@/config/api';

interface MediaItem {
  id: number;
  filename: string;
  original_filename: string;
  urls: {
    original: string;
    optimized: string;
    thumbnail: string;
  };
}

interface MediaGalleryPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (mediaId: number, url: string) => void;
  multiple?: boolean;
  selectedIds?: number[];
}

export default function MediaGalleryPicker({
  isOpen,
  onClose,
  onSelect,
  multiple = false,
  selectedIds = [],
}: MediaGalleryPickerProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selected, setSelected] = useState<number[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const prevSelectedIdsRef = useRef<string>('');

  const fetchMedia = useCallback(async (search: string = '') => {
    // Cancel previous request if still pending
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    setLoading(true);
    try {
      const url = new URL(API_ENDPOINTS.MEDIA);
      if (search) {
        url.searchParams.append('search', search);
      }

      const response = await fetch(url.toString(), {
        credentials: 'include',
        signal,
      });

      if (response.ok && !signal.aborted) {
        const result = await response.json();
        setMedia(result.data || []);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching media:', error);
        setMedia([]);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  // Initialize selected when modal opens or selectedIds changes
  useEffect(() => {
    if (!isOpen) return;
    
    const selectedIdsStr = JSON.stringify(selectedIds);
    if (prevSelectedIdsRef.current !== selectedIdsStr) {
      setSelected(selectedIds);
      prevSelectedIdsRef.current = selectedIdsStr;
    }
  }, [isOpen, selectedIds]);

  // Fetch media when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      fetchMedia('');
    } else {
      // Reset when closed
      setMedia([]);
      setSearchTerm('');
      setLoading(false);
      setSelected([]);
      prevSelectedIdsRef.current = '';
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    }
  }, [isOpen, fetchMedia]);

  // Debounced search
  useEffect(() => {
    if (!isOpen) return;

    const timeoutId = setTimeout(() => {
      fetchMedia(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTerm, isOpen, fetchMedia]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const handleSelect = (item: MediaItem) => {
    if (multiple) {
      const newSelected = selected.includes(item.id)
        ? selected.filter((id) => id !== item.id)
        : [...selected, item.id];
      setSelected(newSelected);
    } else {
      onSelect(item.id, item.urls.optimized);
      onClose();
    }
  };

  const handleConfirm = () => {
    if (multiple && selected.length > 0) {
      selected.forEach((id) => {
        const item = media.find((m) => m.id === id);
        if (item) {
          onSelect(item.id, item.urls.optimized);
        }
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold">
            {multiple ? 'Select Images' : 'Select Image'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
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
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading media...</p>
              </div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {searchTerm ? 'No images found' : 'No images uploaded yet'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => {
                const isSelected = selected.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className={`relative group cursor-pointer rounded-lg border-2 overflow-hidden transition-all ${
                      isSelected
                        ? 'border-teal-500 ring-2 ring-teal-200'
                        : 'border-gray-200 hover:border-teal-300'
                    }`}
                  >
                    <div className="aspect-square relative bg-gray-100">
                      <img
                        src={getUploadUrl(item.urls.thumbnail)}
                        alt={item.original_filename}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-teal-500 bg-opacity-20 flex items-center justify-center">
                          <div className="bg-teal-500 text-white rounded-full p-2">
                            <Check size={20} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-2 bg-white">
                      <p className="text-xs text-gray-600 truncate" title={item.original_filename}>
                        {item.original_filename}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
          {multiple && (
            <p className="text-sm text-gray-600">
              {selected.length} image{selected.length !== 1 ? 's' : ''} selected
            </p>
          )}
          <div className="flex gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            {multiple && (
              <button
                onClick={handleConfirm}
                disabled={selected.length === 0}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Select {selected.length > 0 && `(${selected.length})`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
