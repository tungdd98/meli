import type { ReactNode } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { shape } from '@meli/ui';

const coralBorder = '#F08180';

export function OnboardingProgress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <Stack direction="row" gap="6px" justifyContent="center">
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={{
            bgcolor: item === step ? 'primary.main' : coralBorder,
            borderRadius: shape.full,
            height: 8,
            width: item === step ? 28 : 8,
          }}
        />
      ))}
    </Stack>
  );
}

export function WizardTopBar({
  backIcon,
  onBack,
  step,
}: {
  backIcon?: ReactNode;
  onBack?: () => void;
  step: 1 | 2 | 3;
}) {
  return (
    <Box
      sx={{
        alignItems: 'center',
        display: 'grid',
        gridTemplateColumns: '40px 1fr 40px',
        minHeight: 40,
      }}
    >
      {onBack ? (
        <IconButton
          aria-label="Quay lại"
          onClick={onBack}
          sx={{
            bgcolor: 'background.paper',
            border: `1.5px solid ${coralBorder}`,
            borderRadius: shape.full,
            height: 40,
            width: 40,
          }}
        >
          {backIcon}
        </IconButton>
      ) : (
        <Box />
      )}
      <OnboardingProgress step={step} />
      <Box />
    </Box>
  );
}

export function BackButtonIcon({ children }: { children: ReactNode }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-flex',
        '& .MuiSvgIcon-root': {
          fontSize: 22,
        },
      }}
    >
      {children}
    </Box>
  );
}

export function WizardHero({
  description,
  icon,
  title,
}: {
  description: string;
  icon: ReactNode;
  title: string;
}) {
  return (
    <Stack alignItems="center" gap={2}>
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: 'background.paper',
          border: `1.5px solid ${coralBorder}`,
          borderRadius: shape.full,
          color: 'primary.main',
          display: 'flex',
          height: 108,
          justifyContent: 'center',
          width: 108,
          '& .MuiSvgIcon-root': {
            fontSize: 54,
          },
        }}
      >
        {icon}
      </Box>
      <Stack alignItems="center" gap={1}>
        <Typography component="h1" variant="h3" textAlign="center">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}

export const fieldAdornmentSx = {
  color: 'primary.main',
  '& .MuiSvgIcon-root': {
    fontSize: 22,
  },
};

export const outlinedCardSx = {
  bgcolor: 'background.paper',
  border: `1.5px solid ${coralBorder}`,
  borderRadius: shape.xl,
  p: 2,
};

export const stepPageSx = {
  minHeight: '100vh',
  p: '32px 24px 24px',
};
