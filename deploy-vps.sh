#!/bin/bash
# VPS Deployment Script for UTS Marine LLP
# Run this on your VPS server

set -e

echo "🚀 Starting UTS Marine LLP Deployment..."

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
   echo "❌ Please don't run as root. Use a regular user with sudo privileges."
   exit 1
fi

# Install Node.js if not present
if ! command -v node &> /dev/null; then
    echo "📦 Installing Node.js 18..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Install PM2 if not present
if ! command -v pm2 &> /dev/null; then
    echo "📦 Installing PM2..."
    sudo npm install -g pm2
fi

# Install Nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "📦 Installing Nginx..."
    sudo apt-get update
    sudo apt-get install -y nginx
fi

# Navigate to project directory
PROJECT_DIR="$HOME/utsmareinellp"
if [ ! -d "$PROJECT_DIR" ]; then
    echo "📥 Cloning repository..."
    git clone https://github.com/dmpservice2041/utsmareinellp.git "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"

# Pull latest changes
echo "🔄 Updating code..."
git pull origin main

# Setup Backend
echo "🔧 Setting up Backend..."
cd apps/backend

if [ ! -f .env ]; then
    echo "⚠️  Backend .env file not found!"
    echo "Please create .env file with:"
    echo "  NODE_ENV=production"
    echo "  PORT=5001"
    echo "  JWT_SECRET=your-32-character-secret"
    echo "  DB_HOST=localhost"
    echo "  DB_USER=your_db_user"
    echo "  DB_PASSWORD=your_db_password"
    echo "  DB_NAME=your_db_name"
    echo "  FRONTEND_URL=https://yourdomain.com"
    echo "  BACKEND_URL=https://api.yourdomain.com"
    exit 1
fi

echo "📦 Installing backend dependencies..."
npm install --production

# Run database migrations if needed
echo "🗄️  Running database migrations..."
npm run sync-db || echo "⚠️  Migration failed or not needed"

# Start backend with PM2
echo "🚀 Starting backend..."
pm2 delete backend 2>/dev/null || true
pm2 start src/index.ts --name backend --interpreter ts-node
pm2 save

# Setup Frontend
echo "🔧 Setting up Frontend..."
cd ../frontend

if [ ! -f .env.local ]; then
    echo "⚠️  Frontend .env.local not found!"
    echo "Creating .env.local with default values..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:5001" > .env.local
    echo "Please update .env.local with your production API URL"
fi

echo "📦 Installing frontend dependencies..."
npm install

echo "🏗️  Building frontend..."
npm run build

# Start frontend with PM2
echo "🚀 Starting frontend..."
pm2 delete frontend 2>/dev/null || true
pm2 start npm --name frontend -- start
pm2 save

# Setup PM2 startup
echo "⚙️  Configuring PM2 startup..."
pm2 startup | tail -1 | sudo bash || echo "⚠️  Startup script already configured"

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Check status:"
echo "   pm2 status"
echo ""
echo "📝 View logs:"
echo "   pm2 logs backend"
echo "   pm2 logs frontend"
echo ""
echo "🔄 Restart services:"
echo "   pm2 restart all"
echo ""
echo "⚠️  Don't forget to:"
echo "   1. Configure Nginx reverse proxy"
echo "   2. Set up SSL certificate (Let's Encrypt)"
echo "   3. Update .env files with production URLs"
echo "   4. Configure firewall (ports 80, 443, 5001)"

