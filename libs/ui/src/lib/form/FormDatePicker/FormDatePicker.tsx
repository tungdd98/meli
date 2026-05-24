import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import type { Dayjs } from 'dayjs';

export interface FormDatePickerProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  helperText?: string;
}

export function FormDatePicker<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helperText,
}: FormDatePickerProps<TFieldValues>) {
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
            textField: {
              inputRef: ref,
              variant: 'outlined',
              InputLabelProps: { shrink: true },
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
