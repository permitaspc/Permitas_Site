# Project Timeline: Architect Portfolio & Lead Gen Platform

**Project Manager:** Antigravity (Google DeepMind)
**Total Duration:** 4 Weeks (Sprint-based)
**Methodology:** Agile / Critical Path
**Tech Stack:** Next.js 15, Keystatic, Tailwind v4, Vercel
**Last Updated:** February 15, 2026

---

## 📅 Phase 1: Infrastructure & The "Iron Skeleton" (COMPLETED)

**Week 1 (Jan 22 - Jan 28)**
**Goal:** A deployed, live URL with a working CMS. Data persists to GitHub.

| Day     | Task ID | Status      | Description                   | Technical Specifics                                                                                                         |
| :------ | :------ | :---------- | :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Mon** | **1.1** | **✅ Done** | **Repository Initialization** | `npx create-next-app@latest` (Flags: `--ts`, `--tailwind`, `--eslint`). Initialize Git. Clean default boilerplate.          |
| **Tue** | **1.2** | **✅ Done** | **CMS Core Setup**            | Install `@keystatic/core` & `@keystatic/next`. Configure `keystatic.config.ts` with schemas: `Projects`, `Team`, `Pages`.   |
| **Wed** | **1.3** | **✅ Done** | **DevOps & Authentication**   | Connect Repo to Vercel. **CRITICAL:** Configure GitHub App credentials in Vercel Env Vars to enable "Git Mode" for the CMS. |
| **Thu** | **1.4** | **✅ Done** | **Type Generation**           | Run `keystatic generate-types`. Create `lib/keystatic.ts` reader functions to ensure strict typing for frontend components. |
| **Fri** | **1.5** | **✅ Done** | **Routing Architecture**      | Scaffold filesystem: `/app/projects`, `/app/about`, `/app/contact`. Implement shared `Header` and `Footer` components.      |
| **Sat** | **1.6** | **✅ Done** | **Smoke Test / Refactor**     | Verify `/keystatic` admin panel works. Audit hardcoded values. Enable `next/image`.                                         |
| **Mon** | **1.7** | **✅ Done** | **Global Footer**             | Refactor Footer to be global (in `layout.tsx`) and connected to CMS Settings singleton.                                     |

**✅ Deliverable:** Live Vercel URL where the Admin Panel functions and data persists.

---

## 📅 Phase 2: Core Engine & Content Injection (COMPLETED)

**Week 2 (Jan 29 - Feb 4)**
**Goal:** All functional pages are built, styled to "Luxury" standard, and mobile-ready.

| Day     | Task ID | Status         | Description               | Technical Specifics                                                                                                   |
| :------ | :------ | :------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| **Mon** | **2.1** | **✅ Done**    | **Data Fetching Logic**   | Write Async Server Components to fetch and display raw JSON data for the Home Grid and Project Detail pages.          |
| **Tue** | **2.2** | **✅ Done**    | **Image Pipeline**        | Implement `next/image` with strict quality settings. **Constraint:** Enforce `sizes` prop to prevent mobile overload. |
| **Wed** | **2.3** | **✅ Done**    | **CMS Readiness**         | Technical infrastructure for client onboarding is ready. CMS is fully operational.                                    |
| **Thu** | **2.4** | **✅ Done**    | **Project Feed MVP**      | Implemented Vertical Scroll Feed with Parallax effects (replaced initial Masonry idea for cleaner mobile UX).         |
| **Fri** | **2.5** | **⏳ Pending** | **Detail View Polish**    | Style `DocumentRenderer` (Typography, Spacing). Implement "Next/Previous Project" navigation.                         |
| **Sat** | **2.6** | **⏳ Pending** | **Mobile Navigation**     | Build `MobileMenu` component (Hamburger + Drawer). Ensure touch targets are >44px.                                    |
| **Sun** | **2.7** | **✅ Done**    | **Architecture Refactor** | Create `app/lib/data.ts` to abstract `reader` calls. Fix hardcoded values in Header/Footer/Lib.                       |

**✅ Deliverable:** A fully navigable, responsive website with "Production-Ready" code structure.

---

## 📅 Phase 2.5: Advanced Content & UX Polish (COMPLETED)

**Week 3 (Feb 10 - Feb 14)**
**Goal:** High-impact UX features and complex content modeling.

| Task ID  | Status      | Description             | Technical Specifics                                                                             |
| :------- | :---------- | :---------------------- | :---------------------------------------------------------------------------------------------- |
| **2.8**  | **✅ Done** | **Homepage Storyboard** | Implemented scroll-linked text reveal for Mission Statement using `framer-motion`.              |
| **2.9**  | **✅ Done** | **Loading Screen**      | Created global "Curtain Lift" loader with `sessionStorage` persistence (runs once per session). |
| **2.10** | **✅ Done** | **Team Page Fixes**     | Implemented visual line-clamping and read-more logic for bio text to fix grid overflow.         |
| **2.11** | **✅ Done** | **CMS Expansion**       | Added schemas for Services, Process, Testimonials, and Homepage Hero Video.                     |

---

## 📅 Phase 3: The "Architect" Polish & Integrations (IN PROGRESS)

**Week 4 (Feb 15 - Feb 21)**
**Goal:** "Luxury" feel, Animations, and Lead Gen tools.

| Day     | Task ID | Status         | Description              | Technical Specifics                                                                                                          |
| :------ | :------ | :------------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Mon** | **3.1** | **✅ Done**    | **Typography & Design**  | Implement **Geist Sans**. Configure Tailwind `@theme`. Applied global styles.                                                |
| **Tue** | **3.2** | **✅ Done**    | **Luxury Scroll Engine** | Install **Lenis** (Smooth Scroll). Hidden default scrollbar for seamless "App-like" feel.                                    |
| **Wed** | **3.3** | **✅ Done**    | **Lead Gen Engines**     | Integrated **Web3Forms** (Contact) & **Cal.com** (Booking). **Refinement:** Seamless, borderless widget integration.         |
| **Thu** | **3.4** | **✅ Done**    | **Brand Integration**    | **Logo Replacement:** Replaced text with CMS-managed Logo in Header & Loader. **Sizing:** Optimized for 20%+ larger impact.  |
| **Fri** | **3.5** | **⏳ Pending** | **Compliance Layer**     | Implement **Cookie Consent Banner** (`vanilla-cookieconsent`). Add Footer Links: ARB Status (if applicable), Privacy Policy. |
| **Sat** | **3.6** | **⏳ Pending** | **Performance Audit**    | Run Lighthouse. Fix CLS (Layout Shift) and Accessibility (Alt Text) errors.                                                  |

**✅ Deliverable:** Feature-complete "Release Candidate".

---

## 📅 Phase 4: Launch, SEO & Handover (PLANNED)

**Week 5 (Feb 22 - Feb 28)**
**Goal:** Go Live, Index on Google, Transfer Ownership.

| Day     | Task ID | Status         | Description           | Technical Specifics                                                                                             |
| :------ | :------ | :------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------- |
| **Mon** | **4.1** | **⏳ Pending** | **Technical SEO**     | Implement `generateMetadata()` for dynamic Open Graph images (Social Previews). Add `sitemap.ts` & `robots.ts`. |
| **Tue** | **4.2** | **⏳ Pending** | **Analytics Setup**   | Enable **Vercel Web Analytics** (Hobby Tier). Confirm data is flowing without violating GDPR (cookie settings). |
| **Wed** | **4.3** | **⏳ Pending** | **Error Strategy**    | Polish the `not-found.tsx` (404) and `error.tsx` (500) pages. Ensure they are branded.                          |
| **Thu** | **4.4** | **⏳ Pending** | **Domain Migration**  | Update DNS Records (A/CNAME) at Registrar. Switch Vercel to Production Domain. Provision SSL.                   |
| **Fri** | **4.5** | **⏳ Pending** | **Final Handover**    | **MILESTONE:** Transfer Vercel/GitHub ownership (optional). Deliver "Owner's Manual" PDF.                       |
| **Sat** | **4.6** | **⏳ Pending** | **Post-Launch check** | Verify Forms, Booking, and Mobile view on the live `.com` domain.                                               |

**✅ Deliverable:** Project Closure.
