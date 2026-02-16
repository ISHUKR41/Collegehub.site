# CollegeHub.site - MCP READY MASTER PROMPT (Production, Enterprise, No Demo)

Use this exact prompt with your implementation agent.

```text
FIRST READ EVERYTHING CAREFULLY.
DO NOT SKIP ANY LINE.
THIS IS A PRODUCTION-GRADE APPLICATION.

IMPORTANT:
The entire user intent below MUST be preserved in context.
Nothing should be deleted or modified.

---------------------------------------------------------
ORIGINAL USER REQUIREMENT (DO NOT DELETE)
---------------------------------------------------------

Mujhe collegehub.site ke liye ek fully working production-ready backend banana hai jo demo na ho.

Website Structure:
- School Section (Class 9 & 10 courses)
- College Section (Coding: C++, Java, Python, Web Development etc)

Backend Requirements:

1. Authentication System:
   - JWT based authentication
   - Role based access (student, admin)
   - Secure password hashing
   - Refresh token mechanism

2. Course Management:
   - Admin can create/update/delete courses
   - Courses categorized by:
        - school -> class9, class10
        - coding -> cpp, java, python, web development
   - Lessons inside each course

3. Enrollment System:
   - Student can enroll
   - Track progress
   - Mark lessons complete

4. Database:
   - Use MongoDB Atlas
   - Proper schema validation
   - Indexing for performance

5. Performance:
   - Redis caching
   - API rate limiting
   - Compression middleware
   - Helmet security headers

6. Security:
   - CORS configured
   - XSS protection
   - Input validation (Joi or Zod)
   - Environment variable protection

7. Deployment:
   - Backend deployed on Render
   - Connected to MongoDB Atlas
   - Environment variables setup
   - Production mode enabled

8. Future Scalability:
   - Structure ready for microservices
   - Easily integratable with:
        - Payment gateway
        - Notification service
        - Live classes
        - Admin dashboard

Mujhe ek website create karna hai jo ki fully professional, modern, animated, lag-free ho.

Website name: collegehub.site

Website long hona chahiye.
Detailing honi chahiye.
Icons professional hone chahiye (SVG).
Colors modern hone chahiye.
Micro animations hone chahiye.
Code senior developer jaisa hona chahiye.
AI-generated jaisa na lage.

All files and folders must contain clean English comments explaining:
- What the file does
- Why this logic is used
- How to extend later

---------------------------------------------------------
NOW BUILD A COMPLETE ENTERPRISE-GRADE SYSTEM.
---------------------------------------------------------

ARCHITECTURE PRINCIPLES:
- Layered architecture
- No business logic in controllers
- Services contain business logic
- Validation before controllers
- Reusable modules
- DRY + SOLID + secure-by-default
- Centralized error handling
- Production-first coding style
- No fake/dummy/demo logic

FRONTEND STACK:
- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP (hero and selective advanced sections only)
- Lucide SVG icons
- ShadCN-compatible UI components
- React Hook Form + Zod
- React Query
- Axios interceptors

BACKEND STACK:
- Node.js
- Express
- MongoDB Atlas + Mongoose
- Redis
- JWT access + refresh
- bcrypt
- Zod validation
- Helmet
- CORS
- express-rate-limit
- compression
- cookie-parser
- express-mongo-sanitize
- xss-clean
- Winston logger

MANDATORY BACKEND STRUCTURE:
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

MANDATORY FRONTEND STRUCTURE:
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

BUSINESS REQUIREMENTS (CRITICAL):
1) User Isolation:
- Every user can access only their own progress, analytics, and resume state.
- No cross-user data leakage in any endpoint.

2) School Engine:
- Subject-wise structure (Maths, Science, English, SST, etc.)
- Chapter-level learning
- Topic-level learning
- Chapter tests
- Subject performance analytics

3) Coding Engine:
- Beginner to advanced path
- Practice problems
- Test-based evaluation
- Topic weakness analysis

4) Resume Engine:
- Save last watched lesson on exit/update
- On login/dashboard, return latest resume pointer
- Resume should start exactly where learner left

5) Lock Engine:
- Backward navigation allowed
- Forward skip blocked on backend
- Rule:
  if requestedLesson > lockedUntilLesson => 403 "Lesson Locked"

6) Analytics Engine:
- After test submission, evaluate topic-wise accuracy
- Update weakness map
- Generate weak-topic suggestions
- Return chart-ready analytics payload

AUTH FLOW (PRODUCTION SAFE):
- Register
- Login
- Refresh token rotation
- Logout
- Me endpoint
- Role middleware (student/admin)
- Login attempt lock policy
- Refresh token hash in DB
- HttpOnly cookie for refresh

COURSE API:
- Public list/detail
- Admin CRUD
- Category/subCategory integrity checks
- School hierarchy: subjects -> chapters -> lessons
- Coding hierarchy: modules -> topics -> lessons

ENROLLMENT + PROGRESS API:
- Enroll
- Get my enrollments
- Get course progress
- Complete lesson
- Update last watched
- Resume endpoint
- Lesson access check endpoint

TEST + DASHBOARD API:
- Admin create tests
- Learner list tests (enrollment required)
- Test attempt payload without correct answers
- Submit answers
- Persist history
- Update weakness analysis
- Dashboard summary + charts + suggestion list

SECURITY HARDENING:
- Helmet
- Strict CORS allowlist
- Body size limits
- Global and endpoint rate limits
- Mongo sanitize
- XSS sanitize
- Password hashing
- Refresh token rotation
- Hide stack traces in production

PERFORMANCE RULES:
- Redis cache for public course listing and detail
- Redis cache for dashboard payload
- Cache invalidation on course/progress/test mutations
- Lean queries where possible
- Compression enabled

FRONTEND PAGE REQUIREMENTS:
- Landing
- School
- Coding
- Course Detail (dynamic)
- Dashboard
- About
- Contact
- Login
- Register

FRONTEND DESIGN REQUIREMENTS:
- Dark premium gradient
- Neon accent
- Glassmorphism
- Scroll progress bar
- Lightweight particle background
- Micro-interactions 200-300ms
- Long detailed sections
- No lag-heavy animation

SEO REQUIREMENTS:
- Dynamic metadata
- Open Graph
- Twitter cards
- robots.txt
- sitemap.xml
- JSON-LD structured data
- semantic HTML and heading hierarchy
- Core Web Vitals conscious implementation

DEPLOYMENT TARGET:
Frontend:
- Vercel

Backend:
- Render

Database:
- MongoDB Atlas

Cache:
- Managed Redis (optional but recommended)

BACKEND ENV TEMPLATE (MUST INCLUDE):
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

IMPLEMENTATION METHOD:
Phase 0 - Audit
- Reuse valid modules
- Identify real gaps only

Phase 1 - Backend Completion
- Complete missing business rules in services
- Verify auth/validation/role guards
- Verify lock + resume + analytics behavior

Phase 2 - Frontend Completion
- Bind pages to real backend data
- Add loading/empty/error/unauthorized states
- Keep accessibility and semantic structure

Phase 3 - Security + Performance
- Confirm middleware stack active in production
- Confirm cache + invalidation behavior
- Confirm no unnecessary heavy client runtime

Phase 4 - Deployment Readiness
- Verify .env.example parity
- Add Render + Vercel variable mapping
- Provide runbook and post-deploy checks

MANDATORY VALIDATION:
- Frontend lint passes
- Frontend build passes
- Backend syntax/start checks pass
- Auth flow end-to-end works
- Enrollment/progress honors per-user isolation
- Lock system blocks forward skip
- Resume returns correct pointer
- Test submission updates weakness analytics
- Dashboard returns chart-ready payload
- Contact/newsletter persistence works
- robots/sitemap are accessible

OUTPUT FORMAT REQUIRED FROM IMPLEMENTATION AGENT:
1) Concise summary
2) File-by-file changes with reasons
3) Validation commands + results
4) Remaining risks/gaps
5) Deployment checklist

IMPORTANT SEO REALITY CHECK:
- Do NOT promise instant #1 ranking.
- Implement best-practice technical SEO.
- Ranking depends on backlinks, domain authority, quality content, and time.
```

## Suggested Validation Commands

```bash
npm run lint
npm run build
npm --prefix backend run check
```

## Deployment Mapping Quick Notes

- Frontend `.env`:
  - `NEXT_PUBLIC_API_URL=https://api.collegehub.site/api`
  - `BACKEND_PUBLIC_URL=https://api.collegehub.site/api`

- Backend `.env`:
  - `CORS_ORIGIN=https://collegehub.site,https://www.collegehub.site`
  - `REFRESH_COOKIE_SAME_SITE=none` (cross-domain)
  - `REFRESH_COOKIE_SECURE=true`

