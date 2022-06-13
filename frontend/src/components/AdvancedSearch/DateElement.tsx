import { GridProps, TextField } from '@mui/material';
import { SearchField } from '../../util/types';
import React from 'react';
import { Moment } from 'moment';
import { DesktopDatePicker } from '@mui/x-date-pickers';

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
      newDate = date.format('YYYY-MM-DD');
    }
    props.callback(newDate);
  };

  return (
    <DesktopDatePicker
      disabled={props.disabled}
      views={['year', 'month', 'day']}
      label={props.label}
      value={props.value || null}
      minDate={props.min}
      maxDate={props.max}
      onChange={(e: Moment | null) => handleDateChange(e)}
      renderInput={(params) => <TextField size='small' margin='normal' color='secondary' fullWidth {...params} />}
    />
  );
}
