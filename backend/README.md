# CollegeHub Backend

Production-grade Node.js + Express backend for `collegehub.site`.

## Architecture

- `controllers/`: HTTP layer only, no business logic.
- `services/`: core business logic (auth, courses, progress, tests, dashboard).
- `models/`: Mongoose schemas with indexes and validation.
- `middleware/`: auth, validation, lock checks, error handling, rate limiting.
- `analytics/`: topic weakness engine and suggestion generator.
- `config/`: database, Redis, logger setup.

## Security and Performance

- JWT access + refresh tokens with rotation.
- Refresh token stored as hash in DB.
- Role-based access control (`student`, `admin`).
- Helmet, strict CORS, rate limiting, body size limit.
- Mongo sanitize + XSS cleaning.
- Compression enabled.
- Redis caching for public course and dashboard payloads.

## Core APIs

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/auth/me`

- `GET /api/courses`
- `GET /api/courses/:courseId`
- `GET /api/courses/admin/all` (admin)
- `POST /api/courses/admin` (admin)
- `PATCH /api/courses/admin/:courseId` (admin)
- `DELETE /api/courses/admin/:courseId` (admin)

- `POST /api/enrollments`
- `GET /api/enrollments`
- `GET /api/enrollments/resume`
- `GET /api/enrollments/:courseId`
- `PATCH /api/enrollments/:courseId/complete`
- `PATCH /api/enrollments/:courseId/last-watched`
- `GET /api/enrollments/:courseId/lesson-access?lessonIndex=...`

- `POST /api/tests/admin` (admin)
- `GET /api/tests/course?courseId=...`
- `GET /api/tests/:testId`
- `POST /api/tests/submit`

- `GET /api/dashboard`
- `GET /api/health`

- `POST /api/contact/messages`
- `GET /api/contact/messages` (admin)
- `POST /api/contact/newsletter/subscribe`
- `POST /api/contact/newsletter/unsubscribe`

## Run Locally

1. Copy `.env.example` to `.env` and fill real values.
2. Install dependencies:
   - `npm install`
3. Start development server:
   - `npm run dev`

## Seed Baseline Production Content

Use this script to bootstrap real course and test content after initial deployment.
The script is idempotent, so rerunning it updates existing seeded records.

```bash
npm run seed:production
```

Optional env vars for admin bootstrap:

- `SEED_ADMIN_EMAIL` (default: `admin@collegehub.site`)
- `SEED_ADMIN_PASSWORD` (default: `ChangeMe@1234`)
- `SEED_FORCE_ADMIN_PASSWORD_RESET` (`true` to rotate admin password on rerun)

## Render Deployment

Preferred option: Blueprint with `backend/render.yaml`.

1. Push `/backend` to GitHub.
2. Create a new Render Web Service with root directory set to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add environment variables from `.env.example`.
6. Set `NODE_ENV=production`.

### Cross-domain Auth Cookie Notes

If frontend and backend are on different domains (for example Vercel + Render), set:

- `REFRESH_COOKIE_SAME_SITE=none`
- `REFRESH_COOKIE_SECURE=true`
- `CORS_ORIGIN=https://your-frontend-domain`

For same-domain/local development, keep `REFRESH_COOKIE_SAME_SITE=lax`.

## Docker Ready

Use the included `Dockerfile`:

```bash
docker build -t collegehub-backend .
docker run -p 5000:5000 --env-file .env collegehub-backend
```
