# Arvor Technical Foundation Decisions

**Date:** 2026-03-13
**Status:** Approved
**Scope:** Initial project scaffold and architectural baseline

---

## Final Decisions

| Area                  | Decision                                                                                 |
| --------------------- | ---------------------------------------------------------------------------------------- |
| Framework             | Next.js with App Router                                                                  |
| Package manager       | pnpm                                                                                     |
| Language              | TypeScript with `strict: true`                                                           |
| Styling               | Tailwind CSS                                                                             |
| Component base        | shadcn/ui                                                                                |
| Forms and validation  | React Hook Form + Zod                                                                    |
| CMS                   | Sanity                                                                                   |
| Studio placement      | Planned for the same app at `/studio`, to be scaffolded in the next implementation phase |
| CMS responsibility    | Institutional and marketing content only                                                 |
| Quoter responsibility | Application code only                                                                    |
| Deployment target     | Vercel                                                                                   |
| Source directory      | `src/`                                                                                   |
| Import alias          | `@/*`                                                                                    |
| Dev bundler           | Turbopack                                                                                |
| Linting               | ESLint                                                                                   |
| Formatting            | Prettier                                                                                 |
| Git hooks             | Husky + lint-staged                                                                      |
| Unit/component tests  | Vitest + React Testing Library                                                           |
| E2E tests             | Playwright                                                                               |
| Sanity datasets       | `development` and `production`                                                           |
| Sanity Visual Editing | Deferred to a later phase                                                                |

---

## Current Scaffold Status

The repository currently includes the agreed application foundation, but it does **not** yet include:

- the embedded Sanity Studio route at `/studio`
- Playwright setup
- `shadcn/ui` initialization
- content modeling or Sanity schemas

Those items remain approved decisions for the project, but they are not part of the current codebase state yet.

---

## Rationale

### Why this stack

- `Next.js` with App Router is the best fit for an institutional website with strong SEO, static content, route-based organization, and Vercel deployment.
- `Tailwind CSS` and `shadcn/ui` reduce time-to-scaffold while keeping full control over Arvor's visual identity.
- `TypeScript`, `React Hook Form`, and `Zod` reduce risk in the multi-step quoting flow and make validation rules explicit.
- `Sanity` gives the team an editorial workflow in v1 without forcing the quoting rules into the CMS.
- `Vitest`, `React Testing Library`, and `Playwright` support a layered quality strategy for both UI behavior and the stepper journey.

### Boundaries that must remain clear

- Content editors can manage institutional content in Sanity.
- The quoting flow, validation rules, and operational CTAs remain in application code.
- The initial scaffold should not include Visual Editing, preview overlays, or other editorial features that are not required for v1 launch.

---

## Non-Goals for the Initial Scaffold

- No CMS-driven quote step configuration.
- No Visual Editing or Presentation tool in the first delivery.
- No backend for custom quote submission in v1 foundation work.
- No generalized design system package or monorepo extraction.

---

## Reference Docs

- Next.js installation and `create-next-app`: https://nextjs.org/docs/app/getting-started/installation
- shadcn/ui installation for Next.js: https://ui.shadcn.com/docs/installation/next
- Sanity embedded studio docs: https://www.sanity.io/docs/embedding-sanity-studio
- Sanity dataset docs: https://www.sanity.io/docs/content-lake/datasets
- Next.js testing guide for Vitest: https://nextjs.org/docs/app/guides/testing/vitest
- Playwright installation and test runner docs: https://playwright.dev/docs/intro
