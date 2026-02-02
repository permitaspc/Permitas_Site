# Phase 1 Code Review & Audit Report

**Date:** 2026-02-02
**Reviewer:** Antigravity (AI Agent)
**Scope:** Phase 1 Infrastructure & "Iron Skeleton"

---

## 1. Executive Summary

**Overall Status:** ✅ **PASSED (Production Ready Skeleton)**

The codebase represents a solid, robust foundation for the Permitas Architecture portfolio. The integration between Next.js 15 (App Router) and Keystatic CMS is correctly implemented. Issues identified are minor and mostly related to purposeful rigidity for the initial build (e.g., hardcoded navigation structure) which can be made dynamic in later phases.

**Commercial Viability:** The architecture assumes a "hybrid" mode (Local for Dev, GitHub for Prod), which is the standard, cost-effective approach for Vercel-hosted CMS sites.

---

## 2. Hardcoded Values Audit

The following items are "hardcoded" in the source code. While acceptable for Phase 1, they limit the non-technical user's control unless migrated to the CMS in the future.

### 2.1 Navigation Links (Medium Impact)

- **File:** `components/global/Header.tsx`
- **Issue:** The navigation items (`Work`, `Studio`, `Contact`) are hardcoded in the JSX.
- **Constraint:** If the client wants to rename "Studio" to "Firm" or add a new link, a developer code edit is required.
- **Recommendation for Phase 2:** Move navigation structure to the `Settings` singleton in Keystatic, allowing the admin to reorder/rename links.

### 2.2 Legal Page Slugs (Low Impact)

- **File:** `app/(site)/legal/[slug]/page.tsx`
- **Issue:** `const VALID_PAGES = ["privacy-policy", "terms-of-service"]` explicitly limits the legal section to these two identifiers.
- **Reasoning:** This matches the `keystatic.config.ts` which defines `privacyPolicy` and `termsOfService` as explicit text fields on a Singleton, rather than a Collection of pages.
- **Verdict:** Acceptable for now. If flexible pages are needed later, convert `Legal` to a Collection.

### 2.3 Fallback Text (Negligible)

- **File:** `app/(site)/page.tsx` and `Header.tsx`
- **Issue:** Strings like "Permitas Architecture" and "Permitas" are used as fallbacks if CMS data returns `null`.
- **Verdict:** Good practice. Essential for UI stability.

---

## 3. Deployment & Robustness Checks

### 3.1 CMS Configuration (`keystatic.config.ts`)

- **Logic:** `storageStrategy` correctly switches based on `process.env.NODE_ENV`.
- **Critical Env Var:** The code relies on `process.env.NEXT_PUBLIC_GITHUB_REPO`.
  - **Risk:** If this variable is not set in Vercel Project Settings, the CMS **will fail** in production (it will revert to 'local' or error out).
  - **Action Required:** Ensure `NEXT_PUBLIC_GITHUB_REPO` is added to Vercel env variables (e.g., `username/repo-name`).

### 3.2 Type Safety & Data Fetching

- **Implementation:** The usage of `reader.singletons.X.read()` is robust.
- **Safety:** The code consistently uses optional chaining (e.g., `homeData?.heroHeadline`) handling the case where a user hasn't saved content yet without crashing the app.
- **Async/Await:** All page components are correctly marked `async`, leveraging Next.js App Router Server Components.

### 3.3 Routing Architecture

- **Dynamic Routes:** `generateStaticParams` is implemented correctly in `projects` and `legal`, enabling Static Site Generation (SSG) for performance.
- **404 Handling:** `notFound()` is correctly invoked in dynamic routes to prevent "ghost pages" for invalid URLs.

---

## 4. Code Quality & Formatting

- **Structure:** File organization follows strict Next.js App Router conventions (`app/(site)/...`).
- **Clarity:** Code is clean, well-commented, and free of "spaghetti" logic.
- **Dependencies:** `package.json` is clean. Only essential packages are installed.

---

## 5. Next Steps (Phase 2 Pre-requisites)

Before starting the visual design in Phase 2, ensure the following are addressed:

1.  **Vercel Environment:** Verify `NEXT_PUBLIC_GITHUB_REPO`, `KEYSTATIC_GITHUB_CLIENT_ID`, and `KEYSTATIC_GITHUB_CLIENT_SECRET` are set.
2.  **Clean Up:** Remove the "Project Debug List" from `app/(site)/page.tsx` once real design implementation begins.
3.  **Content Entry:** The CMS is ready. You can essentially hand this off to a content manager now while development continues on the frontend.
