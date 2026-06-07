import { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import {
  CheckCircleOutlineRounded,
  DeleteRounded,
  EditRounded,
  RadioButtonUncheckedRounded,
  StarBorderRounded,
  StarRounded,
} from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { tasksApi, type TaskWithList } from '@meli/api';
import { shape } from '@meli/ui';

interface Props {
  task: TaskWithList | null;
  open: boolean;
  onClose: () => void;
  onEdit: (task: TaskWithList) => void;
  onDeleted: () => void;
  onToggleDone: (task: TaskWithList) => void;
  onToggleImportant: (task: TaskWithList) => void;
}

export function TaskBottomSheet({
  task,
  open,
  onClose,
  onEdit,
  onDeleted,
  onToggleDone,
  onToggleImportant,
}: Props) {
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const toggleImportantMutation = useMutation({
    mutationFn: () => {
      if (!task) throw new Error('Missing task');
      return tasksApi.update(task.id, { is_important: !task.is_important });
    },
    onSuccess: () => task && onToggleImportant(task),
  });

  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!task) throw new Error('Missing task');
      return Promise.resolve(tasksApi.remove(task.id)).then(() => undefined);
    },
    onSuccess: () => {
      setConfirmDeleteOpen(false);
      onDeleted();
    },
  });

  if (!task) return null;

  return (
    <>
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: shape.lg,
              borderTopRightRadius: shape.lg,
              pb: 2,
            },
          },
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 4,
            bgcolor: 'divider',
            borderRadius: shape.full,
            mx: 'auto',
            mt: 1.5,
            mb: 2,
          }}
        />

        <Stack spacing={0.5} sx={{ px: 2, mb: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {task.title}
          </Typography>
          {task.scheduled_date && (
            <Typography variant="caption" color="text.secondary">
              {dayjs(task.scheduled_date).format('DD/MM/YYYY')}
              {task.scheduled_time
                ? ` · ${task.scheduled_time.slice(0, 5)}`
                : ''}
            </Typography>
          )}
          {task.details && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {task.details}
            </Typography>
          )}
          {task.url && (
            <Link
              href={task.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              noWrap
            >
              {task.url}
            </Link>
          )}
        </Stack>

        <Divider />

        <Stack sx={{ px: 1, pt: 1 }}>
          <Button
            startIcon={<EditRounded />}
            onClick={() => onEdit(task)}
            sx={{ justifyContent: 'flex-start', color: 'text.primary' }}
          >
            Chỉnh sửa
          </Button>

          <Button
            startIcon={
              task.is_completed ? (
                <RadioButtonUncheckedRounded />
              ) : (
                <CheckCircleOutlineRounded />
              )
            }
            onClick={() => onToggleDone(task)}
            sx={{ justifyContent: 'flex-start', color: 'text.primary' }}
          >
            {task.is_completed
              ? 'Đánh dấu chưa hoàn thành'
              : 'Đánh dấu hoàn thành'}
          </Button>

          <Button
            startIcon={
              task.is_important ? <StarRounded /> : <StarBorderRounded />
            }
            onClick={() => toggleImportantMutation.mutate()}
            sx={{ justifyContent: 'flex-start', color: 'text.primary' }}
          >
            {task.is_important
              ? 'Bỏ đánh dấu quan trọng'
              : 'Đánh dấu quan trọng'}
          </Button>

          <Button
            startIcon={<DeleteRounded />}
            onClick={() => setConfirmDeleteOpen(true)}
            sx={{ justifyContent: 'flex-start', color: 'error.main' }}
          >
            Xóa
          </Button>
        </Stack>
      </Drawer>

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
      >
        <DialogTitle>Xóa việc cần làm?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc muốn xóa "{task.title}"? Hành động này không thể hoàn
            tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)}>Hủy</Button>
          <Button
            color="error"
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.isPending}
          >
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
