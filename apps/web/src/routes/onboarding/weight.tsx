import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChevronLeftRounded,
  HeightRounded,
  MonitorWeightRounded,
  ScaleRounded,
} from '@mui/icons-material';
import { profilesApi } from '@meli/api';
import { calcBmi, calcPregnancyWeek, calcWeightGainTip } from '@meli/utils';
import { useAuthStore } from '../../stores/auth.store';
import {
  BackButtonIcon,
  FieldBlock,
  fieldSx,
  FooterActions,
  outlinedCardSx,
  stepPageSx,
  WizardHero,
  WizardTopBar,
} from './-shared';

const weightSchema = z.object({
  weight_kg: z.coerce
    .number()
    .min(20, 'Tối thiểu 20 kg')
    .max(300, 'Tối đa 300 kg'),
  height_cm: z.coerce
    .number()
    .min(50, 'Tối thiểu 50 cm')
    .max(300, 'Tối đa 300 cm'),
});

type WeightFormInput = z.input<typeof weightSchema>;
type WeightFormValues = z.output<typeof weightSchema>;

export const Route = createFileRoute('/onboarding/weight')({
  component: WeightPage,
});

function WeightPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  const {
    formState: { errors, isSubmitting, isValid },
    handleSubmit,
    register,
    watch,
  } = useForm<WeightFormInput, unknown, WeightFormValues>({
    resolver: zodResolver(weightSchema),
    mode: 'onChange',
  });

  const [weightKg, heightCm] = watch(['weight_kg', 'height_cm']);
  const numericWeight = Number(weightKg);
  const numericHeight = Number(heightCm);
  const bmi =
    isValid && numericWeight && numericHeight
      ? calcBmi(numericWeight, numericHeight)
      : null;
  const weekNumber = calcPregnancyWeek(profile?.due_date ?? null);
  const weightTip = bmi !== null ? calcWeightGainTip(bmi, weekNumber) : null;

  const onSubmit = async (values: WeightFormValues) => {
    if (!user) return;

    await profilesApi.update(user.id, {
      height_cm: values.height_cm,
      weight_kg: values.weight_kg,
    });
    if (profile) {
      useAuthStore.getState()._setProfile({
        ...profile,
        height_cm: values.height_cm,
        weight_kg: values.weight_kg,
      });
    }
    navigate({ to: '/onboarding/baby' });
  };

  return (
    <Stack
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={stepPageSx}
      gap="20px"
    >
      <WizardTopBar
        step={2}
        onBack={() => navigate({ to: '/onboarding/due-date' })}
        backIcon={
          <BackButtonIcon>
            <ChevronLeftRounded />
          </BackButtonIcon>
        }
      />
      <WizardHero
        icon={<MonitorWeightRounded />}
        title="Cân nặng của mẹ"
        description="Nhập chiều cao và cân nặng để Meli gợi ý mức tăng cân phù hợp."
      />

      <Stack gap="14px" sx={{ height: 312 }}>
        <FieldBlock label="Cân nặng hiện tại">
          <TextField
            {...register('weight_kg')}
            type="number"
            placeholder="58.5"
            error={!!errors.weight_kg}
            helperText={errors.weight_kg?.message}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <ScaleRounded />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            }}
          />
        </FieldBlock>
        <FieldBlock label="Chiều cao">
          <TextField
            {...register('height_cm')}
            type="number"
            placeholder="162"
            error={!!errors.height_cm}
            helperText={errors.height_cm?.message}
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <HeightRounded />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            }}
          />
        </FieldBlock>

        {bmi !== null && weightTip && (
          <Stack sx={{ ...outlinedCardSx, height: 120 }} gap="10px">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography
                color="text.secondary"
                sx={{ fontSize: 13, lineHeight: '18px' }}
              >
                BMI của bạn
              </Typography>
              <Typography
                color="text.primary"
                sx={{ fontSize: 28, fontWeight: 700, lineHeight: '32px' }}
              >
                {bmi.toFixed(1)}
              </Typography>
            </Stack>
            <Typography
              color="text.secondary"
              sx={{ fontSize: 13, lineHeight: '18px' }}
            >
              {weightTip}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Box sx={{ height: 36 }} />

      <FooterActions
        type="submit"
        disabled={!isValid || isSubmitting}
        skipLabel="Để sau"
        onSkip={() => navigate({ to: '/onboarding/baby' })}
      />
    </Stack>
  );
}
