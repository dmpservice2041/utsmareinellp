# Deployment Guide - UTS Marine LLP

## Architecture Overview

Your application consists of:
1. **Frontend**: Next.js 16 (React 19) - Some pages use Server-Side Rendering (SSR)
2. **Backend**: Express.js API server (Node.js/TypeScript)
3. **Database**: MySQL (via Sequelize)

## Current Setup Analysis

### Frontend Pages:
- **Static/SSR Pages**: Home, About, Services, Contact, Blog listing, New Arrivals listing
- **Dynamic Pages**: Blog detail, Product detail (use SSR with API calls)
- **Admin Pages**: All client-side, require backend API

### Backend Requirements:
- Express.js server on port 5001 (or configured port)
- MySQL database
- File uploads directory (`public/uploads/`)
- Environment variables (JWT_SECRET, DB config, etc.)

## Deployment Options

### Option 1: VPS (Recommended - Best for Full Stack)

**Pros:**
- ✅ Can host both frontend and backend
- ✅ Full control over environment
- ✅ Supports SSR (Server-Side Rendering)
- ✅ Better performance
- ✅ Can use PM2 for process management

**Cons:**
- ❌ Requires server management knowledge
- ❌ Need to configure Nginx/Apache
- ❌ SSL certificate setup needed

**Setup Steps:**
1. **Deploy Backend:**
   ```bash
   # On VPS
   cd apps/backend
   npm install --production
   # Configure .env file
   npm run start
   # Or use PM2: pm2 start src/index.ts --name backend
   ```

2. **Deploy Frontend:**
   ```bash
   # On VPS
   cd apps/frontend
   npm install
   npm run build
   npm run start
   # Or use PM2: pm2 start npm --name frontend -- start
   ```

3. **Configure Nginx:**
   ```nginx
   # Frontend (port 3000)
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   
   # Backend API (port 5001)
   server {
       listen 80;
       server_name api.yourdomain.com;
       
       location / {
           proxy_pass http://localhost:5001;
           proxy_http_version 1.1;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

**Cost:** $5-20/month (DigitalOcean, Linode, Vultr, etc.)

---

### Option 2: cPanel + Separate Backend Hosting

**Pros:**
- ✅ Easy to use (familiar interface)
- ✅ Good for static sites
- ✅ Usually includes SSL

**Cons:**
- ❌ Can't run Node.js backend on cPanel (need separate hosting)
- ❌ SSR pages won't work (need static export)
- ❌ More complex setup (two hosting locations)

**Setup Steps:**

1. **Build Static Export (Limited):**
   ```bash
   cd apps/frontend
   # Update next.config.ts to enable static export
   npm run build
   # Upload 'out' folder to cPanel public_html
   ```

2. **Deploy Backend Separately:**
   - Use a VPS or Node.js hosting (Railway, Render, etc.)
   - Update frontend API URL to point to backend

**Note:** This won't work well because:
- Blog and New Arrivals pages use SSR (async server components)
- Admin pages need backend API
- Static export will break these features

**Cost:** cPanel ($5-15/month) + Backend hosting ($5-10/month)

---

### Option 3: Static Export + Backend API (Hybrid)

**Pros:**
- ✅ Can use cPanel for frontend
- ✅ Backend on separate hosting

**Cons:**
- ❌ Need to convert SSR pages to client-side
- ❌ SEO impact (client-side rendering)
- ❌ More development work

**Required Changes:**
- Convert blog/new-arrival pages from SSR to client-side
- Use `useEffect` to fetch data instead of async server components

---

## Recommended: VPS Deployment (Easiest & Best)

### Quick Setup Script for VPS

```bash
#!/bin/bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt-get install -y nginx

# Clone your repo
git clone https://github.com/dmpservice2041/utsmareinellp.git
cd utsmareinellp

# Setup Backend
cd apps/backend
npm install --production
# Create .env file with your config
pm2 start src/index.ts --name backend --interpreter ts-node

# Setup Frontend
cd ../frontend
npm install
npm run build
pm2 start npm --name frontend -- start

# Save PM2 configuration
pm2 save
pm2 startup
```

### Environment Variables

**Backend (.env in apps/backend/):**
```env
NODE_ENV=production
PORT=5001
JWT_SECRET=your-32-character-secret-key-here
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
FRONTEND_URL=https://yourdomain.com
BACKEND_URL=https://api.yourdomain.com
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

**Frontend (.env.local in apps/frontend/):**
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Testing Deployment Locally

Before deploying, test the production build:

```bash
# Backend
cd apps/backend
npm install --production
npm run start

# Frontend (in another terminal)
cd apps/frontend
npm install
npm run build
npm run start
```

Visit: http://localhost:3000 (should work with backend on :5001)

---

## Which Option to Choose?

### For Testing/Development:
- **VPS** - Best option, full functionality

### For Production:
- **VPS** - Recommended (best performance, full features)
- **Vercel (Frontend) + VPS (Backend)** - Good alternative if you want managed frontend

### Avoid:
- **Static Export Only** - Will break SSR pages and admin features
- **cPanel Only** - Can't run Node.js backend

---

## Next Steps

1. **Choose VPS provider** (DigitalOcean, Linode, Vultr recommended)
2. **Set up server** (Ubuntu 22.04 LTS recommended)
3. **Follow VPS setup script above**
4. **Configure domain** and SSL (Let's Encrypt)
5. **Test everything** before going live

Would you like me to:
1. Create a static export version (with limitations)?
2. Create detailed VPS setup scripts?
3. Help configure for a specific hosting provider?

