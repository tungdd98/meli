# Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a MUI v6 theme-based design system for Meli pregnancy tracking app in `@meli/ui`, with custom tokens, component overrides, and a custom BottomNav component.

**Architecture:** MUI `createTheme()` override approach. Token files (palette, typography, shadows, shape) are composed into a single theme export. Component style overrides live in a dedicated file. One custom component (BottomNav) wraps MUI primitives. The app imports theme from `@meli/ui` instead of its local `styles/theme.ts`.

**Tech Stack:** MUI v6, React 19, TypeScript, Plus Jakarta Sans (self-hosted via @fontsource), MUI X DatePicker, dayjs

---

## File Map

| Action | File                                                 | Responsibility                                                                                      |
| ------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Create | `libs/ui/src/lib/theme/palette.ts`                   | Color tokens (primary, secondary, background, text, status, custom surfaces)                        |
| Create | `libs/ui/src/lib/theme/typography.ts`                | Typography config with Plus Jakarta Sans                                                            |
| Create | `libs/ui/src/lib/theme/shadows.ts`                   | 3-level shadow system, rest set to `'none'`                                                         |
| Create | `libs/ui/src/lib/theme/shape.ts`                     | Border radius tokens + TypeScript module augmentation                                               |
| Create | `libs/ui/src/lib/theme/components.ts`                | MUI component style overrides (Button, TextField, Select, Checkbox, Radio, Dialog, Snackbar, Alert) |
| Create | `libs/ui/src/lib/theme/index.ts`                     | `createTheme()` composition, single theme export                                                    |
| Create | `libs/ui/src/lib/components/BottomNav/BottomNav.tsx` | Custom mobile bottom navigation component                                                           |
| Create | `libs/ui/src/lib/components/BottomNav/index.ts`      | Barrel export                                                                                       |
| Modify | `libs/ui/src/lib/ui.ts`                              | Re-export theme and components                                                                      |
| Modify | `apps/web/src/app/providers.tsx:6`                   | Import theme from `@meli/ui` instead of local `../styles/theme`                                     |
| Delete | `apps/web/src/styles/theme.ts`                       | Old default theme (replaced by `@meli/ui`)                                                          |

---

### Task 1: Install Dependencies

**Files:**

- Modify: `package.json` (root)

- [ ] **Step 1: Install font and date picker packages**

```bash
pnpm add --save-exact @fontsource/plus-jakarta-sans @mui/x-date-pickers dayjs
```

- [ ] **Step 2: Verify installation**

```bash
grep -E "@fontsource/plus-jakarta-sans|@mui/x-date-pickers|dayjs" package.json
```

Expected: all three packages listed with exact versions (no `^` or `~`).

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore(ui): add Plus Jakarta Sans font, MUI X DatePicker, and dayjs"
```

---

### Task 2: Color Palette Tokens

**Files:**

- Create: `libs/ui/src/lib/theme/palette.ts`

- [ ] **Step 1: Create palette.ts**

```typescript
import type { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    coral: {
      50: string;
      100: string;
    };
  }
  interface PaletteOptions {
    coral?: {
      50: string;
      100: string;
    };
  }
}

export const palette: ThemeOptions['palette'] = {
  primary: {
    main: '#F08180',
    light: '#F7ADAC',
    dark: '#D45E5D',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#5BBCB4',
    light: '#8DD4CE',
    dark: '#3D9B93',
  },
  background: {
    default: '#FFF5F5',
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1A1A2E',
    secondary: '#6B7280',
    disabled: '#B0B0B0',
  },
  success: { main: '#10B981' },
  warning: { main: '#F59E0B' },
  error: { main: '#EF4444' },
  info: { main: '#3B82F6' },
  coral: {
    50: '#FFF0F0',
    100: '#FFE0E0',
  },
};
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/palette.ts
git commit -m "feat(ui): add color palette tokens"
```

---

### Task 3: Typography Tokens

**Files:**

- Create: `libs/ui/src/lib/theme/typography.ts`

- [ ] **Step 1: Create typography.ts**

```typescript
import type { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
  fontFamily: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
  h1: { fontSize: '1.75rem', fontWeight: 700, lineHeight: 1.3 },
  h2: { fontSize: '1.5rem', fontWeight: 700, lineHeight: 1.3 },
  h3: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
  h4: { fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.4 },
  body1: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
  body2: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
  caption: { fontSize: '0.75rem', fontWeight: 400, lineHeight: 1.4 },
  button: {
    fontSize: '0.875rem',
    fontWeight: 600,
    lineHeight: 1.75,
    textTransform: 'none',
  },
};
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/typography.ts
git commit -m "feat(ui): add typography tokens with Plus Jakarta Sans"
```

---

### Task 4: Shadow Tokens

**Files:**

- Create: `libs/ui/src/lib/theme/shadows.ts`

- [ ] **Step 1: Create shadows.ts**

MUI expects `shadows` to be a tuple of exactly 25 strings (index 0–24).

```typescript
import type { Shadows } from '@mui/material/styles';

export const shadows: Shadows = [
  'none',
  '0 1px 3px rgba(0,0,0,0.06)',
  '0 4px 12px rgba(0,0,0,0.08)',
  '0 8px 24px rgba(0,0,0,0.12)',
  ...Array(21).fill('none'),
] as Shadows;
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/shadows.ts
git commit -m "feat(ui): add shadow tokens (3-level system)"
```

---

### Task 5: Shape / Radius Tokens

**Files:**

- Create: `libs/ui/src/lib/theme/shape.ts`

- [ ] **Step 1: Create shape.ts with module augmentation**

```typescript
declare module '@mui/material/styles' {
  interface Shape {
    radiusSm: number;
    radiusLg: number;
    radiusFull: number;
  }
}

export const shape = {
  borderRadius: 12,
  radiusSm: 8,
  radiusLg: 16,
  radiusFull: 9999,
};
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/shape.ts
git commit -m "feat(ui): add shape/radius tokens with custom Shape augmentation"
```

---

### Task 6: Component Overrides

**Files:**

- Create: `libs/ui/src/lib/theme/components.ts`

- [ ] **Step 1: Create components.ts**

```typescript
import type { ThemeOptions } from '@mui/material/styles';
import { shape } from './shape';

export const components: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      fullWidth: true,
    },
    styleOverrides: {
      root: {
        borderRadius: shape.radiusFull,
        textTransform: 'none' as const,
      },
      sizeSmall: { height: 36 },
      sizeMedium: { height: 44 },
      sizeLarge: { height: 52 },
      containedPrimary: {
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        '&:hover': { boxShadow: '0 1px 3px rgba(0,0,0,0.06)' },
      },
    },
  },

  MuiTextField: {
    defaultProps: {
      variant: 'outlined' as const,
      fullWidth: true,
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: shape.borderRadius,
        backgroundColor: '#FFFFFF',
        minHeight: 48,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#E0E0E0',
        },
      },
    },
  },

  MuiSelect: {
    defaultProps: {
      variant: 'outlined' as const,
      fullWidth: true,
    },
  },

  MuiCheckbox: {
    defaultProps: {
      color: 'primary',
    },
  },

  MuiRadio: {
    defaultProps: {
      color: 'primary',
    },
  },

  MuiDialog: {
    defaultProps: {
      fullWidth: true,
      maxWidth: false,
    },
    styleOverrides: {
      paper: {
        borderRadius: shape.radiusLg,
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        padding: 24,
        maxWidth: '90vw',
        margin: 16,
      },
      backdrop: {
        backgroundColor: 'rgba(0,0,0,0.3)',
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.125rem',
        fontWeight: 600,
        padding: 0,
        paddingBottom: 16,
      },
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: 0,
        paddingBottom: 16,
      },
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: 0,
        flexDirection: 'column',
        gap: 8,
        '& > :not(style) ~ :not(style)': {
          marginLeft: 0,
        },
      },
    },
  },

  MuiSnackbar: {
    defaultProps: {
      anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
      autoHideDuration: 4000,
    },
    styleOverrides: {
      root: {
        bottom: '80px !important',
      },
    },
  },

  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      },
      standardSuccess: {
        backgroundColor: '#ecfdf5',
        color: '#065f46',
      },
      standardError: {
        backgroundColor: '#fef2f2',
        color: '#991b1b',
      },
      standardWarning: {
        backgroundColor: '#fffbeb',
        color: '#92400e',
      },
      standardInfo: {
        backgroundColor: '#eff6ff',
        color: '#1e40af',
      },
    },
  },
};
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/components.ts
git commit -m "feat(ui): add MUI component style overrides"
```

---

### Task 7: Theme Composition

**Files:**

- Create: `libs/ui/src/lib/theme/index.ts`

- [ ] **Step 1: Create theme/index.ts**

This file composes all token files into one MUI theme.

```typescript
import { createTheme } from '@mui/material/styles';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import { palette } from './palette';
import { typography } from './typography';
import { shadows } from './shadows';
import { shape } from './shape';
import { components } from './components';

export const theme = createTheme({
  palette,
  typography,
  shadows,
  shape,
  components,
});
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/index.ts
git commit -m "feat(ui): compose theme from token files"
```

---

### Task 8: Custom BottomNav Component

**Files:**

- Create: `libs/ui/src/lib/components/BottomNav/BottomNav.tsx`
- Create: `libs/ui/src/lib/components/BottomNav/index.ts`

- [ ] **Step 1: Create BottomNav.tsx**

```tsx
import { type ReactNode, type SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export interface BottomNavItem {
  label: string;
  icon: ReactNode;
  activeIcon: ReactNode;
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
        borderTopLeftRadius: theme.shape.radiusLg,
        borderTopRightRadius: theme.shape.radiusLg,
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
            <Box sx={{ fontSize: 24, display: 'flex' }}>
              {isActive ? item.activeIcon : item.icon}
            </Box>
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

- [ ] **Step 2: Create barrel export**

Create `libs/ui/src/lib/components/BottomNav/index.ts`:

```typescript
export { BottomNav } from './BottomNav';
export type { BottomNavProps, BottomNavItem } from './BottomNav';
```

- [ ] **Step 3: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add libs/ui/src/lib/components/
git commit -m "feat(ui): add custom BottomNav component"
```

---

### Task 9: Wire Up Public API

**Files:**

- Modify: `libs/ui/src/lib/ui.ts`

- [ ] **Step 1: Update ui.ts to re-export theme and components**

Replace the contents of `libs/ui/src/lib/ui.ts` with:

```typescript
export { theme } from './theme';
export { BottomNav } from './components/BottomNav';
export type { BottomNavProps, BottomNavItem } from './components/BottomNav';
```

- [ ] **Step 2: Verify typecheck passes**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/ui.ts
git commit -m "feat(ui): wire up public API exports for theme and BottomNav"
```

---

### Task 10: Integrate Theme in Web App

**Files:**

- Modify: `apps/web/src/app/providers.tsx:6`
- Delete: `apps/web/src/styles/theme.ts`

- [ ] **Step 1: Update providers.tsx to use @meli/ui theme**

Replace line 6 of `apps/web/src/app/providers.tsx`:

```typescript
// Old:
import theme from '../styles/theme';

// New:
import { theme } from '@meli/ui';
```

- [ ] **Step 2: Delete old theme file**

```bash
rm apps/web/src/styles/theme.ts
```

- [ ] **Step 3: Check if styles directory is empty and clean up**

```bash
ls apps/web/src/styles/
```

If only `theme.ts` was there (now deleted), the directory may be empty. If empty:

```bash
rmdir apps/web/src/styles
```

If other files remain (e.g., `styles.css`), leave the directory.

Note: `styles.css` lives at `apps/web/src/styles.css` (root of src, not in styles/ directory), so the `styles/` directory should be empty after removing `theme.ts`.

- [ ] **Step 4: Verify typecheck passes for web app**

```bash
pnpm nx typecheck web
```

Expected: no errors.

- [ ] **Step 5: Verify dev server starts**

```bash
pnpm nx dev web
```

Expected: app starts without errors. Background should be `#FFF5F5` (light warm pink).

- [ ] **Step 6: Commit**

```bash
git add apps/web/src/app/providers.tsx
git add -u apps/web/src/styles/
git commit -m "feat(web): use design system theme from @meli/ui"
```

---

### Task 11: Final Verification

- [ ] **Step 1: Run full typecheck**

```bash
pnpm nx run-many -t typecheck
```

Expected: all projects pass.

- [ ] **Step 2: Run lint**

```bash
pnpm nx run-many -t lint
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify visually**

```bash
pnpm nx dev web
```

Open in browser and verify:

- Background is warm pink (#FFF5F5)
- Font is Plus Jakarta Sans
- Any existing MUI components pick up the new theme

- [ ] **Step 4: Commit any remaining fixes if needed**
