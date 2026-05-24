import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Checkbox, { type CheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export interface FormCheckboxProps<
  TFieldValues extends FieldValues,
> extends Omit<CheckboxProps, 'checked' | 'name' | 'onChange'> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helperText?: string;
}

export function FormCheckbox<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...rest
}: FormCheckboxProps<TFieldValues>) {
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
                {...rest}
                checked={Boolean(value)}
                onChange={(_, checked) => onChange(checked)}
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
