import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormTextField } from './FormTextField';

const meta: Meta<typeof FormTextField> = {
  component: FormTextField,
  title: 'Form/FormTextField',
};
export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
  const { control } = useForm({ defaultValues: { name: '' } });
  return (
    <FormTextField name="name" control={control} label="Họ và tên" fullWidth />
  );
}

function WithErrorStory() {
  const { control, setError } = useForm({ defaultValues: { name: '' } });
  useEffect(() => {
    setError('name', { message: 'Tối thiểu 2 ký tự' });
  }, [setError]);
  return (
    <FormTextField name="name" control={control} label="Họ và tên" fullWidth />
  );
}

function DisabledStory() {
  const { control } = useForm({ defaultValues: { name: 'Nguyễn Văn A' } });
  return (
    <FormTextField
      name="name"
      control={control}
      label="Họ và tên"
      fullWidth
      disabled
    />
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
export const Disabled: Story = { render: () => <DisabledStory /> };
