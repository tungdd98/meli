import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormSelect } from './FormSelect';

const meta: Meta<typeof FormSelect> = {
  component: FormSelect,
  title: 'Form/FormSelect',
};
export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

function DefaultStory() {
  const { control } = useForm({ defaultValues: { role: '' } });
  return (
    <FormSelect
      name="role"
      control={control}
      label="Vai trò"
      options={options}
    />
  );
}

function WithErrorStory() {
  const { control, setError } = useForm({ defaultValues: { role: '' } });
  useEffect(() => {
    setError('role', { message: 'Vui lòng chọn vai trò' });
  }, [setError]);
  return (
    <FormSelect
      name="role"
      control={control}
      label="Vai trò"
      options={options}
    />
  );
}

function DisabledStory() {
  const { control } = useForm({ defaultValues: { role: 'admin' } });
  return (
    <FormSelect
      name="role"
      control={control}
      label="Vai trò"
      options={options}
      disabled
    />
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
export const Disabled: Story = { render: () => <DisabledStory /> };
