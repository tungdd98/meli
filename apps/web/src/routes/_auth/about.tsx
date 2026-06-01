import { createFileRoute, useRouter } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';
import { AppHeader } from '@meli/ui';

export const Route = createFileRoute('/_auth/about')({
  component: AboutPage,
});

function AboutPage() {
  const router = useRouter();

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
        variant="primary"
        showBack
        title="Về chúng tôi"
        onBack={() => router.history.back()}
      />

      <Box sx={{ flex: 1, p: 2, pb: 10 }}>
        <Typography variant="body1">About Meli.</Typography>
      </Box>
    </Box>
  );
}
