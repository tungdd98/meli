import type { ReactNode } from 'react';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { shape } from '@meli/ui';
import { ChevronLeftRounded } from '@mui/icons-material';

export function OnboardingProgress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <Stack direction="row" gap={1} justifyContent="center">
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
  onBack,
  step,
}: {
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
            border: 2,
            borderColor: 'primary.light',
            borderRadius: shape.full,
            height: 40,
            minHeight: 40,
            width: 40,
          }}
        >
          <ChevronLeftRounded />
        </IconButton>
      ) : (
        <Box />
      )}
      <Box sx={{ justifySelf: 'end' }}>
        <OnboardingProgress step={step} />
      </Box>
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
          boxShadow: (theme) => theme.shadows[2],
        }}
      >
        {icon}
      </Box>
      <Stack alignItems="center" gap={1} sx={{ width: '100%' }}>
        <Typography variant="h1" textAlign="center">
          {title}
        </Typography>
        <Typography color="text.secondary" textAlign="center" variant="body2">
          {description}
        </Typography>
      </Stack>
    </Stack>
  );
}

export function FieldBlock({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <Stack gap={1}>
      <Typography variant="caption">{label}</Typography>
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
    <Stack gap={2}>
      <Button
        type={type}
        variant="contained"
        disabled={disabled}
        onClick={onSubmit}
        size="large"
      >
        {submitLabel}
      </Button>
      <Button type="button" variant="text" onClick={onSkip} size="large">
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
      <Typography color="text.secondary" variant="caption">
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
