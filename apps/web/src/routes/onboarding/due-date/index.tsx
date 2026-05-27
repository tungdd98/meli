import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Card, CardContent, Stack, Typography } from '@mui/material';
import { PregnantWomanRounded } from '@mui/icons-material';
import dayjs, { type Dayjs } from 'dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormDatePicker } from '@meli/ui';
import { profilesApi } from '@meli/api';
import { calcDueDateFromLmp } from '@meli/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthStore } from '../../../stores/auth.store';
import {
  FooterActions,
  InlineLinkRow,
  WizardHero,
  WizardTopBar,
} from '../-shared';

export const Route = createFileRoute('/onboarding/due-date/')({
  component: DueDateLmpPage,
});

const schema = z.object({
  lmp: z.custom<Dayjs>().nullable(),
});

type FormValues = z.infer<typeof schema>;

function DueDateLmpPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const onboardingLmp = useAuthStore((state) => state.onboardingLmp);

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { lmp: onboardingLmp ? dayjs(onboardingLmp) : null },
  });

  const lmp = watch('lmp');
  const dueDateStr = lmp ? calcDueDateFromLmp(lmp.format('YYYY-MM-DD')) : null;

  const onSubmit = async (values: FormValues) => {
    if (!values.lmp || !user) return;

    const nextDueDate = calcDueDateFromLmp(values.lmp.format('YYYY-MM-DD'));
    await profilesApi.update(user.id, { due_date: nextDueDate });
    const profile = useAuthStore.getState().profile;
    if (profile) {
      useAuthStore
        .getState()
        ._setProfile({ ...profile, due_date: nextDueDate });
    }
    useAuthStore.getState()._setOnboardingLmp(values.lmp.format('YYYY-MM-DD'));
    navigate({ to: '/onboarding/weight' });
  };

  return (
    <Stack
      gap={3}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <WizardTopBar step={1} />
      <WizardHero
        icon={<PregnantWomanRounded />}
        title="Ngày dự sinh của bạn"
        description="Chọn ngày đầu tiên của kỳ kinh cuối để Meli ước tính mốc thai kỳ."
      />

      <Stack gap={2} sx={{ flex: 1 }}>
        <FormDatePicker
          name="lmp"
          control={control}
          label="Ngày đầu kỳ kinh cuối"
        />

        {dueDateStr && (
          <Card>
            <CardContent>
              <Stack gap={1}>
                <Typography color="primary.main" variant="subtitle2">
                  Dự sinh ước tính
                </Typography>
                <Typography variant="h2">
                  {dayjs(dueDateStr).format('DD/MM/YYYY')}
                </Typography>
                <Typography color="text.secondary" variant="caption">
                  Bạn có thể thay đổi thông tin này sau trong hồ sơ.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}

        <InlineLinkRow
          label="Đã có ngày từ bác sĩ?"
          action="Nhập trực tiếp"
          onClick={() => navigate({ to: '/onboarding/due-date/direct' })}
        />
      </Stack>

      <FooterActions
        type="submit"
        disabled={!lmp || isSubmitting}
        skipLabel="Bỏ qua"
        onSkip={() => navigate({ to: '/onboarding/weight' })}
      />
    </Stack>
  );
}
