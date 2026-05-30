import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { guideCategories } from './-data';
import { AppBottomNav } from '../../../components/AppBottomNav';
import { GuideCategoryCard } from './-components/GuideCategoryCard';

export const Route = createFileRoute('/_auth/guide/')({
  component: GuideIndexPage,
});

function GuideIndexPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <Typography variant="subtitle1" sx={{ flex: 1, textAlign: 'center' }}>
            HƯỚNG DẪN
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 10 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1.5,
            p: 2,
            maxWidth: 480,
            mx: 'auto',
          }}
        >
          {guideCategories.map((category) => (
            <GuideCategoryCard
              key={category.slug}
              category={category}
              onClick={() =>
                navigate({
                  to: '/guide/$categorySlug',
                  params: { categorySlug: category.slug },
                })
              }
            />
          ))}
        </Box>
      </Box>

      <AppBottomNav value={1} />
    </Box>
  );
}
