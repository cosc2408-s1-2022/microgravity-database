import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../../util/api';
import { Toa } from '../../../util/types';

type ToaSelectorProps<T extends string = string> = Omit<TextFieldProps, 'onChange'> & {
  errors?: Record<string | T, string>;
  value: Toa | null;
  dispatch: React.Dispatch<React.SetStateAction<Toa | null>>;
};

export default function ToaSelector({ value, dispatch, errors }: ToaSelectorProps) {
  const [toas, setToas] = useState<Toa[]>();

  const {
    data: toasData,
    isSuccess: isToasSuccess,
    isLoading: isToasLoading,
  } = useQuery<AxiosResponse<Toa[]>, AxiosError>('getAllToas', () => api.get('/toas'));
  useEffect(() => {
    if (isToasSuccess && toasData) setToas(toasData.data);
  }, [isToasSuccess, toasData]);

  return (
    <Autocomplete
      disablePortal
      openText='Type of Activity (ToA)'
      options={toas || []}
      value={value}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth
      loading={isToasLoading}
      onChange={(_event, value) => {
        if (errors !== undefined) errors.toaId = '';
        dispatch(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin='none'
          size='small'
          color='secondary'
          fullWidth
          error={!!errors?.toaId}
          helperText={errors?.toaId}
          label='Type of Activity (ToA)'
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.name, inputValue);
        const parts = parse(option.name, matches);
        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
      noOptionsText='No such ToA found.'
    />
  );
}
