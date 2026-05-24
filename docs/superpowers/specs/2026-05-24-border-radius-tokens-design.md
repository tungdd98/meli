# Border Radius Token Redesign

**Date:** 2026-05-24  
**Status:** Approved

## Problem

Current `shape.ts` has two issues:

1. **Naming inconsistency** — `borderRadius` (the MUI base key) doubles as the "medium" radius token, while other tokens use the `radius` prefix (`radiusSm`, `radiusLg`, `radiusFull`). The medium tier has no consistent name.

2. **No sx string support** — `sx={{ borderRadius: 'md' }}` is not possible. Components must import the `shape` object directly, creating tight coupling between component code and the theme file.

## Goal

- Enable `sx={{ borderRadius: 'md' }}` alongside existing numeric shorthand `sx={{ borderRadius: 3 }}`
- Consistent, semantic token names (`sm`, `md`, `lg`, `full`)
- No unstable MUI APIs required

## Decision

**Approach:** Store named tokens as string px values directly in `theme.shape`.

MUI's sx system resolves `borderRadius: 'md'` by looking up `theme.shape['md']`. When the resolved value is a string (e.g. `'12px'`), it is passed through to CSS as-is — no multiplier applied. This gives exact pixel control with zero MUI customization.

Numeric shorthand (`sx={{ borderRadius: 3 }}`) remains valid: MUI multiplies the number by `theme.shape.borderRadius` (base unit = 4px).

## Token Structure

```ts
// libs/ui/src/lib/theme/shape.ts

export const shape = {
  borderRadius: 4, // base unit for numeric sx: 2→8px, 3→12px, 4→16px
  sm: '8px',
  md: '12px',
  lg: '16px',
  full: '9999px',
};
```

### TypeScript augmentation

```ts
declare module '@mui/material/styles' {
  interface Shape {
    sm: string;
    md: string;
    lg: string;
    full: string;
  }
}
```

### Token reference

| Token    | Value  | Intended use                  |
| -------- | ------ | ----------------------------- |
| `'sm'`   | 8px    | Small inputs, tags, chips     |
| `'md'`   | 12px   | Cards, default inputs, alerts |
| `'lg'`   | 16px   | Dialogs, bottom sheets        |
| `'full'` | 9999px | Pill buttons, avatars         |

### Numeric sx scale (for reference)

| `sx={{ borderRadius: N }}` | Result    |
| -------------------------- | --------- |
| 1                          | 4px       |
| 2                          | 8px = sm  |
| 3                          | 12px = md |
| 4                          | 16px = lg |

## Migration

All component overrides in `components.ts` and `BottomNav.tsx` are updated to reference new token names. Pixel output is unchanged.

| Old reference                              | New reference | px     |
| ------------------------------------------ | ------------- | ------ |
| `shape.radiusSm`                           | `shape.sm`    | 8px    |
| `shape.borderRadius` (when used as medium) | `shape.md`    | 12px   |
| `shape.radiusLg`                           | `shape.lg`    | 16px   |
| `shape.radiusFull`                         | `shape.full`  | 9999px |

### Impact on unstyled MUI components

Changing `borderRadius` from `12` → `4` affects MUI components without explicit overrides in `components.ts` (e.g. Chip, Paper, Card). These will render at 4px instead of 12px. Currently the project does not use these components; add overrides to `components.ts` if adopted later.

## Convention (CLAUDE.md + AGENTS.md)

```
### Border Radius

Use named tokens in the `sx` prop — do not use numeric shorthand:

  ✅  sx={{ borderRadius: 'md' }}
  ❌  sx={{ borderRadius: 3 }}   // only when no token fits

Numeric shorthand is reserved for one-off values outside the token scale.
```

## Files Changed

| File                                                 | Change                                |
| ---------------------------------------------------- | ------------------------------------- |
| `libs/ui/src/lib/theme/shape.ts`                     | New token structure + TS augmentation |
| `libs/ui/src/lib/theme/components.ts`                | Update 4 token references             |
| `libs/ui/src/lib/components/BottomNav/BottomNav.tsx` | Update 2 token references             |
| `libs/ui/src/lib/theme/Theme.stories.tsx`            | Update ShapeShowcase token names      |
| `CLAUDE.md`                                          | Add border-radius convention          |
| `AGENTS.md`                                          | Add border-radius convention          |
