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
