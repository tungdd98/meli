# Storybook cho @meli/ui — Design Spec

**Ngày:** 2026-05-24  
**Scope:** Thêm Storybook vào `libs/ui` để dev theo dõi common components và theme

---

## Mục tiêu

Cho phép developer xem và tương tác với các UI component trong `@meli/ui` mà không cần chạy toàn bộ app. Bao gồm showcase cho design tokens (palette, typography, shape).

---

## Kiến trúc & Cài đặt

### Approach

Dùng Nx Storybook generator (`@nx/storybook`) — phù hợp nhất với Nx monorepo, tự xử lý tsconfig path aliases và Nx targets.

### Packages thêm vào root `devDependencies`

| Package                       | Mục đích                                         |
| ----------------------------- | ------------------------------------------------ |
| `@nx/storybook`               | Nx plugin cho Storybook                          |
| `@storybook/react-vite`       | Builder dùng Vite (nhất quán với setup hiện tại) |
| `storybook`                   | Storybook core CLI                               |
| `@storybook/addon-essentials` | Controls, docs, actions, viewport                |

Tất cả pinned version (không dùng `^` hay `~`) theo `.npmrc`.

### Generator command

```bash
pnpm nx g @nx/storybook:configuration ui --uiFramework=@storybook/react-vite --interactionTests=false
```

### File structure sau khi setup

```
libs/ui/
├── .storybook/
│   ├── main.ts              # builder, addons, stories glob
│   └── preview.tsx          # global decorators (MUI ThemeProvider)
├── tsconfig.storybook.json  # tsconfig riêng cho Storybook
└── src/
    └── lib/
        ├── components/
        │   └── BottomNav/
        │       ├── BottomNav.tsx
        │       ├── BottomNav.stories.tsx   ← mới
        │       └── index.ts
        └── theme/
            └── Theme.stories.tsx           ← mới
```

### Nx targets

Generator tự thêm:

- `pnpm nx storybook ui` — dev server tại `http://localhost:4400`
- `pnpm nx build-storybook ui` — build static files

---

## Global Decorator

`libs/ui/.storybook/preview.tsx` wrap mọi story bằng `ThemeProvider` với custom theme của `@meli/ui`:

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../src/lib/theme';

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Story />
    </ThemeProvider>
  ),
];
```

Đảm bảo mọi component render đúng màu sắc, typography, shape tokens.

---

## Stories

### Stories glob pattern (`main.ts`)

```
'../src/**/*.stories.@(ts|tsx)'
```

### Convention — CSF3 (Component Story Format 3)

```tsx
const meta: Meta<typeof ComponentName> = {
  component: ComponentName,
  title: 'Components/ComponentName',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { ... },
};
```

### `BottomNav.stories.tsx`

| Story            | Mô tả                                          |
| ---------------- | ---------------------------------------------- |
| `Default`        | 3 items, item đầu (index 0) active             |
| `LastItemActive` | 3 items, item cuối active — kiểm tra highlight |
| `ManyItems`      | 5 items — kiểm tra layout spacing              |

### `Theme.stories.tsx`

| Section    | Nội dung                                                                                                                     |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Palette    | Color swatches cho primary, secondary, error, warning, success, text, background — mỗi swatch hiển thị tên token + hex value |
| Typography | Render tất cả MUI variants (`h1`–`h6`, `body1`, `body2`, `caption`, `button`, `overline`) với nhãn variant                   |
| Shape      | Visual boxes cho các border-radius tokens (`radiusSm`, `radiusMd`, `radiusLg`)                                               |

---

## Workflow

```bash
# Chạy Storybook local
pnpm nx storybook ui
```

- Dev server tại `http://localhost:4400`
- Không tích hợp vào lint-staged hay pre-commit hook
- Không deploy (local only)

---

## Out of Scope

- CI/CD deployment
- Stories cho `@meli/hooks`, `@meli/api`, `@meli/utils`
- Interaction tests (`--interactionTests=false`)
- MDX documentation pages

---

## Cập nhật CLAUDE.md

Thêm vào section Commands:

```bash
# Storybook
pnpm nx storybook ui        # xem components tại http://localhost:4400
```

## Update AGENTS.md

Add the following line to the "Build, Test, and Development Commands" section:

```
- `pnpm exec nx storybook ui` starts the Storybook dev server at
  `http://localhost:4400` for browsing and interacting with `@meli/ui`
  components and design tokens.
```
