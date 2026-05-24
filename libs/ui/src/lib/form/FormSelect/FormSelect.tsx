import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps<TFieldValues extends FieldValues> extends Omit<
  SelectProps,
  'name'
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  options: SelectOption[];
  helperText?: string;
}

export function FormSelect<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  helperText,
  ...rest
}: FormSelectProps<TFieldValues>) {
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
