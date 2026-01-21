# Project Timeline: Architect Portfolio & Lead Gen Platform

**Project Manager:** Expert SDE System
**Total Duration:** 4 Weeks (Sprint-based)
**Methodology:** Agile / Critical Path
**Tech Stack:** Next.js 15, Keystatic, Tailwind v4, Vercel

---

## 📅 Phase 1: Infrastructure & The "Iron Skeleton"

**Week 1 (Days 1-7)**
**Goal:** A deployed, live URL with a working CMS. Data persists to GitHub.

| Day     | Task ID | Description                   | Technical Specifics                                                                                                         |
| :------ | :------ | :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Mon** | **1.1** | **Repository Initialization** | `npx create-next-app@latest` (Flags: `--ts`, `--tailwind`, `--eslint`). Initialize Git. Clean default boilerplate.          |
| **Tue** | **1.2** | **CMS Core Setup**            | Install `@keystatic/core` & `@keystatic/next`. Configure `keystatic.config.ts` with schemas: `Projects`, `Team`, `Pages`.   |
| **Wed** | **1.3** | **DevOps & Authentication**   | Connect Repo to Vercel. **CRITICAL:** Configure GitHub App credentials in Vercel Env Vars to enable "Git Mode" for the CMS. |
| **Thu** | **1.4** | **Type Generation**           | Run `keystatic generate-types`. Create `lib/keystatic.ts` reader functions to ensure strict typing for frontend components. |
| **Fri** | **1.5** | **Routing Architecture**      | scaffold filesystem: `/app/projects`, `/app/about`, `/app/contact`. Implement shared `Header` and `Footer` components.      |
| **Sat** | **1.6** | **Smoke Test**                | Verify `/keystatic` admin panel works in Production. Create one dummy "Test Project" and confirm it commits to GitHub.      |

**✅ Deliverable:** Live Vercel URL where the Admin Panel functions.

---

## 📅 Phase 2: Core Engine & Content Injection

**Week 2 (Days 8-14)**
**Goal:** All functional pages are built. Cousin begins data entry (Parallel Workflow).

| Day     | Task ID | Description               | Technical Specifics                                                                                                   |
| :------ | :------ | :------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| **Mon** | **2.1** | **Data Fetching Logic**   | Write Async Server Components to fetch and display raw JSON data for the Home Grid and Project Detail pages.          |
| **Tue** | **2.2** | **Image Pipeline**        | Implement `next/image` with strict quality settings. **Constraint:** Enforce `sizes` prop to prevent mobile overload. |
| **Wed** | **2.3** | **Client Onboarding**     | **MILESTONE:** Send CMS Link + "Image Guide" (PDF) to Cousin. She starts uploading projects _now_.                    |
| **Thu** | **2.4** | **Masonry Layout**        | Implement the responsive grid for the Home page. Handle aspect ratio shifts (Portrait vs Landscape renders).          |
| **Fri** | **2.5** | **Project Detail View**   | Build the `[slug]/page.tsx`. Style the Rich Text renderer (Headings, Paragraphs) and the scrolling Image Gallery.     |
| **Sat** | **2.6** | **Mobile Responsiveness** | QA the layout on Mobile view. Ensure navigation drawer/hamburger menu works.                                          |

**✅ Deliverable:** A fully navigable website with placeholder/real content.

---

## 📅 Phase 3: The "Architect" Polish & Integrations

**Week 3 (Days 15-21)**
**Goal:** "Luxury" feel, Animations, and Lead Gen tools.

| Day     | Task ID | Description              | Technical Specifics                                                                                                          |
| :------ | :------ | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Mon** | **3.1** | **Typography & Design**  | Implement **Geist Sans**. Configure Tailwind `@theme` for consistent H1/H2 scales. Apply global padding/margins.             |
| **Tue** | **3.2** | **Luxury Scroll Engine** | Install **Lenis**. Wrap `layout.tsx` in a Smooth Scroll provider. Tune friction/easing to match "Premium" feel.              |
| **Wed** | **3.3** | **Lead Gen Engines**     | Integrate **Web3Forms** (Contact Page) & **Cal.com** (Booking Embed). **Test:** Send a real email and book a real slot.      |
| **Thu** | **3.4** | **Micro-Animations**     | Add **Framer Motion**. Implement Staggered Entry for grid items and Fade-ins for images. Keep it subtle (0.4s duration).     |
| **Fri** | **3.5** | **Compliance Layer**     | Implement **Cookie Consent Banner** (`vanilla-cookieconsent`). Add Footer Links: ARB Status (if applicable), Privacy Policy. |
| **Sat** | **3.6** | **Performance Audit**    | Run Lighthouse. Fix CLS (Layout Shift) and Accessibility (Alt Text) errors.                                                  |

**✅ Deliverable:** Feature-complete "Release Candidate".

---

## 📅 Phase 4: Launch, SEO & Handover

**Week 4 (Days 22-28)**
**Goal:** Go Live, Index on Google, Transfer Ownership.

| Day     | Task ID | Description           | Technical Specifics                                                                                             |
| :------ | :------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Mon** | **4.1** | **Technical SEO**     | Implement `generateMetadata()` for dynamic Open Graph images (Social Previews). Add `sitemap.ts` & `robots.ts`. |
| **Tue** | **4.2** | **Analytics Setup**   | Enable **Vercel Web Analytics** (Hobby Tier). Confirm data is flowing without violating GDPR (cookie settings). |
| **Wed** | **4.3** | **Error Strategy**    | Polish the `not-found.tsx` (404) and `error.tsx` (500) pages. Ensure they are branded.                          |
| **Thu** | **4.4** | **Domain Migration**  | Update DNS Records (A/CNAME) at Registrar. Switch Vercel to Production Domain. Provision SSL.                   |
| **Fri** | **4.5** | **Final Handover**    | **MILESTONE:** Transfer Vercel/GitHub ownership (optional). Deliver "Owner's Manual" PDF.                       |
| **Sat** | **4.6** | **Post-Launch check** | Verify Forms, Booking, and Mobile view on the live `.com` domain.                                               |

**✅ Deliverable:** Project Closure.

---

## ⚠️ Risk Management & Constraints

| Risk Area         | Probability | Mitigation Strategy                                                                                                                        |
| :---------------- | :---------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| **Content Delay** | High        | Cousin fails to write text. **Mitigation:** Build with "Lorem Ipsum" and launch. Do not wait.                                              |
| **Image Bloat**   | High        | Cousin uploads 20MB PNGs. **Mitigation:** Hard constraint in "Owner's Manual" and strict `<Image>` component optimization.                 |
| **Legal (ARB)**   | Medium      | Cousin uses "Architect" title illegally. **Mitigation:** Hard-code fallback titles ("Spatial Designer") in CMS if registration is pending. |
| **Vercel Limits** | Low         | Hitting Hobby Tier bandwidth. **Mitigation:** Cache-Control headers set to `public, max-age=31536000, immutable` for assets.               |
