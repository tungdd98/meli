# UI Redesign — PawSpa Design Language

**Ngày**: 2026-05-24
**Tham khảo**: https://ui-ux-pro-max-skill.nextlevelbuilder.io/demo/pet-grooming

## Overview

Áp dụng design language từ website tham khảo (PawSpa) lên hệ thống UI hiện tại của Meli. Giữ nguyên color palette coral/teal. Thay đổi tập trung vào: offset shadow 3D, viền dày 3px, border-radius lớn hơn cho card, và Storybook stories cho các MUI components.

Không tạo wrapper component mới cho MUI components — style xử lý hoàn toàn qua `theme.components` override. App sử dụng MUI trực tiếp (`@mui/material`), hưởng style từ theme.

---

## 1. Token Updates

### 1.1 `shape.ts` — thêm token `xl`

| Token        | Giá trị  | Dùng cho                                    |
| ------------ | -------- | ------------------------------------------- |
| `shape.sm`   | `8px`    | Chip, tags (giữ nguyên)                     |
| `shape.md`   | `12px`   | Alert (giữ nguyên)                          |
| `shape.lg`   | `16px`   | Button, Input (đổi: button trước dùng pill) |
| `shape.xl`   | `20px`   | Card — mới                                  |
| `shape.full` | `9999px` | Avatar, pill (giữ nguyên)                   |

### 1.2 `shadows.ts` — thêm `offsetShadows`

Giữ nguyên `shadows[1..3]` (soft blur) cho Dialog, Alert, Snackbar. Thêm named export riêng:

```ts
export const offsetShadows = {
  button: 'rgba(240,129,128,0.25) 4px 4px 0 0',
  card: 'rgba(240,129,128,0.15) 6px 6px 0 0',
  cardFeatured: 'rgba(240,129,128,0.30) 8px 8px 0 0',
};
```

### 1.3 `components.ts` — MUI overrides

#### MuiButton

- `borderRadius`: `shape.lg` (16px) — thay vì `shape.full`
- `containedPrimary`: thêm `border: '3px solid rgba(0,0,0,0.08)'`, `boxShadow: offsetShadows.button`
- `outlinedPrimary`: `border: '3px solid'` (MUI mặc định là 1px)
- Hover/active: giữ nguyên logic màu hiện tại

#### MuiOutlinedInput

- `borderRadius`: `shape.lg` (16px) — tăng từ `shape.md`
- Border default: `3px solid coral.100` (#FFE0E0)
- Border hover: `3px solid coral.100` (không thay đổi khi hover, chỉ đổi khi focus)
- Border focus: `3px solid primary.main`
- Thêm inner shadow: `inset 0 2px 4px rgba(0,0,0,0.03)`

#### MuiCard (override mới)

- `borderRadius`: `shape.xl` (20px)
- `border`: `3px solid coral.100` (#FFE0E0)
- `boxShadow`: `offsetShadows.card`
- `backgroundColor`: `#FFFFFF`

#### MuiAvatar (override mới)

- Default: `backgroundColor: coral.100`, `color: primary.main`

#### MuiChip (override mới)

- `borderRadius`: `shape.full` (pill)
- `colorPrimary` filled: `backgroundColor: coral.50`, `color: primary.main`, `border: 1px solid coral.100`
- `colorSecondary` filled: `backgroundColor: rgba(91,188,180,0.1)`, `color: secondary.main`
- `fontWeight`: 600, `fontSize`: 13px

---

## 2. Storybook Stories

Mỗi stories chỉ import từ `@mui/material` — không có wrapper. Stories đặt trong `libs/ui/src/lib/components/<Name>/`.

### Button.stories.tsx

Showcase: Contained / Outlined / Text × Primary / Secondary, 3 sizes, Disabled state.

### Card.stories.tsx

Showcase: Basic card, Card với CardHeader+CardContent+CardActions, Card với ảnh (CardMedia).

### Chip.stories.tsx

Showcase: Primary / Secondary / Success / Warning / Error / Default, Filled vs Outlined, With icon, With onDelete.

### Avatar.stories.tsx

Showcase: Sizes (sm=32 / md=40 / lg=56 / xl=72), With image, Initials fallback, Bordered (`sx={{ border: '2px solid' }}`).

### BottomNav.stories.tsx

Showcase: 4-tab navigation với Rounded icons, trạng thái active/inactive.

---

## 3. Form Redesign

Không thay đổi API của FormTextField hay các form field khác.

**Visual changes** (xử lý qua theme override `MuiOutlinedInput`):

- Border: `3px solid coral.100` thay vì `1px solid #E0E0E0`
- Border-radius: `16px` thay vì `12px`
- Inner shadow: `inset 0 2px 4px rgba(0,0,0,0.03)`

**Label**: Đổi sang above-field style — set `InputLabelProps={{ shrink: true }}` làm default trong `FormTextField.tsx`. Label sẽ luôn hiển thị phía trên input thay vì floating.

---

## 4. File Structure

```
libs/ui/src/lib/
├── theme/
│   ├── shape.ts          # thêm xl: '20px'
│   ├── shadows.ts        # thêm export offsetShadows
│   └── components.ts     # update MuiButton, MuiOutlinedInput; thêm MuiCard, MuiAvatar, MuiChip
├── components/
│   ├── BottomNav/
│   │   ├── BottomNav.tsx         (giữ nguyên)
│   │   └── BottomNav.stories.tsx (tạo mới)
│   ├── Button/
│   │   └── Button.stories.tsx    (tạo mới — không có .tsx wrapper)
│   ├── Card/
│   │   └── Card.stories.tsx      (tạo mới — không có .tsx wrapper)
│   ├── Chip/
│   │   └── Chip.stories.tsx      (tạo mới — không có .tsx wrapper)
│   └── Avatar/
│       └── Avatar.stories.tsx    (tạo mới — không có .tsx wrapper)
└── form/
    ├── FormTextField/
    │   └── FormTextField.tsx      (update: thêm shrink: true default)
    └── DemoForm/
        └── DemoForm.stories.tsx   (update: showcase style mới)
```

---

## 5. Không thay đổi

- Color palette (`palette.ts`) — giữ nguyên coral/teal
- Font — giữ Plus Jakarta Sans
- `shadows[1..3]` (soft blur) — giữ nguyên cho Dialog, Alert
- `shape.sm`, `shape.md`, `shape.full` — giữ nguyên
- API của tất cả form components — không đổi
- BottomNav component logic — chỉ thêm stories
