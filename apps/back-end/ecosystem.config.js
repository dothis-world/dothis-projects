const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

module.exports = {
  apps: [
    {
      name: 'dothis',
      cwd: './dist/apps/api',
      script: './main.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '1G',
      watch: true,
      env: {
        SERVER_PORT: 8080,
        NODE_ENV: 'development',
        MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_SCHEMA: process.env.DB_SCHEMA,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      },
      env_production: {
        SERVER_PORT: 8080,
        NODE_ENV: 'production',
        MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        DB_PORT: process.env.DB_PORT,
        DB_HOST: process.env.DB_HOST,
        DB_SCHEMA: process.env.DB_SCHEMA,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      },
    },
  ],
};
