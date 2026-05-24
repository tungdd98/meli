import { createFileRoute } from '@tanstack/react-router';
import { Container, Typography } from '@mui/material';

export const Route = createFileRoute('/_auth/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About
      </Typography>
      <Typography variant="body1">About Meli.</Typography>
    </Container>
  );
}
