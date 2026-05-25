import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import {
  BadgeRounded,
  ChevronLeftRounded,
  ChildCareRounded,
  FavoriteRounded,
} from '@mui/icons-material';
import { shape } from '@meli/ui';
import { profilesApi } from '@meli/api';
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

const babySchema = z.object({
  baby_name: z.string().optional(),
  baby_gender: z.enum(['unknown', 'male', 'female']),
  is_twins: z.boolean(),
});

type BabyFormValues = z.infer<typeof babySchema>;

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
    register,
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
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={stepPageSx}
      gap="20px"
    >
      <WizardTopBar
        step={3}
        onBack={() => navigate({ to: '/onboarding/weight' })}
        backIcon={
          <BackButtonIcon>
            <ChevronLeftRounded />
          </BackButtonIcon>
        }
      />
      <WizardHero
        icon={<ChildCareRounded />}
        title="Thông tin của bé"
        description="Một vài chi tiết nhỏ giúp thông tin Meli gửi đến phù hợp với gia đình bạn."
      />

      <Stack gap="14px" sx={{ height: 252 }}>
        <FieldBlock label="Tên của bé">
          <TextField
            {...register('baby_name')}
            placeholder="Meli"
            sx={fieldSx}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeRounded />
                </InputAdornment>
              ),
            }}
          />
        </FieldBlock>

        <FieldBlock label="Giới tính">
          <Controller
            name="baby_gender"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                displayEmpty
                sx={{
                  borderRadius: shape.lg,
                  height: 56,
                  fontSize: 14,
                  fontWeight: 500,
                  '& .MuiSelect-select': {
                    alignItems: 'center',
                    display: 'flex',
                  },
                }}
              >
                <MenuItem value="unknown">Chưa biết</MenuItem>
                <MenuItem value="male">Bé trai</MenuItem>
                <MenuItem value="female">Bé gái</MenuItem>
              </Select>
            )}
          />
        </FieldBlock>

        <Controller
          name="is_twins"
          control={control}
          render={({ field }) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ ...outlinedCardSx, height: 60, py: 0 }}
            >
              <Stack direction="row" alignItems="center" gap={1.5}>
                <FavoriteRounded color="primary" sx={{ fontSize: 22 }} />
                <Typography
                  color="text.primary"
                  sx={{ fontSize: 14, fontWeight: 700, lineHeight: '20px' }}
                >
                  Mang thai đôi
                </Typography>
              </Stack>
              <Switch
                checked={field.value}
                onChange={(_, checked) => field.onChange(checked)}
                sx={{
                  height: 28,
                  p: 0,
                  width: 46,
                  '& .MuiSwitch-switchBase': {
                    p: '3px',
                    transitionDuration: '180ms',
                    '&.Mui-checked': {
                      color: 'background.paper',
                      transform: 'translateX(18px)',
                      '& + .MuiSwitch-track': {
                        bgcolor: 'primary.main',
                        opacity: 1,
                      },
                    },
                  },
                  '& .MuiSwitch-thumb': {
                    height: 22,
                    width: 22,
                  },
                  '& .MuiSwitch-track': {
                    bgcolor: '#F08180',
                    borderRadius: shape.full,
                    opacity: 1,
                  },
                }}
              />
            </Stack>
          )}
        />
      </Stack>

      <Box sx={{ height: 96 }} />

      <FooterActions
        type="submit"
        disabled={isSubmitting}
        skipLabel="Để sau"
        onSkip={handleSkip}
      />
    </Stack>
  );
}
