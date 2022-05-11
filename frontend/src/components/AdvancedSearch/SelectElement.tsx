import FormField from '../FormField';
import { Grid, GridProps } from '@mui/material';
import { SearchField } from '../../util/types';
import React from 'react';

export default function SelectElement(
  props: GridProps & {
    name: string;
    label: string;
    value: SearchField;
    callback: React.Dispatch<React.SetStateAction<SearchField>>;
  },
) {
  return (
    <Grid item>
      <FormField select name={props.name} label={props.label} value={props.value} onChange={props.callback}>
        {props.children}
      </FormField>
    </Grid>
  );
}
