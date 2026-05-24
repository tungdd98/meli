# RHF + Zod Form Components Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Xây dựng bộ 7 form field components (FormTextField, FormSelect, FormCheckbox, FormSwitch, FormRadioGroup, FormDatePicker, FormAutocomplete) và một DemoForm tổng hợp trong `@meli/ui`, tất cả dùng pattern Controller của react-hook-form + Zod validation, kèm Storybook stories.

**Architecture:** Mỗi component là một MUI component được bọc bởi RHF `Controller`, nhận `name` + `control` prop, tự xử lý error state từ `fieldState.error`. Zod schema khai báo bên ngoài component và truyền vào `useForm` qua `zodResolver`. Components đặt trong `libs/ui/src/lib/form/`, mỗi component có thư mục riêng co-locate với story, export qua `@meli/ui`.

**Tech Stack:** react-hook-form, @hookform/resolvers, zod, @mui/x-date-pickers (đã có v8.28.7), dayjs (đã có v1.11.20), MUI v6, Storybook 10.

---

## File Map

| File                                                                 | Hành động | Mục đích                                   |
| -------------------------------------------------------------------- | --------- | ------------------------------------------ |
| `libs/ui/src/lib/ui.ts`                                              | Modify    | Thêm `export * from './form'`              |
| `libs/ui/.storybook/preview.tsx`                                     | Modify    | Thêm `LocalizationProvider` decorator      |
| `libs/ui/src/lib/form/index.ts`                                      | Create    | Barrel re-export toàn bộ form components   |
| `libs/ui/src/lib/form/FormTextField/FormTextField.tsx`               | Create    | TextField wrapper                          |
| `libs/ui/src/lib/form/FormTextField/FormTextField.stories.tsx`       | Create    | Stories cho FormTextField                  |
| `libs/ui/src/lib/form/FormTextField/index.ts`                        | Create    | Barrel export                              |
| `libs/ui/src/lib/form/FormSelect/FormSelect.tsx`                     | Create    | Select wrapper                             |
| `libs/ui/src/lib/form/FormSelect/FormSelect.stories.tsx`             | Create    | Stories cho FormSelect                     |
| `libs/ui/src/lib/form/FormSelect/index.ts`                           | Create    | Barrel export                              |
| `libs/ui/src/lib/form/FormCheckbox/FormCheckbox.tsx`                 | Create    | Checkbox wrapper                           |
| `libs/ui/src/lib/form/FormCheckbox/FormCheckbox.stories.tsx`         | Create    | Stories cho FormCheckbox                   |
| `libs/ui/src/lib/form/FormCheckbox/index.ts`                         | Create    | Barrel export                              |
| `libs/ui/src/lib/form/FormSwitch/FormSwitch.tsx`                     | Create    | Switch wrapper                             |
| `libs/ui/src/lib/form/FormSwitch/FormSwitch.stories.tsx`             | Create    | Stories cho FormSwitch                     |
| `libs/ui/src/lib/form/FormSwitch/index.ts`                           | Create    | Barrel export                              |
| `libs/ui/src/lib/form/FormRadioGroup/FormRadioGroup.tsx`             | Create    | RadioGroup wrapper                         |
| `libs/ui/src/lib/form/FormRadioGroup/FormRadioGroup.stories.tsx`     | Create    | Stories cho FormRadioGroup                 |
| `libs/ui/src/lib/form/FormRadioGroup/index.ts`                       | Create    | Barrel export                              |
| `libs/ui/src/lib/form/FormDatePicker/FormDatePicker.tsx`             | Create    | DatePicker wrapper                         |
| `libs/ui/src/lib/form/FormDatePicker/FormDatePicker.stories.tsx`     | Create    | Stories cho FormDatePicker                 |
| `libs/ui/src/lib/form/FormDatePicker/index.ts`                       | Create    | Barrel export                              |
| `libs/ui/src/lib/form/FormAutocomplete/FormAutocomplete.tsx`         | Create    | Autocomplete wrapper                       |
| `libs/ui/src/lib/form/FormAutocomplete/FormAutocomplete.stories.tsx` | Create    | Stories cho FormAutocomplete               |
| `libs/ui/src/lib/form/FormAutocomplete/index.ts`                     | Create    | Barrel export                              |
| `libs/ui/src/lib/form/DemoForm/DemoForm.tsx`                         | Create    | Form tổng hợp dùng tất cả field components |
| `libs/ui/src/lib/form/DemoForm/DemoForm.stories.tsx`                 | Create    | Stories Default + Prefilled                |
| `libs/ui/src/lib/form/DemoForm/index.ts`                             | Create    | Barrel export                              |

---

## Task 1: Cài dependencies + scaffold + cập nhật Storybook

**Files:**

- Modify: `libs/ui/.storybook/preview.tsx`
- Modify: `libs/ui/src/lib/ui.ts`
- Create: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Cài react-hook-form, @hookform/resolvers, zod**

Chạy tại root của monorepo:

```bash
pnpm add --save-exact react-hook-form @hookform/resolvers zod
```

Kiểm tra 3 packages xuất hiện trong `package.json` (root).

- [ ] **Step 2: Tạo barrel file trống cho form**

Tạo `libs/ui/src/lib/form/index.ts`:

```ts
// form components barrel — populated as each component is added
```

- [ ] **Step 3: Export form từ ui.ts**

Sửa `libs/ui/src/lib/ui.ts` — thêm dòng cuối:

```ts
export { theme } from './theme';
export { BottomNav } from './components/BottomNav';
export type { BottomNavProps, BottomNavItem } from './components/BottomNav';
export * from './form';
```

- [ ] **Step 4: Thêm LocalizationProvider vào Storybook preview**

Sửa `libs/ui/.storybook/preview.tsx` thành:

```tsx
import type { Preview, Decorator } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { theme } from '../src/lib/theme';

const withTheme: Decorator = (Story) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Story />
  </ThemeProvider>
);

const withLocalization: Decorator = (Story) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Story />
  </LocalizationProvider>
);

const preview: Preview = {
  decorators: [withLocalization, withTheme],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
```

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml libs/ui/.storybook/preview.tsx libs/ui/src/lib/ui.ts libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): install rhf+zod, scaffold form barrel, add LocalizationProvider to Storybook"
```

---

## Task 2: FormTextField

**Files:**

- Create: `libs/ui/src/lib/form/FormTextField/FormTextField.tsx`
- Create: `libs/ui/src/lib/form/FormTextField/index.ts`
- Create: `libs/ui/src/lib/form/FormTextField/FormTextField.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo FormTextField component**

Tạo `libs/ui/src/lib/form/FormTextField/FormTextField.tsx`:

```tsx
import { Controller, type Control } from 'react-hook-form';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export interface FormTextFieldProps extends Omit<TextFieldProps, 'name'> {
  name: string;
  control: Control<any>;
}

export function FormTextField({ name, control, ...rest }: FormTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? rest.helperText}
        />
      )}
    />
  );
}
```

- [ ] **Step 2: Tạo index.ts**

Tạo `libs/ui/src/lib/form/FormTextField/index.ts`:

```ts
export { FormTextField } from './FormTextField';
export type { FormTextFieldProps } from './FormTextField';
```

- [ ] **Step 3: Tạo stories**

Tạo `libs/ui/src/lib/form/FormTextField/FormTextField.stories.tsx`:

```tsx
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
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
```

- [ ] **Step 5: Khởi động Storybook và kiểm tra**

```bash
pnpm nx storybook @meli/ui --port 4400
```

Mở `http://localhost:4400` — kiểm tra `Form/FormTextField` hiển thị 3 stories: Default, WithError (có đỏ), Disabled.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/src/lib/form/
git commit -m "feat(ui): add FormTextField component with Storybook stories"
```

---

## Task 3: FormSelect

**Files:**

- Create: `libs/ui/src/lib/form/FormSelect/FormSelect.tsx`
- Create: `libs/ui/src/lib/form/FormSelect/index.ts`
- Create: `libs/ui/src/lib/form/FormSelect/FormSelect.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo FormSelect component**

Tạo `libs/ui/src/lib/form/FormSelect/FormSelect.tsx`:

```tsx
import { Controller, type Control } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps extends Omit<SelectProps, 'name'> {
  name: string;
  control: Control<any>;
  label?: string;
  options: SelectOption[];
  helperText?: string;
}

export function FormSelect({
  name,
  control,
  label,
  options,
  helperText,
  ...rest
}: FormSelectProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl fullWidth error={!!fieldState.error}>
          {label && <InputLabel>{label}</InputLabel>}
          <Select {...field} label={label} {...rest}>
            {options.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </Select>
          {(fieldState.error?.message || helperText) && (
            <FormHelperText>
              {fieldState.error?.message ?? helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
```

- [ ] **Step 2: Tạo index.ts**

Tạo `libs/ui/src/lib/form/FormSelect/index.ts`:

```ts
export { FormSelect } from './FormSelect';
export type { FormSelectProps, SelectOption } from './FormSelect';
```

- [ ] **Step 3: Tạo stories**

Tạo `libs/ui/src/lib/form/FormSelect/FormSelect.stories.tsx`:

```tsx
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
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
export * from './FormSelect';
```

- [ ] **Step 5: Kiểm tra Storybook** — `Form/FormSelect` hiển thị 3 stories.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/src/lib/form/FormSelect/ libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): add FormSelect component with Storybook stories"
```

---

## Task 4: FormCheckbox

**Files:**

- Create: `libs/ui/src/lib/form/FormCheckbox/FormCheckbox.tsx`
- Create: `libs/ui/src/lib/form/FormCheckbox/index.ts`
- Create: `libs/ui/src/lib/form/FormCheckbox/FormCheckbox.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo FormCheckbox component**

Tạo `libs/ui/src/lib/form/FormCheckbox/FormCheckbox.tsx`:

```tsx
import { Controller, type Control } from 'react-hook-form';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export interface FormCheckboxProps {
  name: string;
  control: Control<any>;
  label: string;
  helperText?: string;
}

export function FormCheckbox({
  name,
  control,
  label,
  helperText,
}: FormCheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...fieldRest }, fieldState }) => (
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                {...fieldRest}
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={label}
          />
          {(fieldState.error?.message || helperText) && (
            <FormHelperText error={!!fieldState.error}>
              {fieldState.error?.message ?? helperText}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
```

- [ ] **Step 2: Tạo index.ts**

Tạo `libs/ui/src/lib/form/FormCheckbox/index.ts`:

```ts
export { FormCheckbox } from './FormCheckbox';
export type { FormCheckboxProps } from './FormCheckbox';
```

- [ ] **Step 3: Tạo stories**

Tạo `libs/ui/src/lib/form/FormCheckbox/FormCheckbox.stories.tsx`:

```tsx
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
    />
  );
}

export const Default: Story = { render: () => <DefaultStory /> };
export const WithError: Story = { render: () => <WithErrorStory /> };
export const Disabled: Story = { render: () => <DisabledStory /> };
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
export * from './FormSelect';
export * from './FormCheckbox';
```

- [ ] **Step 5: Kiểm tra Storybook** — `Form/FormCheckbox` hiển thị 3 stories.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/src/lib/form/FormCheckbox/ libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): add FormCheckbox component with Storybook stories"
```

---

## Task 5: FormSwitch

**Files:**

- Create: `libs/ui/src/lib/form/FormSwitch/FormSwitch.tsx`
- Create: `libs/ui/src/lib/form/FormSwitch/index.ts`
- Create: `libs/ui/src/lib/form/FormSwitch/FormSwitch.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo FormSwitch component**

Tạo `libs/ui/src/lib/form/FormSwitch/FormSwitch.tsx`:

```tsx
import { Controller, type Control } from 'react-hook-form';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export interface FormSwitchProps {
  name: string;
  control: Control<any>;
  label: string;
  helperText?: string;
}

export function FormSwitch({
  name,
  control,
  label,
  helperText,
}: FormSwitchProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ...fieldRest }, fieldState }) => (
        <Box>
          <FormControlLabel
            control={
              <Switch
                {...fieldRest}
                checked={Boolean(value)}
                onChange={(e) => onChange(e.target.checked)}
              />
            }
            label={label}
          />
          {(fieldState.error?.message || helperText) && (
            <FormHelperText error={!!fieldState.error}>
              {fieldState.error?.message ?? helperText}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
```

- [ ] **Step 2: Tạo index.ts**

Tạo `libs/ui/src/lib/form/FormSwitch/index.ts`:

```ts
export { FormSwitch } from './FormSwitch';
export type { FormSwitchProps } from './FormSwitch';
```

- [ ] **Step 3: Tạo stories**

Tạo `libs/ui/src/lib/form/FormSwitch/FormSwitch.stories.tsx`:

```tsx
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
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
export * from './FormSelect';
export * from './FormCheckbox';
export * from './FormSwitch';
```

- [ ] **Step 5: Kiểm tra Storybook** — `Form/FormSwitch` hiển thị 3 stories.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/src/lib/form/FormSwitch/ libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): add FormSwitch component with Storybook stories"
```

---

## Task 6: FormRadioGroup

**Files:**

- Create: `libs/ui/src/lib/form/FormRadioGroup/FormRadioGroup.tsx`
- Create: `libs/ui/src/lib/form/FormRadioGroup/index.ts`
- Create: `libs/ui/src/lib/form/FormRadioGroup/FormRadioGroup.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo FormRadioGroup component**

Tạo `libs/ui/src/lib/form/FormRadioGroup/FormRadioGroup.tsx`:

```tsx
import { Controller, type Control } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export interface RadioOption {
  label: string;
  value: string;
}

export interface FormRadioGroupProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: RadioOption[];
  helperText?: string;
}

export function FormRadioGroup({
  name,
  control,
  label,
  options,
  helperText,
}: FormRadioGroupProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl error={!!fieldState.error}>
          {label && <FormLabel>{label}</FormLabel>}
          <RadioGroup {...field}>
            {options.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={<Radio />}
                label={opt.label}
              />
            ))}
          </RadioGroup>
          {(fieldState.error?.message || helperText) && (
            <FormHelperText>
              {fieldState.error?.message ?? helperText}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
```

- [ ] **Step 2: Tạo index.ts**

Tạo `libs/ui/src/lib/form/FormRadioGroup/index.ts`:

```ts
export { FormRadioGroup } from './FormRadioGroup';
export type { FormRadioGroupProps, RadioOption } from './FormRadioGroup';
```

- [ ] **Step 3: Tạo stories**

Tạo `libs/ui/src/lib/form/FormRadioGroup/FormRadioGroup.stories.tsx`:

```tsx
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
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
export * from './FormSelect';
export * from './FormCheckbox';
export * from './FormSwitch';
export * from './FormRadioGroup';
```

- [ ] **Step 5: Kiểm tra Storybook** — `Form/FormRadioGroup` hiển thị 3 stories.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/src/lib/form/FormRadioGroup/ libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): add FormRadioGroup component with Storybook stories"
```

---

## Task 7: FormDatePicker

**Files:**

- Create: `libs/ui/src/lib/form/FormDatePicker/FormDatePicker.tsx`
- Create: `libs/ui/src/lib/form/FormDatePicker/index.ts`
- Create: `libs/ui/src/lib/form/FormDatePicker/FormDatePicker.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo FormDatePicker component**

`@mui/x-date-pickers` v8 dùng `slotProps.field.inputRef` thay vì prop `inputRef` trực tiếp.

Tạo `libs/ui/src/lib/form/FormDatePicker/FormDatePicker.tsx`:

```tsx
import { Controller, type Control } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';

export interface FormDatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  helperText?: string;
}

export function FormDatePicker({
  name,
  control,
  label,
  helperText,
}: FormDatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState }) => (
        <DatePicker
          label={label}
          value={(value as Dayjs | null) ?? null}
          onChange={onChange}
          slotProps={{
            field: { inputRef: ref },
            textField: {
              fullWidth: true,
              error: !!fieldState.error,
              helperText: fieldState.error?.message ?? helperText,
            },
          }}
        />
      )}
    />
  );
}
```

- [ ] **Step 2: Tạo index.ts**

Tạo `libs/ui/src/lib/form/FormDatePicker/index.ts`:

```ts
export { FormDatePicker } from './FormDatePicker';
export type { FormDatePickerProps } from './FormDatePicker';
```

- [ ] **Step 3: Tạo stories**

Tạo `libs/ui/src/lib/form/FormDatePicker/FormDatePicker.stories.tsx`:

```tsx
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
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
export * from './FormSelect';
export * from './FormCheckbox';
export * from './FormSwitch';
export * from './FormRadioGroup';
export * from './FormDatePicker';
```

- [ ] **Step 5: Kiểm tra Storybook** — `Form/FormDatePicker` hiển thị 3 stories, DatePicker mở được calendar popup.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/src/lib/form/FormDatePicker/ libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): add FormDatePicker component with Storybook stories"
```

---

## Task 8: FormAutocomplete

**Files:**

- Create: `libs/ui/src/lib/form/FormAutocomplete/FormAutocomplete.tsx`
- Create: `libs/ui/src/lib/form/FormAutocomplete/index.ts`
- Create: `libs/ui/src/lib/form/FormAutocomplete/FormAutocomplete.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo FormAutocomplete component**

Autocomplete's `onChange` callback có signature `(event, value) => void` — cần unwrap `value` trước khi truyền cho RHF's `onChange`.

Tạo `libs/ui/src/lib/form/FormAutocomplete/FormAutocomplete.tsx`:

```tsx
import { Controller, type Control } from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface FormAutocompleteProps {
  name: string;
  control: Control<any>;
  label?: string;
  options: string[];
  multiple?: boolean;
  helperText?: string;
}

export function FormAutocomplete({
  name,
  control,
  label,
  options,
  multiple = false,
  helperText,
}: FormAutocompleteProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ref }, fieldState }) => (
        <Autocomplete
          multiple={multiple}
          options={options}
          value={value ?? (multiple ? [] : null)}
          onChange={(_, newValue) => onChange(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              label={label}
              error={!!fieldState.error}
              helperText={fieldState.error?.message ?? helperText}
            />
          )}
        />
      )}
    />
  );
}
```

- [ ] **Step 2: Tạo index.ts**

Tạo `libs/ui/src/lib/form/FormAutocomplete/index.ts`:

```ts
export { FormAutocomplete } from './FormAutocomplete';
export type { FormAutocompleteProps } from './FormAutocomplete';
```

- [ ] **Step 3: Tạo stories**

Tạo `libs/ui/src/lib/form/FormAutocomplete/FormAutocomplete.stories.tsx`:

```tsx
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
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
export * from './FormSelect';
export * from './FormCheckbox';
export * from './FormSwitch';
export * from './FormRadioGroup';
export * from './FormDatePicker';
export * from './FormAutocomplete';
```

- [ ] **Step 5: Kiểm tra Storybook** — `Form/FormAutocomplete` hiển thị 3 stories, dropdown hoạt động, multiple mode cho phép chọn nhiều.

- [ ] **Step 6: Commit**

```bash
git add libs/ui/src/lib/form/FormAutocomplete/ libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): add FormAutocomplete component with Storybook stories"
```

---

## Task 9: DemoForm

**Files:**

- Create: `libs/ui/src/lib/form/DemoForm/DemoForm.tsx`
- Create: `libs/ui/src/lib/form/DemoForm/index.ts`
- Create: `libs/ui/src/lib/form/DemoForm/DemoForm.stories.tsx`
- Modify: `libs/ui/src/lib/form/index.ts`

- [ ] **Step 1: Tạo DemoForm component**

`agreeTerms` dùng `z.literal(true)` — default value cần type cast để tránh lỗi TypeScript.
`birthDate` dùng `z.any().nullable()` vì `z.instanceof(dayjs)` không hoạt động (dayjs không phải ES class truyền thống).
`defaultValues` prop cho phép Storybook truyền giá trị pre-filled vào.
`emptyDefaults.birthDate` được type `null as null | Dayjs` để Prefilled story có thể truyền `dayjs(...)` mà không lỗi TypeScript.

Tạo `libs/ui/src/lib/form/DemoForm/DemoForm.tsx`:

```tsx
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
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Tối thiểu 8 ký tự'),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'Bắt buộc đồng ý' }),
  }),
  notifications: z.boolean(),
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({ message: 'Vui lòng chọn giới tính' }),
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  agreeTerms: false as any,
  notifications: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gender: '' as any,
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
```

Tạo `libs/ui/src/lib/form/DemoForm/DemoForm.stories.tsx`:

```tsx
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      agreeTerms: true as any,
      notifications: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      gender: 'male' as any,
      birthDate: dayjs('1998-06-15'),
      skills: ['React', 'TypeScript'],
    },
  },
};
```

- [ ] **Step 4: Thêm export vào form/index.ts**

Sửa `libs/ui/src/lib/form/index.ts`:

```ts
export * from './FormTextField';
export * from './FormSelect';
export * from './FormCheckbox';
export * from './FormSwitch';
export * from './FormRadioGroup';
export * from './FormDatePicker';
export * from './FormAutocomplete';
export * from './DemoForm';
```

- [ ] **Step 5: Kiểm tra Storybook**

```bash
pnpm nx storybook @meli/ui --port 4400
```

Kiểm tra:

- `Form/DemoForm` → `Default`: form trống, nhấn "Gửi" → tất cả fields hiện error message
- `Form/DemoForm` → `Prefilled`: form có sẵn dữ liệu, nhấn "Gửi" → không có error, `onSubmit` được gọi (thấy trong Actions panel)

- [ ] **Step 6: Kiểm tra typecheck**

```bash
pnpm nx typecheck @meli/ui
```

Expected: không có TypeScript error.

- [ ] **Step 7: Commit**

```bash
git add libs/ui/src/lib/form/DemoForm/ libs/ui/src/lib/form/index.ts
git commit -m "feat(ui): add DemoForm with Zod validation and Storybook stories"
```
