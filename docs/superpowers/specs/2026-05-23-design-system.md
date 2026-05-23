# Design System — Meli (App Theo Dõi Thai Kỳ)

## Overview

Design system cho app theo dõi thai kỳ, mobile-only. Xây dựng trên MUI v6 theme override, đặt trong `@meli/ui`. Font chữ: Plus Jakarta Sans. Tone: hồng coral ấm áp, nhẹ nhàng, nữ tính.

Approach: MUI Theme Override — tận dụng `createTheme()` để override tokens và component defaults. Chỉ tạo custom component khi MUI không có sẵn.

---

## 1. Tokens

### 1.1 Colors

#### Primary

| Token                  | Hex       | Mô tả                      |
| ---------------------- | --------- | -------------------------- |
| `primary.main`         | `#F08180` | Coral — CTA chính          |
| `primary.light`        | `#F7ADAC` | Coral nhạt — hover states  |
| `primary.dark`         | `#D45E5D` | Coral đậm — active/pressed |
| `primary.contrastText` | `#FFFFFF` | Text trên nền primary      |

#### Secondary

| Token             | Hex       | Mô tả                            |
| ----------------- | --------- | -------------------------------- |
| `secondary.main`  | `#5BBCB4` | Teal/mint — accent, badges, tags |
| `secondary.light` | `#8DD4CE` | Mint nhạt — background accent    |
| `secondary.dark`  | `#3D9B93` | Teal đậm — active states         |

#### Background

| Token                | Hex       | Mô tả                    |
| -------------------- | --------- | ------------------------ |
| `background.default` | `#FFF5F5` | Hồng ấm nhạt — nền chính |
| `background.paper`   | `#FFFFFF` | Trắng — cards, modals    |

#### Text

| Token            | Hex       | Mô tả               |
| ---------------- | --------- | ------------------- |
| `text.primary`   | `#1A1A2E` | Gần đen — body text |
| `text.secondary` | `#6B7280` | Xám — secondary     |
| `text.disabled`  | `#B0B0B0` | Xám nhạt — disabled |

#### Status

| Token          | Hex       | Mô tả      |
| -------------- | --------- | ---------- |
| `success.main` | `#10B981` | Thành công |
| `warning.main` | `#F59E0B` | Cảnh báo   |
| `error.main`   | `#EF4444` | Lỗi        |
| `info.main`    | `#3B82F6` | Thông tin  |

#### Custom Surfaces

| Token       | Hex       | Mô tả             |
| ----------- | --------- | ----------------- |
| `coral.50`  | `#FFF0F0` | Surface nhạt nhất |
| `coral.100` | `#FFE0E0` | Surface nhạt      |

### 1.2 Typography

Font: **Plus Jakarta Sans** (Google Fonts).

| Variant   | Size | Weight         | Line Height | Dùng cho            |
| --------- | ---- | -------------- | ----------- | ------------------- |
| `h1`      | 28px | 700 (Bold)     | 1.3         | Tiêu đề trang chính |
| `h2`      | 24px | 700            | 1.3         | Tiêu đề section     |
| `h3`      | 20px | 600 (SemiBold) | 1.4         | Tiêu đề card        |
| `h4`      | 18px | 600            | 1.4         | Sub-heading         |
| `body1`   | 16px | 400 (Regular)  | 1.5         | Body text chính     |
| `body2`   | 14px | 400            | 1.5         | Body text phụ       |
| `caption` | 12px | 400            | 1.4         | Label, hint text    |
| `button`  | 14px | 600            | 1.75        | Button text         |

### 1.3 Shadow

3 cấp, nhẹ nhàng hiện đại. Các level 4–24 set `'none'`.

| Level        | Value                         | Dùng cho                  |
| ------------ | ----------------------------- | ------------------------- |
| `shadows[1]` | `0 1px 3px rgba(0,0,0,0.06)`  | Cards, inputs             |
| `shadows[2]` | `0 4px 12px rgba(0,0,0,0.08)` | Dropdowns, elevated cards |
| `shadows[3]` | `0 8px 24px rgba(0,0,0,0.12)` | Modals, popups            |

### 1.4 Radius

| Token                | Value  | Dùng cho                | Implementation                  |
| -------------------- | ------ | ----------------------- | ------------------------------- |
| `shape.borderRadius` | `12`   | Default — cards, inputs | MUI theme `shape.borderRadius`  |
| `shape.radiusSm`     | `8`    | Chips, tags             | Extended `theme.shape` property |
| `shape.radiusLg`     | `16`   | Modals, bottom sheets   | Extended `theme.shape` property |
| `shape.radiusFull`   | `9999` | Avatars, pills, FAB     | Extended `theme.shape` property |

Custom shape properties được khai báo qua TypeScript module augmentation trên `Theme['shape']`.

---

## 2. Components

### 2.1 Buttons

Pill shape (`borderRadius: 9999px`) cho tất cả variants.

#### Variants

| Variant       | Style                                     | Dùng cho                     |
| ------------- | ----------------------------------------- | ---------------------------- |
| **Contained** | Nền `primary.main`, text trắng, shadow[1] | CTA chính: "Lưu", "Tiếp tục" |
| **Outlined**  | Viền `primary.main`, nền trong suốt       | Hành động phụ: "Hủy"         |
| **Text**      | Không viền/nền, text `primary.main`       | Links, actions ít quan trọng |

#### Sizes

| Size     | Height | Ghi chú                       |
| -------- | ------ | ----------------------------- |
| `small`  | 36px   |                               |
| `medium` | 44px   | Mặc định — touch target chuẩn |
| `large`  | 52px   |                               |

#### States

- Hover: `primary.light`
- Active/Pressed: `primary.dark`
- Disabled: opacity 0.5

#### Defaults

- `fullWidth: true` (mobile)

### 2.2 Forms

MUI `TextField` với variant `outlined` làm mặc định.

| Thuộc tính           | Giá trị                             |
| -------------------- | ----------------------------------- |
| Border radius        | 12px (default shape)                |
| Border color (rest)  | `#E0E0E0`                           |
| Border color (focus) | `primary.main`                      |
| Background           | `#FFFFFF`                           |
| Height               | 48px (touch-friendly)               |
| Label                | MUI shrink style                    |
| Helper text          | `caption` variant, `text.secondary` |
| Error state          | Border `error.main`, helper text đỏ |

#### Input Types

- TextField
- Select
- Checkbox
- Radio
- DatePicker (MUI X DatePicker — cần install `@mui/x-date-pickers`)

### 2.3 Modals / Popups

Override MUI `Dialog`.

| Thuộc tính    | Giá trị              |
| ------------- | -------------------- |
| Border radius | 16px (`--radius-lg`) |
| Shadow        | `shadows[3]`         |
| Backdrop      | `rgba(0,0,0,0.3)`    |
| Max width     | `90vw`               |
| Padding       | 24px                 |
| Transition    | Slide up từ dưới lên |

Cấu trúc: `DialogTitle` (h4, bold) + `DialogContent` + `DialogActions` (buttons full width, stack vertical).

### 2.4 Snackbar

Override MUI `Snackbar` + `Alert`.

| Thuộc tính    | Giá trị                                          |
| ------------- | ------------------------------------------------ |
| Vị trí        | Bottom center (trên bottom nav)                  |
| Border radius | 12px                                             |
| Shadow        | `shadows[2]`                                     |
| Auto-hide     | 4 giây                                           |
| Variants      | `success`, `error`, `warning`, `info` — nền nhạt |
| Bottom offset | 80px (tránh đè bottom nav)                       |

### 2.5 Mobile Bottom Nav

Custom component — MUI `BottomNavigation` không đủ linh hoạt.

| Thuộc tính        | Giá trị                                      |
| ----------------- | -------------------------------------------- |
| Height            | 64px + safe area bottom                      |
| Background        | `#FFFFFF`                                    |
| Shadow            | `0 -2px 8px rgba(0,0,0,0.06)`                |
| Border radius top | 16px                                         |
| Items             | Icon (24px) + Label (`caption`, 10px)        |
| Active state      | Icon + label `primary.main`, icon filled     |
| Inactive state    | Icon + label `text.secondary`, icon outlined |
| Position          | Fixed bottom                                 |

---

## 3. File Structure

```
libs/ui/src/
├── lib/
│   ├── theme/
│   │   ├── palette.ts          # Color tokens
│   │   ├── typography.ts       # Typography config
│   │   ├── shadows.ts          # Shadow definitions
│   │   ├── shape.ts            # Radius tokens
│   │   ├── components.ts       # MUI component overrides
│   │   └── index.ts            # createTheme() composition
│   ├── components/
│   │   └── BottomNav/
│   │       ├── BottomNav.tsx    # Custom bottom nav component
│   │       └── index.ts
│   └── index.ts                # Public API: export theme + components
└── index.ts
```

## 4. Dependencies

- `@fontsource/plus-jakarta-sans` (self-hosted font, no Google Fonts CDN dependency)
- `@mui/x-date-pickers` (DatePicker)
- `dayjs` (date adapter cho MUI X DatePicker)
