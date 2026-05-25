import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material';
import {
  CalendarMonthRounded,
  ChevronLeftRounded,
  EventAvailableRounded,
  MedicalInformationRounded,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import { profilesApi } from '@meli/api';
import { useAuthStore } from '../../../stores/auth.store';
import {
  BackButtonIcon,
  fieldAdornmentSx,
  outlinedCardSx,
  stepPageSx,
  WizardHero,
  WizardTopBar,
} from '../-shared';

export const Route = createFileRoute('/onboarding/due-date/direct')({
  component: DueDateDirectPage,
});

function DueDateDirectPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleContinue = async () => {
    if (!dueDate || !user) return;

    const dueDateStr = dueDate.format('YYYY-MM-DD');
    setIsSubmitting(true);
    try {
      await profilesApi.update(user.id, { due_date: dueDateStr });
      const profile = useAuthStore.getState().profile;
      if (profile) {
        useAuthStore
          .getState()
          ._setProfile({ ...profile, due_date: dueDateStr });
      }
      navigate({ to: '/onboarding/weight' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack sx={stepPageSx} gap="20px">
      <WizardTopBar
        step={1}
        onBack={() => navigate({ to: '/onboarding/due-date' })}
        backIcon={
          <BackButtonIcon>
            <ChevronLeftRounded />
          </BackButtonIcon>
        }
      />
      <WizardHero
        icon={<EventAvailableRounded />}
        title="Nhập ngày dự sinh"
        description="Dùng ngày dự sinh bác sĩ đã xác nhận trong lần khám gần nhất."
      />

      <Stack gap={2}>
        <DatePicker
          label="Ngày dự sinh"
          value={dueDate}
          onChange={setDueDate}
          slotProps={{
            textField: {
              InputLabelProps: { shrink: true },
              InputProps: {
                startAdornment: (
                  <InputAdornment position="start" sx={fieldAdornmentSx}>
                    <CalendarMonthRounded />
                  </InputAdornment>
                ),
              },
              fullWidth: true,
            },
          }}
        />

        <Stack
          direction="row"
          gap={1.5}
          sx={{ ...outlinedCardSx, bgcolor: '#FFF0F0' }}
        >
          <MedicalInformationRounded color="primary" />
          <Typography variant="body2" color="text.secondary">
            Nếu ngày này thay đổi sau lần khám tiếp theo, bạn vẫn có thể cập
            nhật trong hồ sơ.
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="body2" color="text.secondary">
            Muốn tính từ kỳ kinh cuối?
          </Typography>
          <Button
            variant="text"
            onClick={() => navigate({ to: '/onboarding/due-date' })}
          >
            Tính ngày dự sinh
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ flex: 1 }} />

      <Stack gap={1.5}>
        <Button
          variant="contained"
          size="large"
          disabled={!dueDate || isSubmitting}
          onClick={handleContinue}
        >
          Tiếp tục
        </Button>
        <Button
          variant="text"
          size="large"
          onClick={() => navigate({ to: '/onboarding/weight' })}
        >
          Bỏ qua
        </Button>
      </Stack>
    </Stack>
  );
}
