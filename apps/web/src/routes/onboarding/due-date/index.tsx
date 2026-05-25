import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box, Button, InputAdornment, Stack, Typography } from '@mui/material';
import {
  CalendarMonthRounded,
  PregnantWomanRounded,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { profilesApi } from '@meli/api';
import { calcDueDateFromLmp } from '@meli/utils';
import { useAuthStore } from '../../../stores/auth.store';
import {
  fieldAdornmentSx,
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
      <WizardTopBar step={1} />
      <WizardHero
        icon={<PregnantWomanRounded />}
        title="Ngày dự sinh của bạn"
        description="Chọn ngày đầu kỳ kinh cuối để Meli ước tính ngày gặp bé."
      />

      <Stack gap={2}>
        <DatePicker
          label="Ngày đầu kỳ kinh cuối"
          value={lmp}
          onChange={setLmp}
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

        {dueDateStr && (
          <Stack sx={outlinedCardSx} gap={0.5}>
            <Typography
              variant="caption"
              color="primary.main"
              sx={{ fontWeight: 700 }}
            >
              Dự sinh ước tính
            </Typography>
            <Typography variant="h3" color="text.primary">
              {dayjs(dueDateStr).format('DD/MM/YYYY')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Bạn có thể thay đổi thông tin này sau trong hồ sơ.
            </Typography>
          </Stack>
        )}

        <Stack direction="row" alignItems="center" justifyContent="center">
          <Typography variant="body2" color="text.secondary">
            Đã có ngày từ bác sĩ?
          </Typography>
          <Button
            variant="text"
            onClick={() => navigate({ to: '/onboarding/due-date/direct' })}
          >
            Nhập trực tiếp
          </Button>
        </Stack>
      </Stack>

      <Box sx={{ flex: 1 }} />

      <Stack gap={1.5}>
        <Button
          variant="contained"
          size="large"
          disabled={!lmp || isSubmitting}
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
