# Storybook Setup for @meli/ui — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Storybook to `libs/ui` so developers can browse `BottomNav` component stories and a design-token showcase (palette, typography, shape) without running the full app.

**Architecture:** Use the `@nx/storybook` generator to scaffold `.storybook/main.ts` and `preview.tsx` inside `libs/ui`. Stories live alongside their source files in CSF3 format. A global `ThemeProvider` decorator in `preview.tsx` wraps every story with the custom MUI theme so colors, typography, and shape tokens are always applied.

**Tech Stack:** `@nx/storybook@22.7.3`, `@storybook/react-vite`, Storybook 8, MUI v6, React 19, Vite, pnpm workspaces, Nx 22

---

## File Map

| Action             | Path                                                         | Responsibility                                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------ |
| Install            | `package.json` (root)                                        | Add `@nx/storybook` + storybook packages as devDeps    |
| Generate           | `libs/ui/.storybook/main.ts`                                 | Storybook builder, addons, stories glob                |
| Generate → Replace | `libs/ui/.storybook/preview.tsx`                             | Global ThemeProvider + CssBaseline decorator           |
| Generate           | `libs/ui/tsconfig.storybook.json`                            | TS config for Storybook build                          |
| Create             | `libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx` | BottomNav stories (Default, LastItemActive, ManyItems) |
| Create             | `libs/ui/src/lib/theme/Theme.stories.tsx`                    | Theme showcase (Palette, Typography, Shape)            |
| Modify             | `CLAUDE.md`                                                  | Add `pnpm nx storybook ui` command                     |
| Modify             | `AGENTS.md`                                                  | Add `pnpm exec nx storybook ui` command (English)      |

---

## Task 1: Install @nx/storybook and scaffold config

**Files:**

- Modify: `package.json` (root) — adds `@nx/storybook` + storybook packages
- Create: `libs/ui/.storybook/main.ts`
- Create: `libs/ui/.storybook/preview.tsx` (placeholder — replaced in Task 2)
- Create: `libs/ui/tsconfig.storybook.json`

- [ ] **Step 1: Install @nx/storybook at the same version as the workspace Nx**

Run from the monorepo root:

```bash
pnpm add -D --save-exact @nx/storybook@22.7.3
```

Expected output: `@nx/storybook 22.7.3` added to root `package.json` devDependencies with no version range prefix.

- [ ] **Step 2: Run the Nx Storybook generator**

```bash
pnpm nx g @nx/storybook:configuration ui --uiFramework=@storybook/react-vite --interactionTests=false
```

The generator will prompt to install missing Storybook packages (`storybook`, `@storybook/react-vite`, `@storybook/addon-essentials`, etc.). Answer **yes**. pnpm's `.npmrc` (`save-exact=true`) ensures all installed packages are pinned without `^`.

Expected: New files at `libs/ui/.storybook/main.ts`, `libs/ui/.storybook/preview.tsx`, `libs/ui/tsconfig.storybook.json`.

- [ ] **Step 3: Verify generated files exist and tsconfig is valid**

```bash
ls libs/ui/.storybook/ && cat libs/ui/tsconfig.storybook.json
```

Expected: lists `main.ts` and `preview.tsx`; tsconfig JSON is valid and references `./tsconfig.json`.

- [ ] **Step 4: Update the stories glob in main.ts**

Open `libs/ui/.storybook/main.ts`. Find the `stories` array. Replace whatever value it has with:

```ts
stories: ['../src/**/*.stories.@(ts|tsx)'],
```

This restricts stories to TypeScript only, excluding MDX and JS.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml libs/ui/.storybook/ libs/ui/tsconfig.storybook.json
git commit -m "chore(ui): scaffold Storybook via @nx/storybook generator"
```

---

## Task 2: Replace preview.tsx with MUI ThemeProvider decorator

**Files:**

- Modify: `libs/ui/.storybook/preview.tsx`

- [ ] **Step 1: Replace the entire contents of preview.tsx**

Open `libs/ui/.storybook/preview.tsx` and replace its full contents with:

```tsx
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from '../src/lib/theme';

const withTheme: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

Note: importing `{ theme }` from `'../src/lib/theme'` also triggers the `@fontsource/plus-jakarta-sans` CSS imports inside that file, so the font loads automatically in every story.

- [ ] **Step 2: Verify Storybook starts without errors**

```bash
pnpm nx storybook ui
```

Expected: Dev server starts and browser opens at `http://localhost:4400`. No console errors in the terminal. The sidebar is empty (no stories yet) — that is correct at this stage. Stop the server with `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/.storybook/preview.tsx
git commit -m "feat(ui): configure global MUI ThemeProvider decorator in Storybook"
```

---

## Task 3: Write BottomNav stories

**Files:**

- Create: `libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx`

- [ ] **Step 1: Create BottomNav.stories.tsx**

Create `libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx` with this content:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { BottomNav } from './BottomNav';

const threeItems = [
  { label: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon /> },
  { label: 'Search', icon: <SearchOutlinedIcon />, activeIcon: <SearchIcon /> },
  {
    label: 'Profile',
    icon: <PersonOutlinedIcon />,
    activeIcon: <PersonIcon />,
  },
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
    onChange: () => {},
  },
};

export const LastItemActive: Story = {
  args: {
    items: threeItems,
    value: 2,
    onChange: () => {},
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon /> },
      {
        label: 'Search',
        icon: <SearchOutlinedIcon />,
        activeIcon: <SearchIcon />,
      },
      {
        label: 'Saved',
        icon: <FavoriteBorderIcon />,
        activeIcon: <FavoriteIcon />,
      },
      {
        label: 'Alerts',
        icon: <NotificationsNoneIcon />,
        activeIcon: <NotificationsIcon />,
      },
      {
        label: 'Profile',
        icon: <PersonOutlinedIcon />,
        activeIcon: <PersonIcon />,
      },
    ],
    value: 0,
    onChange: () => {},
  },
};
```

- [ ] **Step 2: Run Storybook and verify the stories render**

```bash
pnpm nx storybook ui
```

Expected at `http://localhost:4400`:

- Sidebar shows `Components > BottomNav` with three stories.
- `Default`: nav bar with 3 items, "Home" highlighted in `primary.main` (#F08180).
- `LastItemActive`: nav bar with 3 items, "Profile" highlighted.
- `ManyItems`: nav bar with 5 items evenly spaced, "Home" highlighted.

Stop server with `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/components/BottomNav/BottomNav.stories.tsx
git commit -m "feat(ui): add BottomNav stories"
```

---

## Task 4: Write Theme showcase stories

**Files:**

- Create: `libs/ui/src/lib/theme/Theme.stories.tsx`

- [ ] **Step 1: Create Theme.stories.tsx**

Create `libs/ui/src/lib/theme/Theme.stories.tsx` with this content:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { shape } from './shape';

function PaletteShowcase() {
  const theme = useTheme();
  const swatches = [
    { name: 'primary.main', color: theme.palette.primary.main },
    { name: 'primary.light', color: theme.palette.primary.light },
    { name: 'primary.dark', color: theme.palette.primary.dark },
    { name: 'secondary.main', color: theme.palette.secondary.main },
    { name: 'secondary.light', color: theme.palette.secondary.light },
    { name: 'secondary.dark', color: theme.palette.secondary.dark },
    { name: 'error.main', color: theme.palette.error.main },
    { name: 'warning.main', color: theme.palette.warning.main },
    { name: 'success.main', color: theme.palette.success.main },
    { name: 'info.main', color: theme.palette.info.main },
    { name: 'text.primary', color: theme.palette.text.primary },
    { name: 'text.secondary', color: theme.palette.text.secondary },
    { name: 'background.default', color: theme.palette.background.default },
    { name: 'background.paper', color: theme.palette.background.paper },
  ];

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, p: 2 }}>
      {swatches.map(({ name, color }) => (
        <Box
          key={name}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.5,
          }}
        >
          <Box
            sx={{
              width: 80,
              height: 80,
              bgcolor: color,
              borderRadius: 1,
              border: '1px solid rgba(0,0,0,0.1)',
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
            {color}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function TypographyShowcase() {
  const variants = [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'body1',
    'body2',
    'caption',
    'button',
    'overline',
  ] as const;

  return (
    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      {variants.map((variant) => (
        <Box
          key={variant}
          sx={{ display: 'flex', alignItems: 'baseline', gap: 2 }}
        >
          <Typography
            variant="caption"
            sx={{ width: 80, color: 'text.secondary', flexShrink: 0 }}
          >
            {variant}
          </Typography>
          <Typography variant={variant}>The quick brown fox jumps</Typography>
        </Box>
      ))}
    </Box>
  );
}

function ShapeShowcase() {
  const tokens = [
    { name: 'radiusSm', value: shape.radiusSm },
    { name: 'borderRadius', value: shape.borderRadius },
    { name: 'radiusLg', value: shape.radiusLg },
    { name: 'radiusFull', value: shape.radiusFull },
  ];

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
              borderRadius: `${Math.min(value, 40)}px`,
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
            {value}px
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

const meta: Meta = {
  title: 'Theme',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => <PaletteShowcase />,
};

export const TypographyVariants: Story = {
  render: () => <TypographyShowcase />,
};

export const Shape: Story = {
  render: () => <ShapeShowcase />,
};
```

Note on `radiusFull` (9999px): `Math.min(value, 40)` caps the CSS border-radius at 40px on an 80×80 box, which renders as a perfect circle — the intended visual.

- [ ] **Step 2: Run Storybook and verify theme stories render**

```bash
pnpm nx storybook ui
```

Expected at `http://localhost:4400`:

- Sidebar shows `Theme` with three stories: `Palette`, `TypographyVariants`, `Shape`.
- `Palette`: 14 color swatches with token name and hex value below each.
- `TypographyVariants`: 11 rows, each showing the variant label and sample text in that style.
- `Shape`: 4 boxes (`radiusSm` = 8px, `borderRadius` = 12px, `radiusLg` = 16px, `radiusFull` = circle).

Stop server with `Ctrl+C`.

- [ ] **Step 3: Commit**

```bash
git add libs/ui/src/lib/theme/Theme.stories.tsx
git commit -m "feat(ui): add Theme stories for palette, typography, and shape"
```

---

## Task 5: Update CLAUDE.md and AGENTS.md

**Files:**

- Modify: `CLAUDE.md`
- Modify: `AGENTS.md`

- [ ] **Step 1: Add Storybook command to CLAUDE.md**

In `CLAUDE.md`, inside the `## Commands` code block, add after the `# Test` lines:

```bash
# Storybook
pnpm nx storybook ui        # xem components tại http://localhost:4400
```

The updated Commands block should end with:

```bash
# Test
pnpm nx test <project>          # run tests for a project
pnpm nx test <project> -- --testNamePattern="pattern"  # single test

# Storybook
pnpm nx storybook ui        # xem components tại http://localhost:4400
```

- [ ] **Step 2: Add Storybook command to AGENTS.md**

In `AGENTS.md`, in the "Build, Test, and Development Commands" section, add after the line:

```
- `pnpm exec nx test @meli/ui` runs Vitest where a test target exists.
```

the following line:

```
- `pnpm exec nx storybook ui` starts the Storybook dev server at
  `http://localhost:4400` for browsing and interacting with `@meli/ui`
  components and design tokens.
```

- [ ] **Step 3: Commit**

```bash
git add CLAUDE.md AGENTS.md
git commit -m "docs: add Storybook command to CLAUDE.md and AGENTS.md"
```
