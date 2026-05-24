import type { Meta, StoryObj } from '@storybook/react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Basic: Story = {
  render: () => (
    <Card sx={{ maxWidth: 360 }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Card Title
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Card content goes here. This card uses the PawSpa-inspired design with
          offset shadow and coral border.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export const WithHeaderAndActions: Story = {
  render: () => (
    <Card sx={{ maxWidth: 360 }}>
      <CardHeader title="Card Title" subheader="Card subtitle" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Card with header and action buttons at the bottom.
        </Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: 'column', gap: 1, p: 2, pt: 0 }}>
        <Button variant="contained" size="medium">
          Primary Action
        </Button>
        <Button variant="outlined" size="medium">
          Secondary Action
        </Button>
      </CardActions>
    </Card>
  ),
};

export const WithMedia: Story = {
  render: () => (
    <Card sx={{ maxWidth: 360 }}>
      <CardMedia
        component="img"
        height="180"
        image="https://picsum.photos/seed/meli/360/180"
        alt="Card image"
        sx={{ borderRadius: 0 }}
      />
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Card with Image
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Card content with media at the top.
        </Typography>
      </CardContent>
    </Card>
  ),
};
