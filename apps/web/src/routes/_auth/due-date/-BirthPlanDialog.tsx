import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
  Button,
  Alert,
} from '@mui/material';
import { ChildFriendlyRounded } from '@mui/icons-material';
import { profilesApi } from '@meli/api';
import { useAuthStore } from '../../../stores/auth.store';
import { birthPlanLabels } from './-data';

type BirthPlan = 'natural' | 'c_section';

export function BirthPlanDialog({
  open,
  userId,
  onClose,
}: {
  open: boolean;
  userId: string;
  onClose: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<BirthPlan | null>(null);

  function close() {
    setError(null);
    onClose();
  }

  async function select(birthPlan: BirthPlan) {
    setError(null);
    setPending(birthPlan);
    const { error: updateError } = await profilesApi.update(userId, {
      birth_plan: birthPlan,
    });
    setPending(null);
    if (updateError) {
      setError('Lưu thất bại. Vui lòng thử lại.');
      return;
    }
    useAuthStore.getState().updateProfile({ birth_plan: birthPlan });
    close();
  }

  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth="xs">
      <DialogContent>
        <Stack spacing={2} alignItems="center" sx={{ py: 1 }}>
          <Typography variant="h3" color="primary.main">
            Kế hoạch sinh
          </Typography>
          <ChildFriendlyRounded sx={{ fontSize: 64, color: 'primary.light' }} />
          <Typography color="textSecondary" textAlign="center">
            Mẹ dự định sinh bằng phương pháp nào?
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%' }}>
              {error}
            </Alert>
          )}

          <Stack spacing={1.5} sx={{ width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => select('natural')}
              disabled={pending !== null}
            >
              {birthPlanLabels.natural}
            </Button>
            <Button
              variant="outlined"
              onClick={() => select('c_section')}
              disabled={pending !== null}
            >
              {birthPlanLabels.c_section}
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
