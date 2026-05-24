# Border Radius Token Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace inconsistent `radiusSm/radiusLg/radiusFull` shape tokens with semantic string-px tokens (`sm`, `md`, `lg`, `full`) and document the correct usage convention.

**Architecture:** Store named tokens as string px values in `theme.shape`. Import `shape` and reference tokens directly — `sx={{ borderRadius: shape.md }}` works because `shape.md = '12px'` is a valid CSS string. Note: `sx={{ borderRadius: 'md' }}` does NOT work — MUI's `getValue` returns strings as-is without theme lookup, producing invalid CSS `border-radius: md`. Numeric shorthand (`borderRadius: 3`) remains valid via the base unit (`borderRadius: 4`).

**Tech Stack:** MUI v6, TypeScript module augmentation, Nx monorepo (`pnpm nx typecheck ui`).

---

## File Map

| File                                                 | Change                                                                  |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| `libs/ui/src/lib/theme/shape.ts`                     | New token structure + updated TS augmentation                           |
| `libs/ui/src/lib/theme/components.ts`                | 4 token references: `radiusFull→full`, `borderRadius→md`, `radiusLg→lg` |
| `libs/ui/src/lib/components/BottomNav/BottomNav.tsx` | 2 references: `radiusLg→lg`                                             |
| `libs/ui/src/lib/theme/Theme.stories.tsx`            | ShapeShowcase: new token names, string-aware rendering                  |
| `CLAUDE.md`                                          | Add border-radius convention to Key Conventions                         |
| `AGENTS.md`                                          | Add border-radius convention to Coding Style section                    |

---

### Task 1: Update shape tokens and fix all TypeScript consumers

Changing `shape.ts` breaks TypeScript in `components.ts` and `BottomNav.tsx` immediately. Fix all three files before running typecheck so the codebase stays compilable.

**Files:**

- Modify: `libs/ui/src/lib/theme/shape.ts`
- Modify: `libs/ui/src/lib/theme/components.ts`
- Modify: `libs/ui/src/lib/components/BottomNav/BottomNav.tsx`

- [ ] **Step 1: Rewrite `shape.ts`**

Replace the entire file with:

```ts
declare module '@mui/material/styles' {
  interface Shape {
    sm: string;
    md: string;
    lg: string;
    full: string;
  }
}

export const shape = {
  borderRadius: 4,
  sm: '8px',
  md: '12px',
  lg: '16px',
  full: '9999px',
};
```

- [ ] **Step 2: Update `components.ts` token references**

Four replacements — `shape.radiusFull` → `shape.full`, `shape.borderRadius` → `shape.md` (2 occurrences), `shape.radiusLg` → `shape.lg`:

```ts
import type { ThemeOptions } from '@mui/material/styles';
import { shadows } from './shadows';
import { shape } from './shape';

export const components: ThemeOptions['components'] = {
  MuiButton: {
    defaultProps: {
      disableElevation: true,
      fullWidth: true,
    },
    styleOverrides: {
      root: {
        borderRadius: shape.full,
        textTransform: 'none' as const,
      },
      sizeSmall: { height: 36 },
      sizeMedium: { height: 44 },
      sizeLarge: { height: 52 },
      containedPrimary: {
        boxShadow: shadows[1],
        '&:hover': { boxShadow: shadows[1] },
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
        borderRadius: shape.md,
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
      slotProps: {
        backdrop: {
          sx: { backgroundColor: 'rgba(0,0,0,0.3)' },
        },
      },
    },
    styleOverrides: {
      paper: {
        borderRadius: shape.lg,
        boxShadow: shadows[3],
        padding: 24,
        maxWidth: '90vw',
        margin: 16,
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
        borderRadius: shape.md,
        boxShadow: shadows[2],
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

- [ ] **Step 3: Update `BottomNav.tsx` token references**

Two replacements — `shape.radiusLg` → `shape.lg` at lines 34–35:

```tsx
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        paddingBottom: 'env(safe-area-inset-bottom)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
        borderTopLeftRadius: shape.lg,
        borderTopRightRadius: shape.lg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: theme.zIndex.appBar,
      }}
```

- [ ] **Step 4: Run typecheck**

```bash
pnpm nx typecheck ui
```

Expected: no errors. If errors appear they will name the file and line — fix before continuing.

- [ ] **Step 5: Commit**

```bash
git add libs/ui/src/lib/theme/shape.ts \
        libs/ui/src/lib/theme/components.ts \
        libs/ui/src/lib/components/BottomNav/BottomNav.tsx
git commit -m "refactor(ui): replace radius tokens with semantic string-px values"
```

---

### Task 2: Update ShapeShowcase in Storybook

Tokens are now strings (`'8px'`, `'9999px'`), so the showcase rendering logic needs updating.

**Files:**

- Modify: `libs/ui/src/lib/theme/Theme.stories.tsx`

- [ ] **Step 1: Replace the `ShapeShowcase` function**

Replace the existing `ShapeShowcase` function (lines 100–152) with:

```tsx
function ShapeShowcase() {
  const tokens: { name: string; value: string }[] = [
    { name: 'sm', value: shape.sm },
    { name: 'md', value: shape.md },
    { name: 'lg', value: shape.lg },
    { name: 'full', value: shape.full },
  ];

  const capRadius = (v: string) => {
    const px = parseInt(v, 10);
    return px > 40 ? '40px' : v;
  };

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        gap: 3,
        flexWrap: 'wrap',
        alignItems: 'flex-end',
      }}
    >
      {tokens.map(({ name, value }) => (
        <Box
          key={name}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              borderRadius: capRadius(value),
            }}
          />
          <Typography
            variant="caption"
            sx={{ fontSize: 10, textAlign: 'center' }}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ fontSize: 10, color: 'text.secondary' }}
          >
            {value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
```

- [ ] **Step 2: Run typecheck**

```bash
pnpm nx typecheck ui
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/Theme.stories.tsx
git commit -m "refactor(ui): update ShapeShowcase for string-px border-radius tokens"
```

---

### Task 3: Add border-radius convention to CLAUDE.md and AGENTS.md

**Files:**

- Modify: `CLAUDE.md`
- Modify: `AGENTS.md`

- [ ] **Step 1: Add convention to `CLAUDE.md`**

Append the following bullet after the `**Icons**` bullet in the `## Key Conventions` section:

```markdown
- **Border Radius**: Import `shape` and use named tokens — `shape.sm` (8px), `shape.md` (12px), `shape.lg` (16px), `shape.full` (9999px). Example: `sx={{ borderRadius: shape.md }}`. Do not use bare string shortcuts like `borderRadius: 'md'` (MUI passes strings to CSS as-is — `'md'` is not valid CSS). Do not use numeric shorthand like `borderRadius: 3`.
```

- [ ] **Step 2: Add convention to `AGENTS.md`**

Append the following paragraph after the MUI icons paragraph in the `## Coding Style & Naming Conventions` section:

```markdown
For border radius, import `shape` from the theme and use named tokens: `shape.sm` (8px), `shape.md` (12px), `shape.lg` (16px), `shape.full` (9999px). Use them directly in `sx` props: `sx={{ borderRadius: shape.md }}`. Do not use bare string shortcuts (`borderRadius: 'md'`) — MUI passes strings to CSS as-is and `'md'` is not a valid CSS value. Avoid numeric shorthand (`borderRadius: 3`) unless no token fits.
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md AGENTS.md
git commit -m "docs: add border-radius named-token convention to CLAUDE.md and AGENTS.md"
```
