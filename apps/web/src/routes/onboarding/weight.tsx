import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Card,
  CardContent,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material';
import {
  HeightRounded,
  MonitorWeightRounded,
  ScaleRounded,
} from '@mui/icons-material';
import { FormTextField } from '@meli/ui';
import { profilesApi } from '@meli/api';
import { calcBmi, calcPregnancyWeek, calcWeightGainTip } from '@meli/utils';
import { useAuthStore } from '../../stores/auth.store';
import { FooterActions, WizardHero, WizardTopBar } from './-shared';

const numericString = (
  min: number,
  max: number,
  minMessage: string,
  maxMessage: string,
) =>
  z
    .string()
    .min(1, minMessage)
    .refine((value) => Number(value) >= min, minMessage)
    .refine((value) => Number(value) <= max, maxMessage);

const weightSchema = z.object({
  weight_kg: numericString(20, 300, 'Tối thiểu 20 kg', 'Tối đa 300 kg'),
  height_cm: numericString(50, 300, 'Tối thiểu 50 cm', 'Tối đa 300 cm'),
});

type WeightFormValues = z.infer<typeof weightSchema>;

export const Route = createFileRoute('/onboarding/weight')({
  component: WeightPage,
});

function WeightPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    watch,
  } = useForm<WeightFormValues>({
    resolver: zodResolver(weightSchema),
    defaultValues: {
      weight_kg: profile?.weight_kg ? String(profile.weight_kg) : '',
      height_cm: profile?.height_cm ? String(profile.height_cm) : '',
    },
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
  const weightTip = bmi === null ? null : calcWeightGainTip(bmi, weekNumber);

  const onSubmit = async (values: WeightFormValues) => {
    if (!user) return;

    const heightCm = Number(values.height_cm);
    const weightKg = Number(values.weight_kg);

    await profilesApi.update(user.id, {
      height_cm: heightCm,
      weight_kg: weightKg,
    });
    if (profile) {
      useAuthStore.getState()._setProfile({
        ...profile,
        height_cm: heightCm,
        weight_kg: weightKg,
      });
    }
    navigate({ to: '/onboarding/baby' });
  };

  return (
    <Stack
      gap={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <WizardTopBar
        step={2}
        onBack={() => navigate({ to: '/onboarding/due-date' })}
      />
      <WizardHero
        icon={<MonitorWeightRounded />}
        title="Cân nặng của mẹ"
        description="Nhập chiều cao và cân nặng để Meli gợi ý mức tăng cân phù hợp."
      />

      <Stack gap={2} sx={{ flex: 1 }}>
        <FormTextField<WeightFormValues>
          name="weight_kg"
          control={control}
          label="Cân nặng hiện tại"
          type="number"
          placeholder="42"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <ScaleRounded />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            },
          }}
        />
        <FormTextField<WeightFormValues>
          name="height_cm"
          control={control}
          label="Chiều cao"
          type="number"
          placeholder="150"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <HeightRounded />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">cm</InputAdornment>,
            },
          }}
        />

        {bmi !== null && weightTip && (
          <Card>
            <CardContent>
              <Stack gap={2}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="text.secondary" variant="subtitle2">
                    BMI của bạn
                  </Typography>
                  <Typography variant="h2">{bmi.toFixed(1)}</Typography>
                </Stack>
                <Typography color="text.secondary" variant="caption">
                  {weightTip}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Stack>

      <FooterActions
        type="submit"
        disabled={!isValid || isSubmitting}
        skipLabel="Để sau"
        onSkip={() => navigate({ to: '/onboarding/baby' })}
      />
    </Stack>
  );
}
