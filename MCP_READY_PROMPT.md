# CollegeHub.site - Enterprise MCP Ready Prompt

Use the prompt below with an implementation agent working in your existing repository.

```text
You are a principal software engineer working on an existing production codebase.

PROJECT
- Product: collegehub.site
- Domain: Learning Intelligence Platform
- Segments:
  1) School students (Class 9 and Class 10)
  2) Coding learners (C++, Java, Python, Web Development)

NON-NEGOTIABLE RULES
- No demo code.
- No fake handlers.
- No placeholder API responses.
- Real data persistence for all critical flows.
- Controllers must remain thin; all business logic in services.
- Validation must execute before controllers.
- Use centralized error handling and standardized API envelope.
- Preserve strict per-user data isolation.

ARCHITECTURE
- Frontend (Next.js App Router + TypeScript):
  /app
  /components
  /components/ui
  /components/layout
  /components/sections
  /hooks
  /lib
  /services
  /types
  /utils
  /styles
  /public

- Backend (Node + Express):
  backend/
    src/
      config/
      controllers/
      services/
      models/
      routes/
      middleware/
      validators/
      utils/
      constants/
      analytics/
      logs/
    app.js
    server.js
    .env.example

TECH STACK REQUIREMENTS
Frontend:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP (hero / advanced sections only)
- Lucide Icons
- React Query
- Axios with interceptors
- React Hook Form + Zod
- ShadCN-compatible UI primitives

Backend:
- Node.js + Express
- MongoDB Atlas + Mongoose
- Redis (cache)
- JWT access + refresh
- bcrypt
- Zod validators
- Helmet
- CORS (strict allow list)
- express-rate-limit
- compression
- cookie-parser
- express-mongo-sanitize
- xss-clean
- Winston

CORE BUSINESS REQUIREMENTS
1) Authentication:
- Register
- Login
- Refresh token rotation
- Logout
- Me endpoint
- Role support: student/admin
- Login attempt lockout
- Refresh token hash stored in DB only
- Refresh cookie: httpOnly + secure config

2) Course Management:
- Admin CRUD
- Category + subCategory integrity:
  school -> class9/class10
  coding -> cpp/java/python/webdev
- School hierarchy: subjects -> chapters -> lessons
- Coding hierarchy: modules -> topics -> lessons

3) Enrollment + Progress Engine:
- Student enroll endpoint
- Mark lesson complete
- Update last watched lesson
- Resume endpoint
- Enrolled course listing
- Lesson access checker

4) Lock System:
- Backward navigation allowed
- Forward skip blocked on backend:
  if requestedLesson > lockedUntilLesson => 403

5) Resume System:
- Save last watched context
- Return latest valid resume state on login/dashboard
- Handle deleted lessons safely with fallback to valid index

6) Tests + Analytics:
- Test creation (admin)
- Test listing/attempt (enrolled learners)
- Submission scoring
- Topic-wise accuracy map
- Weakness buckets:
  red: <50
  yellow: 50-70
  green: >=70
- Suggestion engine output for dashboard

7) Contact + Newsletter:
- Contact form persistence endpoint
- Newsletter subscribe/unsubscribe endpoints
- Request throttling on public forms

8) Dashboard API:
- Summary cards
- Progress by course
- Subject/module performance
- Weak topic indicators
- Suggestion list
- Resume card payload

SECURITY AND PERFORMANCE
- Helmet enabled
- Body size limit
- Strict CORS with explicit origins
- Rate limiting (global, auth, login, contact, newsletter)
- Input sanitization (mongo + xss)
- Central error middleware hides stack trace in production
- Redis cache for:
  - public course list/detail
  - dashboard payload
- Cache invalidation on updates/progress changes/test submission

FRONTEND UX + DESIGN REQUIREMENTS
- Dark premium gradient visual system
- Subtle neon accents
- Glassmorphism cards
- Scroll progress indicator
- Lightweight particle background
- Smooth micro interactions (200-300ms)
- Long-form landing page with meaningful sections
- Avoid lag-heavy animation

REQUIRED PAGES
- Landing
- School
- Coding
- Course Detail (dynamic)
- Dashboard (real analytics API)
- About
- Contact (real form submission)
- Login
- Register

AUTH UX REQUIREMENTS
- Login and register pages must use React Hook Form + Zod.
- Login success flow:
  1) If `next` query exists and is safe path, redirect there.
  2) Else if resume payload exists, redirect to `/courses/:courseId`.
  3) Else redirect to `/dashboard`.
- Navbar must be auth-aware:
  - Logged out -> show Login/Register actions
  - Logged in -> show Logout action
- Unauthorized dashboard state should provide direct login route.

SEO REQUIREMENTS
- Route metadata per page
- OpenGraph + Twitter card
- robots.txt
- Dynamic sitemap (use published courses from backend if available)
- JSON-LD structured data
- Semantic heading hierarchy

IMPORTANT SEO REALITY
- Do not claim guaranteed #1 ranking.
- Implement technical SEO best practices and content architecture.
- Ranking depends on backlinks, authority, and time.

DEPLOYMENT TARGET
Frontend:
- Vercel
- NEXT_PUBLIC_API_URL configured

Backend:
- Render
- NODE_ENV=production
- CORS_ORIGIN set to frontend domain
- Secure refresh cookie settings for cross-domain auth

Database:
- MongoDB Atlas

Redis:
- Managed Redis URL configured (optional but recommended)

REQUIRED ENV TEMPLATE (BACKEND)
- PORT
- NODE_ENV
- BODY_LIMIT
- MONGODB_URI
- REDIS_URL
- JWT_ACCESS_SECRET
- JWT_REFRESH_SECRET
- JWT_ACCESS_EXPIRES_IN
- JWT_REFRESH_EXPIRES_IN
- REFRESH_COOKIE_SAME_SITE
- REFRESH_COOKIE_SECURE
- REFRESH_COOKIE_DOMAIN
- REFRESH_COOKIE_PATH
- CORS_ORIGIN
- ADMIN_INVITE_CODE

IMPLEMENTATION METHOD
1. Audit existing repository and avoid deleting valid code.
2. Patch missing production behavior incrementally.
3. Keep backward compatibility where possible.
4. Run lint/build/syntax checks after changes.
5. Report exact changed files and why.

MANDATORY VERIFICATION CHECKLIST
- Backend syntax check passes.
- Frontend lint passes.
- Frontend build passes.
- Login/register pages compile and submit to real API.
- Auth endpoints return expected envelopes.
- Login response resume pointer redirect works.
- Course CRUD works for admin.
- Enrollment/progress APIs enforce user isolation.
- Lock rules reject forward skip.
- Resume API returns expected pointer.
- Test submission updates weakness analysis.
- Dashboard response includes chart-ready data.
- Contact/newsletter APIs persist data.
- Sitemap and robots endpoints generated.

OUTPUT FORMAT REQUIRED FROM AGENT
1) Concise summary
2) File-by-file changes with rationale
3) Validation commands run + results
4) Remaining risks/gaps
5) Deployment checklist for Vercel + Render

EXECUTION PHASES REQUIRED
Phase 0 - Repository Audit
- Discover existing modules and reuse valid code.
- Identify real gaps only (no unnecessary rewrites).

Phase 1 - Backend Completion
- Finish missing production logic in services.
- Verify strict validation for all write endpoints.
- Ensure cache invalidation and auth/role protection are complete.

Phase 2 - Frontend Completion
- Bind all pages to real API payloads where applicable.
- Add auth-aware UI states (loading, unauthorized, empty, error).
- Ensure metadata and JSON-LD are attached per important route.

Phase 3 - Security and Performance Hardening
- Confirm headers, sanitization, and rate limits are active.
- Confirm image/lazy/caching strategies avoid avoidable lag.

Phase 4 - Deployment Readiness
- Produce `.env.example` parity checks.
- Provide explicit Render and Vercel variable mapping.
- Add runbooks and verification checklist.

FINAL ACCEPTANCE CRITERIA
- Every implemented endpoint is connected to persistent storage.
- Resume + lock + analytics flows work with real user data.
- Dashboard payload is chart-ready and reflects submitted tests.
- Public pages compile and load with production build.
- No unresolved lint/build/syntax errors.
- Documentation explains exact deploy path and env setup.
```

## Suggested Command Pack For Validation

```bash
# Frontend
npm run lint
npm run build

# Backend
cd backend
npm run check
```

## Production Deployment Notes

- For Vercel + Render cross-domain cookie flow:
  - `REFRESH_COOKIE_SAME_SITE=none`
  - `REFRESH_COOKIE_SECURE=true`
  - `CORS_ORIGIN=https://<your-vercel-domain>`
- Keep `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` unique and long random strings.
- Never commit `.env` files.

