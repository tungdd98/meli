import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import dayjs from 'dayjs';
import { DemoForm } from './DemoForm';

const meta: Meta<typeof DemoForm> = {
  component: DemoForm,
  title: 'Form/DemoForm',
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
};

export const Prefilled: Story = {
  args: {
    onSubmit: fn(),
    defaultValues: {
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      password: 'securePass123',
      role: 'editor',
      agreeTerms: true,
      notifications: true,
      gender: 'male',
      birthDate: dayjs('1998-06-15'),
      skills: ['React', 'TypeScript'],
    },
  },
};
