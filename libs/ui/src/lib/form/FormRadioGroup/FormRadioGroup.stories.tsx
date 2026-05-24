import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormRadioGroup } from './FormRadioGroup';

const meta: Meta<typeof FormRadioGroup> = {
  component: FormRadioGroup,
  title: 'Form/FormRadioGroup',
};
export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
];

function DefaultStory() {
  const { control } = useForm({ defaultValues: { gender: '' } });
  return (
    <FormRadioGroup
      name="gender"
      control={control}
      label="Giới tính"
      options={options}
    />
  );
}

function WithValueStory() {
  const { control } = useForm({ defaultValues: { gender: 'female' } });
  return (
    <FormRadioGroup
      name="gender"
      control={control}
      label="Giới tính"
      options={options}
    />
  );
}

function WithErrorStory() {
  const { control, setError } = useForm({ defaultValues: { gender: '' } });
  useEffect(() => {
    setError('gender', { message: 'Vui lòng chọn giới tính' });
  }, [setError]);
  return (
    <FormRadioGroup
      name="gender"
      control={control}
      label="Giới tính"
      options={options}
    />
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const WithValue: Story = { render: () => <WithValueStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
