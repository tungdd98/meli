import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
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

export interface FormRadioGroupProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  options: RadioOption[];
  helperText?: string;
}

export function FormRadioGroup<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  helperText,
}: FormRadioGroupProps<TFieldValues>) {
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
