# Arvor Foundation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the production-ready technical foundation for the Arvor Insurance website, including Next.js, styling, testing, embedded Sanity Studio, and core project documentation.

**Architecture:** Build a standard Next.js App Router application in `src/`, layer Tailwind and shadcn/ui on top, embed Sanity Studio behind a route group, and keep business logic for the quote flow in application code. Preserve the existing `docs/` content and add documentation for setup and architectural decisions as part of the scaffold.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod, Sanity, ESLint, Prettier, Husky, lint-staged, Vitest, React Testing Library, Playwright, pnpm, Vercel

---

## Execution Status

Implementation in the repository currently covers the scaffold through the base app shell, formatting hooks, and Vitest harness.

The following planned items are **not yet implemented**:

- embedded Sanity Studio routes and configuration
- Playwright setup and E2E coverage
- `shadcn/ui` initialization
- content model and operational runbooks

This file remains the implementation target, not a statement that every item below already exists in the codebase.

---

## File Structure Map

### Files to create or modify in the scaffold

- Create: `package.json`
- Create: `pnpm-lock.yaml`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.*`
- Create: `eslint.config.*` or the default Next.js ESLint config output
- Create: `prettier.config.*`
- Create: `.prettierrc*` only if the chosen tooling requires it
- Create: `.gitignore`
- Create: `.nvmrc`
- Create: `.env.example`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/(site)/page.tsx`
- Create: `src/app/(studio)/studio/[[...tool]]/page.tsx`
- Create: `src/app/(studio)/studio/[[...tool]]/layout.tsx`
- Create: `src/components/ui/*`
- Create: `src/components/site/*`
- Create: `src/lib/*`
- Create: `src/sanity/*`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `playwright.config.ts`
- Create: `tests/*`
- Create: `playwright/*`
- Create: `.husky/*`
- Create: `docs/architecture/*`
- Create: `docs/content-model/*`
- Create: `docs/runbooks/*`

---

## Chunk 1: Base Next.js Scaffold

### Task 1: Generate the Next.js application foundation

**Files:**

- Create: base Next.js scaffold files in repository root and `src/`
- Preserve: `docs/briefing-tecnico-site-institucional-v1.md`
- Preserve: `docs/decisions/2026-03-13-technical-foundation.md`
- Preserve: `docs/superpowers/specs/2026-03-13-arvor-foundation-design.md`
- Preserve: `docs/superpowers/plans/2026-03-13-arvor-foundation-implementation.md`

- [ ] **Step 1: Write the failing verification**

Create a shell verification note for the empty repository state:

```text
Expected after scaffold:
- package.json exists
- src/app exists
- app root can build
```

- [ ] **Step 2: Run verification on the current state to confirm it fails**

Run: `test -f package.json && test -d src/app`
Expected: command exits non-zero because scaffold does not exist yet.

- [ ] **Step 3: Generate the minimal Next.js scaffold**

Use `pnpm create next-app` in a temporary directory if generating in-place would conflict with the existing `docs/` folder. Move the generated files into the repository root without deleting user-authored docs.

Required settings:

- TypeScript
- ESLint
- Tailwind CSS
- App Router
- `src/`
- alias `@/*`
- Turbopack enabled in dev
- no React Compiler for the initial foundation

- [ ] **Step 4: Run verification to confirm the scaffold now exists**

Run: `test -f package.json && test -d src/app`
Expected: exit code `0`

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js foundation"
```

### Task 2: Normalize the generated app into the agreed baseline

**Files:**

- Modify: `package.json`
- Modify: `.gitignore`
- Create: `.nvmrc`
- Create: `.env.example`
- Modify: `src/app/layout.tsx`
- Create: `src/app/(site)/page.tsx`
- Create: `src/app/(site)/layout.tsx` if public layout separation is needed
- Remove or replace: generated `src/app/page.tsx`

- [ ] **Step 1: Write the failing verification**

Run: `test -f src/app/'(site)'/page.tsx`
Expected: FAIL because route groups are not created yet.

- [ ] **Step 2: Run verification to confirm it fails**

Run: `test -f src/app/'(site)'/page.tsx`
Expected: exit code non-zero.

- [ ] **Step 3: Implement the minimal code**

Adjust the generated scaffold to:

- create route groups for `(site)` and `(studio)`,
- move the public homepage into `(site)`,
- set base metadata placeholder for Arvor,
- add `.nvmrc`,
- add `.env.example`,
- ensure `.gitignore` preserves expected local files.

- [ ] **Step 4: Run verification to confirm it passes**

Run: `test -f src/app/'(site)'/page.tsx`
Expected: exit code `0`

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: align app shell with Arvor architecture"
```

---

## Chunk 2: Quality and Tooling

### Task 3: Add formatting, git hooks, and lint-staged

**Files:**

- Modify: `package.json`
- Create: `prettier.config.*`
- Create: `.prettierignore`
- Create: `.husky/pre-commit`

- [ ] **Step 1: Write the failing verification**

Create a temporary formatting mismatch or missing script expectation in a note:

```text
Expected scripts:
- lint
- format
- test
```

- [ ] **Step 2: Run verification to confirm it fails**

Run: `node -e "const p=require('./package.json'); process.exit(p.scripts?.format && p['lint-staged'] ? 0 : 1)"`
Expected: exit code non-zero.

- [ ] **Step 3: Implement the minimal code**

Add:

- Prettier config
- `format` script
- `lint-staged`
- Husky pre-commit hook running lint-staged

- [ ] **Step 4: Run verification to confirm it passes**

Run: `node -e "const p=require('./package.json'); process.exit(p.scripts?.format && p['lint-staged'] ? 0 : 1)"`
Expected: exit code `0`

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: add formatting and git hooks"
```

### Task 4: Install and configure Vitest and React Testing Library

**Files:**

- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `tests/app-shell.test.tsx`

- [ ] **Step 1: Write the failing test**

```tsx
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/(site)/page";
import { describe, expect, it } from "vitest";

describe("HomePage", () => {
  it("renders the Arvor placeholder heading", () => {
    render(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/app-shell.test.tsx`
Expected: FAIL because Vitest is not configured yet.

- [ ] **Step 3: Write minimal implementation**

Install and configure:

- `vitest`
- `@testing-library/react`
- `@testing-library/jest-dom`
- test script in `package.json`
- any required path alias handling

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test tests/app-shell.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "test: add Vitest and Testing Library setup"
```

### Task 5: Install and configure Playwright

**Files:**

- Modify: `package.json`
- Create: `playwright.config.ts`
- Create: `playwright/smoke.spec.ts`

- [ ] **Step 1: Write the failing test**

Create `playwright/smoke.spec.ts` asserting the homepage loads and shows the primary heading.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm playwright test playwright/smoke.spec.ts --project=chromium`
Expected: FAIL because Playwright is not installed/configured yet.

- [ ] **Step 3: Write minimal implementation**

Install Playwright, add config, and wire scripts for:

- `test:e2e`
- `test:e2e:ui`

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm playwright test playwright/smoke.spec.ts --project=chromium`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "test: add Playwright smoke coverage"
```

---

## Chunk 3: UI Foundation and CMS Integration

### Task 6: Initialize shadcn/ui and create base site primitives

**Files:**

- Create or modify: `components.json`
- Create: `src/components/ui/*`
- Create: `src/components/site/*`
- Modify: `src/app/globals.css`

- [ ] **Step 1: Write the failing test**

Add or extend `tests/app-shell.test.tsx` to assert the homepage renders a CTA button component and a branded wrapper section.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/app-shell.test.tsx`
Expected: FAIL because the components do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Initialize `shadcn/ui`, add the minimum useful primitives, and create a branded placeholder homepage shell using Arvor palette tokens and typography placeholders.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test tests/app-shell.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add UI foundation and homepage shell"
```

### Task 7: Embed Sanity Studio and create the client foundation

**Files:**

- Create: `sanity.config.ts` or equivalent Studio config file
- Create: `src/sanity/env.ts`
- Create: `src/sanity/lib/client.ts`
- Create: `src/sanity/schemaTypes/index.ts`
- Create: `src/sanity/schemaTypes/*`
- Create: `src/app/(studio)/studio/[[...tool]]/page.tsx`
- Create: `src/app/(studio)/studio/[[...tool]]/layout.tsx`
- Modify: `.env.example`

- [ ] **Step 1: Write the failing test**

Create `tests/studio-route.test.tsx` or an equivalent route-level smoke test that verifies the Studio route module exists and exports a page component.

- [ ] **Step 2: Run test to verify it fails**

Run: `pnpm test tests/studio-route.test.tsx`
Expected: FAIL because the Studio route and config do not exist yet.

- [ ] **Step 3: Write minimal implementation**

Add:

- embedded Sanity Studio route,
- base client config,
- shared environment mapping for Sanity settings,
- initial schema organization,
- environment placeholders for project ID and datasets,
- default `development` and `production` dataset documentation.

- [ ] **Step 4: Run test to verify it passes**

Run: `pnpm test tests/studio-route.test.tsx`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: embed Sanity Studio foundation"
```

---

## Chunk 4: Documentation and Operational Baseline

### Task 8: Document setup, content boundaries, and architecture

**Files:**

- Create: `docs/architecture/project-structure.md`
- Create: `docs/content-model/content-ownership.md`
- Create: `docs/runbooks/local-setup.md`
- Create: `docs/runbooks/vercel-deploy.md`

- [ ] **Step 1: Write the failing verification**

Run: `test -f docs/architecture/project-structure.md && test -f docs/content-model/content-ownership.md && test -f docs/runbooks/local-setup.md`
Expected: FAIL because the files do not exist yet.

- [ ] **Step 2: Run verification to confirm it fails**

Run: `test -f docs/architecture/project-structure.md && test -f docs/content-model/content-ownership.md && test -f docs/runbooks/local-setup.md`
Expected: exit code non-zero.

- [ ] **Step 3: Write minimal implementation**

Document:

- project directory structure,
- Sanity vs application ownership,
- local setup commands,
- deploy expectations for Vercel.

- [ ] **Step 4: Run verification to confirm it passes**

Run: `test -f docs/architecture/project-structure.md && test -f docs/content-model/content-ownership.md && test -f docs/runbooks/local-setup.md`
Expected: exit code `0`

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "docs: add architecture and setup runbooks"
```

### Task 9: Verify the full foundation

**Files:**

- Verify the repository as a whole

- [ ] **Step 1: Run lint**

Run: `pnpm lint`
Expected: PASS

- [ ] **Step 2: Run unit and component tests**

Run: `pnpm test`
Expected: PASS

- [ ] **Step 3: Run E2E smoke coverage**

Run: `pnpm playwright test playwright/smoke.spec.ts --project=chromium`
Expected: PASS

- [ ] **Step 4: Run build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "chore: verify Arvor foundation baseline"
```
