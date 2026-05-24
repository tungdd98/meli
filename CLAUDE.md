# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev server
pnpm nx dev web

# Build
pnpm nx build web              # web app
pnpm nx build ui                # single lib

# Lint & format
pnpm nx lint web                # single project
pnpm nx run-many -t lint        # all projects
pnpm prettier --write .

# Type check
pnpm nx typecheck web
pnpm nx run-many -t typecheck

# Test
pnpm nx test <project>          # run tests for a project
pnpm nx test <project> -- --testNamePattern="pattern"  # single test

# Storybook
pnpm nx storybook @meli/ui --port 4400  # xem components tại http://localhost:4400
```

## Architecture

Nx monorepo with pnpm workspaces. One app (`apps/web`) and four shared libraries (`libs/`).

**App — `apps/web`**: React 19 SPA.

- Routing: TanStack Router (file-based). Routes live in `apps/web/src/routes/`; the route tree is auto-generated in `routeTree.gen.ts` — do not edit it manually.
- State: Zustand stores in `apps/web/src/stores/`.
- Data fetching: TanStack React Query (configured in `providers.tsx`, staleTime 5 min).
- UI framework: MUI v6 with a custom theme at `apps/web/src/styles/theme.ts`.

**Libs** — imported via `@meli/<name>` path aliases (defined in `tsconfig.base.json`):
| Package | Purpose |
|---------|---------|
| `@meli/ui` | Shared UI components |
| `@meli/hooks` | Shared React hooks |
| `@meli/api` | API client / service layer |
| `@meli/utils` | Pure utility functions |

## Key Conventions

- **Pinned versions**: `.npmrc` has `save-exact=true`. Never use `^` or `~` ranges.
- **Commits**: Conventional Commits enforced by commitlint + husky. Format: `type(scope): message`.
- **Lint-staged**: ESLint + Prettier run automatically on staged `.ts`/`.tsx` files via husky pre-commit hook.
- **Module boundaries**: `@nx/enforce-module-boundaries` ESLint rule is active — libs should not import from `apps/`, and cross-lib imports must respect configured tags.
- **Icons**: Use the Rounded variant from `@mui/icons-material` (for example: `HomeRounded`, `SearchRounded`). Import via named barrel: `import { HomeRounded, SearchRounded } from '@mui/icons-material'`.
- **Border Radius**: Import `shape` and use named token values in `sx` props, for example `sx={{ borderRadius: shape.md }}`. Available tokens: `shape.sm` (8px), `shape.md` (12px), `shape.lg` (16px), `shape.full` (9999px). Do not use bare string shortcuts such as `borderRadius: 'md'`; MUI passes strings through as CSS values. Numeric shorthand is only for ad-hoc values outside the token scale.
