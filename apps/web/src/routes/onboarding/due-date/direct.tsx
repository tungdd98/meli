import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Alert, Card, CardContent, Stack, Typography } from '@mui/material';
import {
  EventAvailableRounded,
  MedicalInformationRounded,
} from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDatePicker } from '@meli/ui';
import dayjs, { type Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { profilesApi } from '@meli/api';
import { useAuthStore } from '../../../stores/auth.store';
import {
  FooterActions,
  InlineLinkRow,
  WizardHero,
  WizardTopBar,
} from '../-shared';

export const Route = createFileRoute('/onboarding/due-date/direct')({
  component: DueDateDirectPage,
});

const schema = z.object({
  dueDate: z
    .custom<Dayjs>(
      (v) => v === null || (dayjs.isDayjs(v) && v.isValid()),
      'Ngày không hợp lệ',
    )
    .nullable()
    .refine(
      (v) => v === null || v.isAfter(dayjs(), 'day'),
      'Ngày dự sinh phải ở tương lai',
    )
    .refine(
      (v) => !v?.isAfter(dayjs().add(300, 'day'), 'day'),
      'Ngày dự sinh không hợp lệ',
    ),
});

type FormValues = z.infer<typeof schema>;

function DueDateDirectPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);
  const [saveError, setSaveError] = useState<string | null>(null);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      dueDate: profile?.due_date ? dayjs(profile.due_date) : null,
    },
  });

  const dueDate = watch('dueDate');

  const onSubmit = async (values: FormValues) => {
    if (!values.dueDate || !user) return;
    setSaveError(null);

    const dueDateStr = values.dueDate.format('YYYY-MM-DD');
    const { error: updateError } = await profilesApi.update(user.id, {
      due_date: dueDateStr,
    });
    if (updateError) {
      setSaveError('Lưu thất bại. Vui lòng thử lại.');
      return;
    }
    useAuthStore.getState().updateProfile({ due_date: dueDateStr });
    navigate({ to: '/onboarding/weight' });
  };

  return (
    <Stack
      gap={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <WizardTopBar
        step={1}
        onBack={() => navigate({ to: '/onboarding/due-date' })}
      />
      <WizardHero
        icon={<EventAvailableRounded />}
        title="Nhập ngày dự sinh"
        description="Dùng ngày dự sinh bác sĩ đã thông báo để cá nhân hóa hành trình của bạn."
      />

      <Stack gap={2} sx={{ flex: 1 }}>
        {saveError && <Alert severity="error">{saveError}</Alert>}
        <FormDatePicker name="dueDate" control={control} label="Ngày dự sinh" />

        <Card>
          <CardContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <MedicalInformationRounded color="primary" fontSize="small" />
            <Typography color="textSecondary" variant="caption">
              Nếu ngày này thay đổi sau lần khám tiếp theo, bạn vẫn có thể cập
              nhật trong hồ sơ.
            </Typography>
          </CardContent>
        </Card>

        <InlineLinkRow
          label="Muốn tính từ kỳ kinh cuối?"
          action="Tính ngày dự sinh"
          onClick={() => navigate({ to: '/onboarding/due-date' })}
        />
      </Stack>

      <FooterActions
        type="submit"
        disabled={!dueDate || isSubmitting}
        skipLabel="Bỏ qua"
        onSkip={() => navigate({ to: '/onboarding/weight' })}
      />
    </Stack>
  );
}
