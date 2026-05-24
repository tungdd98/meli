import type { Meta, StoryObj } from '@storybook/react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { FavoriteRounded, LocalOfferRounded } from '@mui/icons-material';
import { fn } from 'storybook/test';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  args: {
    label: 'Chip',
  },
};
export default meta;
type Story = StoryObj<typeof Chip>;

export const Colors: Story = {
  render: () => (
    <Stack direction="row" flexWrap="wrap" gap={1}>
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Warning" color="warning" />
      <Chip label="Error" color="error" />
      <Chip label="Default" />
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack direction="row" gap={1}>
      <Chip label="Filled" color="primary" variant="filled" />
      <Chip label="Outlined" color="primary" variant="outlined" />
    </Stack>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Stack direction="row" gap={1}>
      <Chip label="Yêu thích" color="primary" icon={<FavoriteRounded />} />
      <Chip label="Thẻ tag" color="secondary" icon={<LocalOfferRounded />} />
    </Stack>
  ),
};

export const WithDelete: Story = {
  render: () => (
    <Stack direction="row" gap={1}>
      <Chip label="Primary" color="primary" onDelete={fn()} />
      <Chip label="Secondary" color="secondary" onDelete={fn()} />
      <Chip label="Default" onDelete={fn()} />
    </Stack>
  ),
};
