import type { ThemeOptions } from '@mui/material/styles';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { alpha } from '@mui/material/styles';
import { palette } from './palette';
import { shadows, offsetShadows } from './shadows';
import { shape } from './shape';

export const components: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: {
      '*': {
        scrollbarWidth: 'thin',
        scrollbarColor: `${palette.coral[100]} transparent`,
      },
      '*::-webkit-scrollbar': {
        width: 10,
        height: 10,
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: palette.coral[100],
        borderRadius: shape.full,
        border: '2px solid transparent',
        backgroundClip: 'padding-box',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        backgroundColor: palette.primary.light,
      },
    },
  },

  MuiButton: {
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

  MuiTextField: {
    defaultProps: {
      variant: 'outlined' as const,
      fullWidth: true,
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: shape.lg,
        backgroundColor: palette.background.paper,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.coral[100],
          borderWidth: '3px',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.coral[100],
          borderWidth: '3px',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.primary.main,
          borderWidth: '3px',
        },
      },
    },
  },

  MuiPickersOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: shape.lg,
        backgroundColor: palette.background.paper,
        minHeight: 48,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
        '& .MuiPickersOutlinedInput-notchedOutline': {
          borderColor: palette.coral[100],
          borderWidth: '3px',
        },
        '&:hover .MuiPickersOutlinedInput-notchedOutline': {
          borderColor: palette.coral[100],
          borderWidth: '3px',
        },
        '&.Mui-focused .MuiPickersOutlinedInput-notchedOutline': {
          borderColor: palette.primary.main,
          borderWidth: '3px',
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
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontSize: '1.125rem',
        fontWeight: 600,
      },
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '16px 24px',
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
        alignItems: 'center',
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

  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: shape.xl,
        border: `3px solid ${palette.coral[100]}`,
        boxShadow: offsetShadows.card,
        backgroundColor: palette.background.paper,
      },
    },
  },

  MuiAvatar: {
    styleOverrides: {
      root: {
        backgroundColor: palette.coral[100],
        color: palette.primary.main,
      },
    },
  },

  MuiChip: {
    defaultProps: {
      size: 'small',
    },
    styleOverrides: {
      root: {
        borderRadius: shape.full,
        fontWeight: 600,
        fontSize: '12px',
      },
      colorPrimary: {
        color: palette.primary.main,
        '&.MuiChip-filled': {
          backgroundColor: palette.coral[50],
          border: `1px solid ${palette.coral[100]}`,
        },
      },
      colorSecondary: {
        color: palette.secondary.main,
        '&.MuiChip-filled': {
          backgroundColor: alpha(palette.secondary.main, 0.1),
        },
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: shape.md,
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        borderRadius: 0,
      },
    },
  },
};
