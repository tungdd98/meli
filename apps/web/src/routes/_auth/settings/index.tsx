import { useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';
import { LogoutRounded, PersonRounded } from '@mui/icons-material';
import { SettingsRow } from '@meli/ui';
import { useAuthStore } from '../../../stores/auth.store';
import { AppBottomNav } from '../../../components/AppBottomNav';

export const Route = createFileRoute('/_auth/settings/')({
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const signOut = useAuthStore((state) => state.signOut);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setSigningOut(true);
    setError(null);
    try {
      await signOut();
      setConfirmOpen(false);
      navigate({ to: '/login' });
    } catch {
      setError('Đăng xuất thất bại. Vui lòng thử lại.');
      setSigningOut(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <Box sx={{ flex: 1, p: 2, pb: 10 }}>
        <Stack gap={2}>
          <Typography variant="h4">Cài đặt</Typography>

          <SettingsRow
            label="Thông tin cá nhân"
            icon={<PersonRounded />}
            onClick={() => navigate({ to: '/settings/profile' })}
          />

          <SettingsRow
            label="Đăng xuất"
            icon={<LogoutRounded />}
            color="primary"
            hideChevron
            onClick={() => setConfirmOpen(true)}
          />

          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Đăng xuất</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn đăng xuất không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            onClick={() => setConfirmOpen(false)}
            disabled={signingOut}
          >
            Hủy
          </Button>
          <Button
            variant="contained"
            onClick={handleLogout}
            disabled={signingOut}
          >
            Đăng xuất
          </Button>
        </DialogActions>
      </Dialog>

      <AppBottomNav value={3} />
    </Box>
  );
}
