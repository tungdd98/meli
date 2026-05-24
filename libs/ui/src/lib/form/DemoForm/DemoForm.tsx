import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Dayjs } from 'dayjs';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { FormTextField } from '../FormTextField';
import { FormSelect } from '../FormSelect';
import { FormCheckbox } from '../FormCheckbox';
import { FormSwitch } from '../FormSwitch';
import { FormRadioGroup } from '../FormRadioGroup';
import { FormDatePicker } from '../FormDatePicker';
import { FormAutocomplete } from '../FormAutocomplete';

const demoSchema = z.object({
  fullName: z.string().min(2, 'Tối thiểu 2 ký tự'),
  email: z.email('Email không hợp lệ'),
  password: z.string().min(8, 'Tối thiểu 8 ký tự'),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  agreeTerms: z.boolean().refine(Boolean, 'Bắt buộc đồng ý'),
  notifications: z.boolean(),
  gender: z.enum(['male', 'female', 'other'], {
    error: 'Vui lòng chọn giới tính',
  }),
  birthDate: z.any().nullable(),
  skills: z.array(z.string()).min(1, 'Chọn ít nhất 1 kỹ năng'),
});

export type DemoFormValues = z.infer<typeof demoSchema>;

const emptyDefaults = {
  fullName: '',
  email: '',
  password: '',
  role: '',
  agreeTerms: false,
  notifications: false,
  gender: '' as DemoFormValues['gender'],
  birthDate: null as null | Dayjs,
  skills: [] as string[],
};

export interface DemoFormProps {
  onSubmit?: (data: DemoFormValues) => void;
  defaultValues?: Partial<typeof emptyDefaults>;
}

const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Editor', value: 'editor' },
  { label: 'Viewer', value: 'viewer' },
];

const genderOptions = [
  { label: 'Nam', value: 'male' },
  { label: 'Nữ', value: 'female' },
  { label: 'Khác', value: 'other' },
];

const skillOptions = ['React', 'TypeScript', 'Node.js', 'GraphQL', 'Docker'];

export function DemoForm({ onSubmit, defaultValues }: DemoFormProps) {
  const { control, handleSubmit } = useForm<DemoFormValues>({
    resolver: zodResolver(demoSchema),
    defaultValues: { ...emptyDefaults, ...defaultValues },
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit((data) => onSubmit?.(data))}
      noValidate
    >
      <Stack spacing={3} sx={{ maxWidth: 480 }}>
        <Typography variant="h6">Demo Form</Typography>
        <FormTextField
          name="fullName"
          control={control}
          label="Họ và tên"
          fullWidth
        />
        <FormTextField
          name="email"
          control={control}
          label="Email"
          type="email"
          fullWidth
        />
        <FormTextField
          name="password"
          control={control}
          label="Mật khẩu"
          type="password"
          fullWidth
        />
        <FormSelect
          name="role"
          control={control}
          label="Vai trò"
          options={roleOptions}
        />
        <FormRadioGroup
          name="gender"
          control={control}
          label="Giới tính"
          options={genderOptions}
        />
        <FormDatePicker name="birthDate" control={control} label="Ngày sinh" />
        <FormAutocomplete
          name="skills"
          control={control}
          label="Kỹ năng"
          options={skillOptions}
          multiple
        />
        <FormSwitch
          name="notifications"
          control={control}
          label="Nhận thông báo"
        />
        <FormCheckbox
          name="agreeTerms"
          control={control}
          label="Tôi đồng ý với điều khoản sử dụng"
        />
        <Button type="submit" variant="contained" size="large">
          Gửi
        </Button>
      </Stack>
    </Box>
  );
}
