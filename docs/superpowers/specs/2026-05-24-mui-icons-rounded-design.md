# MUI Icons — Chuyển sang Rounded variant

**Ngày:** 2026-05-24  
**Scope:** `libs/ui` — BottomNav component, Storybook stories, docs

## Mục tiêu

Chuẩn hoá cách dùng MUI icons trong toàn project:

- Dùng Rounded variant cho giao diện mềm mại, nhất quán
- Named barrel import từ `@mui/icons-material`
- Đơn giản hoá `BottomNavItem` interface

## Thay đổi

### 1. `BottomNav.tsx` — Bỏ `activeIcon`

**File:** `libs/ui/src/lib/components/BottomNav/BottomNav.tsx`

Xoá field `activeIcon` khỏi `BottomNavItem`. Active state được phân biệt hoàn toàn bằng màu sắc (`primary.main` vs `text.secondary`) — không cần 2 icon riêng.

```ts
// Trước
export interface BottomNavItem {
  label: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}

// Sau
export interface BottomNavItem {
  label: string;
  icon: ReactNode;
}
```

Render: thay `{isActive ? item.activeIcon : item.icon}` → `{item.icon}`.

### 2. `BottomNav.stories.tsx` — Rounded + named import

**File:** `libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx`

```ts
import {
  HomeRounded,
  SearchRounded,
  PersonRounded,
  FavoriteRounded,
  NotificationsRounded,
} from '@mui/icons-material';
```

Xoá toàn bộ Outlined/Filled imports cũ. Mỗi item chỉ có `icon`, không có `activeIcon`.

### 3. Docs — Thêm rule icon

**Files:** `CLAUDE.md` (phần Key Conventions), `AGENTS.md` (phần Coding Style)

> **Icons**: Dùng Rounded variant từ `@mui/icons-material` (ví dụ: `HomeRounded`, `SearchRounded`).  
> Import theo named barrel: `import { HomeRounded, SearchRounded } from '@mui/icons-material'`.

## Quyết định

| Câu hỏi        | Quyết định                                    |
| -------------- | --------------------------------------------- |
| Inactive state | Cùng Rounded icon, phân biệt bằng opacity/màu |
| Import style   | Named barrel import                           |
| Interface      | Simplify xuống 1 field `icon`                 |

## Không thay đổi

- Component `BottomNav.tsx` logic active state (color) — giữ nguyên
- Package `@mui/icons-material` 6.5.0 — đã có sẵn, không cần cài thêm
