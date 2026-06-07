import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import TextField, { type TextFieldProps } from '@mui/material/TextField';

export interface FormTextFieldProps<
  TFieldValues extends FieldValues,
> extends Omit<TextFieldProps, 'name'> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
}

export function FormTextField<TFieldValues extends FieldValues>({
  name,
  control,
  ...rest
}: FormTextFieldProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...rest}
          slotProps={{
            ...rest.slotProps,
            inputLabel: { shrink: true, ...rest.slotProps?.inputLabel },
          }}
          error={!!fieldState.error}
          helperText={fieldState.error?.message ?? rest.helperText}
        />
      )}
    />
  );
}
