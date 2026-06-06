import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { taskListsApi, type TaskList } from '@meli/api';
import { FormTextField, shape } from '@meli/ui';

const COLORS = [
  '#F5A623',
  '#F28C8C',
  '#26C6DA',
  '#7B61FF',
  '#E53935',
  '#616161',
];

const schema = z.object({
  name: z.string().min(1, 'Tên danh sách không được để trống'),
  color: z.string(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  open: boolean;
  userId: string;
  onClose: () => void;
  onCreated: (list: TaskList) => void;
}

export function NewListDialog({ open, userId, onClose, onCreated }: Props) {
  const { control, handleSubmit, watch, setValue, reset, formState } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: { name: '', color: COLORS[0] },
    });

  const selectedColor = watch('color');

  const createMutation = useMutation({
    mutationFn: (values: FormValues) =>
      taskListsApi.create(userId, { name: values.name, color: values.color }),
    onSuccess: (res) => {
      const list = res.data as unknown as TaskList | null;
      if (list) {
        reset();
        onCreated(list);
      }
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle textAlign="center">Danh sách mới</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ pt: 1 }}>
          <FormTextField
            name="name"
            control={control}
            label="Danh sách tên"
            fullWidth
          />

          <Box>
            <Stack direction="row" spacing={1.5} justifyContent="center">
              {COLORS.map((color) => (
                <Box
                  key={color}
                  onClick={() => setValue('color', color)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: shape.full,
                    bgcolor: color,
                    cursor: 'pointer',
                    outline:
                      selectedColor === color ? `3px solid white` : 'none',
                    boxShadow:
                      selectedColor === color ? `0 0 0 5px ${color}66` : 'none',
                    transition: 'box-shadow 0.15s',
                  }}
                />
              ))}
            </Stack>
          </Box>

          {createMutation.isError && (
            <Typography variant="caption" color="error">
              Có lỗi xảy ra. Vui lòng thử lại.
            </Typography>
          )}

          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={handleSubmit((v) => createMutation.mutate(v))}
            disabled={!formState.isValid || createMutation.isPending}
          >
            {createMutation.isPending ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              'Lưu'
            )}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
