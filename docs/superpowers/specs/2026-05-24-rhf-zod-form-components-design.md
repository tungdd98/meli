# Design: react-hook-form + Zod Form Components

**Date:** 2026-05-24  
**Scope:** `@meli/ui` — thêm form components vào `libs/ui/src/lib/form/`

## Tóm tắt

Tích hợp `react-hook-form` + `zod` vào `@meli/ui` bằng cách xây dựng bộ form components dùng pattern **Controlled wrapper** (`Controller`). Mỗi component wrap một MUI component, tự xử lý error state từ RHF. Storybook có stories độc lập cho từng field và một DemoForm tổng hợp.

## Dependencies cần cài

```
react-hook-form
@hookform/resolvers
zod
@mui/x-date-pickers
dayjs
```

## Cấu trúc thư mục

Đặt trong `libs/ui/src/lib/form/`, co-locate stories với component (giống BottomNav):

```
form/
├── index.ts
├── FormTextField/
│   ├── FormTextField.tsx
│   ├── FormTextField.stories.tsx
│   └── index.ts
├── FormSelect/
│   ├── FormSelect.tsx
│   ├── FormSelect.stories.tsx
│   └── index.ts
├── FormCheckbox/
│   ├── FormCheckbox.tsx
│   ├── FormCheckbox.stories.tsx
│   └── index.ts
├── FormSwitch/
│   ├── FormSwitch.tsx
│   ├── FormSwitch.stories.tsx
│   └── index.ts
├── FormRadioGroup/
│   ├── FormRadioGroup.tsx
│   ├── FormRadioGroup.stories.tsx
│   └── index.ts
├── FormDatePicker/
│   ├── FormDatePicker.tsx
│   ├── FormDatePicker.stories.tsx
│   └── index.ts
├── FormAutocomplete/
│   ├── FormAutocomplete.tsx
│   ├── FormAutocomplete.stories.tsx
│   └── index.ts
└── DemoForm/
    ├── DemoForm.tsx
    ├── DemoForm.stories.tsx
    └── index.ts
```

`libs/ui/src/lib/ui.ts` thêm `export * from './form'`.

## API Pattern

Mỗi component nhận `name` + `control` từ RHF, forward các prop còn lại xuống MUI. Error message từ Zod được hiển thị tự động qua `fieldState.error?.message`.

```tsx
interface FormTextFieldProps extends Omit<TextFieldProps, 'name'> {
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

## Component Matrix

| Component          | MUI bên trong                              | Ghi chú                                                              |
| ------------------ | ------------------------------------------ | -------------------------------------------------------------------- |
| `FormTextField`    | `TextField`                                | text, email, password qua prop `type`                                |
| `FormSelect`       | `Select` + `InputLabel` + `FormHelperText` | bọc trong `FormControl`                                              |
| `FormCheckbox`     | `Checkbox` + `FormControlLabel`            | value là `boolean`                                                   |
| `FormSwitch`       | `Switch` + `FormControlLabel`              | value là `boolean`                                                   |
| `FormRadioGroup`   | `RadioGroup` + `FormControlLabel`          | nhận `options: {label: string, value: string}[]`                     |
| `FormDatePicker`   | `DatePicker` từ `@mui/x-date-pickers`      | value là `Dayjs \| null`, cần `LocalizationProvider` trong Storybook |
| `FormAutocomplete` | `Autocomplete` + `TextField`               | nhận `options`, value là string hoặc string[]                        |

## DemoForm

Form tổng hợp dùng tất cả 7 field components, validate bằng Zod schema:

```ts
const demoSchema = z.object({
  fullName: z.string().min(2, 'Tối thiểu 2 ký tự'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(8, 'Tối thiểu 8 ký tự'),
  role: z.string().min(1, 'Vui lòng chọn vai trò'),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: 'Bắt buộc đồng ý' }),
  }),
  notifications: z.boolean(),
  gender: z.enum(['male', 'female', 'other']),
  birthDate: z.instanceof(dayjs).nullable(),
  skills: z.array(z.string()).min(1, 'Chọn ít nhất 1 kỹ năng'),
});
```

## Storybook Stories

Mỗi field component có stories cho các trạng thái:

- `Default` — trống, chưa tương tác
- `WithError` — hiển thị error message
- `Disabled` — trạng thái disabled

`DemoForm.stories.tsx` có 2 stories:

- `Default` — form trống, submit để thấy validation errors
- `Prefilled` — form có sẵn giá trị, thấy happy path

Storybook preview cần thêm `LocalizationProvider` (dayjs) vào decorator để `FormDatePicker` hoạt động.

## Export

Tất cả components được export qua `@meli/ui`:

```ts
// libs/ui/src/lib/ui.ts
export * from './form';
```
