import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { ChevronRightRounded, ImageRounded } from '@mui/icons-material';
import { AppHeader } from '@meli/ui';
import { getCategory, getWeeks } from '../-data';

export const Route = createFileRoute('/_auth/guide/$categorySlug/')({
  beforeLoad: ({ params }) => {
    const category = getCategory(params.categorySlug);
    if (!category || !category.available) {
      throw redirect({ to: '/guide' });
    }
  },
  component: GuideCategoryPage,
});

function GuideCategoryPage() {
  const navigate = useNavigate();
  const { categorySlug } = Route.useParams();
  const category = getCategory(categorySlug);
  const weeks = getWeeks(categorySlug);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        bgcolor: 'background.default',
      }}
    >
      <AppHeader
        variant="primary"
        showBack
        title={category?.title}
        onBack={() => navigate({ to: '/guide' })}
      />

      <Box sx={{ flex: 1, overflowY: 'auto', pb: 10 }}>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {weeks.length === 0 ? (
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ textAlign: 'center', py: 4 }}
            >
              Nội dung đang được cập nhật.
            </Typography>
          ) : (
            <List>
              {weeks.map((item) => (
                <ListItemButton
                  key={item.week}
                  onClick={() =>
                    navigate({
                      to: '/guide/$categorySlug/$week',
                      params: {
                        categorySlug,
                        week: String(item.week),
                      },
                    })
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'coral.50' }}>
                      <ImageRounded sx={{ color: 'coral.100' }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.subtitle}
                  />
                  <ChevronRightRounded sx={{ color: 'text.secondary' }} />
                </ListItemButton>
              ))}
            </List>
          )}
        </Box>
      </Box>
    </Box>
  );
}
