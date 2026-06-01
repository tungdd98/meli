import { createFileRoute } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';
import { AppHeader } from '@meli/ui';

export const Route = createFileRoute('/_auth/ai')({
  component: AiPage,
});

function AiPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <AppHeader variant="plain" title="AI" />

      <Box sx={{ flex: 1, p: 4, pb: 10 }}>
        <Typography variant="body2" color="textSecondary">
          Tính năng đang được phát triển.
        </Typography>
      </Box>
    </Box>
  );
}
