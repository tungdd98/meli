import type { Shadows } from '@mui/material/styles';

export const shadows: Shadows = [
  'none',
  '0 1px 3px rgba(0,0,0,0.06)',
  '0 4px 12px rgba(0,0,0,0.08)',
  '0 8px 24px rgba(0,0,0,0.12)',
  ...Array(21).fill('none'),
] as Shadows;
