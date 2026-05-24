import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormSwitch } from './FormSwitch';

const meta: Meta<typeof FormSwitch> = {
  component: FormSwitch,
  title: 'Form/FormSwitch',
};
export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
  const { control } = useForm({ defaultValues: { notifications: false } });
  return (
    <FormSwitch name="notifications" control={control} label="Nhận thông báo" />
  );
}

function OnStory() {
  const { control } = useForm({ defaultValues: { notifications: true } });
  return (
    <FormSwitch name="notifications" control={control} label="Nhận thông báo" />
  );
}

function WithErrorStory() {
  const { control, setError } = useForm({
    defaultValues: { notifications: false },
  });
  useEffect(() => {
    setError('notifications', { message: 'Trường bắt buộc' });
  }, [setError]);
  return (
    <FormSwitch name="notifications" control={control} label="Nhận thông báo" />
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const On: Story = { render: () => <OnStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
