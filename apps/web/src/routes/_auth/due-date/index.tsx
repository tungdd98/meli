import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Box,
  Stack,
  Paper,
  Typography,
  Button,
  Divider,
  Tabs,
  Tab,
} from '@mui/material';
import { EditRounded } from '@mui/icons-material';
import dayjs from 'dayjs';
import { AppHeader } from '@meli/ui';
import { useAuthStore } from '../../../stores/auth.store';
import {
  tabContent,
  birthPlanLabels,
  BIRTH_PLAN_FALLBACK,
  type TabKey,
} from './-data';
import { WeekChart } from './-WeekChart';
import { DueDateUpdateDialog } from './-DueDateUpdateDialog';
import { BirthPlanDialog } from './-BirthPlanDialog';

export const Route = createFileRoute('/_auth/due-date/')({
  component: DueDatePage,
});

const TAB_ORDER: TabKey[] = ['trimester', 'risk', 'labor'];

function weeksRemaining(dueDate: string | null): number | null {
  if (!dueDate) return null;
  const days = dayjs(dueDate)
    .startOf('day')
    .diff(dayjs().startOf('day'), 'day');
  return Math.ceil(days / 7);
}

function InfoCard({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <Stack spacing={0.5} alignItems="center" sx={{ flex: 1 }}>
      <Typography variant="caption" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="h4">{value}</Typography>
      <Button
        size="small"
        startIcon={<EditRounded fontSize="small" />}
        onClick={onEdit}
        sx={{ color: 'primary.main' }}
      >
        CẬP NHẬT
      </Button>
    </Stack>
  );
}

function DueDatePage() {
  const navigate = useNavigate();
  const profile = useAuthStore((state) => state.profile);
  const user = useAuthStore((state) => state.user);

  const [tab, setTab] = useState<TabKey>('trimester');
  const [dueDateOpen, setDueDateOpen] = useState(false);
  const [birthPlanOpen, setBirthPlanOpen] = useState(false);

  const dueDate = profile?.due_date ?? null;
  const remaining = weeksRemaining(dueDate);
  // Derive the marker from the same weeksRemaining the screen displays so the
  // marker, countdown, and home header all agree (gestationalWeek + remaining
  // = 40, per spec §5), clamped to the 0–42 chart range.
  const gestationalWeek =
    remaining == null ? null : Math.min(42, Math.max(0, 40 - remaining));

  const dueDateLabel = dueDate ? dayjs(dueDate).format('D/M/YYYY') : 'Chưa đặt';
  const birthPlanLabel = profile?.birth_plan
    ? birthPlanLabels[profile.birth_plan]
    : BIRTH_PLAN_FALLBACK;

  const countdownText =
    remaining == null
      ? 'Hãy cập nhật ngày dự sinh của bạn'
      : remaining > 0
        ? `Chỉ còn ${remaining} tuần nữa!`
        : 'Đã đến ngày dự sinh!';

  const content = tabContent[tab];

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <AppHeader
        variant="primary"
        showBack
        title="NGÀY DỰ SINH"
        onBack={() => navigate({ to: '/' })}
      />

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 10 }}>
        <Paper square sx={{ px: 2, py: 2 }}>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <InfoCard
              label="Ngày dự sinh của bạn"
              value={dueDateLabel}
              onEdit={() => setDueDateOpen(true)}
            />
            <InfoCard
              label="Kế hoạch sinh của mẹ"
              value={birthPlanLabel}
              onEdit={() => setBirthPlanOpen(true)}
            />
          </Stack>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            sx={{ mt: 1.5 }}
          >
            {countdownText}
          </Typography>
        </Paper>

        <Tabs
          value={tab}
          onChange={(_, value: TabKey) => setTab(value)}
          variant="fullWidth"
        >
          {TAB_ORDER.map((key) => (
            <Tab
              key={key}
              value={key}
              label={tabContent[key].tabLabel}
              sx={{ fontSize: 12 }}
            />
          ))}
        </Tabs>

        <Box sx={{ px: 1, pt: 2 }}>
          <WeekChart tab={tab} gestationalWeek={gestationalWeek} />
        </Box>

        <Stack spacing={1} sx={{ p: 2 }}>
          <Typography variant="h3">{content.heading}</Typography>
          <Typography variant="body2" color="textSecondary">
            {content.body}
          </Typography>
        </Stack>
      </Box>

      {user && (
        <>
          <DueDateUpdateDialog
            open={dueDateOpen}
            userId={user.id}
            currentDueDate={dueDate}
            onClose={() => setDueDateOpen(false)}
          />
          <BirthPlanDialog
            open={birthPlanOpen}
            userId={user.id}
            onClose={() => setBirthPlanOpen(false)}
          />
        </>
      )}
    </Box>
  );
}
