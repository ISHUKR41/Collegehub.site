# CollegeHub Deployment Guide

This guide deploys:
- Frontend on Vercel
- Backend on Render
- Database on MongoDB Atlas
- Cache on managed Redis (optional, recommended)

## 1) Prerequisites

- GitHub repository with this code
- MongoDB Atlas cluster and user
- Redis URL (Upstash, Redis Cloud, or Render Redis)
- Vercel account
- Render account
- `collegehub.site` domain access

## 2) Backend Deploy (Render)

Render supports two approaches:
- Blueprint deploy using `backend/render.yaml`
- Manual web-service setup

### Option A: Blueprint

1. Open Render and create a new Blueprint.
2. Connect repository and select `backend/render.yaml`.
3. Fill all `sync: false` environment values.
4. Deploy service.
5. Validate health endpoint: `https://<render-host>/api/health`.

### Option B: Manual

1. Create a new Web Service.
2. Set `Root Directory` to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Set environment variables from `backend/.env.example`.
6. Set `NODE_ENV=production`.
7. Confirm `/api/health` returns healthy response.

## 3) Frontend Deploy (Vercel)

1. Import repository in Vercel.
2. Build command: `npm run build`.
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL=https://<render-host>/api`
4. Deploy.

## 4) Cross-Domain Auth Cookie Settings

For Vercel frontend + Render backend:

- `REFRESH_COOKIE_SAME_SITE=none`
- `REFRESH_COOKIE_SECURE=true`
- `CORS_ORIGIN=https://collegehub.site,https://www.collegehub.site`
- `REFRESH_COOKIE_DOMAIN=.collegehub.site` (only if frontend/back share subdomains)

If backend is on a different domain and cookie domain cannot be shared, keep
`REFRESH_COOKIE_DOMAIN` empty and rely on backend-domain cookie scope.

## 5) Domain Setup

1. Point `collegehub.site` to Vercel project.
2. Configure `api.collegehub.site` to Render backend (recommended).
3. Update env:
   - Frontend: `NEXT_PUBLIC_API_URL=https://api.collegehub.site/api`
   - Backend: `CORS_ORIGIN=https://collegehub.site,https://www.collegehub.site`

## 6) Post-Deploy Verification

Run:

```bash
npm run verify
cd backend
npm run seed:production
```

Then verify in browser:

- `/` landing renders all sections
- `/school`, `/coding`, `/about`, `/contact` load without errors
- `/register` -> create account
- `/login` -> redirect behavior works
- `/courses/:id` -> dynamic course detail works
- `/dashboard` -> protected analytics endpoint works

API checks:

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `GET /api/courses`
- `POST /api/enrollments`
- `POST /api/tests/submit`
- `GET /api/dashboard`

## 7) SEO Launch Checklist

- `https://collegehub.site/robots.txt` reachable
- `https://collegehub.site/sitemap.xml` reachable
- OpenGraph preview works
- JSON-LD appears in page source
- Submit sitemap in Google Search Console
- Add Bing Webmaster Tools

## 8) Ranking Expectations

Technical SEO is implemented, but ranking #1 is not immediate.
Typical timeline is 3-6 months with:
- quality backlinks
- topical content depth
- regular content updates
- user engagement signals
