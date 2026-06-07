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
pnpm nx storybook @meli/ui --port 4400  # http://localhost:4400
```

## Architecture

Nx monorepo with pnpm workspaces. One app (`apps/web`) and four shared libraries (`libs/`).

**App — `apps/web`**: React 19 SPA.

- Routing: TanStack Router (file-based). Routes live in `apps/web/src/routes/`; the route tree is auto-generated in `routeTree.gen.ts` — do not edit it manually.
- State: Zustand stores in `apps/web/src/stores/`.
- Data fetching: TanStack React Query (configured in `providers.tsx`, staleTime 5 min).
- UI framework: MUI v6. Theme is defined in `libs/ui/src/lib/theme/` and exported via `@meli/ui` — import `theme` and `shape` from there.

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
- **MUI components**: Always import from the `@mui/material` named barrel, never from deep paths. Example: `import { Button, Stack, Typography } from '@mui/material'`. Never use `import Button from '@mui/material/Button'`.
- **Icons**: Use the Rounded variant from `@mui/icons-material` (for example: `HomeRounded`, `SearchRounded`). Import via named barrel: `import { HomeRounded, SearchRounded } from '@mui/icons-material'`. Never use deep paths like `import HomeRounded from '@mui/icons-material/HomeRounded'`.
- **Design system first**: Use `@meli/ui` components and MUI theme tokens/overrides before writing local visual styles. App-level `sx` should mainly handle layout: spacing, sizing, alignment, and responsive placement. Do not duplicate design-system styles for cards, buttons, text fields, alerts, colors, shadows, typography, or borders inside route/feature components. If an existing component or theme token does not cover the needed visual treatment, add or update the design system first, or explicitly document the exception in the code review/PR.
- **Border Radius**: Import `shape` and use named token values in `sx` props, for example `sx={{ borderRadius: shape.md }}`. Available tokens: `shape.sm` (8px), `shape.md` (12px), `shape.lg` (16px), `shape.xl` (20px), `shape.full` (9999px). Do not use bare string shortcuts such as `borderRadius: 'md'`; MUI passes strings through as CSS values. Numeric shorthand is only for ad-hoc values outside the token scale.
- **Forms**: Use `react-hook-form` + `zod` for all form state and validation. `@meli/ui` exports pre-wired RHF controller components: `FormTextField`, `FormSelect`, `FormCheckbox`, `FormSwitch`, `FormRadioGroup`, `FormDatePicker`, `FormAutocomplete`. Always prefer these over raw MUI inputs + manual `Controller`.
- **Dates**: Use `dayjs` for date logic. MUI date pickers require `<LocalizationProvider dateAdapter={AdapterDayjs}>` — this is already provided by the `onboarding` layout route; add it locally when needed outside that route.
- **Route guards**: Layout routes use `beforeLoad` for auth/redirect logic. `_auth` prefix = protected (requires session + completed onboarding). The `onboarding` layout requires only a session. Never duplicate these guards in child route components.
- **Env vars**: App requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` (see `apps/web/.env.example`).

## Supabase

Local development uses the Supabase CLI:

```bash
supabase db push       # reset DB and replay all migrations
```
