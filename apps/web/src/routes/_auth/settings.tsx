import { createFileRoute } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

export const Route = createFileRoute('/_auth/settings')({
  component: SettingsPage,
});

function SettingsPage() {
  return (
    <Box sx={{ p: 4, pb: 10 }}>
      <Typography variant="h4">Cài đặt</Typography>
    </Box>
  );
}
