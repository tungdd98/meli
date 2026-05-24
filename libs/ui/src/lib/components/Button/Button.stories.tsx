import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    size: 'medium',
    variant: 'contained',
  },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Contained: Story = {
  args: { variant: 'contained', color: 'primary' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', color: 'primary' },
};

export const Text: Story = {
  args: { variant: 'text', color: 'primary' },
};

export const Sizes: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained" size="small">
        Small — 36px
      </Button>
      <Button variant="contained" size="medium">
        Medium — 44px
      </Button>
      <Button variant="contained" size="large">
        Large — 52px
      </Button>
    </Stack>
  ),
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
    </Stack>
  ),
};

export const Secondary: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained" color="secondary">
        Contained Secondary
      </Button>
      <Button variant="outlined" color="secondary">
        Outlined Secondary
      </Button>
    </Stack>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Stack spacing={2} sx={{ maxWidth: 320 }}>
      <Button variant="contained" disabled>
        Contained Disabled
      </Button>
      <Button variant="outlined" disabled>
        Outlined Disabled
      </Button>
      <Button variant="text" disabled>
        Text Disabled
      </Button>
    </Stack>
  ),
};
