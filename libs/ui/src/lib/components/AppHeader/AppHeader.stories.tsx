import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@mui/material';
import { IosShareRounded, MoreHorizRounded } from '@mui/icons-material';
import { fn } from 'storybook/test';
import { AppHeader } from './AppHeader';

const meta: Meta<typeof AppHeader> = {
  component: AppHeader,
  title: 'Components/AppHeader',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { title: 'HƯỚNG DẪN', variant: 'primary' },
};

export const PrimaryWithBack: Story = {
  args: {
    title: 'CÂN NẶNG CỦA MẸ',
    variant: 'primary',
    showBack: true,
    onBack: fn(),
  },
};

export const Plain: Story = {
  args: { title: 'Cài đặt', variant: 'plain' },
};

export const TransparentOverImage: Story = {
  args: {
    variant: 'transparent',
    showBack: true,
    onBack: fn(),
    rightAction: (
      <IconButton sx={{ bgcolor: 'background.paper', boxShadow: 1 }}>
        <IosShareRounded />
      </IconButton>
    ),
  },
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: 200, background: '#f4b6b0' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithRightAction: Story = {
  args: {
    variant: 'primary',
    showBack: true,
    onBack: fn(),
    rightAction: (
      <IconButton sx={{ color: 'inherit' }}>
        <MoreHorizRounded />
      </IconButton>
    ),
  },
};
