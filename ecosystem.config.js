module.exports = {
    apps: [
        {
            name: 'marinellp-backend',
            script: './apps/backend/dist/index.js',
            instances: 'max', // Use all CPU cores
            exec_mode: 'cluster',
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 8002
            },
            env_production: {
                NODE_ENV: 'production'
            }
        },
        {
            name: 'marinellp-frontend',
            script: 'apps/frontend/.next/standalone/marinellpnew/apps/frontend/server.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3000
            }
        }
    ]
};
