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





















































read all the context pls 


and or jada page ko long and detailing mai karo pls 

navbar bhe sahi karo pls 

icons bhe fullyrofesional and modern chiaye mujhe and sab cheez fully responsive bhe hona chaiye haar ek device ke liye 




and or jada animtion and profeesional and 3d and momdern banao pls and bhout jad detailing and explanion add karo 


jitna library and tools ka use karna hai karo bus website mai bilkul bhe lag nhi hona chaiye isko mind mai rakho 

part by part ready karo agar problem ho raha hai to and jitna bhe library and tools ka need hai sab install kat lena pls okay

and pls or jada hee detailing chiaye mujhe kcuh bhe miss nhi hona chiaye sab cheez aacha se soch samaaj kar or bhe jada detiling add karo pls pls q ki detailing and information and explanation hee main hai mera liye yaar pls or bhe jada detailing add karo tum part by parts bhe code kar sakte hoo koi problem nhi hai 

aise hona chiaye ki user ko sab cheez yahi par mil jaye sara gyan mera hee website par mil jaye pratical bhe mera hee wesbite par mil jaye kisi bhe cheez ka need ho sab mil jana chiaye and sab working condition mai hona chiaye 


c lang mai jo day 1 ke andar ye sab cheez ko aacha se detail mai soch samaj kar implemet karna hai and aacha se and bhout jada detailing hona chiaye and day 1 wala page fully professional modern and 3d and animted and aacha se arrange hona chiaye maine tumko documents bhe diye hai to usko bhe padh lena pls and pura logic laga kar aacha se soch samaj kar detailing and explanation ke sath add karna sab cheez kuch bhe miss nhi hona chiaye isme pictures animtaions and tables and or bhe kuch kuch agar tum add kar sakte hoo to aacha rahega sab cheez detailing ke sath hona chiaye or jada detailing add karna hai isme pls maine bhout sare contexts diye hai tumko and tumko bhout kuch share kiya hai maine pls aacha se padh lo and soch samaj kar work start karo and or jada detailing add karo 




c lang mai jo day 1 ke andar ye sab cheez ko aacha se detail mai soch samaj kar implemet karna hai and aacha se and bhout jada detailing hona chiaye and day 1 wala page fully professional modern and 3d and animted and aacha se arrange hona chiaye maine tumko documents bhe diye hai to usko bhe padh lena pls and pura logic laga kar aacha se soch samaj kar detailing and explanation ke sath add karna sab cheez kuch bhe miss nhi hona chiaye isme pictures animtaions and tables and or bhe kuch kuch agar tum add kar sakte hoo to aacha rahega sab cheez detailing ke sath hona chiaye or jada detailing add karna hai isme pls maine bhout sare contexts diye hai tumko and tumko bhout kuch share kiya hai maine pls aacha se padh lo and soch samaj kar work start karo and or jada detailing add karo 


c lang mai jo day 1 ke andar ye sab cheez ko aacha se detail mai soch samaj kar implemet karna hai and aacha se and bhout jada detailing hona chiaye and day 1 wala page fully professional modern and 3d and animted and aacha se arrange hona chiaye maine tumko documents bhe diye hai to usko bhe padh lena pls and pura logic laga kar aacha se soch samaj kar detailing and explanation ke sath add karna sab cheez kuch bhe miss nhi hona chiaye isme pictures animtaions and tables and or bhe kuch kuch agar tum add kar sakte hoo to aacha rahega sab cheez detailing ke sath hona chiaye 


<iframe src="https://docs.google.com/document/d/e/2PACX-1vQ2PjMRAO7XetDYb3u66g-SpZ2isQbYky6Zy0l7pIDrQ8peLEe9hCIBpFuMrUdgsFYcCUQPoBRCZpsM/pub?embedded=true"></iframe>


https://docs.google.com/document/d/e/2PACX-1vQ2PjMRAO7XetDYb3u66g-SpZ2isQbYky6Zy0l7pIDrQ8peLEe9hCIBpFuMrUdgsFYcCUQPoBRCZpsM/pub




https://docs.google.com/document/d/e/2PACX-1vTil2GTysbMPjjbzbJSWbAvT6iFHnQd-1g7axpTlrhD83rqOYoPB509VTAWBBHLMPoezN_qOEOdymQ2/pub


<iframe src="https://docs.google.com/document/d/e/2PACX-1vTil2GTysbMPjjbzbJSWbAvT6iFHnQd-1g7axpTlrhD83rqOYoPB509VTAWBBHLMPoezN_qOEOdymQ2/pub?embedded=true"></iframe>





<iframe src="https://docs.google.com/document/d/e/2PACX-1vRUVlvLH3lX7s_D4PckTL4orqspf7tf18alzU4WQYzPl6ciUUEcaknbgEnk_JRj-qS7TJaSLWC18K86/pub?embedded=true"></iframe>


https://docs.google.com/document/d/e/2PACX-1vRUVlvLH3lX7s_D4PckTL4orqspf7tf18alzU4WQYzPl6ciUUEcaknbgEnk_JRj-qS7TJaSLWC18K86/pub





