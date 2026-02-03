# Project Development Log & Phase 1 Execution Plan

**Objective:** Detailed execution check-list for Phase 1 (Infrastructure & Iron Skeleton).
**Reference:** Week 1 Timeline & Content Structure Architecture.

---

## 📅 Phase 1: Infrastructure & The "Iron Skeleton"

**Goal:** A deployed, live URL with a working CMS. Data persists to GitHub.
**Timeline:** Week 1

### 1.1 Repository & Environment Initialization

_Day 1 Focus: Foundation Setup_

- [x] **Initialize Next.js 15 Application**
  - Command: `npx create-next-app@latest . --typescript --tailwind --eslint`
  - Ensure `package.json` reflects the latest versions.
- [x] **Clean Clean Boilerplate**
  - Remove default `page.tsx` content.
  - Reset `globals.css` (Preserve Tailwind directives `@tailwind base;`, etc.).
  - Delete unused assets (e.g., `favicon.ico` defaults if replacing, `vercel.svg`).
- [x] **Git Initialization**
  - Initialize git: `git init`.
  - Create `.gitignore` (ensure `node_modules`, `.next`, `.env` are ignored).
  - Commit initial state: `git add . && git commit -m "chore: initial project setup"`.

### 1.2 CMS Core Setup (Keystatic)

_Day 2 Focus: Schema Implementation_

- [x] **Install Dependencies**
  - `npm install @keystatic/core @keystatic/next`
- [x] **Keystatic Configuration**
  - Create `keystatic.config.ts`.
  - Configure `storage`:
    - `kind: 'local'` (for development).
    - `kind: 'github'` (for production) -> _Pending GitHub App setup in 1.3_.
- [x] **Schema Definition (Per `Content_structure.md`)**
  - [x] **Collections:**
    - `Projects` (Path: `content/projects/*`)
    - `Team` (Path: `content/team/*`)
    - `Testimonials`
    - `FAQs`
  - [x] **Singletons:**
    - `Settings` (Path: `content/settings.json`)
    - `Home Page` (Path: `content/pages/home.json`)
    - `Contact Page` (Path: `content/pages/contact.json`)
    - `Legal Pages` (Privacy/Terms)
- [x] **Admin UI Routes**
  - Create `/app/api/keystatic/[[...params]]/route.tsx`.
  - Create `/app/keystatic/layout.tsx`.
  - Create `/app/keystatic/[[...params]]/page.tsx`.
- [x] **Verification**: Run `npm run dev` and visit `/keystatic` to verify Admin UI loads locally.

### 1.3 DevOps & Authentication Pipeline

_Day 3 Focus: Connection to the World_

- [x] **GitHub Hosted Repository**
  - Create a private repository on GitHub.
  - Push local `main` branch to remote.
- [x] **Vercel Deployment**
  - Import repository to Vercel.
  - Deploy `main` (Initial Build).
- [x] **Keystatic GitHub App (The Bridge)**
  - Create a new GitHub App in Developer Settings.
  - **Homepage URL:** `https://your-vercel-domain.com`
  - **Callback URL:** `https://your-vercel-domain.com/api/keystatic/github/oauth/callback`
  - **Permissions:**
    - `Content`: Read & Write
    - `Metadata`: Read Only
  - Install App on the repository.
- [x] **Environment Variables (Vercel)**
  - Add the following variables in Vercel Project Settings:
    - `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
    - `KEYSTATIC_GITHUB_CLIENT_ID`
    - `KEYSTATIC_GITHUB_CLIENT_SECRET`
    - `KEYSTATIC_SECRET` (Generated via `openssl rand -base64 32`)
- [x] **Update Config**: Ensure `keystatic.config.ts` uses these env vars for the `github` storage strategy.

### 1.4 Type Generation & Data Access

_Day 4 Focus: Developer Experience (DX)_

- [x] **Type Generation**
  - Run `npx keystatic generate-types` (or add to `postinstall` script).
  - Allow Keytstatic to infer types from schemas.
- [x] **Reader Utilities**
  - Create `lib/keystatic.ts`.
  - Export the `reader` utility using `createReader`.
  - **Goal**: Enable strictly typed data fetching like `await reader.collections.projects.all()`.

### 1.5 Routing Architecture Setup

_Day 5 Focus: Frontend Skeleton_

- [x] **Global Components**
  - Create `components/global/Header.tsx` (Use `Settings` singleton for Logo/Nav).
  - Create `components/global/Footer.tsx`.
- [x] **Route Scaffolding**
  - `/app/(site)/layout.tsx` (Add Font: Geist Sans, integrate Header/Footer).
  - `/app/(site)/page.tsx` (Home).
  - `/app/(site)/projects/page.tsx` (Index).
  - `/app/(site)/projects/[slug]/page.tsx` (Detail).
  - `/app/(site)/about/page.tsx` (Team/Company).
  - `/app/(site)/contact/page.tsx`.
  - `/app/(site)/legal/[slug]/page.tsx` (Privacy/Terms).

### 1.6 Smoke Test & Verification (Go-Live Check)

_Day 6 Focus: Quality Assurance_

- [ ] **Production Check**
  - Visit the live Vercel URL.
  - Navigate to `/keystatic`.
  - Authenticate via GitHub (OAuth flow).
- [ ] **Content Persistence Test**
  - Create a **"Test Project"** in the CMS.
  - Upload a dummy image.
  - Save/Publish.
  - **Verify**: Go to the GitHub Repository `content/projects/` folder. Ensure the JSON/MD file and Image were created automatically by the CMS.
- [ ] **Read Test**
  - Ensure the new "Test Project" appears on the frontend (if data fetching 1.5 is partially connected) or at least verify the build didn't fail.

---

**Status:** Phase 1 Implementation Complete (Pending Final Smoke Tests).
