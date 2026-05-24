import type { Shadows } from '@mui/material/styles';

export const shadows: Shadows = [
  'none',
  '0 1px 3px rgba(0,0,0,0.06)',
  '0 4px 12px rgba(0,0,0,0.08)',
  '0 8px 24px rgba(0,0,0,0.12)',
  ...new Array(21).fill('none'),
] as Shadows;

export const offsetShadows = {
  button: 'rgba(240,129,128,0.25) 4px 4px 0 0',
  card: 'rgba(240,129,128,0.15) 6px 6px 0 0',
  cardFeatured: 'rgba(240,129,128,0.30) 8px 8px 0 0',
};
