# CollegeHub.site - MCP Ready Ultra Prompt (Production Execution)

Use the prompt below with a coding implementation agent when you want strict, enterprise-grade execution in an existing repository.

```text
FIRST READ EVERYTHING CAREFULLY.
DO NOT SKIP ANY LINE.
THIS IS A PRODUCTION-GRADE APPLICATION.

IMPORTANT:
- Preserve user intent.
- No demo handlers.
- No fake API responses.
- No placeholder business logic.
- Controllers must stay thin.
- Services must contain business logic.
- Every critical flow must persist in database.

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

Additional product direction:
- School learners need subject/chapter/topic-level flow and chapter tests.
- Coding learners need beginner to advanced path with practice and evaluation.
- Resume where user left off.
- Backward allowed, forward locked until previous lesson completion.
- User-wise isolated analytics and weakness mapping.
- Dashboard with progress bars and weak-topic indicators.

---------------------------------------------------------
TARGET STACK
---------------------------------------------------------

Frontend:
- Next.js App Router + TypeScript
- Tailwind CSS
- Framer Motion
- GSAP (hero or selected sections only)
- Lucide SVG icons
- React Query
- Axios interceptors
- React Hook Form + Zod
- ShadCN-compatible UI components

Backend:
- Node.js + Express
- MongoDB Atlas + Mongoose
- Redis
- JWT access + refresh
- bcrypt
- Zod validators
- Helmet
- CORS
- express-rate-limit
- compression
- cookie-parser
- express-mongo-sanitize
- xss-clean
- Winston logger

---------------------------------------------------------
MANDATORY ARCHITECTURE
---------------------------------------------------------

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

Frontend structure:
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

Rules:
- Controllers only orchestrate request/response.
- Services implement business logic.
- Validation runs before controller execution.
- Use centralized error middleware.
- Use standardized API response envelope.
- No cross-user data leakage.

---------------------------------------------------------
CORE FLOWS TO IMPLEMENT
---------------------------------------------------------

1) Authentication
- Register
- Login
- Refresh token rotation
- Logout
- Get current user
- Role middleware (student/admin)
- Login attempt lockout
- Refresh token stored as hash in DB
- Refresh cookie as httpOnly + secure settings

2) Course Management
- Admin CRUD
- Public list and detail
- Category integrity:
  - school -> class9, class10
  - coding -> cpp, java, python, webdev
- School schema: subjects -> chapters -> lessons
- Coding schema: modules -> topics -> lessons

3) Enrollment and Progress
- Enroll endpoint
- Complete lesson endpoint
- Update last watched lesson endpoint
- Get my enrollments endpoint
- Get course progress endpoint
- Resume endpoint

4) Lock System
- Allow backward lesson access.
- Reject forward skip:
  if requestedLesson > lockedUntilLesson => 403

5) Resume System
- Persist last watched lesson.
- On login/dashboard return latest valid resume pointer.
- If course structure changed, clamp to last valid lesson index.

6) Test + Analytics Engine
- Admin test creation
- Learner test listing and attempt
- Submit answers and compute score
- Topic-wise accuracy map
- Persist testHistory
- Update weaknessAnalysis
- Classify weakness:
  red < 50
  yellow 50-70
  green >= 70
- Suggest weakest topics in dashboard payload

7) Contact and Newsletter
- Contact message persistence
- Newsletter subscribe/unsubscribe
- Public endpoint rate-limiting

8) Dashboard Aggregation
- Summary cards
- Resume card
- Progress by course
- Subject/module performance
- Weak topic indicators
- Suggestion list

---------------------------------------------------------
SECURITY AND PERFORMANCE
---------------------------------------------------------

- Helmet enabled.
- Strict CORS allow-list.
- Request body size limit.
- Mongo sanitize + XSS sanitize.
- Rate limits for global/auth/login/contact/newsletter.
- Hide stack traces in production responses.
- Compression middleware enabled.
- Redis cache:
  - course list/detail
  - dashboard payload
- Cache invalidation on course/progress/test mutations.
- Use lean queries on read-heavy paths.

---------------------------------------------------------
FRONTEND UX + SEO REQUIREMENTS
---------------------------------------------------------

Design:
- Dark premium gradient background
- Neon accent
- Glassmorphism cards
- Scroll progress indicator
- Lightweight particle background
- Micro interactions 200-300ms
- Smooth but non-laggy animations

Pages:
- Landing
- School
- Coding
- Course Detail (dynamic)
- Dashboard
- About
- Contact
- Login
- Register

SEO:
- Metadata per route
- OpenGraph + Twitter cards
- robots.txt
- sitemap.xml (dynamic course URLs when possible)
- JSON-LD structured data
- Semantic heading hierarchy

SEO reality:
- Do not promise instant rank #1.
- Implement technical SEO best practices.
- Mention authority/content/backlinks timeline clearly.

---------------------------------------------------------
DEPLOYMENT TARGETS
---------------------------------------------------------

Frontend:
- Vercel

Backend:
- Render

Database:
- MongoDB Atlas

Cache:
- Managed Redis

Required backend env:
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

---------------------------------------------------------
EXECUTION PHASES
---------------------------------------------------------

Phase 0 - Repository Audit
- Inspect existing modules.
- Reuse valid code.
- Identify missing behavior only.

Phase 1 - Backend Completion
- Finish service-layer business logic.
- Validate auth/role/validation guards.
- Verify lock/resume/analytics flows.

Phase 2 - Frontend Completion
- Connect pages to real APIs where required.
- Add loading/empty/error/unauthorized states.
- Keep semantic and accessible UI structure.

Phase 3 - Hardening
- Confirm middleware stack and rate limits.
- Confirm Redis cache + invalidation.
- Ensure production-safe error handling.

Phase 4 - Deployment Readiness
- Verify .env.example parity.
- Provide Render + Vercel variable mapping.
- Add post-deploy verification checklist.

Phase 5 - Data Bootstrap
- Add idempotent seed script for baseline courses/tests/admin.
- Ensure seeded content is publish-ready and not empty placeholder pages.

---------------------------------------------------------
MANDATORY VALIDATION
---------------------------------------------------------

Run and report results:
- npm run lint
- npm run build
- npm --prefix backend run check

Behavior checks:
- Register/login/refresh/logout works.
- Resume pointer returned on login when progress exists.
- Forward skip blocked by lock logic.
- Test submission updates weakness analysis.
- Dashboard returns chart-ready payload.
- Contact/newsletter endpoints persist and rate-limit.
- robots and sitemap endpoints are reachable.

---------------------------------------------------------
REQUIRED OUTPUT FORMAT FROM AGENT
---------------------------------------------------------

1) Short implementation summary
2) File-by-file changes and why
3) Validation command results
4) Remaining gaps/risks
5) Deployment checklist
```

## Suggested Validation Command Pack

```bash
npm run verify
npm --prefix backend run seed:production
```

## Cross-Domain Auth Cookie Notes (Vercel + Render)

- `REFRESH_COOKIE_SAME_SITE=none`
- `REFRESH_COOKIE_SECURE=true`
- `CORS_ORIGIN=https://collegehub.site,https://www.collegehub.site`
- Keep `REFRESH_COOKIE_DOMAIN` empty unless using shared subdomain strategy.

