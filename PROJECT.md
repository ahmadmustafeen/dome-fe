# DOME Frontend — Project Reference

> **Client:** Glenart Group  
> **Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · next-intl (i18n)  
> **Dev server:** `yarn dev` (Turbopack, port 3000)  
> **Backend API:** `NEXT_PUBLIC_BASE_URL` env var (default `http://localhost:5000/api`)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Environment Variables](#2-environment-variables)
3. [Architecture & Folder Structure](#3-architecture--folder-structure)
4. [Routing](#4-routing)
5. [Components](#5-components)
6. [Services (API Layer)](#6-services-api-layer)
7. [Types & Payloads](#7-types--payloads)
8. [State Management](#8-state-management)
9. [i18n (Internationalisation)](#9-i18n-internationalisation)
10. [Completed Work Log](#10-completed-work-log)
11. [Known Issues / Tech Debt](#11-known-issues--tech-debt)
12. [Pending / Future Work](#12-pending--future-work)

---

## 1. Project Overview

DOME FE is a Next.js App Router application that provides the UI for the DOME asset management platform. Users log in, select a **Client**, then a **Site**, and then manage the **Assets** for that site.

The app supports **English** and **French** (via `next-intl`). All routes are prefixed with `[locale]` (e.g. `/en/dashboard`).

---

## 2. Environment Variables

File: `.env.local`

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_BASE_URL` | Backend API base URL (e.g. `http://localhost:5000/api`) |

---

## 3. Architecture & Folder Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx              # Root layout — NextIntlClientProvider + ToastContainer
│   │   ├── (marketing)/            # Public landing pages
│   │   │   ├── page.tsx            # Home / landing page
│   │   │   └── about/page.tsx
│   │   ├── (auth)/
│   │   │   └── (center)/           # Centered auth layout
│   │   │       ├── sign-in/        # Login page
│   │   │       ├── sign-up/        # Registration page
│   │   │       ├── forget-password/ # Forgot password (sends reset email)
│   │   │       └── reset-password/ # Reset password (token from URL ?token=)
│   │   └── dashboard/
│   │       ├── layout.tsx          # Wraps with AppProvider (client/site context)
│   │       ├── page.tsx            # → ClientPage (step 1: select client)
│   │       ├── client/page.tsx     # → SitePage (step 2: select site)
│   │       ├── site/page.tsx       # → SitePage (alternate entry)
│   │       ├── assets-management/
│   │       │   ├── page.tsx        # Valid assets listing (search, sort, CRUD)
│   │       │   └── invalid/page.tsx # Invalid assets listing
│   │       └── user-profile/       # User profile page
├── components/
│   ├── auth/                       # SignIn, Signup, ForgetPassword, ResetPassword
│   ├── common/                     # Button, InputWithLabel, Typography, Sidebar, etc.
│   ├── cards/                      # ClientInfoCard, SiteInfoCard, CreateNew*Card
│   ├── client/                     # ClientPage, CreateClientModal
│   ├── site/                       # SitePage, CreateSiteModal
│   ├── asset/                      # CreateAssetModal, UploadAssetModal
│   └── table/                      # DynamicTable (generic paginated table), Pagination
├── services/                       # API service layer (one file per resource)
├── types/                          # TypeScript interfaces and payload types
├── context/                        # AppContext (selected client/site, persisted to localStorage)
├── constants/
│   ├── api.ts                      # BASE_URL from env
│   └── data.ts                     # Navbar config, AssetTableHeaders
├── libs/
│   ├── fetcher.ts                  # apiFetch<T> — central HTTP client
│   ├── I18n.ts                     # next-intl config
│   ├── I18nNavigation.ts           # Localised Link, useRouter, etc.
│   └── I18nRouting.ts              # Locale routing config (en, fr)
├── locales/
│   ├── en.json                     # English strings
│   └── fr.json                     # French strings
└── utils/
    ├── AppConfig.ts
    └── Helpers.ts
```

---

## 4. Routing

All routes live under `app/[locale]/`. The `[locale]` segment is always `en` or `fr`.

### User Journey

```
/[locale]/sign-in
    ↓ (login)
/[locale]/dashboard              ← ClientPage: list + select a Client
    ↓ (select client)
/[locale]/dashboard/client       ← SitePage: list + select a Site
    ↓ (select site)
/[locale]/dashboard/assets-management   ← Valid Assets for selected site
/[locale]/dashboard/assets-management/invalid  ← Invalid Assets
```

### Auth Routes

| Path | Component | Description |
|---|---|---|
| `/[locale]/sign-in` | `SignIn` | Login form |
| `/[locale]/sign-up` | `Signup` | Registration form |
| `/[locale]/forget-password` | `ForgetPassword` | Submit email → receive reset link |
| `/[locale]/reset-password?token=xxx` | `ResetPassword` | Enter new password (token from email URL) |

> `reset-password` page is wrapped in `<Suspense>` because it uses `useSearchParams()`.

---

## 5. Components

### Auth Components (`src/components/auth/`)

| Component | Description |
|---|---|
| `SignIn` | Email + password login, calls `authService.login`, sets cookie, redirects to dashboard |
| `Signup` | Registration form, calls `authService.register` |
| `ForgetPassword` | Email form → calls `authService.forgotPassword`, shows success state (email enumeration-safe) |
| `ResetPassword` | Reads `?token` from URL, password + confirm fields, calls `authService.resetPassword`, redirects to sign-in on success |

### Common Components (`src/components/common/`)

| Component | Props | Description |
|---|---|---|
| `Button` | `text`, `onClick`, `variant?`, `isLoading?` | Primary action button (full width, primary color) |
| `AppButton` | `onClick`, `title?`, `icon?`, `variant`, `disabled?` | Inline action button — variants: `primary`, `default`, `secondary`, `danger` |
| `InputWithLabel` | `label`, `type`, `placeholder?`, `value?`, `onChange?`, `showEye?` | Labelled input field; `showEye` adds password toggle |
| `Typography` | `text`, `variant` | Text renderer with Tailwind class variant |
| `SideBarNavigation` | `currentPath` | Left sidebar nav. Highlights active route. Handles nested dropdown for Assets Management |
| `ScreenLoader` | `heading`, `description` | Full-screen loading overlay |
| `DeleteConfirmationScreen` | `heading`, `description`, `handleCancel`, `handleContinue` | Modal confirmation dialog |

### Table Components (`src/components/table/`)

| Component | Description |
|---|---|
| `DynamicTable` | Generic paginated table. Takes `columns: iTableHeader[]` and `data: object[]`. Supports row selection (checkbox), edit and delete per row. |
| `Pagination` | Page number controls used by `DynamicTable` |

### Asset Components (`src/components/asset/`)

| Component | Description |
|---|---|
| `CreateAssetModal` | Create / Edit asset form. Supports image upload (new files) and removal of hosted images. In edit mode, uploads to S3 via `FormData`. |
| `UploadAssetModal` | Drag-and-drop zone for bulk CSV/XLSX upload. Calls `assetService.uploadAssets`. |

---

## 6. Services (API Layer)

All services use `apiFetch` from `src/libs/fetcher.ts`. The fetcher:
- Prepends `NEXT_PUBLIC_BASE_URL`
- Sends `credentials: 'include'` (for cookie-based auth)
- Auto-sets `Content-Type: application/json` (skipped for `FormData`)
- Throws with `data.message` on non-2xx responses

### `auth-service.ts`

| Method | Endpoint | Description |
|---|---|---|
| `login(data)` | `POST /users/login` | Login user |
| `register(data)` | `POST /users/register` | Register user |
| `forgotPassword(data)` | `POST /users/forgot-password` | Request password reset email |
| `resetPassword(data)` | `POST /users/reset-password` | Reset password with token |
| `logout()` | `POST /users/logout` | Logout (clears cookie) |

### `client-service.ts`

| Method | Endpoint |
|---|---|
| `getAllClient()` | `GET /clients` |
| `createClient(data)` | `POST /clients` |
| `getClientById(id)` | `GET /clients/:id` |
| `updateClient(id, data)` | `PUT /clients/:id` |
| `deleteClient(id)` | `DELETE /clients/:id` |

### `site-service.ts`

| Method | Endpoint |
|---|---|
| `getAllSites(clientId?)` | `GET /sites?clientId=` |
| `createSite(data)` | `POST /sites` |
| `getSiteById(id)` | `GET /sites/:id` |
| `updateSite(id, data)` | `PUT /sites/:id` |
| `deleteSite(id)` | `DELETE /sites/:id` |

### `asset-service.ts`

| Method | Endpoint | Notes |
|---|---|---|
| `getAllAssets()` | `GET /assets` | — |
| `getAllAssetsBySiteId(id, params?)` | `GET /assets/site/:id` | Supports `page`, `search`, `sortBy`, `sortOrder` |
| `getAllInvalidAssetsBySiteId(id, params?)` | `GET /assets/site/invalid/:id` | Supports `page`, `search`, `sortBy`, `sortOrder` |
| `createAsset(data)` | `POST /assets` | — |
| `updateAsset(id, formData)` | `PUT /assets/:id` | `FormData` with optional image files |
| `deleteBulkAsset({ ids })` | `POST /assets/delete-many` | — |
| `deleteAsset(id)` | `DELETE /assets/:id` | — |
| `uploadAssets(siteId, file)` | `POST /assets/site/:siteId/upload` | `multipart/form-data` |

---

## 7. Types & Payloads

File: `src/types/payload.ts`

| Type | Fields |
|---|---|
| `LoginPayload` | `email`, `password` |
| `RegisterPayload` | `firstName`, `lastName`, `email`, `password` |
| `ForgotPasswordPayload` | `email` |
| `ResetPasswordPayload` | `token`, `password` |
| `ClientPayload` | `name`, `email`, `phone`, `address` |
| `SitePayload` | `clientId`, `name`, `timeline`, `startDate`, `address` |
| `AssetPayload` | `siteId`, `assetId`, `assetName`, `category`, `subCategory`, `make`, `modelName`, `location?`, `serialNumber?` |

The `Asset` interface is defined in `src/components/asset/CreateAssetModal.tsx` and re-exported via `src/components/index.ts`.

---

## 8. State Management

### `AppContext` (`src/context/AppContext.tsx`)

Global context wrapping the entire `/dashboard` layout. Stores:
- `client` — currently selected `Client` object
- `site` — currently selected `Site` object

Both values are **persisted to `localStorage`** and rehydrated on mount. Used by the assets management pages to know which site's assets to load.

No external state library (Redux/Zustand) — uses React Context only.

---

## 9. i18n (Internationalisation)

- Library: `next-intl` v4
- Supported locales: `en` (English), `fr` (French)
- Config: `src/libs/I18n.ts` → `src/libs/I18nRouting.ts`
- Translation files: `src/locales/en.json`, `src/locales/fr.json`
- Use `useTranslations()` hook in components for translated strings
- Use localised `Link` and `useRouter` from `src/libs/I18nNavigation.ts`

> ⚠️ Many components currently hardcode `/en/` in navigation (e.g. `router.push('/en/dashboard/...')`). These should use the localised router from `I18nNavigation.ts`.

---

## 10. Completed Work Log

| Date | Description |
|---|---|
| 2026-03-10 | Initial project setup: Next.js 16, Tailwind v4, next-intl, react-hook-form, Zod |
| 2026-03-10 | Auth pages: SignIn, Signup components with API integration |
| 2026-03-10 | Dashboard layout with AppContext (client/site selection, localStorage persistence) |
| 2026-03-10 | Client Management page (list, create, update, delete clients) |
| 2026-03-10 | Site Management page (list, create, update, delete sites per client) |
| 2026-03-10 | Assets Management page (valid assets listing, create, edit, delete, bulk delete) |
| 2026-03-10 | Invalid Assets page (listing of assets with missing required fields) |
| 2026-03-10 | Bulk asset upload via drag-and-drop CSV/XLSX modal |
| 2026-03-10 | SideBarNavigation with collapsible sub-items |
| 2026-03-10 | **Search & Sorting:** Added search input (400ms debounce) + sort pill buttons (7 fields, asc/desc) to Assets Management page |
| 2026-03-10 | **Forgot Password:** Implemented `ForgetPassword` component — email form, API call, success state |
| 2026-03-10 | **Reset Password:** Implemented `ResetPassword` component — reads `?token` from URL, validates, calls API, success redirect |
| 2026-03-10 | Updated `auth-service.ts` with `forgotPassword` and `resetPassword` methods |
| 2026-03-10 | Added `ForgotPasswordPayload` and `ResetPasswordPayload` to `types/payload.ts` |
| 2026-03-10 | Wrapped `reset-password` page in `<Suspense>` (required for `useSearchParams`) |
| 2026-03-10 | **Bug fix:** Removed invalid `--webpack` flag from `next build` script |
| 2026-03-10 | **Bug fix:** Fixed duplicate Navbar `id` values in `src/constants/data.ts` (was causing React key collision warning) |
| 2026-03-10 | **Bug fix:** Added `suppressHydrationWarning` to `<html>` tag in root layout (fixes browser-extension hydration mismatch) |
| 2026-03-10 | **Document Management:** Created `src/types/document.ts` with full type definitions (`DocumentRecord`, `DocumentType`, `DocumentUploadPayload`, API response types) for BE developer |
| 2026-03-10 | **Document Management:** Built `DocumentManagementPage` — table with file-type icons, category color badges, real-time client-side search + type filter dropdown, View/Download/Delete row actions, delete confirmation dialog |
| 2026-03-10 | **Document Management:** Built `UploadDocumentModal` — drag-and-drop zone, document type selector (required), file type validation, inline error, loading state, prepends new doc to top of table |
| 2026-03-10 | **Common component:** Added reusable `EmptyState` component (`heading`, `description`, `icon`, `action` props) |

---

## 11. Known Issues / Tech Debt

| Issue | Severity | Notes |
|---|---|---|
| Sidebar hardcodes `/en/` in `router.push` | Medium | Should use `useLocale()` + `useRouter` from `I18nNavigation.ts` |
| No auth guard on dashboard routes | High | Any unauthenticated user can access `/dashboard` |
| `pg` (PostgreSQL) dependency installed but unused | Low | Boilerplate leftover — can be removed |
| Many components use `any` type casts | Low | Gradual TypeScript strictness improvements needed |
| `CreateAssetModal` has stray `‰` character on line 209 | Low | Unicode artifact in source code |

---

## 12. Pending / Future Work

- [ ] Add route guard middleware (check `accessToken` cookie, redirect to `/sign-in` if missing)
- [ ] Implement `/dashboard/user-profile` page
- [ ] Document Management module (upload, list, view documents)
- [ ] Document Generator module
- [ ] SOP / EOP / MOP Management modules
- [ ] Use localised router from `I18nNavigation.ts` in `Sidebar.tsx` and other hardcoded navigation
- [ ] Add French translations to `fr.json`
- [ ] Invalid assets — allow bulk edit to fix missing fields
- [ ] Responsive layout improvements for mobile
- [ ] Add loading skeletons for data fetch states
- [ ] Error boundary for dashboard pages
