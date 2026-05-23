# Meli — Project Initialization Design

## Overview

Khởi tạo Nx Monorepo cho SaaS web app với React, MUI, TanStack Router, Zustand, React Query. Dùng pnpm, ESLint, Prettier, commitlint, Husky.

## Tech Stack

| Thành phần | Thư viện | Version strategy |
|---|---|---|
| Framework | React 19 + TypeScript | Pinned |
| Build tool | Vite 6 | Pinned (via Nx) |
| UI Library | MUI v6 + MUI Icons | Pinned |
| Routing | TanStack Router | Pinned |
| State (client) | Zustand | Pinned |
| State (server) | TanStack React Query v5 | Pinned |
| Linting | ESLint 9 (flat config) | Pinned |
| Formatting | Prettier | Pinned |
| Commit lint | commitlint + conventional commits | Pinned |
| Git hooks | Husky + lint-staged | Pinned |
| Package manager | pnpm | — |
| Monorepo | Nx (latest) | Pinned |

Tất cả packages được install với `--save-exact` (pin version).

## Monorepo Structure

```
meli/
├── apps/
│   └── web/                    # React app chính (SaaS)
│       ├── src/
│       │   ├── app/
│       │   │   ├── App.tsx
│       │   │   ├── providers.tsx
│       │   │   └── router.tsx
│       │   ├── routes/
│       │   │   ├── __root.tsx
│       │   │   ├── index.tsx
│       │   │   └── about.tsx
│       │   ├── stores/
│       │   │   └── app.store.ts
│       │   ├── styles/
│       │   │   └── theme.ts
│       │   ├── assets/
│       │   └── main.tsx
│       ├── index.html
│       ├── tsconfig.json
│       └── vite.config.ts
├── libs/
│   ├── ui/                     # Shared UI components (MUI wrappers)
│   ├── utils/                  # Utility functions
│   ├── hooks/                  # Custom hooks
│   └── api/                    # API layer (React Query hooks, API client)
├── nx.json
├── tsconfig.base.json
├── package.json
├── pnpm-workspace.yaml
├── .eslintrc.json
├── .prettierrc
├── commitlint.config.ts
└── .husky/
    ├── pre-commit
    └── commit-msg
```

## App Architecture

### Providers (apps/web/src/app/providers.tsx)

Gom tất cả providers vào một component duy nhất:
- `ThemeProvider` — MUI theme
- `QueryClientProvider` — React Query
- `RouterProvider` — TanStack Router

### Routing (apps/web/src/app/router.tsx)

Dùng TanStack Router với file-based routing convention. Route tree nằm trong `routes/`.

### State Management

- **Client state**: Zustand stores trong `stores/`, mỗi domain một file.
- **Server state**: React Query hooks trong lib `api/`.

### MUI Theme (apps/web/src/styles/theme.ts)

Custom MUI theme tập trung, import vào `providers.tsx`.

## Shared Libraries

| Lib | Mục đích |
|---|---|
| `ui` | Shared UI components, MUI wrappers |
| `utils` | Utility functions dùng chung |
| `hooks` | Custom React hooks dùng chung |
| `api` | API client, React Query hooks |

Mỗi lib có barrel export qua `index.ts`. Import bằng path alias `@meli/ui`, `@meli/utils`, v.v.

## Linting & Formatting

### ESLint (flat config)
- Nx preset (`@nx/eslint-plugin`)
- React + TypeScript rules
- `eslint-config-prettier` để tránh xung đột với Prettier

### Prettier
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 80,
  "tabWidth": 2
}
```

### Commitlint
- Config: `@commitlint/config-conventional`
- Format: `type(scope): message`

### Husky + lint-staged
- `pre-commit` → `lint-staged` (eslint --fix + prettier --write trên staged files)
- `commit-msg` → `commitlint`

### lint-staged config
```json
{
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,md,css}": ["prettier --write"]
}
```

## Approach

Dùng `create-nx-workspace` với preset `react-monorepo` để scaffold, sau đó:
1. Thay React Router bằng TanStack Router
2. Thêm MUI, Zustand, React Query
3. Tạo 4 shared libs (ui, utils, hooks, api)
4. Cấu hình ESLint, Prettier, commitlint, Husky
5. Setup cấu trúc thư mục bên trong app web
