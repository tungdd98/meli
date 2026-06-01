import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
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
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  InputAdornment,
} from '@mui/material';
import {
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
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import { weightEntriesApi, type WeightEntry } from '@meli/api';
import {
  calcBmi,
  buildIdealChartData,
  buildActualChartData,
} from '@meli/utils';
import { AppHeader, FormTextField, FormDatePicker } from '@meli/ui';
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

const schema = z.object({
  measured_at: z.custom<Dayjs>((v) => dayjs.isDayjs(v), 'Ngày không hợp lệ'),
  weight_kg: z
    .string()
    .min(1, 'Tối thiểu 20 kg')
    .refine((value) => Number(value) >= 20, 'Tối thiểu 20 kg')
    .refine((value) => Number(value) <= 300, 'Tối đa 300 kg'),
});
type FormValues = z.infer<typeof schema>;

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
      weight_kg:
        entry?.weight_kg?.toString() ?? defaultWeight?.toString() ?? undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        measured_at: entry ? dayjs(entry.measured_at) : dayjs(),
        weight_kg:
          entry?.weight_kg?.toString() ??
          defaultWeight?.toString() ??
          undefined,
      });
    }
  }, [open, entry, defaultWeight, reset]);

  const mutation = useMutation({
    mutationFn: (values: FormValues) => {
      const data = {
        measured_at: values.measured_at.format('YYYY-MM-DD'),
        weight_kg: Number(values.weight_kg),
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
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
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
              placeholder="42"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScaleRounded />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">kg</InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Huỷ</Button>
          <Button
            onClick={onSubmit}
            variant="contained"
            disabled={mutation.isPending}
          >
            Tiếp tục
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

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
    mutationFn: async () =>
      entry ? weightEntriesApi.remove(entry.id, userId) : undefined,
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
      <DialogActions>
        <Button onClick={onClose}>Huỷ</Button>
        <Button
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
          variant="contained"
        >
          Xoá
        </Button>
      </DialogActions>
    </Dialog>
  );
}

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

function WeightPage() {
  const navigate = useNavigate();
  const { profile, user } = useAuthStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<WeightEntry | undefined>();
  const [deleteEntry, setDeleteEntry] = useState<WeightEntry | null>(null);

  const { data: weightData } = useQuery({
    queryKey: ['weightEntries', user?.id],
    queryFn: () => (user ? weightEntriesApi.list(user.id) : undefined),
    enabled: !!user,
  });

  const entries = (weightData?.data ?? []) as WeightEntry[];
  const latestEntry = entries.at(-1) ?? null;
  const hasProfileData = !!profile?.weight_kg && !!profile?.height_cm;

  const currentGain =
    hasProfileData && latestEntry
      ? (latestEntry.weight_kg - (profile?.weight_kg ?? 0)).toFixed(1)
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
      <AppHeader
        variant="primary"
        showBack
        title="CÂN NẶNG CỦA MẸ"
        onBack={() => navigate({ to: '/' })}
      />

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 10 }}>
        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack spacing={1}>
            <Typography variant="h3">Tăng cân trong thai kỳ</Typography>
            {hasProfileData ? (
              <Typography color="textSecondary" variant="body2">
                Dựa trên {profile?.weight_kg} kg và {profile?.height_cm} cm
                trước khi mang thai, hiện tại mẹ{' '}
                {currentGain === null
                  ? 'chưa có lần cân nào'
                  : `đã tăng ${currentGain} kg`}
                .
              </Typography>
            ) : (
              <Alert severity="warning">
                Vui lòng bổ sung cân nặng và chiều cao trước thai kỳ trong hồ sơ
                để xem dải tăng cân lý tưởng.
              </Alert>
            )}
          </Stack>

          {hasProfileData && profile?.due_date && (
            <Paper sx={{ p: 2 }}>
              <WeightChart
                entries={entries}
                preWeight={profile.weight_kg ?? 0}
                preHeight={profile.height_cm ?? 0}
                dueDate={profile.due_date}
              />
            </Paper>
          )}

          {entries.length === 0 ? (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: 'center', py: 2 }}
            >
              Chưa có lần cân nào.
            </Typography>
          ) : (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Ngày</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Tuần</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Cân nặng</TableCell>
                  <TableCell padding="checkbox" />
                </TableRow>
              </TableHead>
              <TableBody>
                {[...entries].reverse().map((entry) => {
                  const week = profile?.due_date
                    ? Math.max(
                        0,
                        Math.min(
                          40,
                          dayjs(entry.measured_at).diff(
                            dayjs(profile.due_date).subtract(40, 'week'),
                            'week',
                          ),
                        ),
                      )
                    : 0;
                  return (
                    <TableRow key={entry.id}>
                      <TableCell>
                        {dayjs(entry.measured_at).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{week}</TableCell>
                      <TableCell>{entry.weight_kg} kg</TableCell>
                      <TableCell padding="checkbox">
                        <Stack direction="row">
                          <IconButton
                            size="small"
                            onClick={() => openEdit(entry)}
                          >
                            <EditRounded
                              fontSize="small"
                              sx={{ color: 'text.secondary' }}
                            />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => setDeleteEntry(entry)}
                          >
                            <DeleteRounded
                              fontSize="small"
                              sx={{ color: 'error.main' }}
                            />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Stack>
      </Box>

      <Fab
        color="primary"
        onClick={openAdd}
        sx={{ position: 'fixed', bottom: 80, right: 24 }}
      >
        <AddRounded />
      </Fab>

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
