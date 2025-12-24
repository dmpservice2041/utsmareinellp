/**
 * API Configuration
 * Uses environment variables with fallback to defaults
 */

const getBackendUrl = (): string => {
  // In Next.js, environment variables prefixed with NEXT_PUBLIC_ are available on the client
  if (typeof window !== 'undefined') {
    // Client-side: use environment variable or default
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
  }
  // Server-side: use environment variable or default
  return process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
};

export const API_BASE_URL = getBackendUrl();

export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
  CHANGE_EMAIL: `${API_BASE_URL}/api/auth/change-email`,
  GET_CURRENT_USER: `${API_BASE_URL}/api/auth/me`,
  ENABLE_2FA: `${API_BASE_URL}/api/auth/2fa/enable`,
  VERIFY_2FA_SETUP: `${API_BASE_URL}/api/auth/2fa/verify-setup`,
  DISABLE_2FA: `${API_BASE_URL}/api/auth/2fa/disable`,
  GET_2FA_STATUS: `${API_BASE_URL}/api/auth/2fa/status`,

  // Admin Dashboard
  DASHBOARD_STATS: `${API_BASE_URL}/api/admin/dashboard/stats`,

  // Products (New Arrivals)
  PRODUCTS: `${API_BASE_URL}/api/admin/new-arrivals`,
  PRODUCT: (id: number | string) => `${API_BASE_URL}/api/admin/new-arrivals/${id}`,

  // Blogs
  BLOGS: `${API_BASE_URL}/api/admin/blogs`,
  BLOG: (id: number | string) => `${API_BASE_URL}/api/admin/blogs/${id}`,

  // Media
  MEDIA: `${API_BASE_URL}/api/admin/media`,
  MEDIA_UPLOAD: `${API_BASE_URL}/api/admin/media/upload`,
  MEDIA_ITEM: (id: number | string) => `${API_BASE_URL}/api/admin/media/${id}`,

  // Public
  PUBLIC_PRODUCTS: `${API_BASE_URL}/api/new-arrivals`,
  PUBLIC_PRODUCT_BY_SLUG: (slug: string) => `${API_BASE_URL}/api/new-arrivals/${slug}`,
  PUBLIC_BLOGS: `${API_BASE_URL}/api/blogs`,
  PUBLIC_BLOG_BY_SLUG: (slug: string) => `${API_BASE_URL}/api/blogs/${slug}`,

  // Contact
  CONTACT: `${API_BASE_URL}/api/contact`,
};

// Helper function to get upload URLs
export const getUploadUrl = (path: string): string => {
  if (!path) return '';
  // If path already starts with http, return as is (decode first to avoid double encoding)
  if (path.startsWith('http://') || path.startsWith('https://')) {
    try {
      const url = new URL(path);
      // Decode and re-encode to normalize, but don't double encode
      const decodedPath = decodeURIComponent(url.pathname);
      url.pathname = decodedPath.split('/').map(segment => encodeURIComponent(segment)).join('/');
      return url.toString();
    } catch {
      return path;
    }
  }
  // Otherwise, prepend backend URL and encode the path segments
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  // Decode first to avoid double encoding, then encode each segment
  const decodedPath = decodeURIComponent(cleanPath);
  const encodedPath = decodedPath.split('/').map(segment => {
    // Don't encode empty segments (double slashes)
    if (!segment) return '';
    return encodeURIComponent(segment);
  }).join('/');
  return `${API_BASE_URL}${encodedPath}`;
};
