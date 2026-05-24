import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { FormDatePicker } from './FormDatePicker';

const meta: Meta<typeof FormDatePicker> = {
  component: FormDatePicker,
  title: 'Form/FormDatePicker',
};
export default meta;
type Story = StoryObj<typeof meta>;

function DefaultStory() {
  const { control } = useForm({ defaultValues: { birthDate: null } });
  return (
    <FormDatePicker name="birthDate" control={control} label="Ngày sinh" />
  );
}

function WithValueStory() {
  const { control } = useForm({
    defaultValues: { birthDate: dayjs('1998-06-15') },
  });
  return (
    <FormDatePicker name="birthDate" control={control} label="Ngày sinh" />
  );
}

function WithErrorStory() {
  const { control, setError } = useForm({ defaultValues: { birthDate: null } });
  useEffect(() => {
    setError('birthDate', { message: 'Vui lòng chọn ngày sinh' });
  }, [setError]);
  return (
    <FormDatePicker name="birthDate" control={control} label="Ngày sinh" />
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const WithValue: Story = { render: () => <WithValueStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
