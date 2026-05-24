# Repository Guidelines

## Project Structure & Module Organization

This is an Nx + pnpm TypeScript monorepo. The React/Vite application lives in
`apps/web`, with route files under `apps/web/src/routes`, app wiring in
`apps/web/src/app`, shared state in `apps/web/src/stores`, and styling in
`apps/web/src/styles.css` plus `apps/web/src/styles/`. Shared packages live in
`libs/`: `api`, `hooks`, `ui`, and `utils`. Each library exports through
`src/index.ts`; keep public APIs there and implementation details under
`src/lib/`. Project notes and implementation plans are in `docs/superpowers/`.

## Build, Test, and Development Commands

Use pnpm and Nx from the repository root:

- `pnpm install` installs pinned dependencies from `pnpm-lock.yaml`.
- `pnpm exec nx dev @meli/web` starts the Vite dev server.
- `pnpm exec nx build @meli/web` creates the production web bundle.
- `pnpm exec nx build @meli/ui` builds a library package; replace the project
  name for other libs.
- `pnpm exec nx lint @meli/web` runs ESLint for one project.
- `pnpm exec nx typecheck @meli/web` runs TypeScript project checking.
- `pnpm exec nx test @meli/ui` runs Vitest where a test target exists.
- `pnpm exec nx storybook @meli/ui --port 4400` starts the Storybook dev server
  at `http://localhost:4400` for browsing and interacting with `@meli/ui`
  components and design tokens.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and strict compiler settings from
`tsconfig.base.json`. Formatting is Prettier: 2-space indentation, semicolons,
single quotes, trailing commas, and 80-character print width. ESLint enforces Nx
module boundaries, so import shared code through package aliases such as
`@meli/ui` or `@meli/utils`, not deep relative paths across projects. Name route
files by route (`about.tsx`, `index.tsx`) and library implementation files by
feature under `src/lib/`.

For MUI icons, always use the Rounded variant (e.g. `HomeRounded`, `SearchRounded`)
and import via named barrel: `import { HomeRounded } from '@mui/icons-material'`.

## Testing Guidelines

Vitest is configured through Nx/Vite, but the current scaffold has no test files.
Add focused tests next to the code they cover using `*.test.ts` or
`*.test.tsx`. Prefer behavior-level tests for components, hooks, and utilities.
Run the relevant project target before opening a PR, for example
`pnpm exec nx test @meli/hooks`, plus `lint` and `typecheck` for touched
projects.

## Commit & Pull Request Guidelines

Commits use Conventional Commits and are checked by commitlint, for example
`feat: add profile route`, `fix: handle empty API response`, or
`chore: update lint config`. Keep commits scoped and avoid mixing unrelated
changes. Pull requests should include a short description, linked issue or task
when available, verification commands run, and screenshots for visible UI
changes.

## Agent-Specific Instructions

Local shell commands should be prefixed with `rtk` as requested by the workspace
instructions, for example `rtk pnpm exec nx lint @meli/web`. Do not revert user
changes or regenerate scaffolded files unless the task explicitly requires it.
