import { Autocomplete, TextField, TextFieldProps } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import api from '../../../util/api';
import { ForCode } from '../../../util/types';

type ForCodeSelectorProps<T extends string = string> = Omit<TextFieldProps, 'onChange'> & {
  errors?: Record<string | T, string>;
  value: ForCode | null;
  dispatch: React.Dispatch<React.SetStateAction<ForCode | null>>;
};

export default function ForCodeSelector({ value, dispatch, errors }: ForCodeSelectorProps) {
  const [forCodes, setForCodes] = useState<ForCode[]>();
  const {
    data: forCodesData,
    isSuccess: isForCodesSuccess,
    isLoading: isForCodesLoading,
  } = useQuery<AxiosResponse<ForCode[]>, AxiosError>('getAllForCodes', () => api.get('/forCodes'));
  useEffect(() => {
    if (isForCodesSuccess && forCodesData) setForCodes(forCodesData.data);
  }, [isForCodesSuccess, forCodesData]);

  return (
    <Autocomplete
      disablePortal
      openText='Field of Research (FoR)'
      options={forCodes || []}
      value={value}
      getOptionLabel={(option) => `${option.code} ${option.name}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth
      loading={isForCodesLoading}
      onChange={(_event, value) => {
        if (errors !== undefined) errors.forCodeId = '';
        dispatch(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin='none'
          size='small'
          color='secondary'
          fullWidth
          error={!!errors?.forCodeId}
          helperText={errors?.forCodeId}
          label='Field of Research (FoR)'
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(`${option.code} ${option.name}`, inputValue);
        const parts = parse(`${option.code} ${option.name}`, matches);
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
      noOptionsText='No such FoR found.'
    />
  );
}
