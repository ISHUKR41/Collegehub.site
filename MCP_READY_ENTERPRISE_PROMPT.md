# CollegeHub.site - MCP Enterprise Prompt (Production Build)

Copy this full prompt into your implementation agent.

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
1. Authentication (JWT, role access, password hash, refresh rotation)
2. Course Management (admin CRUD, school/coding taxonomy, lessons)
3. Enrollment + progress tracking
4. MongoDB Atlas with schema validation + indexing
5. Redis caching + rate limiting + compression + helmet
6. CORS + XSS + input validation + env protection
7. Render deployment + production env setup
8. Future scalability for payment/notification/live classes/admin dashboard

Additional mandatory behavior:
- Every user data must be isolated
- Resume exactly from last watched lesson
- Forward lock system (user can go back but cannot skip forward)
- Subject/topic/chapter analytics
- Weakness analysis + suggestions
- Dashboard with chart-ready data

---------------------------------------------------------

PROJECT:
- Product: collegehub.site
- Type: Learning Intelligence Platform
- Audience:
  1) School students (Class 9/10 CBSE)
  2) Coding learners (C++, Java, Python, Web Development)

NON-NEGOTIABLE RULES:
- No demo code
- No fake handlers
- No placeholder API responses for critical flows
- Controllers must stay thin (business logic in services only)
- Validation before controllers
- Centralized error handling
- Standardized API envelope
- Secure by default

TECH STACK:

Frontend:
- Next.js App Router
- TypeScript
- Tailwind
- Framer Motion
- GSAP (hero/advanced sections only)
- Lucide icons
- ShadCN-compatible UI primitives
- React Hook Form + Zod
- React Query
- Axios interceptors

Backend:
- Node.js + Express
- MongoDB Atlas + Mongoose
- Redis
- Zod validation
- JWT access + refresh
- bcrypt
- helmet + cors + express-rate-limit + compression + cookie-parser
- express-mongo-sanitize + xss-clean
- Winston logger

BACKEND STRUCTURE (STRICT):
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

FRONTEND STRUCTURE (STRICT):
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

BUSINESS ENGINES TO IMPLEMENT:

1) Auth Engine:
- Register, Login, Refresh, Logout, Me
- Access token short TTL
- Refresh token rotation
- Refresh token hash in DB
- HttpOnly cookie for refresh token
- Account lock after repeated failed logins

2) Course Engine:
- Admin create/update/delete
- Public list/detail
- category/subCategory integrity:
  school -> class9/class10
  coding -> cpp/java/python/webdev
- School hierarchy: subjects -> chapters -> lessons
- Coding hierarchy: modules -> topics -> lessons

3) Enrollment + Progress Engine:
- Enroll course
- Mark lesson complete
- Update last watched
- Get progress
- Get enrolled list
- Resume feed

4) Lock Engine:
- Block forward skip server-side
- Allow backward navigation
- Logic:
  if requestedLesson > lockedUntilLesson => 403

5) Resume Engine:
- Persist lastWatchedLesson on exit/update
- On login/dashboard return latest resume pointer
- Handle removed lessons safely by clamping index

6) Test + Analytics Engine:
- Create test (admin)
- List tests by course (enrolled users/admin)
- Attempt test (without exposing correct answers)
- Submit test and evaluate
- Topic-wise accuracy
- Weakness buckets:
  red: <50
  yellow: 50-70
  green: >=70
- Suggestion output for weak topics

7) Dashboard Engine:
- Summary cards
- Resume card
- Progress-by-course chart data
- Subject/module performance chart data
- Weak topic indicators
- Suggestion list

8) Contact + Newsletter Engine:
- Contact form persistence endpoint
- Newsletter subscribe/unsubscribe endpoints
- Public endpoint throttling

SECURITY HARDENING:
- Helmet enabled
- Strict CORS origin allowlist
- Body size limit
- Global + endpoint-specific rate limiting
- Mongo sanitize
- XSS cleaning
- Password hashing
- Hide stack traces in production

PERFORMANCE:
- Redis cache for public course list/detail
- Redis cache for dashboard payload
- Cache invalidation on course updates/progress/test submissions
- Lean DB queries where beneficial

FRONTEND PAGE REQUIREMENTS:
- Landing (long, detailed, animated, performance-safe)
- School
- Coding
- Course Detail
- Dashboard
- About
- Contact
- Login
- Register

FRONTEND DESIGN REQUIREMENTS:
- Dark premium gradient
- Subtle neon accents
- Glassmorphism cards
- Scroll progress indicator
- Lightweight particle background
- Micro interactions (200-300ms)
- No lag-heavy animation

SEO REQUIREMENTS:
- Route metadata
- Open Graph
- Twitter card
- robots.txt
- sitemap.xml (dynamic course URLs)
- JSON-LD per important route
- Semantic headings

DEPLOYMENT:
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Redis: managed Redis provider

BACKEND ENV TEMPLATE MUST INCLUDE:
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

IMPLEMENTATION PHASES:

Phase 0 - Audit
- Reuse valid code, identify only real gaps

Phase 1 - Backend completion
- Finish missing business rules
- Confirm validation and auth guards
- Confirm lock/resume/analytics correctness

Phase 2 - Frontend completion
- Wire pages to real APIs
- Add auth-aware states and protected flows
- Ensure dynamic route handling

Phase 3 - Security + performance
- Verify middleware stack is active
- Confirm cache strategy and invalidation

Phase 4 - Deployment readiness
- Verify .env.example parity
- Provide Render + Vercel mapping
- Provide runbook and verification checklist

MANDATORY VALIDATION:
- Frontend lint passes
- Frontend build passes
- Backend syntax check passes
- Auth flow works end-to-end
- Enrollment/progress works with isolated user data
- Forward lock enforced
- Resume pointer returned correctly
- Test submission updates weakness analytics
- Dashboard response is chart-ready
- Contact/newsletter persist in DB
- sitemap/robots resolve

OUTPUT FORMAT REQUIRED:
1) Concise summary
2) File-by-file changes with reason
3) Validation commands + results
4) Remaining risks
5) Deployment checklist

IMPORTANT SEO REALITY:
- Do not claim guaranteed instant rank #1.
- Implement technical SEO correctly.
- Ranking depends on content quality, authority, backlinks, and time.
```

