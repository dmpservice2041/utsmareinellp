# Deployment Instructions

## Build Package Contents

The `marinellp-build.zip` file contains:
- `.next/` - Production build output
- `public/` - Static assets (images, videos, etc.)
- `src/` - Source code
- Configuration files (package.json, next.config.ts, etc.)

## Deployment Steps

### Option 1: Deploy to Vercel (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Import your GitHub repository: `https://github.com/dmpservice2041/utsmareinellp.git`
3. Set **Root Directory** to: `apps/frontend`
4. Vercel will automatically detect Next.js and deploy

### Option 2: Deploy to Any Node.js Server

1. Extract the zip file
2. Navigate to the extracted folder
3. Install dependencies:
   ```bash
   npm install --production
   ```
4. Start the server:
   ```bash
   npm start
   ```

### Option 3: Static Hosting (Limited - Some features may not work)

For static hosting, you'll need to:
1. Extract the zip
2. Install dependencies: `npm install`
3. The `.next` folder contains the built application
4. Configure your web server to serve the Next.js application

## Environment Variables

If needed, create a `.env.local` file with:
```
NEXT_PUBLIC_API_URL=your_api_url
```

## Build Information

- **Framework**: Next.js 16.0.8
- **React**: 19.2.1
- **Build Date**: $(date)

## Notes

- The build includes all product images
- All pages are pre-rendered where possible
- Dynamic routes (blog, products) require server-side rendering
