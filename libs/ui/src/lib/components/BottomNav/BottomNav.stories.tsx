import type { Meta, StoryObj } from '@storybook/react';
import {
  HomeRounded,
  SearchRounded,
  PersonRounded,
  FavoriteRounded,
  NotificationsRounded,
} from '@mui/icons-material';
import { fn } from 'storybook/test';
import { BottomNav } from './BottomNav';

const threeItems = [
  { label: 'Home', icon: <HomeRounded /> },
  { label: 'Search', icon: <SearchRounded /> },
  { label: 'Profile', icon: <PersonRounded /> },
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
      { label: 'Home', icon: <HomeRounded /> },
      { label: 'Search', icon: <SearchRounded /> },
      { label: 'Saved', icon: <FavoriteRounded /> },
      { label: 'Alerts', icon: <NotificationsRounded /> },
      { label: 'Profile', icon: <PersonRounded /> },
    ],
    value: 0,
    onChange: fn(),
  },
};
