# Vercel Deployment Configuration

## Monorepo Setup

This project uses a monorepo structure with the frontend in `apps/frontend/`.

## Required Vercel Configuration

**IMPORTANT:** You must configure the Root Directory in your Vercel project settings:

1. Go to your Vercel project dashboard: https://vercel.com/dashboard
2. Select your project
3. Navigate to **Settings** → **General**
4. Scroll down to **Root Directory**
5. Set it to: `apps/frontend`
6. Click **Save**
7. Redeploy your project

This tells Vercel to:
- Treat `apps/frontend` as the project root
- Run all commands from that directory
- Look for `package.json` in that directory
- Use `.next` as the output directory automatically

## Current Configuration

- **Root Directory**: Must be set to `apps/frontend` in Vercel dashboard
- **vercel.json**: Located in `apps/frontend/vercel.json` (minimal config)
- **Framework**: Auto-detected as `nextjs`
- **Output Directory**: `.next` (relative to root directory)
- **Build Command**: Auto-detected as `npm run build`
- **Install Command**: Auto-detected as `npm install`

## Troubleshooting Build Errors

If you see "npm error Lifecycle script `build` failed":
1. **Check the actual error in Vercel build logs** - Click on the failed deployment to see the full error message
2. **Verify Root Directory is set** to `apps/frontend` in Vercel dashboard
3. **Clear build cache** in Vercel dashboard (Settings → General → Clear Build Cache)
4. **Check Node.js version** - Ensure it's 18+ (specified in package.json engines)
5. **Verify all dependencies** are in `apps/frontend/package.json`

## Local Build Test

To test the build locally (should match Vercel):
```bash
cd apps/frontend
npm install
npm run build
```

If local build works but Vercel fails, check:
- Root Directory setting in Vercel dashboard
- Environment variables (if any are required)
- Build cache issues
