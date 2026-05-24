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
