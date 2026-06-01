import { createFileRoute, notFound, useNavigate } from '@tanstack/react-router';
import { Box, Stack, Typography } from '@mui/material';
import { ImageRounded } from '@mui/icons-material';
import { AppHeader } from '@meli/ui';
import { getWeek } from '../-data';
import type { GuideBlock } from '../-types';

export const Route = createFileRoute('/_auth/guide/$categorySlug/$week')({
  loader: ({ params }) => {
    const week = Number(params.week);
    const guideWeek = Number.isInteger(week)
      ? getWeek(params.categorySlug, week)
      : undefined;
    if (!guideWeek) {
      throw notFound();
    }
    return { guideWeek };
  },
  component: GuideDetailPage,
});

function BlockContent({ block }: { block: GuideBlock }) {
  if (block.type === 'heading') {
    return (
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        {block.text}
      </Typography>
    );
  }
  if (block.type === 'italic') {
    return (
      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
        {block.text}
      </Typography>
    );
  }
  return <Typography variant="body1">{block.text}</Typography>;
}

function GuideDetailPage() {
  const navigate = useNavigate();
  const { categorySlug } = Route.useParams();
  const { guideWeek } = Route.useLoaderData();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          pb: 10,
          width: '100%',
          maxWidth: 480,
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            aspectRatio: '4 / 3',
            bgcolor: 'coral.50',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ImageRounded sx={{ fontSize: 72, color: 'coral.100' }} />
          <AppHeader
            variant="transparent"
            showBack
            onBack={() =>
              navigate({
                to: '/guide/$categorySlug',
                params: { categorySlug },
              })
            }
          />
        </Box>

        <Stack spacing={2} sx={{ p: 2 }}>
          <Stack spacing={0.5}>
            <Typography variant="h4">{guideWeek.title}</Typography>
            <Typography variant="body2" color="primary">
              {guideWeek.subtitle}
            </Typography>
          </Stack>
          {guideWeek.body.map((block, idx) => (
            <BlockContent key={idx} block={block} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
