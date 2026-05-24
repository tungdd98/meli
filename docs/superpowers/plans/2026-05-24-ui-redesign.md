# UI Redesign — PawSpa Design Language Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Áp dụng design language PawSpa (offset shadow 3D, viền 3px, radius lớn hơn) lên hệ thống UI Meli, giữ nguyên color palette coral/teal.

**Architecture:** Toàn bộ style thay đổi qua MUI theme override trong `libs/ui/src/lib/theme/components.ts`. Không tạo wrapper component mới — app dùng MUI trực tiếp (`@mui/material`). Stories-only files cho Button, Card, Chip, Avatar để showcase trong Storybook.

**Tech Stack:** MUI v6, React 19, TypeScript, Storybook 8, Nx monorepo, pnpm.

---

## File Map

| File                                                   | Thay đổi                                                             |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| `libs/ui/src/lib/theme/shape.ts`                       | Thêm `xl: '20px'`, augment `Shape` interface                         |
| `libs/ui/src/lib/theme/shadows.ts`                     | Thêm `export const offsetShadows`                                    |
| `libs/ui/src/lib/theme/components.ts`                  | Update MuiButton, MuiOutlinedInput; thêm MuiCard, MuiAvatar, MuiChip |
| `libs/ui/src/lib/form/FormTextField/FormTextField.tsx` | Thêm `InputLabelProps={{ shrink: true }}` default                    |
| `libs/ui/src/lib/components/Button/Button.stories.tsx` | Tạo mới                                                              |
| `libs/ui/src/lib/components/Card/Card.stories.tsx`     | Tạo mới                                                              |
| `libs/ui/src/lib/components/Chip/Chip.stories.tsx`     | Tạo mới                                                              |
| `libs/ui/src/lib/components/Avatar/Avatar.stories.tsx` | Tạo mới                                                              |

---

## Task 1: Token — shape.xl + offsetShadows

**Files:**

- Modify: `libs/ui/src/lib/theme/shape.ts`
- Modify: `libs/ui/src/lib/theme/shadows.ts`

- [ ] **Step 1: Cập nhật `shape.ts`**

Thay toàn bộ nội dung file:

```ts
declare module '@mui/material/styles' {
  interface Shape {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  }
}

export const shape = {
  borderRadius: 4,
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  full: '9999px',
};
```

- [ ] **Step 2: Cập nhật `shadows.ts`**

Thêm `offsetShadows` export vào cuối file (giữ nguyên `shadows` array):

```ts
import type { Shadows } from '@mui/material/styles';

export const shadows: Shadows = [
  'none',
  '0 1px 3px rgba(0,0,0,0.06)',
  '0 4px 12px rgba(0,0,0,0.08)',
  '0 8px 24px rgba(0,0,0,0.12)',
  ...Array(21).fill('none'),
] as Shadows;

export const offsetShadows = {
  button: 'rgba(240,129,128,0.25) 4px 4px 0 0',
  card: 'rgba(240,129,128,0.15) 6px 6px 0 0',
  cardFeatured: 'rgba(240,129,128,0.30) 8px 8px 0 0',
};
```

- [ ] **Step 3: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 4: Commit**

```bash
git add libs/ui/src/lib/theme/shape.ts libs/ui/src/lib/theme/shadows.ts
git commit -m "feat(ui): add shape.xl token and offsetShadows export"
```

---

## Task 2: Theme — Cập nhật MuiButton

**Files:**

- Modify: `libs/ui/src/lib/theme/components.ts`

- [ ] **Step 1: Cập nhật import trong `components.ts`**

Thay dòng import shadows:

```ts
import { shadows, offsetShadows } from './shadows';
```

- [ ] **Step 2: Thay toàn bộ block `MuiButton`**

Tìm block `MuiButton: { ... }` trong `components.ts` và thay bằng:

```ts
MuiButton: {
  defaultProps: {
    fullWidth: true,
  },
  styleOverrides: {
    root: {
      borderRadius: shape.lg,
      textTransform: 'none' as const,
    },
    sizeSmall: { height: 36 },
    sizeMedium: { height: 44 },
    sizeLarge: { height: 52 },
    containedPrimary: {
      border: '3px solid rgba(0,0,0,0.08)',
      boxShadow: offsetShadows.button,
      '&:hover': { boxShadow: offsetShadows.button },
    },
    outlinedPrimary: {
      borderWidth: '3px',
      '&:hover': { borderWidth: '3px' },
    },
  },
},
```

Lưu ý: bỏ `disableElevation: true` khỏi `defaultProps` — vì ta dùng custom `boxShadow` qua styleOverrides, không cần disable MUI elevation nữa.

- [ ] **Step 3: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 4: Commit**

```bash
git add libs/ui/src/lib/theme/components.ts
git commit -m "feat(ui): update MuiButton — 16px radius, 3px border, offset shadow"
```

---

## Task 3: Theme — Cập nhật MuiOutlinedInput + thêm MuiCard, MuiAvatar, MuiChip

**Files:**

- Modify: `libs/ui/src/lib/theme/components.ts`

- [ ] **Step 1: Thay block `MuiOutlinedInput`**

Tìm block `MuiOutlinedInput: { ... }` và thay bằng:

```ts
MuiOutlinedInput: {
  styleOverrides: {
    root: {
      borderRadius: shape.lg,
      backgroundColor: '#FFFFFF',
      minHeight: 48,
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FFE0E0',
        borderWidth: '3px',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#FFE0E0',
        borderWidth: '3px',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#F08180',
        borderWidth: '3px',
      },
    },
  },
},
```

- [ ] **Step 2: Thêm MuiCard, MuiAvatar, MuiChip vào cuối object `components`**

Thêm vào trước dấu `}` đóng của `export const components`:

```ts
MuiCard: {
  styleOverrides: {
    root: {
      borderRadius: shape.xl,
      border: '3px solid #FFE0E0',
      boxShadow: offsetShadows.card,
      backgroundColor: '#FFFFFF',
    },
  },
},

MuiAvatar: {
  styleOverrides: {
    root: {
      backgroundColor: '#FFE0E0',
      color: '#F08180',
    },
  },
},

MuiChip: {
  styleOverrides: {
    root: {
      borderRadius: shape.full,
      fontWeight: 600,
      fontSize: '13px',
    },
    colorPrimary: {
      color: '#F08180',
      '&.MuiChip-filled': {
        backgroundColor: '#FFF0F0',
        border: '1px solid #FFE0E0',
      },
    },
    colorSecondary: {
      color: '#5BBCB4',
      '&.MuiChip-filled': {
        backgroundColor: 'rgba(91,188,180,0.1)',
      },
    },
  },
},
```

- [ ] **Step 3: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 4: Commit**

```bash
git add libs/ui/src/lib/theme/components.ts
git commit -m "feat(ui): add MuiCard/Avatar/Chip overrides, update input border to 3px coral"
```

---

## Task 4: Form — FormTextField always-shrink label

**Files:**

- Modify: `libs/ui/src/lib/form/FormTextField/FormTextField.tsx`

- [ ] **Step 1: Cập nhật FormTextField**

Thay toàn bộ nội dung file:

```tsx
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export interface FormTextFieldProps<
  TFieldValues extends FieldValues,
> extends Omit<TextFieldProps, 'name'> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
}

export function FormTextField<TFieldValues extends FieldValues>({
  name,
  control,
  ...rest
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          InputLabelProps={{ shrink: true, ...rest.InputLabelProps }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? rest.helperText}
        />
      )}
    />
  );
}
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/form/FormTextField/FormTextField.tsx
git commit -m "feat(ui): FormTextField — label always shrunk (above-field style)"
```

---

## Task 5: Stories — Button

**Files:**

- Create: `libs/ui/src/lib/components/Button/Button.stories.tsx`

- [ ] **Step 1: Tạo directory và file stories**

```bash
mkdir -p libs/ui/src/lib/components/Button
```

Tạo `libs/ui/src/lib/components/Button/Button.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    size: 'medium',
    variant: 'contained',
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: { variant: 'contained', color: 'primary' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', color: 'primary' },
};

export const Text: Story = {
  args: { variant: 'text', color: 'primary' },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained" size="small">
        Small — 36px
      </Button>
      <Button variant="contained" size="medium">
        Medium — 44px
      </Button>
      <Button variant="contained" size="large">
        Large — 52px
      </Button>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained" color="secondary">
        Contained Secondary
      </Button>
      <Button variant="outlined" color="secondary">
        Outlined Secondary
      </Button>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained" disabled>
        Contained Disabled
      </Button>
      <Button variant="outlined" disabled>
        Outlined Disabled
      </Button>
      <Button variant="text" disabled>
        Text Disabled
      </Button>
    </Stack>
  ),
};
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/components/Button/Button.stories.tsx
git commit -m "feat(ui): add Button Storybook stories"
```

---

## Task 6: Stories — Card

**Files:**

- Create: `libs/ui/src/lib/components/Card/Card.stories.tsx`

- [ ] **Step 1: Tạo directory và file stories**

```bash
mkdir -p libs/ui/src/lib/components/Card
```

Tạo `libs/ui/src/lib/components/Card/Card.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card sx={{ maxWidth: 360 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Card content goes here. This card uses the PawSpa-inspired design with
          offset shadow and coral border.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderAndActions: Story = {
  render: () => (
    <Card sx={{ maxWidth: 360 }}>
      <CardHeader title="Card Title" subheader="Card subtitle" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Card with header and action buttons at the bottom.
        </Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: 'column', gap: 1, p: 2, pt: 0 }}>
        <Button variant="contained" size="medium">
          Primary Action
        </Button>
        <Button variant="outlined" size="medium">
          Secondary Action
        </Button>
      </CardActions>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card sx={{ maxWidth: 360 }}>
      <CardMedia
        component="img"
        height="180"
        image="https://picsum.photos/seed/meli/360/180"
        alt="Card image"
        sx={{ borderRadius: 0 }}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Card with Image
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Card content with media at the top.
        </Typography>
      </CardContent>
    </Card>
  ),
};
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/components/Card/Card.stories.tsx
git commit -m "feat(ui): add Card Storybook stories"
```

---

## Task 7: Stories — Chip

**Files:**

- Create: `libs/ui/src/lib/components/Chip/Chip.stories.tsx`

- [ ] **Step 1: Tạo directory và file stories**

```bash
mkdir -p libs/ui/src/lib/components/Chip
```

Tạo `libs/ui/src/lib/components/Chip/Chip.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { FavoriteRounded, LocalOfferRounded } from '@mui/icons-material';
import { fn } from 'storybook/test';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    label: 'Chip',
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Colors: Story = {
  render: () => (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Warning" color="warning" />
      <Chip label="Error" color="error" />
      <Chip label="Default" />
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap={1}>
      <Chip label="Filled" color="primary" variant="filled" />
      <Chip label="Outlined" color="primary" variant="outlined" />
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Stack direction="row" gap={1}>
      <Chip label="Yêu thích" color="primary" icon={<FavoriteRounded />} />
      <Chip label="Thẻ tag" color="secondary" icon={<LocalOfferRounded />} />
    </Stack>
  ),
};

export const WithDelete: Story = {
  render: () => (
    <Stack direction="row" gap={1}>
      <Chip label="Primary" color="primary" onDelete={fn()} />
      <Chip label="Secondary" color="secondary" onDelete={fn()} />
      <Chip label="Default" onDelete={fn()} />
    </Stack>
  ),
};
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/components/Chip/Chip.stories.tsx
git commit -m "feat(ui): add Chip Storybook stories"
```

---

## Task 8: Stories — Avatar

**Files:**

- Create: `libs/ui/src/lib/components/Avatar/Avatar.stories.tsx`

- [ ] **Step 1: Tạo directory và file stories**

```bash
mkdir -p libs/ui/src/lib/components/Avatar
```

Tạo `libs/ui/src/lib/components/Avatar/Avatar.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>SM</Avatar>
      <Avatar sx={{ width: 40, height: 40, fontSize: '0.875rem' }}>MD</Avatar>
      <Avatar sx={{ width: 56, height: 56 }}>LG</Avatar>
      <Avatar sx={{ width: 72, height: 72, fontSize: '1.25rem' }}>XL</Avatar>
    </Stack>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar
        src="https://i.pravatar.cc/56?img=1"
        alt="Nguyễn Thị A"
        sx={{ width: 56, height: 56 }}
      />
      <Avatar
        src="https://i.pravatar.cc/56?img=5"
        alt="Trần Thị B"
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  ),
};

export const Initials: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar>TN</Avatar>
      <Avatar>AB</Avatar>
      <Avatar>MK</Avatar>
    </Stack>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 56, height: 56, border: '2px solid #FFE0E0' }}>
        TN
      </Avatar>
      <Avatar
        src="https://i.pravatar.cc/56?img=3"
        alt="User"
        sx={{ width: 56, height: 56, border: '3px solid #F08180' }}
      />
    </Stack>
  ),
};
```

- [ ] **Step 2: Typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có lỗi.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/components/Avatar/Avatar.stories.tsx
git commit -m "feat(ui): add Avatar Storybook stories"
```

---

## Task 9: Verify — Storybook visual check

- [ ] **Step 1: Khởi động Storybook**

```bash
pnpm nx storybook @meli/ui --port 4400
```

Mở `http://localhost:4400` trên browser.

- [ ] **Step 2: Kiểm tra từng component**

Vào từng story và verify:

| Component       | Story                | Kiểm tra                                                        |
| --------------- | -------------------- | --------------------------------------------------------------- |
| Button          | Contained            | Radius 16px, border mỏng đen, offset shadow coral góc phải-dưới |
| Button          | Outlined             | Border 3px coral, không có shadow                               |
| Button          | Sizes                | Height 36/44/52px                                               |
| Button          | Disabled             | Opacity giảm, không có shadow                                   |
| Card            | Basic                | Radius 20px, border 3px coral nhạt, offset shadow               |
| Card            | WithHeaderAndActions | Buttons full-width trong CardActions                            |
| Chip            | Colors               | Pill shape, primary = coral.50 bg + coral text                  |
| Chip            | Variants             | Filled vs Outlined                                              |
| Avatar          | Sizes                | Initials trên nền coral.100 (#FFE0E0)                           |
| Avatar          | Bordered             | Border hiển thị đúng                                            |
| Form / DemoForm | Default              | Label nằm trên input (không floating), border 3px coral nhạt    |
| BottomNav       | Default              | Không thay đổi (đã có stories)                                  |

- [ ] **Step 3: Nếu có visual bug**

Ưu tiên check theo thứ tự:

1. `components.ts` — xem lại styleOverride có đúng selector không
2. CSS specificity — nếu override không được áp dụng, thêm `'&&'` để tăng specificity: `'&& .MuiOutlinedInput-notchedOutline'`
3. `shape.xl` — verify `shape.xl` được export và import đúng trong `index.ts`
