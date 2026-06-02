import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Stack,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import { CalendarMonthRounded } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs, { type Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormDatePicker } from '@meli/ui';
import { profilesApi } from '@meli/api';
import { calcDueDateFromLmp } from '@meli/utils';
import { useAuthStore } from '../../../stores/auth.store';

type Step = 'method' | 'known' | 'compute';

const knownSchema = z.object({
  date: z.custom<Dayjs>(
    (v) => dayjs.isDayjs(v) && v.isValid(),
    'Ngày không hợp lệ',
  ),
});
const lmpSchema = z.object({
  date: z
    .custom<Dayjs>((v) => dayjs.isDayjs(v) && v.isValid(), 'Ngày không hợp lệ')
    .refine((v) => !v.isAfter(dayjs(), 'day'), 'Ngày không được ở tương lai'),
});

type FormValues = { date: Dayjs };

export function DueDateUpdateDialog({
  open,
  userId,
  currentDueDate,
  onClose,
}: {
  open: boolean;
  userId: string;
  currentDueDate: string | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>('method');
  const [error, setError] = useState<string | null>(null);

  const isCompute = step === 'compute';

  const { control, handleSubmit, watch, reset, formState } =
    useForm<FormValues>({
      resolver: zodResolver(isCompute ? lmpSchema : knownSchema),
      defaultValues: {
        date: currentDueDate ? dayjs(currentDueDate) : undefined,
      },
    });

  const watchedDate = watch('date');
  const computedDueDate =
    isCompute && watchedDate?.isValid()
      ? calcDueDateFromLmp(watchedDate.format('YYYY-MM-DD'))
      : null;

  function close() {
    reset();
    setStep('method');
    setError(null);
    onClose();
  }

  function goToStep(next: Step) {
    setError(null);
    // Pre-fill only the "known due date" step; the LMP step must start empty.
    reset({
      date:
        next === 'known' && currentDueDate ? dayjs(currentDueDate) : undefined,
    });
    setStep(next);
  }

  const onSubmit = handleSubmit(async (values) => {
    setError(null);
    const dueDate = isCompute
      ? calcDueDateFromLmp(values.date.format('YYYY-MM-DD'))
      : values.date.format('YYYY-MM-DD');

    const { error: updateError } = await profilesApi.update(userId, {
      due_date: dueDate,
    });
    if (updateError) {
      setError('Lưu thất bại. Vui lòng thử lại.');
      return;
    }
    const profile = useAuthStore.getState().profile;
    if (profile) {
      useAuthStore.getState()._setProfile({ ...profile, due_date: dueDate });
    }
    close();
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
        <DialogContent>
          <Stack spacing={2} alignItems="center" sx={{ py: 1 }}>
            <Typography variant="h3" color="primary.main">
              Tính ngày dự sinh
            </Typography>
            <CalendarMonthRounded
              sx={{ fontSize: 64, color: 'primary.light' }}
            />

            {error && (
              <Alert severity="error" sx={{ width: '100%' }}>
                {error}
              </Alert>
            )}

            {step === 'method' && (
              <Stack spacing={1.5} sx={{ width: '100%' }}>
                <Typography color="textSecondary" textAlign="center">
                  Hãy chọn
                </Typography>
                <Button variant="outlined" onClick={() => goToStep('known')}>
                  Mẹ biết ngày dự sinh của mình
                </Button>
                <Button variant="outlined" onClick={() => goToStep('compute')}>
                  Tính ngày dự sinh
                </Button>
              </Stack>
            )}

            {step === 'known' && (
              <Stack
                component="form"
                onSubmit={onSubmit}
                spacing={1.5}
                sx={{ width: '100%' }}
              >
                <Typography color="textSecondary">
                  Ngày dự sinh bác sĩ xác nhận
                </Typography>
                <FormDatePicker
                  name="date"
                  control={control}
                  label="Ngày dự sinh"
                />
              </Stack>
            )}

            {step === 'compute' && (
              <Stack
                component="form"
                onSubmit={onSubmit}
                spacing={1.5}
                sx={{ width: '100%' }}
              >
                <Typography color="textSecondary">
                  Ngày đầu tiên của kỳ kinh cuối cùng
                </Typography>
                <FormDatePicker
                  name="date"
                  control={control}
                  label="Ngày đầu kỳ kinh cuối"
                />
                {computedDueDate && (
                  <Typography variant="body2" color="primary.main">
                    Dự sinh ước tính:{' '}
                    {dayjs(computedDueDate).format('D/M/YYYY')}
                  </Typography>
                )}
              </Stack>
            )}
          </Stack>
        </DialogContent>

        {step !== 'method' && (
          <DialogActions>
            <Button onClick={() => goToStep('method')}>QUAY LẠI</Button>
            <Button
              variant="contained"
              onClick={onSubmit}
              disabled={formState.isSubmitting}
            >
              TIẾP TỤC
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </LocalizationProvider>
  );
}
