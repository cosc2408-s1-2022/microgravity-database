import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

/**
 * A wrapper around {@link TextField} to automatically enter an errored state if an error is present
 */
function FormField({ handleChange, onChange, name, errors, ...rest }: FormFieldProps) {
  return (
    <TextField
      {...rest}
      name={name}
      className='formfield'
      error={!!errors?.[name]}
      helperText={errors?.[name]}
      variant='outlined'
      fullWidth
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (errors !== undefined) errors[name] = '';
        if (handleChange) handleChange(event);
        else {
          onChange && onChange(event.target.value);
        }
      }}
      color='secondary'
      size='small'
    />
  );
}

export type FormFieldProps<T extends string = string> = Omit<TextFieldProps, 'onChange'> & {
  onChange?: (value: string) => void;
  handleChange?: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  name: T;
  errors?: Record<string | T, string>;
};

export default FormField;
