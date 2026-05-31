import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs, { type Dayjs } from 'dayjs';
import {
  Alert,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {
  ChevronLeftRounded,
  HeightRounded,
  PersonRounded,
  PhotoCameraRounded,
  ScaleRounded,
} from '@mui/icons-material';
import { FormDatePicker, FormTextField, shape } from '@meli/ui';
import { profilesApi } from '@meli/api';
import { numericString } from '@meli/utils';
import { useState } from 'react';
import { useAuthStore } from '../../../stores/auth.store';
import { AppBottomNav } from '../../../components/AppBottomNav';

const profileSchema = z.object({
  display_name: z.string().trim().optional(),
  birth_date: z
    .custom<Dayjs | null>(
      (value) => dayjs.isDayjs(value) && value.isValid(),
      'Vui lòng nhập ngày sinh',
    )
    .refine((value) => value != null && !value.isAfter(dayjs(), 'day'), {
      message: 'Ngày sinh không được ở tương lai',
    }),
  weight_kg: numericString(20, 300, 'Tối thiểu 20 kg', 'Tối đa 300 kg'),
  height_cm: numericString(50, 300, 'Tối thiểu 50 cm', 'Tối đa 300 cm'),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const Route = createFileRoute('/_auth/settings/profile')({
  component: ProfilePage,
});

function ProfilePage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    formState: { isSubmitting, isValid },
    handleSubmit,
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      display_name: profile?.display_name ?? '',
      birth_date: profile?.birth_date ? dayjs(profile.birth_date) : null,
      weight_kg: profile?.weight_kg ? String(profile.weight_kg) : '',
      height_cm: profile?.height_cm ? String(profile.height_cm) : '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user || !values.birth_date) return;
    setError(null);

    const update = {
      display_name: values.display_name?.trim() || null,
      birth_date: values.birth_date.format('YYYY-MM-DD'),
      weight_kg: Number(values.weight_kg),
      height_cm: Number(values.height_cm),
    };

    const { error: updateError } = await profilesApi.update(user.id, update);
    if (updateError) {
      setError('Lưu thất bại. Vui lòng thử lại.');
      return;
    }

    if (profile) {
      useAuthStore.getState()._setProfile({ ...profile, ...update });
    }
    reset(values);
    setSaved(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100dvh',
          bgcolor: 'background.default',
        }}
      >
        <Box sx={{ bgcolor: 'primary.main', px: 2, py: 1.5 }}>
          <IconButton
            aria-label="Quay lại"
            onClick={() => navigate({ to: '/settings' })}
            sx={{ color: 'primary.contrastText' }}
          >
            <ChevronLeftRounded />
          </IconButton>
        </Box>

        <Stack
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          gap={3}
          sx={{ flex: 1, p: 2, pb: 10 }}
        >
          <Box sx={{ alignSelf: 'center', position: 'relative' }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: shape.full,
                bgcolor: 'coral.100',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.disabled',
              }}
            >
              <PersonRounded sx={{ fontSize: 56 }} />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                right: 4,
                bottom: 4,
                width: 32,
                height: 32,
                borderRadius: shape.full,
                bgcolor: 'background.paper',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'text.disabled',
              }}
            >
              <PhotoCameraRounded fontSize="small" />
            </Box>
          </Box>

          <FormTextField<ProfileFormValues>
            name="display_name"
            control={control}
            label="Tên bạn"
            placeholder="Nhập tên của bạn"
          />

          <FormDatePicker<ProfileFormValues>
            name="birth_date"
            control={control}
            label="Ngày sinh của bạn"
          />

          <FormTextField<ProfileFormValues>
            name="weight_kg"
            control={control}
            label="Cân nặng của bạn"
            type="number"
            placeholder="42"
            slotProps={{
              htmlInput: { step: '0.1', inputMode: 'decimal' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <ScaleRounded />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">kg</InputAdornment>
                ),
              },
            }}
          />

          <FormTextField<ProfileFormValues>
            name="height_cm"
            control={control}
            label="Chiều cao của bạn"
            type="number"
            placeholder="150"
            slotProps={{
              htmlInput: { step: '0.1', inputMode: 'decimal' },
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HeightRounded />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              },
            }}
          />

          <Stack gap={0.5}>
            <Typography variant="caption" color="textSecondary">
              Email
            </Typography>
            <Typography variant="body1">{user?.email ?? '—'}</Typography>
          </Stack>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={!isValid || isSubmitting}
          >
            Lưu
          </Button>
        </Stack>

        <AppBottomNav value={3} />
      </Box>

      <Snackbar
        open={saved}
        autoHideDuration={3000}
        onClose={() => setSaved(false)}
        message="Đã lưu thông tin"
      />
    </LocalizationProvider>
  );
}
