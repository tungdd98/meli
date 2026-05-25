import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, InputAdornment, Stack, Typography } from '@mui/material';
import {
  CalendarMonthRounded,
  ChevronLeftRounded,
  PregnantWomanRounded,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { profilesApi } from '@meli/api';
import { calcDueDateFromLmp } from '@meli/utils';
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

export const Route = createFileRoute('/onboarding/due-date/')({
  component: DueDateLmpPage,
});

function DueDateLmpPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const [lmp, setLmp] = useState<Dayjs | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dueDateStr = lmp ? calcDueDateFromLmp(lmp.format('YYYY-MM-DD')) : null;

  const handleContinue = async () => {
    if (!dueDateStr || !user) return;

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
        onBack={() => navigate({ to: '/' })}
        backIcon={
          <BackButtonIcon>
            <ChevronLeftRounded />
          </BackButtonIcon>
        }
      />
      <WizardHero
        icon={<PregnantWomanRounded />}
        title="Ngày dự sinh của bạn"
        description="Chọn ngày đầu tiên của kỳ kinh cuối để Meli ước tính mốc thai kỳ."
      />

      <Stack gap={2} sx={{ height: 238 }}>
        <FieldBlock label="Ngày đầu kỳ kinh cuối">
          <DatePicker
            value={lmp}
            onChange={setLmp}
            format="DD/MM/YYYY"
            slotProps={{
              textField: {
                placeholder: '12/09/2025',
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

        {dueDateStr && (
          <Stack sx={{ ...outlinedCardSx, height: 106 }} gap="4px">
            <Typography
              color="primary.main"
              sx={{ fontSize: 12, fontWeight: 700, lineHeight: '16px' }}
            >
              Dự sinh ước tính
            </Typography>
            <Typography
              color="text.primary"
              sx={{ fontSize: 24, fontWeight: 700, lineHeight: '32px' }}
            >
              {dayjs(dueDateStr).format('DD/MM/YYYY')}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: 13, lineHeight: '18px' }}
            >
              Bạn có thể thay đổi thông tin này sau trong hồ sơ.
            </Typography>
          </Stack>
        )}

        <InlineLinkRow
          label="Đã có ngày từ bác sĩ?"
          action="Nhập trực tiếp"
          onClick={() => navigate({ to: '/onboarding/due-date/direct' })}
        />
      </Stack>

      <Box sx={{ height: 110 }} />

      <FooterActions
        disabled={!lmp || isSubmitting}
        onSubmit={handleContinue}
        skipLabel="Bỏ qua"
        onSkip={() => navigate({ to: '/onboarding/weight' })}
      />
    </Stack>
  );
}
