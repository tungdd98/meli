import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Box,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  HomeRounded,
  MenuBookRounded,
  PsychologyRounded,
  SettingsRounded,
  ChildCareRounded,
  FamilyRestroomRounded,
  PhotoCameraRounded,
  ChevronRightRounded,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAuthStore } from '../../stores/auth.store';
import { weightEntriesApi } from '@meli/api';
import { BottomNav, shape } from '@meli/ui';

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
    queryFn: () => weightEntriesApi.list(user!.id),
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
      {/* WeekHeader */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'coral.100',
          py: 1.5,
          textAlign: 'center',
        }}
      >
        <Typography variant="subtitle2">
          Tuần thứ {week}, ngày {dayOfWeek}
        </Typography>
      </Box>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: 'auto', pb: '80px' }}>
        {/* HeroSection */}
        <Box sx={{ bgcolor: 'primary.main', px: 2, py: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            {/* Baby avatar */}
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: shape.full,
                bgcolor: 'rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ChildCareRounded
                sx={{ color: 'primary.contrastText', fontSize: 32 }}
              />
            </Box>

            {/* Greeting */}
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography
                variant="h4"
                sx={{ color: 'primary.contrastText', fontWeight: 700 }}
              >
                Chào mẹ
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.8)' }}
              >
                {greeting}
              </Typography>
            </Stack>

            {/* Right actions */}
            <Stack spacing={1} alignItems="center">
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'primary.contrastText',
                }}
              >
                <FamilyRestroomRounded />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'primary.contrastText',
                }}
              >
                <PhotoCameraRounded />
              </IconButton>
            </Stack>
          </Stack>
        </Box>

        {/* Widget Grid */}
        <Stack direction="row" spacing={1.5} sx={{ p: 2 }}>
          {/* CÂN NẶNG card */}
          <WidgetCard
            label="CÂN NẶNG"
            onClick={() => navigate({ to: '/weight' })}
            sx={{ flex: 1 }}
          >
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {latestWeight != null ? `${latestWeight} kg` : '—'}
            </Typography>
          </WidgetCard>

          {/* ĐẾM NGƯỢC card */}
          <WidgetCard label="ĐẾM NGƯỢC" sx={{ flex: 1 }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Stack spacing={0}>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  {daysLeft}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ngày
                </Typography>
              </Stack>
              {/* Donut ring */}
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

      {/* Bottom Nav */}
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
            letterSpacing: 0.5,
            flex: 1,
          }}
        >
          {label}
        </Typography>
        {onClick && (
          <ChevronRightRounded sx={{ color: 'primary.main', fontSize: 16 }} />
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
