# Tech Context

## 1. Technologies Used

- **Framework:** Next.js (version inferred from `package.json` if available, otherwise assume recent)
- **Language:** JavaScript (potentially TypeScript given `tsconfig.json`, but components shown are `.js`)
- **Styling:** Tailwind CSS (version inferred from `package.json` or `tailwind.config.ts`)
- **Package Manager:** npm (implied by `package.json`, `package-lock.json`)

## 2. Development Setup

- **Environment:** Node.js environment required for Next.js development.
- **Build Process:** Managed by Next.js CLI (`next dev`, `next build`).
- **Linting/Formatting:** ESLint (`.eslintrc.json`), Prettier (often used with Next.js/Tailwind, check config), TypeScript (`tsconfig.json`).

## 3. Technical Constraints

- Must work within the Next.js App Router paradigm.
- Styling relies heavily on Tailwind CSS utility classes.
- Client-side components (`'use client';`) are necessary for hooks like `usePathname`.

## 4. Dependencies

- `next`
- `react`
- `react-dom`
- `tailwindcss`
- `postcss`
- `autoprefixer`
- Potentially others listed in `package.json`.

*(This file should be updated as specific versions and configurations are confirmed or changed.)*
