# System Patterns

## 1. System Architecture

Based on the file structure (`next.config.mjs`, `src/app/`, `src/components/`), this appears to be a Next.js application using the App Router.

- **Frontend Framework:** Next.js
- **Routing:** App Router (implied by `src/app/` structure and `usePathname` hook)
- **Component Structure:** Reusable components are likely stored in `src/app/components/`.

## 2. Key Technical Decisions

- Use of Next.js framework.
- Use of Tailwind CSS for styling (implied by `tailwind.config.ts`, `postcss.config.mjs`, and utility classes in `Breadcrumbs.js`).
- Client-side rendering for components needing browser APIs like `usePathname` (indicated by `'use client';` directive).

## 3. Design Patterns

- **Component-Based Architecture:** UI is built using reusable components (e.g., `Breadcrumbs`, `BreadcrumbSegment`).
- **Utility-First CSS:** Tailwind CSS is used for styling.

## 4. Component Relationships

- `Breadcrumbs.js` uses the `BreadcrumbSegment` component internally.
- `Breadcrumbs.js` relies on the `usePathname` hook from `next/navigation` to determine the current path.
- `Breadcrumbs.js` uses `next/link` for navigation.

*(This file should be updated as more architectural decisions are made or discovered.)*
