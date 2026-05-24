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

export const palette = {
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
} satisfies ThemeOptions['palette'];
