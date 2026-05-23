import { createFileRoute } from '@tanstack/react-router';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export const Route = createFileRoute('/about')({
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
