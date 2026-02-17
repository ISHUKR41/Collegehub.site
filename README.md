# CollegeHub.site

Production-focused learning platform with two tracks:
- School (Class 9 and Class 10)
- Coding (C++, Java, Python, Web Development)

This repository contains:
- Frontend: Next.js App Router + TypeScript + Tailwind + React Query
- Backend: Express + MongoDB + Redis + JWT auth (in `backend/`)

## Included Product Flows

- Authentication: register, login, refresh rotation, logout
- Course catalog: public + admin endpoints
- Enrollment: enroll, complete lesson, resume pointer, lock enforcement
- Secure lesson delivery: locked lesson-content API (no forward bypass)
- Tests and analytics: weakness buckets + suggestions
- Contact + newsletter: persistent form handling
- Frontend auth screens: `/login` and `/register`

## Monorepo Structure

- `src/` - Next.js frontend
- `backend/` - Express backend
- `MCP_READY_PROMPT.md` - reusable enterprise implementation prompt
- `MCP_READY_ULTRA_PROMPT.md` - expanded production execution prompt

## Frontend Setup

```bash
npm install
npm run dev
```

Frontend env (optional):

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
npm run seed:production
```

## Validation Commands

Frontend:

```bash
npm run lint
npm run build
npm run verify
```

Backend:

```bash
cd backend
npm run check
```

## Deployment Targets

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Cache: Redis (recommended)

Detailed deployment runbook:

- `DEPLOYMENT.md`

## Notes

- Backend uses secure JWT access + refresh token rotation.
- Contact and newsletter forms are backed by real APIs.
- Dashboard page consumes real analytics endpoint.
- Course detail page now integrates real enroll/progress APIs:
  lesson locking, resume pointer save, and complete-lesson updates.
- Sitemap supports dynamic course URLs from backend catalog.
- Route-level JSON-LD schemas are included for better technical SEO.
