import React from 'react';
import { TextField } from '@mui/material';
import { FormFieldProps } from '../../util/types';

/**
 * A wrapper around {@link TextField} to automatically enter an errored state if an error is present
 */
function FormField({ onChange, name, errors, ...rest }: FormFieldProps) {
  return (
    <TextField
      {...rest}
      name={name}
      error={!!errors?.[name]}
      helperText={errors?.[name]}
      variant='outlined'
      fullWidth
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
        onChange && onChange(event.target.value)
      }
      color='secondary'
      size={'small'}
    />
  );
}

export default FormField;
