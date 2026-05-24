import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Box from '@mui/material/Box';
import Switch, { type SwitchProps } from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

export interface FormSwitchProps<TFieldValues extends FieldValues> extends Omit<
  SwitchProps,
  'checked' | 'name' | 'onChange'
> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label: string;
  helperText?: string;
}

export function FormSwitch<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  helperText,
  ...rest
}: FormSwitchProps<TFieldValues>) {
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
