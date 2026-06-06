import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Box,
  Button,
  Checkbox,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { AddRounded, ChecklistRounded, StarRounded } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { tasksApi, type TaskWithList } from '@meli/api';
import { AppHeader, shape } from '@meli/ui';
import { useAuthStore } from '../../../stores/auth.store';
import { TaskBottomSheet } from './-TaskBottomSheet';

export const Route = createFileRoute('/_auth/tasks/')({
  component: TaskListScreen,
});

function TaskListScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [selectedTask, setSelectedTask] = useState<TaskWithList | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: () => tasksApi.listByUser(user!.id),
    enabled: !!user,
  });

  const toggleDoneMutation = useMutation({
    mutationFn: ({ id, is_completed }: { id: string; is_completed: boolean }) =>
      tasksApi.update(id, { is_completed }),
    onMutate: async ({ id, is_completed }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks', user?.id] });
      const prev = queryClient.getQueryData(['tasks', user?.id]);
      queryClient.setQueryData(['tasks', user?.id], (old: typeof data) => {
        if (!old?.data) return old;
        return {
          ...old,
          data: old.data.map((t) => (t.id === id ? { ...t, is_completed } : t)),
        };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(['tasks', user?.id], ctx?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
    },
  });

  const tasks = data?.data ?? [];

  // Group by list
  const grouped = tasks.reduce<
    Record<
      string,
      { color: string; icon_name: string | null; tasks: TaskWithList[] }
    >
  >((acc, task) => {
    const key = task.list_id;
    if (!acc[key]) {
      acc[key] = {
        color: task.list_color,
        icon_name: task.list_icon_name,
        tasks: [],
      };
    }
    acc[key].tasks.push(task);
    return acc;
  }, {});

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
      <AppHeader variant="plain" title="Việc cần làm" />

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 10 }}>
        {isLoading && (
          <Stack spacing={1} sx={{ p: 2 }}>
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={56}
                sx={{ borderRadius: shape.md }}
              />
            ))}
          </Stack>
        )}

        {isError && (
          <Stack alignItems="center" spacing={1} sx={{ p: 3 }}>
            <Typography color="error" variant="body2">
              Không thể tải danh sách việc cần làm.
            </Typography>
            <Button size="small" onClick={() => refetch()}>
              Thử lại
            </Button>
          </Stack>
        )}

        {!isLoading && !isError && tasks.length === 0 && (
          <Stack alignItems="center" spacing={2} sx={{ mt: 8, px: 3 }}>
            <ChecklistRounded sx={{ fontSize: 64, color: 'text.disabled' }} />
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
            >
              Bạn chưa có việc cần làm.
            </Typography>
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: 'pointer', fontWeight: 600 }}
              onClick={() =>
                navigate({ to: '/tasks/new', search: { taskId: undefined } })
              }
            >
              Tạo ngay
            </Typography>
          </Stack>
        )}

        {!isLoading &&
          Object.entries(grouped).map(([listId, group]) => {
            const listName = group.tasks[0]?.list_name ?? '';
            return (
              <Box key={listId} sx={{ mb: 1 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  sx={{ px: 2, py: 1 }}
                >
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: shape.full,
                      bgcolor: group.color,
                      flexShrink: 0,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ fontWeight: 700, color: 'text.secondary' }}
                  >
                    {listName.toUpperCase()}
                  </Typography>
                </Stack>

                <List disablePadding>
                  {group.tasks.map((task) => (
                    <ListItem
                      key={task.id}
                      disablePadding
                      secondaryAction={
                        task.is_important ? (
                          <StarRounded
                            sx={{ color: 'warning.main', fontSize: 18 }}
                          />
                        ) : undefined
                      }
                    >
                      <ListItemIcon sx={{ minWidth: 40, pl: 1 }}>
                        <Checkbox
                          edge="start"
                          checked={task.is_completed}
                          onChange={(e) =>
                            toggleDoneMutation.mutate({
                              id: task.id,
                              is_completed: e.target.checked,
                            })
                          }
                          onClick={(e) => e.stopPropagation()}
                          size="small"
                          sx={{
                            color: group.color,
                            '&.Mui-checked': { color: group.color },
                          }}
                        />
                      </ListItemIcon>
                      <ListItemButton
                        onClick={() => setSelectedTask(task)}
                        sx={{ pl: 0, py: 1 }}
                      >
                        <ListItemText
                          primary={task.title}
                          secondary={
                            task.scheduled_date
                              ? dayjs(task.scheduled_date).format('DD/MM/YYYY')
                              : undefined
                          }
                          primaryTypographyProps={{
                            sx: task.is_completed
                              ? { textDecoration: 'line-through', opacity: 0.5 }
                              : {},
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            );
          })}
      </Box>

      <Fab
        color="primary"
        aria-label="Thêm việc cần làm"
        onClick={() =>
          navigate({ to: '/tasks/new', search: { taskId: undefined } })
        }
        sx={{ position: 'fixed', bottom: 80, right: 16 }}
      >
        <AddRounded />
      </Fab>

      <TaskBottomSheet
        task={selectedTask}
        open={!!selectedTask}
        onClose={() => setSelectedTask(null)}
        onEdit={(task) => {
          setSelectedTask(null);
          navigate({ to: '/tasks/new', search: { taskId: task.id } });
        }}
        onDeleted={() => {
          setSelectedTask(null);
          queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
        }}
        onToggleDone={(task) => {
          toggleDoneMutation.mutate({
            id: task.id,
            is_completed: !task.is_completed,
          });
          setSelectedTask((prev) =>
            prev ? { ...prev, is_completed: !prev.is_completed } : prev,
          );
        }}
        onToggleImportant={(task) => {
          queryClient.invalidateQueries({ queryKey: ['tasks', user?.id] });
          setSelectedTask((prev) =>
            prev ? { ...prev, is_important: !prev.is_important } : prev,
          );
        }}
      />
    </Box>
  );
}
