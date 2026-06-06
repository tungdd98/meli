import { useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Snackbar,
  Stack,
  Typography,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { taskListsApi, presetIconRegistry, type TaskList } from '@meli/api';
import { shape } from '@meli/ui';
import { NewListDialog } from './-NewListDialog';

interface Props {
  open: boolean;
  userId: string;
  onClose: () => void;
  onSelect: (list: TaskList) => void;
}

export function ListPickerDialog({ open, userId, onClose, onSelect }: Props) {
  const queryClient = useQueryClient();
  const [newListOpen, setNewListOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const { data: presetsData, isLoading: presetsLoading } = useQuery({
    queryKey: ['taskListPresets'],
    queryFn: () => taskListsApi.listPresets(),
    staleTime: Infinity,
  });

  const { data: userListsData } = useQuery({
    queryKey: ['taskLists', userId],
    queryFn: () => taskListsApi.listByUser(userId),
    enabled: !!userId,
  });

  const createListMutation = useMutation({
    mutationFn: (presetId: string) => {
      const preset = presetsData?.data?.find((p) => p.id === presetId);
      if (!preset) throw new Error('Preset not found');
      return taskListsApi.create(userId, {
        name: preset.name,
        color: preset.color,
        icon_name: preset.icon_name,
        preset_id: preset.id,
      });
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['taskLists', userId] });
      const list = res.data as unknown as TaskList | null;
      if (list) onSelect(list);
    },
    onError: () => setErrorOpen(true),
  });

  const handlePresetSelect = (presetId: string) => {
    const userLists = userListsData?.data as unknown as TaskList[] | null;
    const existing = (userLists ?? []).find((l) => l.preset_id === presetId);
    if (existing) {
      onSelect(existing);
    } else {
      createListMutation.mutate(presetId);
    }
  };

  const presets = presetsData?.data ?? [];

  return (
    <>
      <Dialog open={open} onClose={onClose} fullScreen>
        <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flex: 1, textAlign: 'center', pl: 5 }}>
            Thêm vào danh sách
          </Box>
          <IconButton
            aria-label="Đóng"
            onClick={onClose}
            edge="end"
            sx={{ color: 'text.secondary' }}
          >
            <CloseRounded />
          </IconButton>
        </DialogTitle>
        <Divider />

        <List disablePadding>
          <ListItemButton onClick={() => setNewListOpen(true)}>
            <ListItemText
              primary="Danh sách mới"
              primaryTypographyProps={{ color: 'primary', fontWeight: 600 }}
            />
          </ListItemButton>
          <Divider />

          {presetsLoading ? (
            <Stack spacing={1} sx={{ p: 2 }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton
                  key={i}
                  variant="rounded"
                  height={48}
                  sx={{ borderRadius: shape.md }}
                />
              ))}
            </Stack>
          ) : (
            presets.map((preset) => {
              const IconComponent = presetIconRegistry[preset.icon_name];
              return (
                <Box key={preset.id}>
                  <ListItemButton
                    onClick={() => handlePresetSelect(preset.id)}
                    disabled={createListMutation.isPending}
                  >
                    <ListItemIcon>
                      <Avatar
                        sx={{ bgcolor: preset.color, width: 36, height: 36 }}
                      >
                        {IconComponent ? (
                          <IconComponent
                            sx={{ fontSize: 20, color: 'white' }}
                          />
                        ) : (
                          <Typography variant="caption" color="white">
                            {preset.name[0]}
                          </Typography>
                        )}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText primary={preset.name} />
                  </ListItemButton>
                  <Divider />
                </Box>
              );
            })
          )}
        </List>

        <Snackbar
          open={errorOpen}
          autoHideDuration={4000}
          onClose={() => setErrorOpen(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="error" onClose={() => setErrorOpen(false)}>
            Không thể thêm danh sách. Vui lòng thử lại.
          </Alert>
        </Snackbar>
      </Dialog>

      <NewListDialog
        open={newListOpen}
        userId={userId}
        onClose={() => setNewListOpen(false)}
        onCreated={(list) => {
          queryClient.invalidateQueries({ queryKey: ['taskLists', userId] });
          setNewListOpen(false);
          onSelect(list);
        }}
      />
    </>
  );
}
