import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Box } from '@mui/material';
import { AppHeader } from '@meli/ui';
import { guideCategories } from './-data';
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
      <AppHeader variant="primary" title="HƯỚNG DẪN" />

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
    </Box>
  );
}
