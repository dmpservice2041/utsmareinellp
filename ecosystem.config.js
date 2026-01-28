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
            script: 'npm',
            args: 'start --prefix apps/frontend',
            instances: 1, // Next.js manages its own workers usually, but 1 instance is safer for SSG constraints if not using custom server
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'production',
                PORT: 3002
            }
        }
    ]
};
