import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useAuthStore } from '../stores/auth.store';

export const Route = createFileRoute('/onboarding')({
  beforeLoad: () => {
    const { session } = useAuthStore.getState();
    if (!session) throw redirect({ to: '/login' });
  },
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        sx={{
          bgcolor: 'background.default',
          display: 'flex',
          justifyContent: 'center',
          minHeight: '100dvh',
          p: 2,
          width: '100%',
        }}
      >
        <Outlet />
      </Box>
    </LocalizationProvider>
  );
}
