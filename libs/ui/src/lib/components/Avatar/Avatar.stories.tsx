import type { Meta, StoryObj } from '@storybook/react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Avatar sx={{ width: 32, height: 32, fontSize: '0.75rem' }}>SM</Avatar>
      <Avatar sx={{ width: 40, height: 40, fontSize: '0.875rem' }}>MD</Avatar>
      <Avatar sx={{ width: 56, height: 56 }}>LG</Avatar>
      <Avatar sx={{ width: 72, height: 72, fontSize: '1.25rem' }}>XL</Avatar>
    </Stack>
  ),
};

export const WithImage: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar
        src="https://i.pravatar.cc/56?img=1"
        alt="Nguyễn Thị A"
        sx={{ width: 56, height: 56 }}
      />
      <Avatar
        src="https://i.pravatar.cc/56?img=5"
        alt="Trần Thị B"
        sx={{ width: 56, height: 56 }}
      />
    </Stack>
  ),
};

export const Initials: Story = {
  render: () => (
    <Stack direction="row" spacing={2}>
      <Avatar>TN</Avatar>
      <Avatar>AB</Avatar>
      <Avatar>MK</Avatar>
    </Stack>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Avatar sx={{ width: 56, height: 56, border: '2px solid #FFE0E0' }}>
        TN
      </Avatar>
      <Avatar
        src="https://i.pravatar.cc/56?img=3"
        alt="User"
        sx={{ width: 56, height: 56, border: '3px solid #F08180' }}
      />
    </Stack>
  ),
};
