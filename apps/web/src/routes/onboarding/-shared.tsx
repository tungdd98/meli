import type { ReactNode } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { shape } from '@meli/ui';

export function OnboardingProgress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <Stack direction="row" gap="6px" justifyContent="center">
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={{
            bgcolor: item === step ? 'primary.main' : 'coral.100',
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
            border: 1,
            borderColor: 'divider',
            borderRadius: shape.full,
            color: 'primary.main',
            height: 40,
            minHeight: 40,
            width: 40,
          }}
        >
          {backIcon}
        </IconButton>
      ) : (
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: shape.full,
            height: 40,
            width: 40,
          }}
        />
      )}
      <Box sx={{ justifySelf: 'end' }}>
        <OnboardingProgress step={step} />
      </Box>
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
    <Stack alignItems="center" gap="14px" sx={{ height: 206 }}>
      <Box
        sx={{
          alignItems: 'center',
          bgcolor: 'background.paper',
          border: 3,
          borderColor: 'coral.100',
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
      <Stack alignItems="center" gap="4px" sx={{ width: '100%' }}>
        <Typography
          component="h1"
          textAlign="center"
          sx={{ fontSize: 24, fontWeight: 700, lineHeight: '32px' }}
        >
          {title}
        </Typography>
        <Typography
          color="text.secondary"
          textAlign="center"
          sx={{
            fontSize: 14,
            lineHeight: '19px',
            maxWidth: 300,
          }}
        >
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
  border: 3,
  borderColor: 'coral.100',
  borderStyle: 'solid',
  borderRadius: shape.xl,
  p: 2,
};

export const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: shape.lg,
    height: 56,
  },
  '& .MuiInputBase-input': {
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '20px',
    py: 0,
  },
  '& .MuiInputAdornment-root': {
    color: 'text.primary',
    '& .MuiSvgIcon-root': {
      fontSize: 22,
    },
  },
};

export const stepPageSx = {
  height: 844,
  maxHeight: '100dvh',
  p: '32px 24px 24px',
  width: '100%',
};

export function FieldBlock({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <Stack gap="8px">
      <Typography
        color="text.primary"
        sx={{ fontSize: 13, fontWeight: 700, lineHeight: '18px' }}
      >
        {label}
      </Typography>
      {children}
    </Stack>
  );
}

export function FooterActions({
  disabled,
  onSkip,
  skipLabel,
  submitLabel = 'Tiếp tục',
  type = 'button',
  onSubmit,
}: {
  disabled?: boolean;
  onSkip: () => void;
  onSubmit?: () => void;
  skipLabel: string;
  submitLabel?: string;
  type?: 'button' | 'submit';
}) {
  return (
    <Stack gap="10px">
      <Button
        type={type}
        variant="contained"
        disabled={disabled}
        onClick={onSubmit}
        sx={{
          borderRadius: shape.lg,
          fontSize: 15,
          fontWeight: 700,
          height: 52,
        }}
      >
        {submitLabel}
      </Button>
      <Button
        type="button"
        variant="text"
        onClick={onSkip}
        sx={{
          fontSize: 14,
          fontWeight: 500,
          height: 52,
        }}
      >
        {skipLabel}
      </Button>
    </Stack>
  );
}

export function InlineLinkRow({
  action,
  label,
  onClick,
}: {
  action: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ height: 18 }}
    >
      <Typography
        color="text.secondary"
        sx={{ fontSize: 12, lineHeight: '18px' }}
      >
        {label}
      </Typography>
      <Button
        variant="text"
        onClick={onClick}
        sx={{
          fontSize: 12,
          fontWeight: 600,
          lineHeight: '18px',
          minWidth: 0,
          p: 0,
        }}
      >
        {action}
      </Button>
    </Stack>
  );
}
