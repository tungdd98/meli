import { type ReactNode, type SyntheticEvent } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { shape } from '../../theme/shape';

export interface BottomNavItem {
  label: string;
  icon: ReactNode;
}

export interface BottomNavProps {
  items: BottomNavItem[];
  value: number;
  onChange: (event: SyntheticEvent, newValue: number) => void;
}

export function BottomNav({ items, value, onChange }: BottomNavProps) {
  const theme = useTheme();

  return (
    <Box
      component="nav"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        paddingBottom: 'env(safe-area-inset-bottom)',
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
        borderTopLeftRadius: shape.lg,
        borderTopRightRadius: shape.lg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: theme.zIndex.appBar,
      }}
    >
      {items.map((item, index) => {
        const isActive = index === value;
        return (
          <ButtonBase
            key={item.label}
            onClick={(e) => onChange(e, index)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2px',
              flex: 1,
              py: 1,
              color: isActive
                ? theme.palette.primary.main
                : theme.palette.text.secondary,
              transition: 'color 0.2s',
            }}
          >
            <Box sx={{ fontSize: 24, display: 'flex' }}>{item.icon}</Box>
            <Typography variant="caption" sx={{ fontSize: 10, lineHeight: 1 }}>
              {item.label}
            </Typography>
          </ButtonBase>
        );
      })}
    </Box>
  );
}
