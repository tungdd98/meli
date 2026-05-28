import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Stack,
  Paper,
  IconButton,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Alert,
  List,
  ListItem,
} from '@mui/material';
import {
  ArrowBackRounded,
  EditRounded,
  DeleteRounded,
  AddRounded,
  ScaleRounded,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { type Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import { weightEntriesApi, type WeightEntry } from '@meli/api';
import {
  calcBmi,
  buildIdealChartData,
  buildActualChartData,
} from '@meli/utils';
import { FormTextField, FormDatePicker, shape } from '@meli/ui';
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from 'recharts';

export const Route = createFileRoute('/_auth/weight')({
  component: WeightPage,
});

// ── Zod schema ───────────────────────────────────────────────
const schema = z.object({
  measured_at: z.custom<Dayjs>((v) => dayjs.isDayjs(v), 'Ngày không hợp lệ'),
  weight_kg: z
    .number({ message: 'Vui lòng nhập số' })
    .min(20, 'Tối thiểu 20 kg')
    .max(200, 'Tối đa 200 kg'),
});
type FormValues = z.infer<typeof schema>;

// ── WeightEntryDialog ─────────────────────────────────────────
function WeightEntryDialog({
  open,
  entry,
  defaultWeight,
  userId,
  onClose,
}: {
  open: boolean;
  entry?: WeightEntry;
  defaultWeight?: number;
  userId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      measured_at: entry ? dayjs(entry.measured_at) : dayjs(),
      weight_kg: entry?.weight_kg ?? defaultWeight ?? undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      const data = {
        measured_at: values.measured_at.format('YYYY-MM-DD'),
        weight_kg: values.weight_kg,
      };
      return entry
        ? weightEntriesApi.update(entry.id, userId, data)
        : weightEntriesApi.create(userId, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weightEntries', userId] });
      reset();
      onClose();
    },
  });

  const onSubmit = handleSubmit((values) => mutation.mutate(values));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { borderRadius: shape.lg, width: '100%', mx: 2 } }}
      >
        <DialogTitle
          sx={{ textAlign: 'center', color: 'primary.main', fontWeight: 700 }}
        >
          {entry ? 'Chỉnh sửa cân nặng' : 'Bổ sung cân nặng hiện tại'}
        </DialogTitle>
        <DialogContent>
          <Stack alignItems="center" sx={{ mb: 2 }}>
            <ScaleRounded sx={{ fontSize: 64, color: 'primary.light' }} />
          </Stack>
          <Stack spacing={2} component="form" onSubmit={onSubmit}>
            <FormDatePicker
              name="measured_at"
              control={control}
              label="Chọn ngày"
            />
            <FormTextField
              name="weight_kg"
              control={control}
              label="Cân nặng (kg)"
              type="number"
              fullWidth
              inputProps={{ step: 0.1 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} color="inherit">
            Huỷ
          </Button>
          <Button
            onClick={onSubmit}
            variant="text"
            disabled={mutation.isPending}
            sx={{ fontWeight: 700 }}
          >
            TIẾP TỤC
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

// ── DeleteConfirmDialog ───────────────────────────────────────
function DeleteConfirmDialog({
  entry,
  userId,
  onClose,
}: {
  entry: WeightEntry | null;
  userId: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => weightEntriesApi.remove(entry!.id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['weightEntries', userId] });
      onClose();
    },
  });

  return (
    <Dialog open={!!entry} onClose={onClose}>
      <DialogTitle>Xoá bản ghi</DialogTitle>
      <DialogContentText sx={{ px: 3 }}>
        Xoá bản ghi ngày{' '}
        {entry ? dayjs(entry.measured_at).format('DD/MM/YYYY') : ''}?
      </DialogContentText>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} color="inherit">
          Huỷ
        </Button>
        <Button
          onClick={() => mutation.mutate()}
          color="error"
          disabled={mutation.isPending}
        >
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── WeightChart ───────────────────────────────────────────────
function WeightChart({
  entries,
  preWeight,
  preHeight,
  dueDate,
}: {
  entries: WeightEntry[];
  preWeight: number;
  preHeight: number;
  dueDate: string;
}) {
  const theme = useTheme();
  const bmi = calcBmi(preWeight, preHeight);
  const idealData = buildIdealChartData(bmi);

  const pregnancyStart = dayjs(dueDate).subtract(40, 'week');
  const entriesWithWeek = entries.map((e) => ({
    ...e,
    week: Math.max(
      0,
      Math.min(40, dayjs(e.measured_at).diff(pregnancyStart, 'week')),
    ),
  }));
  const actualData = buildActualChartData(entriesWithWeek, preWeight);
  const currentWeek = Math.max(
    0,
    Math.min(40, dayjs().diff(pregnancyStart, 'week')),
  );

  const chartData = idealData.map((point) => {
    const actual = actualData.find((a) => a.week === point.week);
    return { ...point, actualGain: actual?.actualGain };
  });

  return (
    <ResponsiveContainer width="100%" height={240}>
      <ComposedChart
        data={chartData}
        margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
        <XAxis
          dataKey="week"
          tick={{ fontSize: 9, fill: theme.palette.text.secondary }}
          label={{
            value: 'Tuần',
            position: 'insideBottomRight',
            offset: -4,
            fontSize: 9,
            fill: theme.palette.text.disabled,
          }}
        />
        <YAxis
          tick={{ fontSize: 9, fill: theme.palette.text.secondary }}
          label={{
            value: 'kg',
            angle: -90,
            position: 'insideTopLeft',
            offset: 16,
            fontSize: 9,
            fill: theme.palette.text.disabled,
          }}
        />
        <Tooltip labelFormatter={(label) => `Tuần ${label}`} />
        <Area
          dataKey="idealMax"
          fill={theme.palette.secondary.light}
          fillOpacity={0.35}
          stroke="none"
          legendType="none"
          activeDot={false}
        />
        <Area
          dataKey="idealMin"
          fill={theme.palette.background.default}
          fillOpacity={1}
          stroke="none"
          legendType="none"
          activeDot={false}
        />
        <Line
          type="monotone"
          dataKey="actualGain"
          stroke={theme.palette.secondary.dark}
          strokeWidth={2}
          dot={{ fill: theme.palette.secondary.dark, r: 4 }}
          connectNulls={false}
        />
        <ReferenceLine
          x={currentWeek}
          stroke={theme.palette.primary.light}
          label={{
            value: `tuần ${currentWeek}`,
            fontSize: 8,
            fill: theme.palette.primary.main,
            position: 'top',
          }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

// ── WeightPage ────────────────────────────────────────────────
function WeightPage() {
  const navigate = useNavigate();
  const { profile, user } = useAuthStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<WeightEntry | undefined>();
  const [deleteEntry, setDeleteEntry] = useState<WeightEntry | null>(null);

  const { data: weightData } = useQuery({
    queryKey: ['weightEntries', user?.id],
    queryFn: () => weightEntriesApi.list(user!.id),
    enabled: !!user,
  });

  const entries = (weightData?.data ?? []) as WeightEntry[];
  const latestEntry = entries.at(-1) ?? null;
  const hasProfileData = !!profile?.weight_kg && !!profile?.height_cm;

  const currentGain =
    hasProfileData && latestEntry
      ? (latestEntry.weight_kg - profile!.weight_kg!).toFixed(1)
      : null;

  function openAdd() {
    setEditEntry(undefined);
    setDialogOpen(true);
  }

  function openEdit(entry: WeightEntry) {
    setEditEntry(entry);
    setDialogOpen(true);
  }

  const defaultWeight =
    latestEntry?.weight_kg ?? profile?.weight_kg ?? undefined;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      {/* AppBar */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate({ to: '/' })}>
            <ArrowBackRounded />
          </IconButton>
          <Typography
            variant="subtitle1"
            sx={{ flex: 1, textAlign: 'center', fontWeight: 600 }}
          >
            CÂN NẶNG CỦA MẸ
          </Typography>
          <Box sx={{ width: 40 }} />
        </Toolbar>
      </AppBar>

      {/* Scrollable content */}
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Stack spacing={2} sx={{ p: '16px 16px 80px' }}>
          {/* Header */}
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontSize: 18, fontWeight: 600 }}>
              Tăng cân trong thai kỳ
            </Typography>
            {hasProfileData ? (
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', lineHeight: 1.5 }}
              >
                Dựa trên {profile!.weight_kg} kg và {profile!.height_cm} cm
                trước khi mang thai, hiện tại mẹ{' '}
                {currentGain !== null
                  ? `đã tăng ${currentGain} kg`
                  : 'chưa có lần cân nào'}
                .
              </Typography>
            ) : (
              <Alert severity="warning" sx={{ borderRadius: shape.md }}>
                Vui lòng bổ sung cân nặng và chiều cao trước thai kỳ trong hồ sơ
                để xem dải tăng cân lý tưởng.
              </Alert>
            )}
          </Stack>

          {/* Chart */}
          {hasProfileData && profile?.due_date && (
            <Paper
              elevation={0}
              sx={{
                borderRadius: shape.xl,
                p: '12px 16px',
                border: '1px solid',
                borderColor: 'coral.100',
              }}
            >
              <WeightChart
                entries={entries}
                preWeight={profile.weight_kg!}
                preHeight={profile.height_cm!}
                dueDate={profile.due_date}
              />
            </Paper>
          )}

          {/* Divider */}
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 1 }}>
            <Box sx={{ flex: 1, height: 1, bgcolor: 'coral.100' }} />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', fontWeight: 600 }}
            >
              Lịch sử cân nặng
            </Typography>
            <Box sx={{ flex: 1, height: 1, bgcolor: 'coral.100' }} />
          </Stack>

          {/* History list */}
          {entries.length === 0 ? (
            <Typography
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', py: 2 }}
            >
              Chưa có lần cân nào. Nhấn + để thêm.
            </Typography>
          ) : (
            <Paper
              elevation={0}
              sx={{
                borderRadius: shape.md,
                border: '1px solid',
                borderColor: 'coral.100',
                overflow: 'hidden',
              }}
            >
              <List disablePadding>
                {[...entries].reverse().map((entry, idx) => (
                  <ListItem
                    key={entry.id}
                    disablePadding
                    sx={{
                      px: 2,
                      height: 52,
                      gap: 1,
                      borderBottom:
                        idx < entries.length - 1 ? '1px solid' : 'none',
                      borderColor: 'coral.100',
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: 'text.secondary', minWidth: 90 }}
                    >
                      {dayjs(entry.measured_at).format('DD/MM/YYYY')}
                    </Typography>
                    <Box sx={{ flex: 1 }} />
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: 'text.primary',
                        minWidth: 60,
                        textAlign: 'right',
                      }}
                    >
                      {entry.weight_kg} kg
                    </Typography>
                    <Stack direction="row">
                      <IconButton size="small" onClick={() => openEdit(entry)}>
                        <EditRounded
                          sx={{ fontSize: 18, color: 'text.secondary' }}
                        />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => setDeleteEntry(entry)}
                      >
                        <DeleteRounded
                          sx={{ fontSize: 18, color: 'error.main' }}
                        />
                      </IconButton>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Stack>
      </Box>

      {/* FAB */}
      <Fab
        color="primary"
        onClick={openAdd}
        sx={{ position: 'fixed', bottom: 24, right: 24 }}
      >
        <AddRounded />
      </Fab>

      {/* Dialogs */}
      {user && (
        <>
          <WeightEntryDialog
            open={dialogOpen}
            entry={editEntry}
            defaultWeight={defaultWeight}
            userId={user.id}
            onClose={() => setDialogOpen(false)}
          />
          <DeleteConfirmDialog
            entry={deleteEntry}
            userId={user.id}
            onClose={() => setDeleteEntry(null)}
          />
        </>
      )}
    </Box>
  );
}
