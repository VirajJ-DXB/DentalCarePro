# DentalCare Pro - Deployment Guide

This guide covers various deployment options for the DentalCare Pro dental clinic management software.

## Table of Contents
- [Local Development](#local-development)
- [Production Deployment](#production-deployment)
- [Docker Deployment](#docker-deployment)
- [Cloud Deployment](#cloud-deployment)
- [Database Migration](#database-migration)
- [Environment Configuration](#environment-configuration)

## Local Development

### Quick Start
```bash
# Clone and setup everything
git clone <repository-url>
cd dental-clinic-software
npm run setup

# Start the application
npm start
```

### Manual Setup
```bash
# Install dependencies
npm install
npm run install-all

# Setup database
cd server
npm run seed
cd ..

# Start development servers
npm run dev
```

## Production Deployment

### Prerequisites
- Node.js 16+ installed
- Process manager (PM2 recommended)
- Reverse proxy (Nginx recommended)
- SSL certificate

### 1. Server Setup
```bash
# Install PM2 globally
npm install -g pm2

# Clone repository
git clone <repository-url>
cd dental-clinic-software

# Install dependencies
npm run install-all

# Build frontend
cd client
npm run build
cd ..
```

### 2. Environment Configuration
Create production environment file:
```bash
# server/.env
NODE_ENV=production
PORT=5000
JWT_SECRET=your_very_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# Database (for production, consider PostgreSQL or MySQL)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=dental_clinic_prod
DB_USER=dental_user
DB_PASSWORD=secure_password

# Clinic Information
CLINIC_NAME=Your Dental Clinic
CLINIC_ADDRESS=123 Main St, City, State 12345
CLINIC_PHONE=(555) 123-4567
CLINIC_EMAIL=info@yourdentalclinic.com

# Email Configuration (for notifications)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Database Setup
```bash
cd server
npm run seed  # For initial setup
# Or migrate existing data
```

### 4. Start with PM2
```bash
# Create PM2 ecosystem file
cat > ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: 'dentalcare-pro',
    script: './server/index.js',
    cwd: './',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true
  }]
};
EOF

# Create logs directory
mkdir -p logs

# Start application
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save
pm2 startup
```

### 5. Nginx Configuration
```nginx
# /etc/nginx/sites-available/dentalcare-pro
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # Security headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    
    # Serve React app
    location / {
        root /path/to/dental-clinic-software/client/build;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Proxy API requests to backend
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Handle file uploads
    location /uploads {
        proxy_pass http://localhost:5000;
        client_max_body_size 10M;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/dentalcare-pro /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Docker Deployment

### Dockerfile for Backend
```dockerfile
# server/Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create uploads directory
RUN mkdir -p uploads

EXPOSE 5000

CMD ["npm", "start"]
```

### Dockerfile for Frontend
```dockerfile
# client/Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - JWT_SECRET=your_jwt_secret
    volumes:
      - ./server/database:/app/database
      - ./server/uploads:/app/uploads
    restart: unless-stopped

  frontend:
    build: ./client
    ports:
      - "80:80"
    depends_on:
      - backend
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - frontend
      - backend
    restart: unless-stopped
```

Run with Docker:
```bash
docker-compose up -d
```

## Cloud Deployment

### Heroku Deployment
```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-dentalcare-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_jwt_secret

# Deploy
git push heroku main
```

### AWS EC2 Deployment
1. Launch EC2 instance (Ubuntu 20.04 LTS)
2. Install Node.js and PM2
3. Follow production deployment steps
4. Configure security groups for ports 80/443
5. Set up Application Load Balancer if needed

### DigitalOcean App Platform
```yaml
# .do/app.yaml
name: dentalcare-pro
services:
- name: api
  source_dir: /server
  github:
    repo: your-username/dental-clinic-software
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NODE_ENV
    value: production
  - key: JWT_SECRET
    value: your_jwt_secret
    type: SECRET

- name: web
  source_dir: /client
  github:
    repo: your-username/dental-clinic-software
    branch: main
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
```

## Database Migration

### SQLite to PostgreSQL
```javascript
// migration script
const sqlite3 = require('sqlite3');
const { Client } = require('pg');

const migrateSQLiteToPostgreSQL = async () => {
  // Connect to SQLite
  const sqliteDb = new sqlite3.Database('./database/dental_clinic.db');
  
  // Connect to PostgreSQL
  const pgClient = new Client({
    host: 'localhost',
    port: 5432,
    database: 'dental_clinic_prod',
    user: 'dental_user',
    password: 'secure_password'
  });
  
  await pgClient.connect();
  
  // Migration logic here
  // Export from SQLite and import to PostgreSQL
};
```

## Environment Configuration

### Development
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=dev_secret_key
```

### Staging
```env
NODE_ENV=staging
PORT=5000
JWT_SECRET=staging_secret_key
DB_HOST=staging-db-host
```

### Production
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=production_secret_key_very_secure
DB_HOST=production-db-host
```

## Monitoring and Maintenance

### Health Checks
The application includes a health check endpoint:
```
GET /api/health
```

### Logging
- Application logs: PM2 handles logging
- Nginx logs: `/var/log/nginx/`
- Database logs: Check database-specific logs

### Backup Strategy
```bash
# Database backup script
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
cp ./server/database/dental_clinic.db ./backups/dental_clinic_$DATE.db

# Keep only last 30 days of backups
find ./backups -name "dental_clinic_*.db" -mtime +30 -delete
```

### Updates
```bash
# Update application
git pull origin main
npm run install-all
cd client && npm run build && cd ..
pm2 restart dentalcare-pro
```

## Security Considerations

1. **Use HTTPS in production**
2. **Set strong JWT secrets**
3. **Regular security updates**
4. **Database access restrictions**
5. **File upload validation**
6. **Rate limiting**
7. **Input sanitization**

## Troubleshooting

### Common Issues
1. **Port conflicts**: Change ports in environment variables
2. **Database connection**: Check database credentials and connectivity
3. **File permissions**: Ensure proper permissions for uploads directory
4. **Memory issues**: Monitor and adjust PM2 configuration

### Performance Optimization
1. **Enable gzip compression**
2. **Use CDN for static assets**
3. **Database indexing**
4. **Caching strategies**
5. **Load balancing for high traffic**

For additional support, refer to the main README.md or create an issue in the repository.
