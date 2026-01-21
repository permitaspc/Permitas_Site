# Technical Specification Document: Project Arch-Portfolio

**Date:** January 20, 2026
**Author:** Expert SDE System
**Status:** Approved for Planning

## 1. Executive Summary

This document outlines the software architecture, technology stack, and deployment pipeline for the proposed Architect Portfolio website. The architecture is designed to prioritize **Performance (Core Web Vitals)**, **Zero-Cost Maintenance (OPEX)**, and **Developer Experience (DX)**. It utilizes a "Bleeding Edge" stack (Next.js 15 + React 19) to ensure longevity and serve as a high-level learning platform for full-stack system design.

---

## 2. Core Technology Stack

### 2.1 Frontend Architecture

The frontend will function as a statically generated application (SSG) with ISR capabilities where necessary, leveraging React Server Components.

| Component     | Technology     | Version              | Rationale                                                                                                                                                |
| :------------ | :------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework** | **Next.js**    | **v15 (App Router)** | Essential for React Server Components (RSC) and React 19 support (`<Suspense>`, Server Actions). Eliminates client-side bundle bloat for static content. |
| **Language**  | **TypeScript** | **v5.x**             | Provides strict type safety for CMS data schemas, preventing runtime errors in production.                                                               |
| **Runtime**   | **Node.js**    | **v22.x (LTS)**      | Current Long Term Support version for stability during build times.                                                                                      |

### 2.2 Content Management System (CMS)

We are bypassing traditional database-backed CMSs (Sanity/Strapi) in favor of a **Git-based** approach to eliminate recurring costs and latency.

- **Product:** **Keystatic**
- **Architecture:** Local/GitHub Mode.
- **Storage:** Content is serialized as Markdown/JSON and stored directly in the GitHub Repository (`/content/projects`).
- **Authentication:** GitHub OAuth (via GitHub App).
- **Cost:** **$0.00** (Leverages GitHub free tier storage).

### 2.3 User Experience & Design Engine

Architectural portfolios require "luxury" interaction patterns that differ from standard web apps.

- **Styling:** **Tailwind CSS v4.0 (Oxide Engine)**
  - _Configuration:_ CSS-native `@theme` blocks (No `tailwind.config.js`).
  - _Performance:_ 10x faster build times than v3.
- **Scroll Physics:** **Lenis**
  - _Function:_ WebGL-like smooth scrolling. Standardizes scroll behavior across trackpads and mice to ensure a premium feel.
- **Animation:** **Framer Motion v12**
  - _Usage:_ Layout transitions (Shared Element Transitions) and entry animations.

### 2.4 Communication & Scheduling Engine

To maintain a serverless architecture while avoiding "Sandbox" limitations and enabling approval workflows.

| Component        | Technology    | Rationale                                                                                                                                                                                                      |
| :--------------- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Email System** | **Web3Forms** | **No-Backend Solution.** Bypasses the need for API routes or DNS verification (Sandbox mode) during development. Uses a public Access Key for direct form submission.                                          |
| **Scheduling**   | **Cal.com**   | **Open Source Infrastructure.** Selected over Calendly for its granular "Requires Confirmation" workflow (Client requests slot → Architect approves → Calendar blocks). Implemented via `@calcom/embed-react`. |

---

## 3. Infrastructure & Deployment

### 3.1 DevOps Pipeline

The deployment strategy relies on a GitOps workflow. We will not use manual FTP or drag-and-drop uploads.

- **Source Control:** **GitHub (Private Repository)**
  - Stores source code.
  - Stores binary assets (images) and content files.
  - Acts as the "Database" for Keystatic.
- **Production Environment:** **Vercel (Hobby Tier)**
  - **Region:** `bom1` (Mumbai) or `sin1` (Singapore) - _Select based on client's primary audience location._
  - **Build Command:** `next build`
  - **Output:** `.next` folder (Standalone).

### 3.2 Deployment Workflow

1.  **Code Changes:** Push to `main` branch → Vercel Trigger → Build → Deploy.
2.  **Content Changes:** Client uses `/keystatic` UI → Saves Content → Keystatic commits to `main` → Vercel Trigger → Build → Deploy.

---

## 4. Cost Analysis (OPEX)

| Service       | Tier        | Monthly Cost   | Notes                                                           |
| :------------ | :---------- | :------------- | :-------------------------------------------------------------- |
| **Vercel**    | Hobby       | **$0.00**      | Includes SSL, CDN, and DDoS protection. Limit: 100GB Bandwidth. |
| **GitHub**    | Free        | **$0.00**      | Private repo storage is free.                                   |
| **Keystatic** | Open Source | **$0.00**      | No subscription required.                                       |
| **Domain**    | Registrar   | **~$12.00/yr** | The only recurring cost (e.g., Namecheap).                      |
| **Total**     |             | **$0.00/mo**   | **(Excluding Domain Renewal)**                                  |
| **Web3Forms** | Free Tier   | **$0.00**      | 250 submissions/month (Sufficient for portfolio).               |
| **Cal.com**   | Individual  | **$0.00**      | Unlimited bookings for individuals.                             |

---

## 5. Pre-Flight Checklist

_Before initializing the project, ensure the following are secured:_

- [ ] **GitHub Account:** Access to create Private Repositories.
- [ ] **GitHub App Config:** Required for Keystatic. You will need:
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`
  - `GITHUB_SECRET_KEY` (openssl generated)
- [ ] **Vercel Account:** Linked to the GitHub account.
- [ ] **Node.js Environment:** Local machine running Node v20+.

## 6. Project Initialization Command

_Reference command for setup phase:_

```bash
npx create-next-app@latest portfolio-name \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

---

## 7. Post-Launch & Observability Strategy

### 7.1 Visibility & SEO (Search Engine Optimization)

To ensure the portfolio ranks in the UK/EU and looks professional when shared.

- **Sitemap & Robots:** Implement dynamic `sitemap.ts` and `robots.ts` using Next.js Metadata API to ensure Google indexes all project pages automatically.
- **Social Previews (Open Graph):** Use `@vercel/og` to auto-generate "Link Preview Cards" for WhatsApp/LinkedIn.
  - _Dynamic Logic:_ The card will programmatically display the specific Project Title and Cover Image when shared.

### 7.2 Analytics & Feedback

- **Tool:** **Vercel Web Analytics** (Hobby Tier).
  - _Why:_ Privacy-friendly, GDPR compliant options, and zero-code integration. Tracks visitors and "Book Consultation" conversion rates.

### 7.3 Legal Compliance (UK/EU Mandate)

Since the target audience is UK/EU, strict GDPR compliance is required for cookies (Calendly/Analytics).

- **Cookie Consent:** Implement **`vanilla-cookieconsent`**.
  - _Behavior:_ A lightweight, non-intrusive banner that blocks Analytics/Calendly scripts until the user clicks "Accept".
  - _Policy:_ Must link to the Privacy Policy page (placeholder generated in CMS).

### 7.4 Error Handling & Stability Protocols

- **404 (Not Found):** Custom `not-found.tsx` to retain branding if a user clicks a broken link.
- **500 (Server Error):** Global `error.tsx` boundary to catch unexpected crashes without showing a "White Screen of Death."
- **Asset Hygiene (CRITICAL):**
  - **Protocol:** Strict manual validation guideline: **Images must be <2MB and .jpg/.webp format.**
  - _Reason:_ Prevents Vercel Serverless Function timeouts and GitHub repository bloat.

---

## 8. Compliance & Polish (UK/EU Specifics)

### 8.1 Regulatory Compliance (Architects Act 1997)

- **Constraint:** Verify ARB Registration status.
- **Implementation:**
  - If ARB Registered: Display Registration Number in Footer.
  - If Not Registered: Hardcode forbidden terms ("Architect") in CMS validation to prevent accidental usage in page titles.

### 8.2 Typography & Licensing

- **Font Strategy:** **Geist Sans** (Vercel Default).
  - _Rationale:_ $0 cost, zero layout shift (built into Next.js), and matches the "Swiss Style" aesthetic preferred by architects.

### 8.3 Accessibility (a11y)

- **Schema Enforcement:** All CMS Image fields must have a corresponding `alt` text field marked as `validation: { isRequired: true }`.

### 8.4 Disaster Recovery

- **Backup Strategy:** Since content lives in the Git Repo, the "Backup" is a local clone.
- **Protocol:** Developer to pull `git fetch --all` once per month to ensure a local backup of all CMS content exists outside of GitHub.
