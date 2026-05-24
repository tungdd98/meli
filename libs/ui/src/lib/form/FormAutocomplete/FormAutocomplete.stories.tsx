import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { FormAutocomplete } from './FormAutocomplete';

const meta: Meta<typeof FormAutocomplete> = {
  component: FormAutocomplete,
  title: 'Form/FormAutocomplete',
};
export default meta;
type Story = StoryObj<typeof meta>;

const skillOptions = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker'];

function SingleStory() {
  const { control } = useForm({ defaultValues: { skill: null } });
  return (
    <FormAutocomplete
      name="skill"
      control={control}
      label="Kỹ năng chính"
      options={skillOptions}
    />
  );
}

function MultipleStory() {
  const { control } = useForm({ defaultValues: { skills: [] } });
  return (
    <FormAutocomplete
      name="skills"
      control={control}
      label="Kỹ năng"
      options={skillOptions}
      multiple
    />
  );
}

function WithErrorStory() {
  const { control, setError } = useForm({ defaultValues: { skills: [] } });
  useEffect(() => {
    setError('skills', { message: 'Chọn ít nhất 1 kỹ năng' });
  }, [setError]);
  return (
    <FormAutocomplete
      name="skills"
      control={control}
      label="Kỹ năng"
      options={skillOptions}
      multiple
    />
  );
}

export const Single: Story = { render: () => <SingleStory /> };
export const Multiple: Story = { render: () => <MultipleStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
