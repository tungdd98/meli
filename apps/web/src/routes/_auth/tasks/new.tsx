import { useState, useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Tooltip,
} from '@mui/material';
import { ChevronRightRounded } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs, { type Dayjs } from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { tasksApi, taskListsApi, type TaskList } from '@meli/api';
import { AppHeader, FormTextField, shape } from '@meli/ui';
import { useAuthStore } from '../../../stores/auth.store';
import { ListPickerDialog } from './-ListPickerDialog';

export const Route = createFileRoute('/_auth/tasks/new')({
  validateSearch: (search: Record<string, unknown>) => ({
    taskId: search['taskId'] as string | undefined,
  }),
  component: TaskFormScreen,
});

const schema = z
  .object({
    title: z.string().min(1, 'Tiêu đề không được để trống'),
    url: z
      .string()
      .optional()
      .refine((v) => !v || z.url().safeParse(v).success, {
        message: 'URL không hợp lệ',
      }),
    details: z.string().optional(),
    scheduled_date: z.custom<Dayjs | null>().optional(),
    scheduled_time: z.custom<Dayjs | null>().optional(),
    enable_notification: z.boolean(),
    is_important: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (data.enable_notification && !data.scheduled_date) {
      ctx.addIssue({
        code: 'custom',
        path: ['enable_notification'],
        message: 'Vui lòng chọn ngày trước',
      });
    }
  });

type FormValues = z.infer<typeof schema>;

function TaskFormScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const { taskId } = Route.useSearch();
  const isEdit = !!taskId;

  const [selectedList, setSelectedList] = useState<TaskList | null>(null);
  const [listPickerOpen, setListPickerOpen] = useState(false);
  const [listError, setListError] = useState(false);
  const [saveErrorOpen, setSaveErrorOpen] = useState(false);

  const { data: taskData } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => {
      if (!taskId) throw new Error('Missing taskId');
      return tasksApi.getById(taskId);
    },
    enabled: isEdit,
  });

  const { data: userListsData } = useQuery({
    queryKey: ['taskLists', user?.id],
    queryFn: () => {
      if (!user) throw new Error('Missing user');
      return taskListsApi.listByUser(user.id);
    },
    enabled: !!user && isEdit,
  });

  const { control, handleSubmit, watch, setValue, reset, formState } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        title: '',
        url: '',
        details: '',
        scheduled_date: null,
        scheduled_time: null,
        enable_notification: false,
        is_important: false,
      },
    });

  const scheduledDate = watch('scheduled_date');

  useEffect(() => {
    const task = taskData?.data;
    if (!task) return;
    const t = task as unknown as {
      title: string;
      url?: string | null;
      details?: string | null;
      scheduled_date?: string | null;
      scheduled_time?: string | null;
      notify_at?: string | null;
      is_important: boolean;
      list_id: string;
    };
    reset({
      title: t.title,
      url: t.url ?? '',
      details: t.details ?? '',
      scheduled_date: t.scheduled_date ? dayjs(t.scheduled_date) : null,
      scheduled_time: t.scheduled_time
        ? dayjs(`2000-01-01T${t.scheduled_time}`)
        : null,
      enable_notification: !!t.notify_at,
      is_important: t.is_important,
    });
    const lists = (userListsData?.data as unknown as TaskList[] | null) ?? [];
    const matched = lists.find((l) => l.id === t.list_id);
    if (matched) setSelectedList(matched);
  }, [taskData, userListsData, reset]);

  const saveMutation = useMutation({
    mutationFn: (values: FormValues) => {
      if (!selectedList) throw new Error('Missing list');

      const notify_at =
        values.enable_notification &&
        values.scheduled_date &&
        values.scheduled_time
          ? values.scheduled_date
              .set('hour', values.scheduled_time.hour())
              .set('minute', values.scheduled_time.minute())
              .toISOString()
          : null;

      const payload = {
        list_id: selectedList.id,
        title: values.title,
        url: values.url || null,
        details: values.details || null,
        scheduled_date: values.scheduled_date
          ? values.scheduled_date.format('YYYY-MM-DD')
          : null,
        scheduled_time: values.scheduled_time
          ? values.scheduled_time.format('HH:mm:ss')
          : null,
        notify_at,
        is_important: values.is_important,
      };

      return taskId
        ? tasksApi.update(taskId, payload)
        : tasksApi.create(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
      navigate({ to: '/tasks' });
    },
    onError: () => setSaveErrorOpen(true),
  });

  const onSubmit = handleSubmit((values) => {
    if (!selectedList) {
      setListError(true);
      return;
    }
    saveMutation.mutate(values);
  });

  const canSubmit =
    formState.isValid && !!selectedList && !saveMutation.isPending;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <AppHeader
        variant="plain"
        title="Việc cần làm"
        showBack
        onBack={() => navigate({ to: '/tasks' })}
      />

      <Stack gap={2} sx={{ flex: 1, p: 2, pb: 10 }}>
        <FormTextField
          name="title"
          control={control}
          label="Tiêu đề"
          placeholder="Nhập tiêu đề"
        />

        <FormTextField
          name="url"
          control={control}
          label="URL"
          placeholder="https://"
        />

        <FormTextField
          name="details"
          control={control}
          label="Chi tiết"
          placeholder="Nhập chi tiết"
          multiline
          minRows={3}
        />

        {/* Danh sách picker — styled as outlined TextField */}
        <Box>
          <TextField
            label="Danh sách"
            value={selectedList?.name ?? ''}
            placeholder="Chọn danh sách"
            onClick={() => setListPickerOpen(true)}
            slotProps={{
              input: {
                readOnly: true,
                endAdornment: (
                  <InputAdornment position="end">
                    {selectedList && (
                      <Box
                        sx={{
                          width: 10,
                          height: 10,
                          borderRadius: shape.full,
                          bgcolor: selectedList.color,
                          mr: 0.5,
                        }}
                      />
                    )}
                    <ChevronRightRounded sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              },
            }}
            fullWidth
            sx={{ cursor: 'pointer', '& *': { cursor: 'pointer' } }}
            error={listError && !selectedList}
            helperText={
              listError && !selectedList ? 'Vui lòng chọn danh sách' : undefined
            }
          />
        </Box>

        {/* Date picker */}
        <Controller
          name="scheduled_date"
          control={control}
          render={({ field }) => (
            <DatePicker
              label="Ngày"
              value={field.value ?? null}
              onChange={(val) => {
                field.onChange(val);
                if (!val) {
                  setValue('scheduled_time', null);
                  setValue('enable_notification', false);
                }
              }}
              slotProps={{ textField: { fullWidth: true } }}
            />
          )}
        />

        {/* Time picker */}
        <Controller
          name="scheduled_time"
          control={control}
          render={({ field }) => (
            <TimePicker
              label="Giờ"
              disabled={!scheduledDate}
              value={field.value ?? null}
              onChange={field.onChange}
              slotProps={{ textField: { fullWidth: true } }}
            />
          )}
        />

        {/* Notification toggle */}
        <Tooltip
          title={scheduledDate ? '' : 'Vui lòng chọn ngày trước'}
          placement="top"
        >
          <span>
            <Controller
              name="enable_notification"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Switch
                      checked={field.value}
                      onChange={(_, checked) => field.onChange(checked)}
                      disabled={!scheduledDate}
                    />
                  }
                  label="Nhận thông báo"
                  labelPlacement="start"
                  sx={{ width: '100%', justifyContent: 'space-between', ml: 0 }}
                />
              )}
            />
          </span>
        </Tooltip>

        {/* Important toggle */}
        <Controller
          name="is_important"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value}
                  onChange={(_, checked) => field.onChange(checked)}
                />
              }
              label="Đánh dấu quan trọng"
              labelPlacement="start"
              sx={{ width: '100%', justifyContent: 'space-between', ml: 0 }}
            />
          )}
        />

        <Button
          variant="contained"
          size="large"
          onClick={onSubmit}
          disabled={!canSubmit}
        >
          {saveMutation.isPending ? (
            <CircularProgress size={20} color="inherit" />
          ) : (
            'Lưu'
          )}
        </Button>
      </Stack>

      {user && (
        <ListPickerDialog
          open={listPickerOpen}
          userId={user.id}
          onClose={() => setListPickerOpen(false)}
          onSelect={(list) => {
            setSelectedList(list);
            setListError(false);
            setListPickerOpen(false);
          }}
        />
      )}

      <Snackbar
        open={saveErrorOpen}
        autoHideDuration={4000}
        onClose={() => setSaveErrorOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => setSaveErrorOpen(false)}>
          Có lỗi xảy ra. Vui lòng thử lại.
        </Alert>
      </Snackbar>
    </Box>
  );
}
