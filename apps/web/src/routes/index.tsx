import { createFileRoute } from '@tanstack/react-router';
import { Container, Typography } from '@mui/material';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Meli
      </Typography>
      <Typography variant="body1">Welcome to Meli.</Typography>
    </Container>
  );
}
