# UTS Marine LLP - Deployment Guide

This guide details how to update and deploy changes to the **Frontend (Next.js)** and **Backend (Node.js/Express)**.

## Prerequisites
- **Local:** Git installed.
- **VPS:** Git, Node.js, PM2 installed.
- **Access:** SSH or VNC access to the VPS.

---

## 1. Frontend Deployment (Next.js)

### Step 1: Local Build & Push
On your local machine (Mac):

1.  **Navigate to frontend directory:**
    ```bash
    cd apps/frontend
    ```

2.  **Build the project:**
    This generates the `.next` folder with the standalone build.
    ```bash
    npm run build
    ```

3.  **Commit and Push:**
    We force-add the `.next` folder because it's usually ignored, but we need it for the VPS (to save memory).
    ```bash
    # Go back to root
    cd ../..

    # Force add .next folder
    git add -f apps/frontend/.next

    # Commit and push
    git commit -m "Update frontend build"
    git push origin main
    ```

### Step 2: VPS Deployment
On your VPS (via SSH/VNC):

1.  **Navigate to project folder:**
    ```bash
    cd /home/UTS/web/utsmarinellp.com/public_html
    ```

2.  **Pull changes:**
    ```bash
    # Discard local changes in standalone folder to avoid conflicts
    git checkout -- apps/frontend/.next/standalone/
    
    # Pull latest code
    git pull origin main
    ```

3.  **Copy Static Assets:**
    The standalone build needs `public` and `.next/static` assets copied to it.
    ```bash
    cd apps/frontend
    
    # Copy public folder
    cp -r public .next/standalone/marinellpnew/apps/frontend/
    
    # Copy static assets
    cp -r .next/static .next/standalone/marinellpnew/apps/frontend/.next/
    ```

4.  **Reload Frontend:**
    ```bash
    cd ../..
    pm2 reload marinellp-frontend
    ```

---

## 2. Backend Deployment (Node.js)

### Step 1: Local Build & Push
On your local machine (Mac):

1.  **Navigate to backend directory:**
    ```bash
    cd apps/backend
    ```

2.  **Build the project:**
    This compiles TypeScript to JavaScript in the `dist` folder.
    ```bash
    npm run build
    ```

3.  **Commit and Push:**
    ```bash
    # Go back to root
    cd ../..

    # Add dist folder
    git add apps/backend/dist

    # Commit and push
    git commit -m "Update backend build"
    git push origin main
    ```

### Step 2: VPS Deployment
On your VPS (via SSH/VNC):

1.  **Navigate to project folder:**
    ```bash
    cd /home/UTS/web/utsmarinellp.com/public_html
    ```

2.  **Pull changes:**
    ```bash
    git pull origin main
    ```

3.  **Install Dependencies (Only if package.json changed):**
    ```bash
    cd apps/backend
    npm install --production
    cd ../..
    ```

4.  **Run Migrations (Only if database schema changed):**
    ```bash
    cd apps/backend
    node dist/runMigrations.js
    cd ../..
    ```

5.  **Reload Backend:**
    ```bash
    pm2 reload marinellp-backend
    ```

---

## 3. Quick Restart (If things get stuck)
If the site is down or not updating, run this on the VPS:

```bash
cd /home/UTS/web/utsmarinellp.com/public_html
pm2 restart all
pm2 status
```

## 4. Checking Logs
To see errors:

```bash
# Frontend Logs
pm2 logs marinellp-frontend

# Backend Logs
pm2 logs marinellp-backend
```
