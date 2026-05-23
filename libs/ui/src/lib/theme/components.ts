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
        borderRadius: shape.radiusFull,
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
      slotProps: {
        backdrop: {
          sx: { backgroundColor: 'rgba(0,0,0,0.3)' },
        },
      },
    },
    styleOverrides: {
      paper: {
        borderRadius: shape.radiusLg,
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
        borderRadius: shape.borderRadius,
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
