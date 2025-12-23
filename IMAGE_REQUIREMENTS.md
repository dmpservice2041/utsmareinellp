# Image Requirements by Page

This document lists all images required for the website, organized by page with their expected names, sizes, and usage.

---

## 🏠 **HOME PAGE** (`/`)

### Header/Logo
- **File Name:** `logo.png`
- **Location:** `/public/logo.png`
- **Size:** 200x60px (or similar aspect ratio, height ~60px)
- **Format:** PNG (with transparency preferred)
- **Usage:** Header logo on all pages

### Hero Section (Homepage)
- **File Name:** `drone-video.webm` and `drone-video.mp4`
- **Location:** `/public/`
- **Size:** Full HD (1920x1080) or 4K (3840x2160)
- **Format:** WebM (primary) and MP4 (fallback)
- **Usage:** Background video for hero section (desktop only)
- **Note:** Mobile uses a static image background (currently from Unsplash)

### Product Highlights Section
- **File Name:** `piston.jpg`
- **Location:** `/public/piston.jpg`
- **Size:** 700x480px (or similar landscape ratio)
- **Format:** JPG
- **Usage:** Main Engine Piston product card
- **Container Size:** 400x256px (displays with object-contain)

- **File Name:** `turbocharger.jpg`
- **Location:** `/public/turbocharger.jpg`
- **Size:** 700x480px (or similar landscape ratio)
- **Format:** JPG
- **Usage:** Turbocharger Unit product card
- **Container Size:** 400x256px (displays with object-contain)

- **File Name:** `hydraulic-pump.jpg`
- **Location:** `/public/hydraulic-pump.jpg`
- **Size:** 700x480px (or similar landscape ratio)
- **Format:** JPG
- **Usage:** Hydraulic Pump product card
- **Container Size:** 400x256px (displays with object-contain)

- **File Name:** `air-compressor.jpg`
- **Location:** `/public/air-compressor.jpg`
- **Size:** 700x480px (or similar landscape ratio)
- **Format:** JPG
- **Usage:** Air Compressor product card
- **Container Size:** 400x256px (displays with object-contain)

---

## 📄 **ABOUT US PAGE** (`/about`)

### Banner Header
- **File Name:** `about-banner.jpg`
- **Location:** `/public/about-banner.jpg`
- **Size:** 1920x500px (full width banner)
- **Format:** JPG
- **Usage:** Background image for page banner
- **Display Size:** Full width, height 400px (mobile) / 500px (desktop)

### Why Choose Us Section
- **File Name:** `about-why-choose-us.jpg`
- **Location:** `/public/about-why-choose-us.jpg`
- **Size:** 1200x800px (or 3:2 aspect ratio)
- **Format:** JPG
- **Usage:** Large image in "Why Choose Us" section
- **Display Size:** Container height 500px, full width

### Gallery Images (5 images)
- **File Name:** `about-gallery-1.jpg` through `about-gallery-5.jpg`
- **Location:** `/public/about-gallery-1.jpg` to `/public/about-gallery-5.jpg`
- **Size:** 800x600px (4:3 aspect ratio) each
- **Format:** JPG
- **Usage:** Gallery section showing company/workspace images
- **Display Size:** Grid layout, responsive

---

## 🔧 **SERVICES PAGE** (`/services`)

### Banner Header
- **File Name:** `services-banner.jpg`
- **Location:** `/public/services-banner.jpg`
- **Size:** 1920x500px (full width banner)
- **Format:** JPG
- **Usage:** Background image for page banner
- **Display Size:** Full width, height 400px (mobile) / 500px (desktop)

---

## 📞 **CONTACT US PAGE** (`/contact`)

### Banner Header
- **File Name:** `contact-banner.jpg`
- **Location:** `/public/contact-banner.jpg`
- **Size:** 1920x550px (full width banner)
- **Format:** JPG
- **Usage:** Background image for page banner
- **Display Size:** Full width, height 450px (mobile) / 550px (desktop)

---

## ⚙️ **ENGINE PARTS PAGES**

### Engine Parts Main Page (`/engine-parts`)
- **File Name:** `engine-parts-banner.jpg`
- **Location:** `/public/engine-parts-banner.jpg`
- **Size:** 1920x500px (full width banner)
- **Format:** JPG
- **Usage:** Background image for page banner

### Two Stroke Page (`/engine-parts/two-stroke`)
- **File Name:** `two-stroke-banner.jpg`
- **Location:** `/public/two-stroke-banner.jpg`
- **Size:** 1920x500px (full width banner)
- **Format:** JPG
- **Usage:** Background image for page banner

### Four Stroke Page (`/engine-parts/four-stroke`)
- **File Name:** `four-stroke-banner.jpg`
- **Location:** `/public/four-stroke-banner.jpg`
- **Size:** 1920x500px (full width banner)
- **Format:** JPG
- **Usage:** Background image for page banner

---

## 📦 **PRODUCTS PAGES**

### Products Listing Page (`/products`)
- **File Name:** Products are loaded from database/API
- **Size:** 600x400px (3:2 aspect ratio) recommended
- **Format:** JPG/PNG
- **Usage:** Product cards (uses ProductCard component)
- **Display Size:** 400x256px container (same as homepage product cards)

### Product Detail Page (`/products/[slug]`)
- **File Name:** Products are loaded from database/API
- **Size:** 1200x900px (4:3 aspect ratio) recommended
- **Format:** JPG/PNG
- **Usage:** Main product image
- **Display Size:** Full width, responsive

---

## 📝 **BLOG PAGES**

### Blog Listing Page (`/blog`)
- **File Name:** Blog images are loaded from database/API
- **Size:** 800x500px (16:10 aspect ratio) recommended
- **Format:** JPG/PNG
- **Usage:** Blog post cards
- **Display Size:** Responsive grid

### Blog Detail Page (`/blog/[slug]`)
- **File Name:** Blog images are loaded from database/API
- **Size:** 1200x600px (2:1 aspect ratio) recommended
- **Format:** JPG/PNG
- **Usage:** Featured blog image
- **Display Size:** Full width, responsive

---

## 📋 **SUMMARY - Required Static Images**

### Priority 1 (Currently Used):
1. ✅ `logo.png` - Header logo (200x60px)
2. ✅ `piston.jpg` - Homepage product (700x480px)
3. ✅ `turbocharger.jpg` - Homepage product (700x480px)
4. ✅ `hydraulic-pump.jpg` - Homepage product (700x480px)
5. ✅ `air-compressor.jpg` - Homepage product (700x480px)
6. ✅ `drone-video.webm` - Hero video (1920x1080)
7. ✅ `drone-video.mp4` - Hero video fallback (1920x1080)

### Priority 2 (Currently Using Placeholders):
1. ⚠️ `about-banner.jpg` - About page banner (1920x500px)
2. ⚠️ `about-why-choose-us.jpg` - About page image (1200x800px)
3. ⚠️ `about-gallery-1.jpg` to `about-gallery-5.jpg` - Gallery images (800x600px each)
4. ⚠️ `services-banner.jpg` - Services page banner (1920x500px)
5. ⚠️ `contact-banner.jpg` - Contact page banner (1920x550px)
6. ⚠️ `engine-parts-banner.jpg` - Engine parts banner (1920x500px)
7. ⚠️ `two-stroke-banner.jpg` - Two stroke page banner (1920x500px)
8. ⚠️ `four-stroke-banner.jpg` - Four stroke page banner (1920x500px)

---

## 📐 **Image Size Guidelines**

### Banner Images:
- **Width:** 1920px (full HD)
- **Height:** 400-550px (varies by page)
- **Aspect Ratio:** ~3.8:1 to 4:1
- **Format:** JPG (optimized, 80-90% quality)

### Product Images:
- **Width:** 700px
- **Height:** 480px
- **Aspect Ratio:** ~1.46:1 (landscape)
- **Format:** JPG (optimized, 85% quality)

### Gallery Images:
- **Width:** 800px
- **Height:** 600px
- **Aspect Ratio:** 4:3
- **Format:** JPG (optimized, 85% quality)

### Logo:
- **Height:** 60px (width auto, maintain aspect ratio)
- **Format:** PNG (with transparency)
- **Max Width:** 200px

---

## 🎨 **Image Optimization Tips**

1. **Compression:** Use tools like TinyPNG, ImageOptim, or Squoosh
2. **Format:** Use JPG for photos, PNG for logos/graphics
3. **Naming:** Use lowercase, hyphens for spaces (e.g., `about-banner.jpg`)
4. **Alt Text:** All images should have descriptive alt text (already implemented in code)
5. **Responsive:** Images should work well at different screen sizes
6. **File Size:** Aim for:
   - Banners: < 300KB
   - Product images: < 150KB
   - Gallery images: < 200KB
   - Logo: < 50KB

---

## 📁 **File Structure**

All images should be placed in:
```
/apps/frontend/public/
```

Example structure:
```
/public/
  ├── logo.png
  ├── piston.jpg
  ├── turbocharger.jpg
  ├── hydraulic-pump.jpg
  ├── air-compressor.jpg
  ├── drone-video.webm
  ├── drone-video.mp4
  ├── about-banner.jpg
  ├── about-why-choose-us.jpg
  ├── about-gallery-1.jpg
  ├── about-gallery-2.jpg
  ├── about-gallery-3.jpg
  ├── about-gallery-4.jpg
  ├── about-gallery-5.jpg
  ├── services-banner.jpg
  ├── contact-banner.jpg
  ├── engine-parts-banner.jpg
  ├── two-stroke-banner.jpg
  └── four-stroke-banner.jpg
```

---

## ✅ **Checklist**

- [ ] Logo created and optimized
- [ ] All 4 product images created (piston, turbocharger, hydraulic-pump, air-compressor)
- [ ] Hero video created (drone-video.webm and .mp4)
- [ ] About page banner created
- [ ] About page "Why Choose Us" image created
- [ ] 5 About page gallery images created
- [ ] Services page banner created
- [ ] Contact page banner created
- [ ] Engine parts banners created (main, two-stroke, four-stroke)
- [ ] All images optimized for web
- [ ] All images follow naming conventions
- [ ] All images placed in `/public/` directory
