import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
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
  fieldAdornmentSx,
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
        description="Meli dùng BMI để gợi ý khoảng tăng cân phù hợp trong thai kỳ."
      />

      <Stack gap={2}>
        <TextField
          {...register('weight_kg')}
          label="Cân nặng hiện tại"
          type="number"
          error={!!errors.weight_kg}
          helperText={errors.weight_kg?.message}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={fieldAdornmentSx}>
                <ScaleRounded />
              </InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
        <TextField
          {...register('height_cm')}
          label="Chiều cao"
          type="number"
          error={!!errors.height_cm}
          helperText={errors.height_cm?.message}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={fieldAdornmentSx}>
                <HeightRounded />
              </InputAdornment>
            ),
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />

        {bmi !== null && weightTip && (
          <Stack sx={outlinedCardSx} gap={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body2" color="text.secondary">
                BMI của bạn
              </Typography>
              <Typography variant="h2" color="text.primary">
                {bmi.toFixed(1)}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary">
              {weightTip}
            </Typography>
          </Stack>
        )}
      </Stack>

      <Box sx={{ flex: 1 }} />

      <Stack gap={1.5}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!isValid || isSubmitting}
        >
          Tiếp tục
        </Button>
        <Button
          variant="text"
          size="large"
          onClick={() => navigate({ to: '/onboarding/baby' })}
        >
          Để sau
        </Button>
      </Stack>
    </Stack>
  );
}
