import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import { ChecklistRounded, ChevronRightRounded } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import dayjs from 'dayjs';
import { tasksApi } from '@meli/api';

interface Props {
  userId: string;
}

export function TaskSummaryCard({ userId }: Props) {
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks', userId],
    queryFn: () => tasksApi.listByUser(userId),
    enabled: !!userId,
  });

  const tasks = data?.data ?? [];
  const pendingTasks = tasks.filter((t) => !t.is_completed);
  const nextTask =
    pendingTasks.find((t) => t.scheduled_date != null) ?? pendingTasks[0];

  return (
    <Card>
      <CardActionArea
        onClick={() => navigate({ to: '/tasks' })}
        sx={{ height: '100%' }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            height: '100%',
          }}
        >
          <Stack direction="row" alignItems="center">
            <Typography
              variant="caption"
              sx={{ color: 'primary.main', fontWeight: 700, flex: 1 }}
            >
              VIỆC CẦN LÀM
            </Typography>
            <ChevronRightRounded
              sx={{ color: 'primary.main' }}
              fontSize="small"
            />
          </Stack>

          <Divider sx={{ borderColor: 'coral.100' }} />

          <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
            {isLoading ? (
              <Skeleton variant="text" width="80%" />
            ) : isError ? (
              <Typography
                variant="caption"
                color="text.disabled"
                textAlign="center"
              >
                Không thể tải
              </Typography>
            ) : pendingTasks.length === 0 ? (
              <Stack alignItems="center" spacing={0.5} sx={{ width: '100%' }}>
                <ChecklistRounded
                  sx={{ color: 'text.disabled', fontSize: 28 }}
                />
                <Typography
                  variant="caption"
                  color="text.disabled"
                  textAlign="center"
                >
                  Chưa có việc cần làm
                </Typography>
                <Button
                  size="small"
                  color="primary"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate({
                      to: '/tasks/new',
                      search: { taskId: undefined },
                    });
                  }}
                  sx={{ fontSize: '0.7rem', py: 0, minHeight: 0 }}
                >
                  Tạo ngay
                </Button>
              </Stack>
            ) : (
              <Stack spacing={0}>
                <Typography variant="h4">{pendingTasks.length}</Typography>
                <Typography variant="caption" color="text.secondary">
                  việc cần làm
                </Typography>
                {nextTask && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    sx={{ maxWidth: 120, mt: 0.5 }}
                  >
                    {nextTask.title}
                    {nextTask.scheduled_date
                      ? ` · ${dayjs(nextTask.scheduled_date).format('DD/MM')}`
                      : ''}
                  </Typography>
                )}
              </Stack>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
