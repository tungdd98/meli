import { type ReactNode } from 'react';
import { ButtonBase, Stack, Typography, useTheme } from '@mui/material';
import { ChevronRightRounded } from '@mui/icons-material';
import { shape } from '../../theme/shape';

export interface SettingsRowProps {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  /** Ẩn chevron phải (vd hàng hành động như Đăng xuất). */
  hideChevron?: boolean;
  /** Tô màu nhấn cho label (vd Đăng xuất). */
  color?: 'default' | 'primary';
}

export function SettingsRow({
  label,
  icon,
  onClick,
  hideChevron = false,
  color = 'default',
}: SettingsRowProps) {
  const theme = useTheme();

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        borderRadius: shape.md,
        boxShadow: theme.shadows[1],
        px: 2,
        py: 2,
        justifyContent: 'flex-start',
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        gap={1.5}
        sx={{ width: '100%' }}
      >
        {icon && (
          <Stack
            sx={{
              color:
                color === 'primary'
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
            }}
          >
            {icon}
          </Stack>
        )}
        <Typography
          variant="body1"
          sx={{
            flex: 1,
            textAlign: 'left',
            color:
              color === 'primary'
                ? theme.palette.primary.main
                : theme.palette.text.primary,
          }}
        >
          {label}
        </Typography>
        {!hideChevron && (
          <ChevronRightRounded sx={{ color: theme.palette.text.disabled }} />
        )}
      </Stack>
    </ButtonBase>
  );
}
