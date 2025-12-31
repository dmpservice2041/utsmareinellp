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

## Alternative: If Root Directory Setting Doesn't Work

If setting the Root Directory doesn't work, you can try:

1. Remove the root `vercel.json` file
2. Keep only `apps/frontend/vercel.json`
3. Vercel should auto-detect the Next.js project in that directory

## Build Commands

The current configuration uses:
- **Build Command**: `npm run build:frontend` (runs from root, uses npm --prefix)
- **Output Directory**: `apps/frontend/.next`
- **Framework**: `nextjs`

## Troubleshooting

If you see errors like "cd apps/frontend: No such file or directory":
1. Check that the Root Directory is set correctly in Vercel dashboard
2. Verify that `apps/frontend` exists in your repository
3. Clear Vercel build cache and redeploy
