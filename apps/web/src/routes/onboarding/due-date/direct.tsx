import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, InputAdornment, Stack, Typography } from '@mui/material';
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
  FieldBlock,
  fieldSx,
  FooterActions,
  InlineLinkRow,
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
        description="Dùng ngày dự sinh bác sĩ đã thông báo để cá nhân hóa hành trình của bạn."
      />

      <Stack gap={2} sx={{ height: 200 }}>
        <FieldBlock label="Ngày dự sinh">
          <DatePicker
            value={dueDate}
            onChange={setDueDate}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                placeholder: '19/06/2026',
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarMonthRounded />
                    </InputAdornment>
                  ),
                },
                fullWidth: true,
                sx: fieldSx,
              },
            }}
          />
        </FieldBlock>

        <Stack
          direction="row"
          gap={1.5}
          alignItems="center"
          sx={{ ...outlinedCardSx, bgcolor: 'coral.50', height: 68 }}
        >
          <MedicalInformationRounded color="primary" sx={{ fontSize: 22 }} />
          <Typography
            color="text.secondary"
            sx={{ fontSize: 13, lineHeight: '18px' }}
          >
            Nếu ngày này thay đổi sau lần khám tiếp theo, bạn vẫn có thể cập
            nhật trong hồ sơ.
          </Typography>
        </Stack>

        <InlineLinkRow
          label="Muốn tính từ kỳ kinh cuối?"
          action="Tính ngày dự sinh"
          onClick={() => navigate({ to: '/onboarding/due-date' })}
        />
      </Stack>

      <Box sx={{ height: 148 }} />

      <FooterActions
        disabled={!dueDate || isSubmitting}
        onSubmit={handleContinue}
        skipLabel="Bỏ qua"
        onSkip={() => navigate({ to: '/onboarding/weight' })}
      />
    </Stack>
  );
}
