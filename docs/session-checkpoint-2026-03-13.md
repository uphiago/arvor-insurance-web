# Session Checkpoint - 2026-03-13

## Current Repository State

- Branch: `main`
- HEAD: `cebb9d7`
- Remote: `origin/main` aligned with local
- Working tree: clean

## Delivered in This Foundation Phase

- Next.js 16 scaffold with App Router in `src/`
- TypeScript strict setup
- Tailwind CSS v4 base
- ESLint + Prettier configured
- Husky + lint-staged configured
- Vitest + Testing Library harness configured
- Route groups created:
  - `src/app/(site)`
  - `src/app/(studio)` (layout shell only)
- Revised product briefing added:
  - `docs/briefing-tecnico-site-institucional-v1.1.md`

## Production/Hosting Notes

- Initial `404` on Vercel happened because project was using `Framework Preset: Other` and deployed old docs-only commit (`ffb7025`).
- Issue resolved after:
  - pushing updated `main`
  - switching Vercel framework to `Next.js`
- Current production now loads the default scaffold homepage (placeholder), not the final Arvor design.

## Verified Commands (latest run before checkpoint)

- `pnpm format:check`
- `pnpm lint`
- `pnpm test --run`
- `pnpm build`

All above were passing on `main` at the time of handoff.

## Explicitly Pending (Not Implemented Yet)

- Sanity Studio route implementation at `/studio`
- Sanity project setup (`src/sanity/*`, schemas, env wiring)
- Playwright setup and E2E smoke tests
- `shadcn/ui` initialization
- Arvor institutional visual implementation
- Autoatendimento stepper (3 steps) with business validations
- WhatsApp CTA integration and email template flow

## Resume Plan (recommended order)

1. Implement visual homepage shell (Header, Hero, Sobre, Projeto Sustentavel, Produtos, Como Funciona, Footer).
2. Initialize `shadcn/ui` and apply Arvor design tokens/colors/typography.
3. Build quote stepper in code with `React Hook Form + Zod`.
4. Add Sanity embedded Studio at `/studio` for institutional content only.
5. Add Playwright smoke coverage for homepage and stepper happy path.

## Key Files to Start From

- `src/app/(site)/page.tsx`
- `src/app/globals.css`
- `docs/briefing-tecnico-site-institucional-v1.1.md`
- `docs/decisions/2026-03-13-technical-foundation.md`
