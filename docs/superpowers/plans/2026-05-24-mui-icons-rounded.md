# MUI Icons Rounded Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Chuyển toàn bộ icon usage sang MUI Rounded variant với named barrel import, và đơn giản hoá `BottomNavItem` interface.

**Architecture:** Bỏ `activeIcon` khỏi `BottomNavItem` — component đã phân biệt active/inactive qua màu sắc (`primary.main` vs `text.secondary`), không cần 2 icon riêng. Stories cập nhật sang Rounded icons với named import. Docs được cập nhật để enforce convention này.

**Tech Stack:** React 19, MUI v6 (`@mui/icons-material` 6.5.0), TypeScript, Storybook

---

## File Map

| File                                                         | Thay đổi                                 |
| ------------------------------------------------------------ | ---------------------------------------- |
| `libs/ui/src/lib/components/BottomNav/BottomNav.tsx`         | Bỏ `activeIcon`, cập nhật render         |
| `libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx` | Rounded icons + named barrel import      |
| `CLAUDE.md`                                                  | Thêm icon convention vào Key Conventions |
| `AGENTS.md`                                                  | Thêm icon convention vào Coding Style    |

---

### Task 1: Simplify `BottomNavItem` interface

**Files:**

- Modify: `libs/ui/src/lib/components/BottomNav/BottomNav.tsx`

- [ ] **Step 1: Cập nhật interface và render trong `BottomNav.tsx`**

Thay toàn bộ nội dung file thành:

```tsx
import { type ReactNode, type SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { shape } from '../../theme/shape';

export interface BottomNavItem {
  label: string;
  icon: ReactNode;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  value: number;
  onChange: (event: SyntheticEvent, newValue: number) => void;
}

export function BottomNav({ items, value, onChange }: BottomNavProps) {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        paddingBottom: 'env(safe-area-inset-bottom)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
        borderTopLeftRadius: shape.radiusLg,
        borderTopRightRadius: shape.radiusLg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: theme.zIndex.appBar,
      }}
    >
      {items.map((item, index) => {
        const isActive = index === value;
        return (
          <ButtonBase
            key={item.label}
            onClick={(e) => onChange(e, index)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              flex: 1,
              py: 1,
              color: isActive
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
              transition: 'color 0.2s',
            }}
          >
            <Box sx={{ fontSize: 24, display: 'flex' }}>{item.icon}</Box>
            <Typography variant="caption" sx={{ fontSize: 10, lineHeight: 1 }}>
              {item.label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi TypeScript (sẽ báo lỗi ở stories vì còn `activeIcon` — bình thường, sẽ fix ở Task 2).

---

### Task 2: Cập nhật stories sang Rounded icons

**Files:**

- Modify: `libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx`

- [ ] **Step 1: Thay toàn bộ nội dung `BottomNav.stories.tsx`**

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import {
  HomeRounded,
  SearchRounded,
  PersonRounded,
  FavoriteRounded,
  NotificationsRounded,
} from '@mui/icons-material';
import { fn } from 'storybook/test';
import { BottomNav } from './BottomNav';

const threeItems = [
  { label: 'Home', icon: <HomeRounded /> },
  { label: 'Search', icon: <SearchRounded /> },
  { label: 'Profile', icon: <PersonRounded /> },
];

const meta: Meta<typeof BottomNav> = {
  component: BottomNav,
  title: 'Components/BottomNav',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: threeItems,
    value: 0,
    onChange: fn(),
  },
};

export const LastItemActive: Story = {
  args: {
    items: threeItems,
    value: 2,
    onChange: fn(),
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Home', icon: <HomeRounded /> },
      { label: 'Search', icon: <SearchRounded /> },
      { label: 'Saved', icon: <FavoriteRounded /> },
      { label: 'Alerts', icon: <NotificationsRounded /> },
      { label: 'Profile', icon: <PersonRounded /> },
    ],
    value: 0,
    onChange: fn(),
  },
};
```

- [ ] **Step 2: Typecheck + lint**

```bash
pnpm nx typecheck @meli/ui
pnpm nx lint @meli/ui
```

Expected: cả hai pass không có lỗi.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/components/BottomNav/BottomNav.tsx \
        libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx
git commit -m "refactor(ui): switch BottomNav icons to MUI Rounded variant"
```

---

### Task 3: Cập nhật CLAUDE.md và AGENTS.md

**Files:**

- Modify: `CLAUDE.md`
- Modify: `AGENTS.md`

- [ ] **Step 1: Thêm icon rule vào `CLAUDE.md`**

Thêm dòng sau vào cuối section `## Key Conventions`:

```markdown
- **Icons**: Dùng Rounded variant từ `@mui/icons-material` (ví dụ: `HomeRounded`, `SearchRounded`). Import theo named barrel: `import { HomeRounded, SearchRounded } from '@mui/icons-material'`.
```

- [ ] **Step 2: Thêm icon rule vào `AGENTS.md`**

Thêm đoạn sau vào cuối section `## Coding Style & Naming Conventions`:

```markdown
For MUI icons, always use the Rounded variant (e.g. `HomeRounded`, `SearchRounded`)
and import via named barrel: `import { HomeRounded } from '@mui/icons-material'`.
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md AGENTS.md
git commit -m "docs: add MUI Rounded icon convention to CLAUDE.md and AGENTS.md"
```
