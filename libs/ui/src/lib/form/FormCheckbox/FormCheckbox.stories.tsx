import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormCheckbox } from './FormCheckbox';

const meta: Meta<typeof FormCheckbox> = {
  component: FormCheckbox,
  title: 'Form/FormCheckbox',
};
export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
  const { control } = useForm({ defaultValues: { agree: false } });
  return (
    <FormCheckbox
      name="agree"
      control={control}
      label="Tôi đồng ý với điều khoản"
    />
  );
}

function WithErrorStory() {
  const { control, setError } = useForm({ defaultValues: { agree: false } });
  useEffect(() => {
    setError('agree', { message: 'Bắt buộc đồng ý' });
  }, [setError]);
  return (
    <FormCheckbox
      name="agree"
      control={control}
      label="Tôi đồng ý với điều khoản"
    />
  );
}

function DisabledStory() {
  const { control } = useForm({ defaultValues: { agree: true } });
  return (
    <FormCheckbox
      name="agree"
      control={control}
      label="Tôi đồng ý với điều khoản"
      disabled
    />
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
export const Disabled: Story = { render: () => <DisabledStory /> };
