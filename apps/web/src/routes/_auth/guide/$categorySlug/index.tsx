import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  ArrowBackRounded,
  ChevronRightRounded,
  ImageRounded,
} from '@mui/icons-material';
import { getCategory, getWeeks } from '../-data';
import { AppBottomNav } from '../../../../components/AppBottomNav';

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
      <AppBar position="static" color="primary" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="Quay lại"
            onClick={() => navigate({ to: '/guide' })}
          >
            <ArrowBackRounded />
          </IconButton>
          <Typography variant="subtitle1" sx={{ flex: 1, textAlign: 'center' }}>
            {category?.title}
          </Typography>
          <Box sx={{ width: 40 }} />
        </Toolbar>
      </AppBar>

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

      <AppBottomNav value={1} />
    </Box>
  );
}
