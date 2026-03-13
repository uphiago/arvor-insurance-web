# Arvor Foundation Design

**Date:** 2026-03-13
**Status:** Approved for implementation
**Related docs:**
- `docs/briefing-tecnico-site-institucional-v1.md`
- `docs/decisions/2026-03-13-technical-foundation.md`

---

## Goal

Create the technical foundation for the Arvor Insurance website so the project can move quickly into visual implementation and the quote flow, without reworking the stack or content architecture.

This foundation must support:

- a modern institutional website with strong SEO and responsive performance,
- an embedded CMS for institutional content,
- a code-owned 3-step quoting experience,
- a documented and repeatable setup for future contributors and AI agents.

---

## Approaches Considered

### Approach 1: Next.js + App Router + Sanity embedded

This approach uses Next.js as the application shell, Tailwind and shadcn/ui for UI acceleration, and Sanity embedded at `/studio` for content management. The public site and Studio are separated by route groups and layout boundaries.

**Pros**

- Strong fit for institutional content and SEO
- Clean Vercel deployment story
- Official integration paths for Next.js, Sanity, and testing
- Easy future extension into preview and Visual Editing

**Cons**

- More moving parts than a plain SPA
- Requires environment setup earlier because Sanity is included in v1

### Approach 2: React SPA + Vite + external CMS

This keeps the frontend lighter at the start, but pushes more decisions into manual SEO handling and integration points between the SPA and the CMS.

**Pros**

- Faster to bootstrap at the most basic level
- Very simple local frontend setup

**Cons**

- Weaker fit for SEO and content-first pages
- Less aligned with the stated deployment and project goals
- More custom decisions for metadata, page structure, and editorial rendering

### Approach 3: Next.js + fully CMS-driven experience

This would put both institutional content and more of the quoting experience into content infrastructure.

**Pros**

- Maximum editorial control
- Potentially less hardcoded page content

**Cons**

- Higher risk and complexity in v1
- Harder to protect business rules in the quote journey
- More schema and preview work before useful UI exists

### Chosen Approach

Approach 1 is the correct baseline. It keeps content flexible while protecting the quote flow as product logic in the application.

---

## Architecture

### Application Shell

The project will use Next.js with App Router, TypeScript, Tailwind CSS, `src/`, and the `@/*` import alias. The app will target Vercel from the beginning and keep the default Next.js conventions wherever possible.

### Route Separation

The repository will separate the public website and the embedded Sanity Studio with route groups:

- `src/app/(site)` for the public experience
- `src/app/(studio)/studio` for Sanity Studio

This avoids layout collisions and keeps future preview-related work easier.

### Content Ownership

**Sanity owns:**

- homepage copy and supporting sections,
- product and sustainable-project content,
- SEO defaults and legal/supporting content,
- reusable institutional content blocks.

**Application code owns:**

- quote stepper flow,
- validation rules,
- modal and CTA behaviors tied to product logic,
- e-mail template generation,
- WhatsApp redirection rules,
- state management for the quoting journey.

### UI Layer

The project will use `shadcn/ui` as a base component layer, but not as the final visual language. Components will be themed and extended to match the Arvor brand palette, typography, tone, and spacing system.

### Form Strategy

The quoting flow will use React Hook Form with Zod. The form state and schema definitions should be colocated near the quote flow and tested independently from the page shell.

---

## File and Directory Strategy

The initial structure should look like this:

```text
docs/
  architecture/
  content-model/
  decisions/
  runbooks/
  superpowers/
src/
  app/
    (site)/
    (studio)/
  components/
    ui/
    site/
    quote/
  content/
  lib/
  sanity/
  styles/
tests/
playwright/
```

### Directory Responsibilities

- `src/app/(site)`: public routes, layouts, metadata, and section composition.
- `src/app/(studio)/studio`: embedded Sanity Studio route.
- `src/components/ui`: generated or adapted shadcn/ui primitives.
- `src/components/site`: Arvor-specific institutional components.
- `src/components/quote`: quote flow UI and stepper components.
- `src/content`: hardcoded app-owned content that should not be CMS managed.
- `src/lib`: shared helpers, formatting, schemas, and constants.
- `src/sanity`: Sanity client, queries, schemas, and Studio configuration.
- `tests`: unit and component tests.
- `playwright`: end-to-end tests.

---

## Testing and Quality

### Tooling

- ESLint for linting
- Prettier for formatting
- Husky + lint-staged for pre-commit checks
- Vitest + React Testing Library for unit and component tests
- Playwright for end-to-end flows

### Testing Expectations

The initial scaffold should prove:

- the app renders successfully,
- the embedded Studio route is reachable,
- a baseline site page test exists,
- Playwright is configured and can host future stepper tests.

The first implementation slice does not need full quote flow coverage yet, but the testing stack must be fully installed and runnable.

---

## Environment and Deployment

### Runtime Baseline

- Node.js LTS compatible with current Next.js requirements
- `pnpm` as the only supported package manager
- Generate the scaffold in a temporary directory if the existing `docs/` folder makes in-place generation unsafe

### Expected Environment Variables

At minimum, the project should reserve space for:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN` or equivalent read token name when needed later
- `SANITY_STUDIO_PROJECT_ID` only if separate Studio config requires it
- `SANITY_STUDIO_DATASET` only if separate Studio config requires it

The exact variable list should be documented after the scaffold is generated and Sanity integration is wired.

---

## Documentation Strategy

The repository will treat documentation as part of the implementation, not as an afterthought.

Required doc areas:

- `docs/decisions/`: decision records and approved technical choices
- `docs/architecture/`: structural explanations and system boundaries
- `docs/content-model/`: what belongs in Sanity versus code
- `docs/runbooks/`: setup, local development, and deployment procedures
- `docs/superpowers/`: specs and plans for future implementation sessions

This documentation is intended to support both human contributors and future AI-assisted development sessions.

---

## Risks and Controls

| Risk | Control |
| --- | --- |
| CMS scope expands into quote logic too early | Keep quote behavior in code and document the boundary |
| Embedded Studio leaks into public layouts | Use route groups and isolated layouts from day one |
| Scaffold complexity grows before UI work begins | Defer Visual Editing and advanced editorial features |
| Styling becomes generic due to component library defaults | Theme and override shadcn/ui instead of shipping defaults |
| Future contributors re-decide the stack repeatedly | Store decisions and plans inside `docs/` |

---

## References

- Next.js official installation and `create-next-app` docs: https://nextjs.org/docs/app/getting-started/installation
- shadcn/ui official Next.js install docs: https://ui.shadcn.com/docs/installation/next
- Sanity embedded Studio docs: https://www.sanity.io/docs/embedding-sanity-studio
- Sanity datasets docs: https://www.sanity.io/docs/content-lake/datasets
- Next.js Vitest testing guide: https://nextjs.org/docs/app/guides/testing/vitest
- Playwright official install and runner docs: https://playwright.dev/docs/intro
