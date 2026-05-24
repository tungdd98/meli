import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export interface FormAutocompleteProps<TFieldValues extends FieldValues> {
  name: FieldPath<TFieldValues>;
  control: Control<TFieldValues>;
  label?: string;
  options: string[];
  multiple?: boolean;
  helperText?: string;
}

export function FormAutocomplete<TFieldValues extends FieldValues>({
  name,
  control,
  label,
  options,
  multiple = false,
  helperText,
}: FormAutocompleteProps<TFieldValues>) {
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
