import type { Meta, StoryObj } from '@storybook/react';
import HomeIcon from '@mui/icons-material/Home';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { fn } from 'storybook/test';
import { BottomNav } from './BottomNav';

const threeItems = [
  { label: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon /> },
  { label: 'Search', icon: <SearchOutlinedIcon />, activeIcon: <SearchIcon /> },
  {
    label: 'Profile',
    icon: <PersonOutlinedIcon />,
    activeIcon: <PersonIcon />,
  },
];

const meta: Meta<typeof BottomNav> = {
  component: BottomNav,
  title: 'Components/BottomNav',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: threeItems,
    value: 0,
    onChange: fn(),
  },
};

export const LastItemActive: Story = {
  args: {
    items: threeItems,
    value: 2,
    onChange: fn(),
  },
};

export const ManyItems: Story = {
  args: {
    items: [
      { label: 'Home', icon: <HomeOutlinedIcon />, activeIcon: <HomeIcon /> },
      {
        label: 'Search',
        icon: <SearchOutlinedIcon />,
        activeIcon: <SearchIcon />,
      },
      {
        label: 'Saved',
        icon: <FavoriteBorderIcon />,
        activeIcon: <FavoriteIcon />,
      },
      {
        label: 'Alerts',
        icon: <NotificationsNoneIcon />,
        activeIcon: <NotificationsIcon />,
      },
      {
        label: 'Profile',
        icon: <PersonOutlinedIcon />,
        activeIcon: <PersonIcon />,
      },
    ],
    value: 0,
    onChange: fn(),
  },
};
