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
  subtitle1: { fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 },
  subtitle2: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.5 },
};
