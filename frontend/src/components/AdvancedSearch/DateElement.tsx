import { GridProps, TextField } from '@mui/material';
import { SearchField } from '../../util/types';
import React from 'react';
import moment, { Moment } from 'moment';
import { DatePicker } from '@mui/x-date-pickers';

export default function DateElement(
  props: GridProps & {
    label: string;
    value: SearchField;
    disabled: boolean;
    min?: Moment | undefined;
    max?: Moment | undefined;
    callback: React.Dispatch<React.SetStateAction<SearchField>>;
  },
) {
  const handleDateChange = (date: Moment | null) => {
    let newDate: string | undefined = undefined;
    if (date) {
      newDate = date.year().toString();
    }
    props.callback(newDate);
  };

  return (
    <DatePicker
      disabled={props.disabled}
      views={['year']}
      label={props.label}
      value={props.value || null}
      minDate={props.min}
      maxDate={props.max || moment()}
      onChange={(e: Moment | null) => handleDateChange(e)}
      renderInput={(params) => <TextField size='small' margin='normal' fullWidth {...params} color='secondary' />}
    />
  );
}
