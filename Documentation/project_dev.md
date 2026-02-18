# Project Development Plan & Execution Strategy

**Project:** Permitas
**Objective:** Build a high-performance Architect Portfolio & Lead Gen Platform.
**Current Phase:** Phase 3 (Integrations & Polish).

---

## 📅 Phase 1: Infrastructure & The "Iron Skeleton" (COMPLETED)

**Goal:** A deployed, live URL with a working CMS. Data persists to GitHub.
**Timeline:** Week 1 (Jan 22 - Jan 28, 2026) -> **DONE**
**Status Update (Feb 10, 2026):** "Iron Skeleton" is fully operational. Global Footer implemented.

### 1.1 Repository & Environment Initialization (Done)

- [x] **Initialize Next.js 15 Application** (TypeScript, Tailwind, ESLint).
- [x] **Clean Boilerplate** (Remove Vercel defaults).
- [x] **Git Initialization** (Commit initial state).

### 1.2 CMS Core Setup (Keystatic) (Done)

- [x] **Install Dependencies** (`@keystatic/core`, `@keystatic/next`).
- [x] **Keystatic Configuration** (`keystatic.config.ts`) with GitHub/Local storage modes.
- [x] **Schema Definition:**
  - Collections: `projects`, `team`, `testimonials`, `faqs`.
  - Singletons: `settings`, `homePage`, `contactPage`, `legal`.
- [x] **Admin UI Routes** (`/keystatic`).

### 1.3 DevOps & Authentication Pipeline (Done)

- [x] **GitHub Hosted Repository**.
- [x] **Vercel Deployment**.
- [x] **Keystatic GitHub App** connection.
- [x] **Environment Variables** configuration.

### 1.4 Type Generation & Data Access (Done)

- [x] **Type Generation** using `keystatic generate-types`.
- [x] **Reader Utilities** (`lib/keystatic.ts`) using `createReader`.

### 1.5 Routing Architecture Setup (Done)

- [x] **Global Components:** Header, Footer (connected to Settings singleton).
- [x] **Route Scaffolding:**
  - `/app/(site)/layout.tsx` (Public Layout).
  - `/app/(site)/page.tsx` (Home).
  - `/app/(site)/projects/page.tsx` & `[slug]/page.tsx`.
  - `/app/(site)/about/page.tsx`.
  - `/app/(site)/contact/page.tsx`.

### 1.6 Smoke Test & Verification (Done)

- [x] **Production Check** on Vercel.
- [x] **Content Persistence** verified via GitHub commits from CMS.

### 1.8 Advanced Content & UX Polishing (Done)

- [x] **Homepage Storyboard**: Scroll-linked text reveal for Mission Statement.
- [x] **Loading Screen**: Premium "Curtain Lift" intro with session persistence.
- [x] **Team Page**: Bio overflow handling with "Read More" UX (Visual Clamp).
- [x] **CMS Expansion**: Full schema for Services, Process, Testimonials, and Homepage Video.

## 🚀 Phase 3: The "Architect" Polish & Integrations (CURRENT)

**Goal:** "Luxury" feel, Brand Authority, and Lead Generation.

### 3.1 Design System Refinements (Done)

- [x] **Logo System**:
  - Implemented CMS-driven Logo replacement for Header and Loading Screen.
  - Sizing Strategy: 75% Viewport cover on Loader, +50% size increase on Header for brand dominance.
- [x] **Scroll Architecture**:
  - Implemented **Lenis** for smooth kinetic scrolling.
  - **Global CSS**: Completely hidden default scrollbars (Webkit/Firefox) for a seamless "App-like" aesthetic.

### 3.2 Lead Generation features (Done)

- [x] **Contact Form**:
  - Custom `ContactForm` component using Web3Forms.
  - "Mino-style" minimalist inputs with floating labels.
- [x] **Appointment Scheduling**:
  - Integrated `BookingWidget` (Cal.com / Cal.eu).
  - **Refinement**: "Seamless" mode (removed borders/shadows/padding) to blend perfectly with the page background.
  - **UX**: Enabled internal scrolling without visible scrollbars.

---

## 💾 Technical Stack & AI Conventions

**Context for AI Assistants:** Use these rules to generate code that fits the existing architecture.

### 1. Technology Stack (Frozen)

- **Framework:** Next.js 15.1.6 (App Router)
- **Language:** TypeScript 5.7+ (Strict Mode)
- **Styling:** Tailwind CSS 4.0
- **CMS:** Keystatic (Git-based)
- **Animation:** Framer Motion 12+
- **Package Manager:** npm

### 2. Implementation Rules

- **Directory Structure:**
  - **Pages**: `app/(site)/...`
  - **Components**: `components/global/` (Layout parts), `components/ui/` (Reusables).
  - **Lib**: `app/lib/` (Utilities, CMS Reader).
  - **Styles**: `app/globals.css`.

- **Data Access Strategy:**
  - **ALWAYS** use `import { reader } from '@/app/lib/keystatic'`.
  - **NEVER** use `fs` module to read content files directly.
  - **Example:**
    ```typescript
    const settings = await reader.singletons.settings.read();
    const projects = await reader.collections.projects.all();
    ```

- **Component Guidelines:**
  - Default to **Server Components**.
  - Use `'use client'` ONLY when necessary (hooks, event listeners).
  - Use `next/image` for all images.
  - Use `next/link` for internal navigation.

- **CMS Schema (Reference):**
  - **Projects**: `title`, `coverImage`, `gallery` (array), `location`, `status`, `year`, `description` (document).
  - **Settings**: `siteTitle`, `logo`, `navigation` (array), `socials`.
  - **HomePage**: `heroVideo`, `missionStatement` (lines), `services`, `processSteps`, `featuredProjects`.
  - **Team**: `name`, `role`, `bio`, `photo`, `linkedin`.

### 3. Critical Architectural Decisions (AI Context)

- **Global Footer Strategy:**
  - The Footer is **GLOBAL** and managed in `app/(site)/layout.tsx`.
  - It fetches data from the `Settings` singleton.
  - **DO NOT** import `<Footer />` in individual pages.
  - **DO NOT** add conditional logic to hide it on specific pages (e.g., Project Detail) unless explicitly requested.

- **Asset Path Management (Keystatic):**
  - Images are stored in `public/images/...`.
  - Keystatic is configured with `directory: 'public/images/...'` but `publicPath: '/images/...'`.
  - This ensures images resolve correctly both in the CMS and on the frontend (`next/image`).

- **Loading Screen Logic:**
  - Implemented in `app/(site)/layout.tsx`.
  - Uses `sessionStorage` (`permitas-loader-seen`) to ensure it only runs once per session.
  - Global `z-index: 9999` overlay.

### 3. Verification Steps

- Run `npm run dev` to start server.
- Visit `http://localhost:3000` for frontend.
- Visit `http://localhost:3000/keystatic` for CMS admin.
