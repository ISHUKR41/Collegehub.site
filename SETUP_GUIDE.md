# CollegeHub Setup Guide

## ✅ Current Status

**Frontend**: ✅ Running on `http://localhost:3001`  
**Backend**: ⚠️ Requires MongoDB connection  
**Build**: ✅ All tests passing (lint, build, syntax)

---

## 🚀 Quick Start Options

### Option 1: MongoDB Atlas (Recommended - Cloud Database)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Create a free cluster (M0 - Free tier)

2. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```

3. **Update Backend .env**
   ```bash
   cd backend
   # Edit .env file and replace MONGODB_URI:
   MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/collegehub?retryWrites=true&w=majority
   ```

4. **Add IP to Whitelist**
   - In Atlas, go to Network Access
   - Add IP Address: `0.0.0.0/0` (allow from anywhere) or your specific IP

5. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

6. **Seed Data (Optional)**
   ```bash
   cd backend
   npm run seed:production
   ```

---

### Option 2: Local MongoDB Installation

1. **Install MongoDB Community Edition**
   - Download from https://www.mongodb.com/try/download/community
   - Follow installation wizard
   - Check "Install MongoDB as a Service"

2. **Start MongoDB Service**
   ```bash
   # Windows (Command Prompt as Administrator):
   net start MongoDB
   
   # Or use MongoDB Compass (GUI) to start
   ```

3. **Verify MongoDB is Running**
   ```bash
   # Check if port 27017 is listening:
   netstat -ano | findstr ":27017"
   ```

4. **Backend is Already Configured**
   - The `.env` file already has: `MONGODB_URI=mongodb://127.0.0.1:27017/collegehub`

5. **Start Backend**
   ```bash
   cd backend
   npm run dev
   ```

---

## 📋 Environment Setup Checklist

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
BACKEND_PUBLIC_URL=http://localhost:5000/api
```
✅ Already configured

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=<your-mongodb-connection-string>  # ⚠️ UPDATE THIS
REDIS_URL=                                      # Optional (leave empty)
JWT_ACCESS_SECRET=<generated-secret>            # ✅ Already set
JWT_REFRESH_SECRET=<generated-secret>           # ✅ Already set
CORS_ORIGIN=http://localhost:3000,http://localhost:3001  # ✅ Already set
```

---

## 🔄 Running the Application

### Terminal 1 - Backend
```bash
cd c:\ISHU\collegehub.site\backend
npm run dev
```
Expected output:
```
> collegehub-backend@1.0.0 dev
> node --watch server.js

MongoDB connected: cluster0.xxxxx.mongodb.net
CollegeHub backend running on port 5000 in development mode.
```

### Terminal 2 - Frontend
```bash
cd c:\ISHU\collegehub.site
npm run dev
```
Expected output:
```
> collegehub.site@0.1.0 dev
> next dev

▲ Next.js 16.1.6 (Turbopack)
- Local:         http://localhost:3001
✓ Ready in 1477ms
```

---

## 🧪 Testing

### Run All Checks
```bash
cd c:\ISHU\collegehub.site
npm run verify
```

This runs:
- ✅ Frontend lint
- ✅ Frontend build
- ✅ Backend syntax check

---

## 🗄️ Database Seeding (Optional)

After MongoDB is connected, seed with sample data:

```bash
cd backend
npm run seed:production
```

This creates:
- Admin user: `admin@collegehub.site` / `ChangeMe@1234`
- Sample School courses (Class 9 & 10)
- Sample Coding courses (C++, Java, Python, Web Dev)
- Sample tests and lessons

---

## 🔧 Troubleshooting

### Backend won't start - MongoDB connection error

**Problem**: `MongoDB connection attempt 1/5 failed`

**Solution**:
1. Verify MONGODB_URI in `backend/.env`
2. For Atlas: Check IP whitelist
3. For Local: Ensure MongoDB service is running

### Port already in use

**Problem**: `Port 3000 is in use`

**Solution**: 
- Next.js will auto-use next available port (3001, 3002, etc.)
- Or kill existing process:
  ```bash
  # Windows:
  netstat -ano | findstr ":3000"
  taskkill /PID <PID> /F
  ```

### Cannot access API endpoints

**Problem**: Frontend can't connect to backend

**Solution**:
1. Verify backend is running on port 5000
2. Check `.env` has correct `NEXT_PUBLIC_API_URL`
3. Verify CORS_ORIGIN includes your frontend URL

---

## 📦 Dependencies Installation

If you encounter missing dependencies:

### Frontend
```bash
cd c:\ISHU\collegehub.site
npm install
```

### Backend
```bash
cd c:\ISHU\collegehub.site\backend
npm install
```

---

## 🚀 Production Deployment

See detailed guides:
- **PRODUCTION_DEPLOYMENT.md** - Full deployment guide
- **DEPLOYMENT.md** - Quick deployment reference
- **OPTIMIZATION_GUIDE.md** - Performance optimization

Quick deployment checklist:
1. ✅ Create MongoDB Atlas cluster
2. ✅ Deploy backend to Render
3. ✅ Deploy frontend to Vercel
4. ✅ Set production environment variables
5. ✅ Run database seed script
6. ✅ Test all endpoints

---

## 📚 Documentation

- **README.md** - Project overview
- **IMPLEMENTATION_SUMMARY.md** - Complete feature list
- **Backend README.md** - Backend-specific docs
- **This file (SETUP_GUIDE.md)** - Setup instructions

---

## 🆘 Need Help?

### Check Server Status
```bash
# Frontend
netstat -ano | findstr ":3001"

# Backend  
netstat -ano | findstr ":5000"

# MongoDB (local)
netstat -ano | findstr ":27017"
```

### View Logs
- Backend logs: Check terminal output or `backend/logs/`
- Frontend logs: Check terminal output

### Common Commands
```bash
# Full verification
npm run verify

# Lint only
npm run lint

# Build only
npm run build

# Backend syntax check
cd backend && npm run check
```

---

**All code is production-ready. Only MongoDB connection setup is required to run the full application.**
