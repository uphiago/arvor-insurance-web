# Arvor Insurance Web

Base técnica inicial do site institucional da Arvor Insurance.

## Stack atual

- Next.js 16 com App Router
- TypeScript com `strict: true`
- Tailwind CSS v4
- ESLint + Prettier
- Husky + lint-staged
- Vitest + React Testing Library
- `pnpm` como package manager oficial

## Estado atual do scaffold

Esta entrega cobre a fundação do app e a organização inicial do projeto.

Já está no repositório:

- shell do app em `src/app`
- homepage placeholder em `src/app/(site)/page.tsx`
- configuração de lint, format e hooks
- harness inicial de testes com Vitest
- documentação técnica e briefing em `docs/`

Ainda não está implementado nesta etapa:

- Sanity Studio em `/studio`
- Playwright
- componentes `shadcn/ui`
- homepage institucional final
- stepper de cotação

## Rodando localmente

Pré-requisito: Node.js `20.9+`

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Abra `http://localhost:3000`.

## Comandos úteis

```bash
pnpm dev
pnpm lint
pnpm test --run
pnpm build
```

## Próximo arquivo para editar

O ponto de entrada atual da home pública está em `src/app/(site)/page.tsx`.
