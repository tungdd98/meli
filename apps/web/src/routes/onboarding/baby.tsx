import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { InputAdornment, Stack } from '@mui/material';
import { BadgeRounded, ChildCareRounded } from '@mui/icons-material';
import { FormSelect, FormSwitch, FormTextField } from '@meli/ui';
import { profilesApi } from '@meli/api';
import { useAuthStore } from '../../stores/auth.store';
import { FooterActions, WizardHero, WizardTopBar } from './-shared';

const babySchema = z.object({
  baby_name: z.string().optional(),
  baby_gender: z.enum(['unknown', 'male', 'female']),
  is_twins: z.boolean(),
});

type BabyFormValues = z.infer<typeof babySchema>;

const genderOptions = [
  { label: 'Chưa biết', value: 'unknown' },
  { label: 'Bé trai', value: 'male' },
  { label: 'Bé gái', value: 'female' },
];

export const Route = createFileRoute('/onboarding/baby')({
  component: BabyPage,
});

function BabyPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<BabyFormValues>({
    defaultValues: { baby_gender: 'unknown', baby_name: '', is_twins: false },
    resolver: zodResolver(babySchema),
  });

  const completeOnboarding = () => {
    const profile = useAuthStore.getState().profile;
    if (profile) {
      useAuthStore.getState()._setProfile({
        ...profile,
        onboarding_completed: true,
      });
    }
    navigate({ to: '/' });
  };

  const onSubmit = async (values: BabyFormValues) => {
    if (!user) return;

    await profilesApi.update(user.id, {
      baby_gender: values.baby_gender,
      baby_name: values.baby_name || null,
      is_twins: values.is_twins,
      onboarding_completed: true,
    });
    completeOnboarding();
  };

  const handleSkip = async () => {
    if (!user) return;

    await profilesApi.update(user.id, { onboarding_completed: true });
    completeOnboarding();
  };

  return (
    <Stack
      gap={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <WizardTopBar
        step={3}
        onBack={() => navigate({ to: '/onboarding/weight' })}
      />
      <WizardHero
        icon={<ChildCareRounded />}
        title="Thông tin của bé"
        description="Một vài chi tiết nhỏ giúp thông tin Meli gửi đến phù hợp với gia đình bạn."
      />

      <Stack gap={2} sx={{ flex: 1 }}>
        <FormTextField
          name="baby_name"
          control={control}
          label="Tên của bé"
          placeholder="Meli"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeRounded />
                </InputAdornment>
              ),
            },
          }}
        />

        <FormSelect
          name="baby_gender"
          control={control}
          label="Giới tính"
          options={genderOptions}
        />

        <FormSwitch name="is_twins" control={control} label="Mang thai đôi" />
      </Stack>

      <FooterActions
        type="submit"
        disabled={isSubmitting}
        skipLabel="Để sau"
        onSkip={handleSkip}
      />
    </Stack>
  );
}
