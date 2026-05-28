import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  CircularProgress,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  HomeRounded,
  MenuBookRounded,
  PsychologyRounded,
  SettingsRounded,
  ChevronRightRounded,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAuthStore } from '../../stores/auth.store';
import { weightEntriesApi } from '@meli/api';
import { BottomNav } from '@meli/ui';

export const Route = createFileRoute('/_auth/')({
  component: HomePage,
});

const NAV_ITEMS = [
  { label: 'Trang chủ', icon: <HomeRounded /> },
  { label: 'Hướng dẫn', icon: <MenuBookRounded /> },
  { label: 'AI', icon: <PsychologyRounded /> },
  { label: 'Cài đặt', icon: <SettingsRounded /> },
];

const NAV_ROUTES = ['/', '/guide', '/ai', '/settings'];

function usePregnancyInfo(dueDate: string | null) {
  if (!dueDate) return { week: 0, dayOfWeek: 0, daysLeft: 0, pct: 0 };
  const pregnancyStart = dayjs(dueDate).subtract(40, 'week');
  const daysPregnant = Math.max(0, dayjs().diff(pregnancyStart, 'day'));
  const week = Math.floor(daysPregnant / 7);
  const dayOfWeek = daysPregnant % 7;
  const daysLeft = Math.max(0, dayjs(dueDate).diff(dayjs(), 'day'));
  const pct = Math.min(1, daysPregnant / 280);
  return { week, dayOfWeek, daysLeft, pct };
}

function useGreeting() {
  const hour = dayjs().hour();
  if (hour < 12) return 'Chúc mẹ buổi sáng tốt lành';
  if (hour < 18) return 'Chúc mẹ buổi chiều vui vẻ';
  return 'Chúc mẹ buổi tối bình an';
}

function HomePage() {
  const navigate = useNavigate();
  const { profile, user } = useAuthStore();
  const greeting = useGreeting();
  const { week, dayOfWeek, daysLeft, pct } = usePregnancyInfo(
    profile?.due_date ?? null,
  );

  const { data: weightEntries } = useQuery({
    queryKey: ['weightEntries', user?.id],
    queryFn: () => (user ? weightEntriesApi.list(user.id) : undefined),
    enabled: !!user,
  });

  const weightList = weightEntries?.data ?? [];
  const latestWeight = weightList.at(-1)?.weight_kg ?? null;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
        overflow: 'hidden',
      }}
    >
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="subtitle2" sx={{ textAlign: 'center', flex: 1 }}>
            Tuần thứ {week}, ngày {dayOfWeek}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 8 }}>
        <Box sx={{ bgcolor: 'primary.main', px: 2, py: 3 }}>
          <Stack spacing={0.5} sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ color: 'primary.contrastText' }}>
              Chào mẹ
            </Typography>
            <Typography variant="body2" sx={{ color: 'primary.contrastText' }}>
              {greeting}
            </Typography>
          </Stack>
        </Box>

        <Stack direction="row" spacing={1.5} sx={{ p: 2 }}>
          <WidgetCard
            label="CÂN NẶNG"
            onClick={() => navigate({ to: '/weight' })}
            sx={{ flex: 1 }}
          >
            <Typography variant="h4">
              {latestWeight == null ? '—' : `${latestWeight} kg`}
            </Typography>
          </WidgetCard>

          <WidgetCard label="ĐẾM NGƯỢC" sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Stack spacing={0}>
                <Typography variant="h4">{daysLeft}</Typography>
                <Typography variant="caption" color="textSecondary">
                  ngày
                </Typography>
              </Stack>
              <Box
                sx={{
                  position: 'relative',
                  width: 48,
                  height: 48,
                  flexShrink: 0,
                }}
              >
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={48}
                  thickness={5}
                  sx={{
                    color: 'coral.100',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
                <CircularProgress
                  variant="determinate"
                  value={pct * 100}
                  size={48}
                  thickness={5}
                  sx={{ color: 'primary.main' }}
                />
              </Box>
            </Stack>
          </WidgetCard>
        </Stack>
      </Box>

      <BottomNav
        items={NAV_ITEMS}
        value={0}
        onChange={(_, idx) => navigate({ to: NAV_ROUTES[idx] })}
      />
    </Box>
  );
}

function WidgetCard({
  label,
  children,
  onClick,
  sx,
}: {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  sx?: object;
}) {
  const inner = (
    <CardContent
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, height: '100%' }}
    >
      <Stack direction="row" alignItems="center">
        <Typography
          variant="caption"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            flex: 1,
          }}
        >
          {label}
        </Typography>
        {onClick && (
          <ChevronRightRounded
            sx={{ color: 'primary.main' }}
            fontSize="small"
          />
        )}
      </Stack>
      <Divider sx={{ borderColor: 'coral.100' }} />
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        {children}
      </Box>
    </CardContent>
  );

  return (
    <Card sx={{ minHeight: 120, ...sx }}>
      {onClick ? (
        <CardActionArea onClick={onClick} sx={{ height: '100%' }}>
          {inner}
        </CardActionArea>
      ) : (
        inner
      )}
    </Card>
  );
}
