import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { ImageRounded } from '@mui/icons-material';
import { shape } from '@meli/ui';
import type { GuideCategory } from '../-types';

export function GuideCategoryCard({
  category,
  onClick,
}: {
  category: GuideCategory;
  onClick: () => void;
}) {
  const thumbnail = (
    <Box
      sx={{
        aspectRatio: '1 / 1',
        position: 'relative',
        bgcolor: 'coral.50',
        borderRadius: shape.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <ImageRounded sx={{ fontSize: 40, color: 'coral.100' }} />
      {!category.available && (
        <Chip
          label="Sắp có"
          size="small"
          color="primary"
          sx={{ position: 'absolute', top: 6, right: 6 }}
        />
      )}
    </Box>
  );

  const content = (
    <Stack spacing={1} sx={{ p: 1 }}>
      {thumbnail}
      <Typography
        variant="caption"
        sx={{ textAlign: 'center', fontWeight: 600 }}
      >
        {category.title}
      </Typography>
    </Stack>
  );

  if (!category.available) {
    return (
      <Card sx={{ opacity: 0.5 }} aria-disabled>
        {content}
      </Card>
    );
  }

  return (
    <Card>
      <CardActionArea onClick={onClick}>{content}</CardActionArea>
    </Card>
  );
}
