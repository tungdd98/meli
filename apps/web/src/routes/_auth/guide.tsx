import { createFileRoute } from '@tanstack/react-router';
import { Box, Typography } from '@mui/material';

export const Route = createFileRoute('/_auth/guide')({
  component: GuidePage,
});

function GuidePage() {
  return (
    <Box sx={{ p: 4, pb: 10 }}>
      <Typography variant="h4">Hướng dẫn</Typography>
    </Box>
  );
}
