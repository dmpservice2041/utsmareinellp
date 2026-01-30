#!/bin/bash

# Frontend Deployment Script for Next.js Standalone Build
# This script ensures static assets are properly copied for production deployment

echo "🚀 Starting frontend deployment..."

# Navigate to frontend directory
cd apps/frontend

# Build the Next.js application
echo "📦 Building Next.js application..."
npm run build

# Copy static assets to standalone directory
echo "📁 Copying static assets..."

# Copy .next/static to standalone/.next/static
cp -r .next/static .next/standalone/apps/frontend/.next/

# Copy public folder to standalone/apps/frontend/public
cp -r ../../public .next/standalone/apps/frontend/ 2>/dev/null || cp -r public .next/standalone/apps/frontend/ 2>/dev/null || echo "No public folder found in expected locations"

echo "✅ Frontend build complete!"
echo "📍 Standalone server location: apps/frontend/.next/standalone/apps/frontend/server.js"
echo ""
echo "To deploy to VPS:"
echo "1. git add -f apps/frontend/.next"
echo "2. git commit -m 'Update frontend build with assets'"
echo "3. git push origin main"
echo "4. On VPS: git pull origin main"
echo "5. On VPS: pm2 restart marinellp-frontend"
