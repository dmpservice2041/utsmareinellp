/**
 * API Configuration
 * Centralized configuration for API endpoints
 * Uses environment variables for different environments
 */

// Get API URL from environment variable, fallback to localhost for development
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// API endpoint helpers
export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: `${API_BASE_URL}/api/auth/login`,
  },
  
  // Contact endpoints
  contact: `${API_BASE_URL}/api/contact`,
  
  // Blog endpoints
  blogs: {
    list: (limit?: number) => `${API_BASE_URL}/api/blogs${limit ? `?limit=${limit}` : ''}`,
    detail: (slug: string) => `${API_BASE_URL}/api/blogs/${slug}`,
    create: `${API_BASE_URL}/api/blogs`,
  },
  
  // Product endpoints
  products: {
    list: (limit?: number) => `${API_BASE_URL}/api/products${limit ? `?limit=${limit}` : ''}`,
    detail: (slug: string) => `${API_BASE_URL}/api/products/${slug}`,
    create: `${API_BASE_URL}/api/products`,
  },
};
