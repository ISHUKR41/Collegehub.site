# CollegeHub Optimization Guide

## 🚀 Performance Optimization Checklist

### Frontend Optimizations

#### 1. **Image Optimization**

**Current Implementation:**
- Next.js automatic image optimization via `next/image`
- WebP format with fallbacks
- Lazy loading by default

**Recommendations:**
```typescript
// Use Next.js Image component everywhere
import Image from 'next/image';

<Image 
  src="/hero.jpg" 
  width={1200} 
  height={600}
  priority  // For above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
  alt="Hero image"
/>
```

**Tools:**
- **TinyPNG** - Compress images before upload
- **Squoosh** - Web-based image compressor
- **ImageOptim** - Mac app for compression

---

#### 2. **Code Splitting**

**Current Implementation:**
- Next.js automatic code splitting per route
- Dynamic imports for heavy components

**Recommendations:**
```typescript
// Lazy load heavy components
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('@/components/HeavyChart'), {
  loading: () => <LoadingSpinner />,
  ssr: false  // If component uses window/document
});

// Lazy load libraries
const Editor = dynamic(() => import('react-quill'), { ssr: false });
```

---

#### 3. **Bundle Size Analysis**

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Keep bundle under:
# - Main bundle: < 200KB
# - Total JS: < 1MB
# - First Load JS: < 100KB
```

**Optimization Tips:**
- Replace heavy libraries with lighter alternatives
- Tree-shake unused code
- Use dynamic imports for admin-only features

---

#### 4. **Fonts Optimization**

**Current Implementation:**
- Next.js font optimization via `next/font`
- Inter font preloaded

**Best Practices:**
```typescript
// Subset fonts to reduce size
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],  // Only weights you use
});
```

---

#### 5. **Caching Strategy**

**Browser Caching:**
```typescript
// next.config.ts
module.exports = {
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|png|webp)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};
```

**Data Caching:**
```typescript
// Use React Query stale times
queryClient.setDefaultOptions({
  queries: {
    staleTime: 5 * 60 * 1000,  // 5 minutes
    cacheTime: 10 * 60 * 1000,  // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  },
});
```

---

### Backend Optimizations

#### 1. **Database Query Optimization**

**Indexes (Already Implemented):**
```javascript
// Essential indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.userprogresses.createIndex({ userId: 1, courseId: 1 });
db.courses.createIndex({ isPublished: 1, category: 1 });
```

**Query Best Practices:**
```javascript
// ✅ Good - Project only needed fields
Course.find({ isPublished: true })
  .select('title category thumbnail')
  .lean();  // Returns plain JS objects (faster)

// ❌ Bad - Fetches everything
Course.find({ isPublished: true });

// ✅ Good - Use aggregation for complex queries
Course.aggregate([
  { $match: { isPublished: true } },
  { $lookup: { from: 'userprogresses', ... } },
  { $project: { title: 1, enrollmentCount: 1 } }
]);
```

**Connection Pooling:**
```javascript
// mongoose.connect() already enables pooling
// Default pool size: 5
// Increase for production:
mongoose.connect(uri, {
  maxPoolSize: 10,  // For high-traffic apps
  minPoolSize: 5,
});
```

---

#### 2. **Redis Caching Strategy**

**Current Implementation:**
- Cache course lists
- Cache user progress
- 5-minute TTL

**Optimization:**
```javascript
// Cache frequently accessed data
const CACHE_STRATEGIES = {
  // Short TTL for dynamic data
  userProgress: 60,  // 1 minute
  
  // Medium TTL for semi-static data
  courseList: 300,  // 5 minutes
  
  // Long TTL for static data
  courseSyllabus: 3600,  // 1 hour
  
  // Very long for rarely changing data
  siteConfig: 86400,  // 24 hours
};

// Cache invalidation on updates
await Course.updateOne({ _id: courseId }, { $set: updates });
await cacheInvalidate(`course:${courseId}`);
```

**Redis Best Practices:**
- Use hash data structures for objects
- Set memory eviction policy: `allkeys-lru`
- Monitor memory usage
- Use pipelining for batch operations

---

#### 3. **API Response Optimization**

**Compression (Already Enabled):**
```javascript
// app.js
app.use(compression());  // Gzip/Brotli compression
```

**Pagination:**
```javascript
// ✅ Always paginate lists
const page = parseInt(req.query.page) || 1;
const limit = parseInt(req.query.limit) || 20;
const skip = (page - 1) * limit;

const courses = await Course.find()
  .limit(limit)
  .skip(skip)
  .lean();

const total = await Course.countDocuments();

return {
  data: courses,
  pagination: {
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
  },
};
```

**Field Filtering:**
```javascript
// Let clients request specific fields
const fields = req.query.fields?.split(',').join(' ');
const courses = await Course.find().select(fields || 'title category');
```

---

#### 4. **Rate Limiting Optimization**

**Current Implementation:**
- 100 requests per 15 minutes
- 5 requests per 15 minutes for auth routes

**Production Recommendations:**
```javascript
// Tiered rate limiting
const tierLimits = {
  free: rateLimit({ max: 100, windowMs: 15 * 60 * 1000 }),
  premium: rateLimit({ max: 500, windowMs: 15 * 60 * 1000 }),
  admin: rateLimit({ max: 1000, windowMs: 15 * 60 * 1000 }),
};

// Apply based on user role
app.use('/api', (req, res, next) => {
  const tier = req.user?.tier || 'free';
  return tierLimits[tier](req, res, next);
});
```

---

### Monitoring & Analytics

#### 1. **Performance Monitoring**

**Backend:**
```javascript
// Already implemented: performanceMiddleware
// Logs slow requests (> 1s)

// Add metrics collection
const metrics = {
  requestCount: 0,
  errorCount: 0,
  avgResponseTime: 0,
};

// Expose metrics endpoint
app.get('/api/metrics', (req, res) => {
  res.json(metrics);
});
```

**Frontend:**
```typescript
// Use Next.js analytics
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

#### 2. **Error Tracking**

**Sentry Integration:**
```bash
# Backend
npm install @sentry/node

# Frontend
npx @sentry/wizard -i nextjs
```

**Configuration:**
```javascript
// backend/app.js
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,  // 10% of transactions
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.errorHandler());
```

---

### Database Optimization

#### 1. **Query Performance**

**Explain Queries:**
```javascript
// Analyze slow queries
const explain = await Course.find({ category: 'school' })
  .explain('executionStats');

console.log(explain.executionStats);
// Check: executionTimeMillis, totalDocsExamined

// If totalDocsExamined >> nReturned, add index
```

**Avoid N+1 Queries:**
```javascript
// ❌ Bad - N+1 query problem
const courses = await Course.find();
for (const course of courses) {
  const progress = await UserProgress.findOne({ courseId: course._id });
}

// ✅ Good - Single aggregation query
const coursesWithProgress = await Course.aggregate([
  { $lookup: {
      from: 'userprogresses',
      localField: '_id',
      foreignField: 'courseId',
      as: 'progress'
  }},
]);
```

---

#### 2. **Index Strategy**

**Index Guidelines:**
- Index fields used in `find()`, `sort()`, `group by`
- Compound indexes for multiple-field queries
- Avoid over-indexing (impacts write performance)
- Monitor index usage

```javascript
// Check index usage
db.courses.aggregate([{ $indexStats: {} }]);

// Drop unused indexes
db.courses.dropIndex('unused_index_name');
```

---

### Security Optimizations

#### 1. **Input Validation**

**Already Implemented:**
- Zod validation
- MongoDB sanitization
- XSS cleaning
- Request depth/size limits

#### 2. **Authentication**

**JWT Optimization:**
```javascript
// Short-lived access tokens
JWT_ACCESS_EXPIRES_IN=15m  // ✅ Current

// Refresh token rotation (already implemented)
// Invalidate on password change

// Consider adding:
JWT_REFRESH_EXPIRES_IN=7d  // Down from 30d for security
```

---

### Scaling Checklist

#### When to Scale

**Database:**
- [ ] Query response time > 100ms
- [ ] Connection pool exhausted
- [ ] Storage > 80% of tier limit

**Backend:**
- [ ] CPU usage > 80%
- [ ] Memory usage > 80%
- [ ] Response time > 1s for 95th percentile

**Redis:**
- [ ] Memory usage > 80%
- [ ] Eviction rate increasing

#### How to Scale

**Horizontal Scaling:**
```bash
# Add more server instances
# Load balancer distributes traffic
# Use sticky sessions for auth
```

**Vertical Scaling:**
```bash
# Upgrade server resources
# MongoDB Atlas: M0 → M10 → M20
# Render: Free → Starter → Standard
```

**Database Sharding:**
```javascript
// For > 1M users
// Shard by userId
sh.shardCollection("collegehub.users", { _id: "hashed" });
sh.shardCollection("collegehub.userprogresses", { userId: 1 });
```

---

## 📊 Lighthouse Targets

### Desktop
- **Performance:** > 95
- **Accessibility:** > 95
- **Best Practices:** > 95
- **SEO:** > 95

### Mobile
- **Performance:** > 90
- **Accessibility:** > 95
- **Best Practices:** > 95
- **SEO:** > 95

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1

---

## 🔧 Development Tools

### Performance Testing
```bash
# Lighthouse CLI
npm install -g lighthouse
lighthouse https://collegehub.site --view

# WebPageTest
# https://www.webpagetest.org/

# GTmetrix
# https://gtmetrix.com/
```

### Load Testing
```bash
# Apache Bench
ab -n 1000 -c 10 https://api.collegehub.site/api/courses

# k6 (recommended)
npm install -g k6
k6 run loadtest.js
```

---

## ✅ Optimization Summary

**Current Status:**
- ✅ Image optimization (Next.js)
- ✅ Code splitting (Next.js)
- ✅ Font optimization
- ✅ Redis caching
- ✅ Database indexing
- ✅ Compression (gzip)
- ✅ Rate limiting
- ✅ Security headers
- ✅ Request ID tracking
- ✅ Performance monitoring

**Recommended Next Steps:**
1. Add Sentry error tracking
2. Enable Vercel Analytics
3. Set up monitoring dashboard
4. Configure CDN for static assets
5. Implement service worker (PWA)

---

**Platform is production-ready with enterprise-grade optimizations! 🚀**
