import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import {
  EventAvailableRounded,
  MedicalInformationRounded,
} from '@mui/icons-material';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDatePicker } from '@meli/ui';
import type { Dayjs } from 'dayjs';
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
  dueDate: z.custom<Dayjs>().nullable(),
});

type FormValues = z.infer<typeof schema>;

function DueDateDirectPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { dueDate: null },
  });

  const dueDate = watch('dueDate');

  const onSubmit = async (values: FormValues) => {
    if (!values.dueDate || !user) return;

    const dueDateStr = values.dueDate.format('YYYY-MM-DD');
    await profilesApi.update(user.id, { due_date: dueDateStr });
    const profile = useAuthStore.getState().profile;
    if (profile) {
      useAuthStore.getState()._setProfile({ ...profile, due_date: dueDateStr });
    }
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
        <FormDatePicker name="dueDate" control={control} label="Ngày dự sinh" />

        <Card>
          <CardContent sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <MedicalInformationRounded color="primary" fontSize="small" />
            <Typography color="text.secondary" variant="caption">
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
