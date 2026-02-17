# CollegeHub Production Deployment Guide

## 🚀 Complete Production Deployment Strategy

This guide covers deploying **CollegeHub.site** - a production-grade Learning Intelligence Platform with Next.js frontend and Express backend.

---

## **📋 Prerequisites**

### Required Accounts
1. **MongoDB Atlas** - Database hosting
2. **Render** - Backend hosting (or Railway, AWS, DigitalOcean)
3. **Vercel** - Frontend hosting
4. **Upstash/Redis Cloud** - Redis cache (optional but recommended)

### Required Tools
- Node.js 18+ and npm
- Git
- MongoDB Compass (for database management)

---

## **🗄️ Database Setup (MongoDB Atlas)**

### 1. Create MongoDB Cluster

```bash
1. Go to https://cloud.mongodb.com
2. Create a new cluster (M0 Free tier for testing)
3. Choose cloud provider (AWS recommended)
4. Select region closest to your backend server
5. Create cluster (takes 3-5 minutes)
```

### 2. Configure Network Access

```bash
1. Go to Security → Network Access
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your Render/Railway IP addresses
```

### 3. Create Database User

```bash
1. Go to Security → Database Access
2. Add New Database User
3. Choose "Password" authentication
4. Username: collegehub_admin
5. Password: Generate strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"
```

### 4. Get Connection String

```bash
1. Go to Deployment → Database → Connect
2. Choose "Connect your application"
3. Driver: Node.js
4. Copy connection string:
   mongodb+srv://collegehub_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
5. Replace <password> with actual password
6. Add database name: /collegehub before query params
```

### 5. Create Indexes (Important for Performance)

Connect via MongoDB Compass or shell and run:

```javascript
// Users collection
db.users.createIndex({ email: 1 }, { unique: true });

// UserProgress collection  
db.userprogresses.createIndex({ userId: 1 });
db.userprogresses.createIndex({ courseId: 1 });
db.userprogresses.createIndex({ userId: 1, courseId: 1 }, { unique: true });

// Courses collection
db.courses.createIndex({ category: 1 });
db.courses.createIndex({ subCategory: 1 });
db.courses.createIndex({ isPublished: 1 });
```

---

## **🔴 Redis Setup (Upstash)**

### 1. Create Redis Database

```bash
1. Go to https://upstash.com
2. Sign up / Log in
3. Click "Create Database"
4. Name: collegehub-cache
5. Region: Choose same as your backend
6. Type: Regional (for production)
7. Click "Create"
```

### 2. Get Redis URL

```bash
1. Go to database details
2. Copy the connection string (starts with redis://)
3. Format: redis://default:<password>@<host>:<port>
```

---

## **🖥️ Backend Deployment (Render)**

### 1. Prepare Backend

```bash
cd backend
npm install
npm run check  # Verify no syntax errors
```

### 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/yourusername/collegehub-backend.git
git push -u origin main
```

### 3. Deploy on Render

```bash
1. Go to https://render.com
2. Sign up / Log in with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Select branch: main
6. Configure:
   - Name: collegehub-backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: npm start
   - Plan: Free (or Starter for production)
```

### 4. Add Environment Variables

In Render dashboard → Environment:

```env
NODE_ENV=production
PORT=5000
BODY_LIMIT=10kb

# MongoDB Atlas
MONGODB_URI=mongodb+srv://collegehub_admin:<password>@cluster0.xxxxx.mongodb.net/collegehub?retryWrites=true&w=majority

# Redis (Upstash)
REDIS_URL=redis://default:<password>@<host>:<port>

# JWT Secrets (generate with: openssl rand -base64 64)
JWT_ACCESS_SECRET=your-64-char-secret-here
JWT_REFRESH_SECRET=your-different-64-char-secret-here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Cookies
REFRESH_COOKIE_SAME_SITE=lax
REFRESH_COOKIE_SECURE=true
REFRESH_COOKIE_DOMAIN=
REFRESH_COOKIE_PATH=/api/auth

# CORS - Add your Vercel frontend URL
CORS_ORIGIN=https://collegehub.site,https://www.collegehub.site

# Optional
ADMIN_INVITE_CODE=your-secret-admin-code
SEED_ADMIN_EMAIL=admin@collegehub.site
SEED_ADMIN_PASSWORD=ChangeMe@1234
```

### 5. Deploy and Monitor

```bash
1. Click "Create Web Service"
2. Wait for build to complete (5-10 minutes)
3. Check logs for errors
4. Test health endpoint: https://your-app.onrender.com/api/health
```

### 6. Seed Production Data (Optional)

```bash
# SSH into Render or use dashboard shell
npm run seed:production
```

---

## **🎨 Frontend Deployment (Vercel)**

### 1. Prepare Frontend

Create `.env.production` in frontend root:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
BACKEND_PUBLIC_URL=https://your-backend.onrender.com/api
```

### 2. Deploy to Vercel

```bash
# Method 1: CLI
npm install -g vercel
vercel

# Method 2: GitHub Integration
1. Push frontend to GitHub
2. Go to https://vercel.com
3. Import GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: .next
```

### 3. Add Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
BACKEND_PUBLIC_URL=https://your-backend.onrender.com/api
```

### 4. Deploy

```bash
1. Click "Deploy"
2. Wait for build (3-5 minutes)
3. Visit deployment URL
4. Test functionality
```

---

## **🔒 Security Checklist**

### Backend Security

- [x] Environment variables in `.env` (never commit)
- [x] Strong JWT secrets (64+ characters)
- [x] CORS restricted to frontend domain
- [x] Rate limiting enabled
- [x] Helmet security headers
- [x] XSS protection
- [x] MongoDB query sanitization
- [x] HTTPS enforced (automatic on Render)
- [x] Secure cookies for refresh tokens

### Frontend Security

- [x] API URL from environment
- [x] No secrets in frontend code
- [x] HTTPS enforced (automatic on Vercel)
- [x] Content Security Policy headers
- [x] XSS prevention

---

## **📊 Monitoring Setup**

### 1. Health Check Monitoring

Use **UptimeRobot** or **Pingdom**:

```bash
1. Add monitor
2. URL: https://your-backend.onrender.com/api/health
3. Interval: 5 minutes
4. Alert via email/SMS on downtime
```

### 2. Error Tracking (Optional)

Integrate **Sentry**:

```bash
# Backend
npm install @sentry/node
# Add to app.js

# Frontend
npm install @sentry/nextjs
npx @sentry/wizard -i nextjs
```

### 3. Performance Monitoring

Use Vercel Analytics and Render metrics dashboard.

---

## **🧪 Testing Production**

### 1. Backend Tests

```bash
# Test health
curl https://your-backend.onrender.com/api/health

# Test auth
curl -X POST https://your-backend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test@1234"}'

# Test courses
curl https://your-backend.onrender.com/api/courses
```

### 2. Frontend Tests

```bash
1. Open https://your-frontend.vercel.app
2. Test registration
3. Test login
4. Test course enrollment
5. Test dashboard analytics
6. Test mobile responsiveness
```

---

## **🚀 Performance Optimization**

### Backend

```bash
# Enable compression (already configured)
# Redis caching (already configured)
# Database indexing (see above)
# Keep connection pooling enabled
```

### Frontend

```bash
# Image optimization (Next.js automatic)
# Code splitting (Next.js automatic)
# Static generation where possible
# CDN edge caching (Vercel automatic)
```

---

## **📈 Scaling Strategy**

### When to Scale

- Database: > 10,000 active users
- Backend: > 1000 req/min
- Frontend: Automatically scales on Vercel

### How to Scale

**Database:**
- Upgrade MongoDB Atlas tier (M10 → M20 → M30)
- Enable sharding for massive scale
- Add read replicas

**Backend:**
- Render: Upgrade to paid plan (autoscaling)
- Add load balancer
- Horizontal scaling with Docker

**Redis:**
- Upstash: Upgrade tier
- Enable Redis Cluster

---

## **🔄 CI/CD Pipeline (Advanced)**

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy CollegeHub
on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        run: vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## **🆘 Troubleshooting**

### Backend Issues

**Problem:** Backend deployment fails
```bash
Solution:
1. Check Render logs
2. Verify environment variables
3. Test MongoDB connection string locally
4. Check Node.js version (18+)
```

**Problem:** CORS errors
```bash
Solution:
1. Add frontend URL to CORS_ORIGIN
2. Ensure credentials: true in cors config
3. Check if HTTPS is enforced
```

**Problem:** Slow API responses
```bash
Solution:
1. Check MongoDB indexes
2. Enable Redis caching
3. Upgrade Render tier
4. Monitor slow queries in logs
```

### Frontend Issues

**Problem:** API calls failing
```bash
Solution:
1. Check NEXT_PUBLIC_API_URL
2. Verify backend health endpoint
3. Check browser console for errors
4. Test backend endpoints directly
```

---

## **✅ Post-Deployment Checklist**

- [ ] Backend health check passing
- [ ] Frontend loads correctly
- [ ] User registration works
- [ ] Login / logout works
- [ ] Course enrollment works
- [ ] Dashboard shows analytics
- [ ] Mobile responsive
- [ ] SSL certificates active
- [ ] Monitoring alerts configured
- [ ] Backup strategy in place
- [ ] Domain configured (if custom domain)

---

## **📞 Support**

For issues or questions:
- GitHub Issues: https://github.com/yourusername/collegehub/issues
- Email: support@collegehub.site

---

**Congratulations! Your CollegeHub platform is now live in production! 🎉**
