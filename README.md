# UTS Marine LLP - Website Updates

## Project Overview
This is a Next.js website for UTS Marine LLP, a leading exporter and stockiest of marine ship spare parts. The project uses the Consulo theme with UTS Marine content.

## Recent Updates (Latest Session)

### 1. Header Component Fixes
**File**: `apps/frontend/src/components/layout/Header.tsx`

- ✅ **Removed top info bar** with emergency contact and social media links
- ✅ **Fixed navigation routes**:
  - `/about-us` → `/about`
  - `/contact-us` → `/contact`
  - `/two-stroke` → `/engine-parts/two-stroke`
  - `/four-stroke` → `/engine-parts/four-stroke`
- ✅ **Added Ship Machinery dropdown menu** with categories:
  - Turbochargers
  - Generators
  - Pumps & Motors
  - Navigation Equipment
  - Deck Equipment
  - View All Products
- ✅ **Applied to both desktop and mobile navigation**

### 2. Footer Component Updates
**File**: `apps/frontend/src/components/layout/Footer.tsx`

- ✅ **Fixed quick links** to use correct routes (`/about`, `/contact`)
- ✅ **Added social media section** with Facebook, Instagram, and LinkedIn links
- ✅ **Kept WhatsApp floating button** for easy contact

### 3. Consulo Theme Styling Applied

All components and pages updated to use Consulo theme colors (teal accents) instead of gray/dark colors:

#### Home Page Components:
- ✅ **Hero.tsx** - Already using teal colors correctly
- ✅ **Services.tsx** - Updated cards from dark gray to white with teal accents
- ✅ **FeaturesIntro.tsx** - Updated stats numbers and badges to use teal
- ✅ **FAQ.tsx** - Updated accordion buttons and badges from gray to teal

#### Pages:
- ✅ **About Page** (`/about`) - Updated badges, mission section, checkmarks, and numbered lists to teal
- ✅ **Contact Page** (`/contact`) - Updated icon backgrounds, badges, and FAQ buttons to teal
- ✅ **Services Page** (`/services`) - Updated all checkmarks, badges, numbered lists, and CTA button to teal
- ✅ **Engine Parts Landing** (`/engine-parts`) - Updated badges, card borders, icons to teal
- ✅ **Two-Stroke Page** (`/engine-parts/two-stroke`) - Updated background colors
- ✅ **Four-Stroke Page** (`/engine-parts/four-stroke`) - Updated background colors

### 4. Color Scheme Changes

**Before**: 
- Dark theme with `bg-gray-900`, `bg-gray-800`, `text-gray-300`
- Gray checkmarks and icons

**After** (Consulo Theme):
- Light theme with `bg-white`, `bg-gray-50`
- Teal primary color: `bg-teal-600`, `text-teal-600`
- Teal accent badges: `bg-teal-100` with `text-teal-600`
- Clean white cards with shadow-based depth
- Teal checkmarks and icons

## Key Features

### Navigation
- ✅ All routes working correctly (no 404 errors)
- ✅ Responsive mobile menu
- ✅ Dropdown menus for Engine Parts and Ship Machinery
- ✅ Social links in footer only

### Content Areas
- Home page with hero, stats, services, and FAQs
- About Us with company info and global presence
- Services with NDT testing details
- Engine Parts (Two-Stroke and Four-Stroke listings)
- Contact page with addresses, map, and contact form

### Design System
- **Primary Color**: Teal (#14b8a6 / teal-600)
- **Background**: White and light gray (gray-50)
- **Text**: Dark gray for body, black for headings
- **Shadows**: Used for depth instead of borders
- **Rounded Corners**: xl (12px) for cards

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Consulo Theme

## Contact Information
- **Company**: UTS Marine LLP
- **Emergency**: +91 9558424949
- **Email**: sales@utsmarinellp.com
- **Office**: Bhavnagar, Gujarat, India

## Developer
Developed by [DP Info System](https://dpinfosystem.in/)
