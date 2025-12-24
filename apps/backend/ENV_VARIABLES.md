# Environment Variables

Add these variables to your `.env` file in `apps/backend/`:

```env
# Database
DB_HOST=127.0.0.1
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Server
PORT=5000
NODE_ENV=development

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=1d

# Media Upload
UPLOAD_DIR=./public/uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_TYPES=jpg,jpeg,png,webp

# SEO
BASE_URL=https://yourdomain.com
DEFAULT_OG_IMAGE=/images/default-og-image.jpg
```
