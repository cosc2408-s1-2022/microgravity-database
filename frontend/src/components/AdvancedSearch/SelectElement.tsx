import FormField from '../FormField';
import { Grid, GridProps } from '@mui/material';
import { SearchField } from '../../types';
import React, { useEffect } from 'react';

export default function SelectElement(
  props: GridProps & {
    name: string;
    label: string;
    value: SearchField;
    callback: React.Dispatch<React.SetStateAction<SearchField>>;
  },
) {

  // Reset selection to undefined when component is unmounted
  useEffect(() => {
    return function cleanup() {
      props.callback(undefined);
    };
  }, []);

  return (
    <Grid item>
      <FormField select name='platform' label='Platform' value={props.value} onChange={props.callback}>
        {props.children}
      </FormField>
    </Grid>
  );
}
