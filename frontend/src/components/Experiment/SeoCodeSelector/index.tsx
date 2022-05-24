import { TextFieldProps, Autocomplete, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import api from '../../../util/api';
import { SeoCode } from '../../../util/types';

type SeoCodeSelectorProps<T extends string = string> = Omit<TextFieldProps, 'onChange'> & {
  errors?: Record<string | T, string>;
  value: SeoCode | null;
  dispatch: React.Dispatch<React.SetStateAction<SeoCode | null>>;
};

export default function SeoCodeSelector({ value, dispatch, errors }: SeoCodeSelectorProps) {
  const [seoCodes, setSeoCodes] = useState<SeoCode[]>();
  const {
    data: seoCodesData,
    isSuccess: isSeoCodesSuccess,
    isLoading: isSeoCodesLoading,
  } = useQuery<AxiosResponse<SeoCode[]>, AxiosError>('getAllSeoCodes', () => api.get('/seoCodes'));
  useEffect(() => {
    if (isSeoCodesSuccess && seoCodesData) setSeoCodes(seoCodesData.data);
  }, [isSeoCodesSuccess, seoCodesData]);

  return (
    <Autocomplete
      disablePortal
      openText='Socio-Economic Objective (SEO)'
      options={seoCodes || []}
      value={value}
      getOptionLabel={(option) => `${option.code} ${option.name}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth
      loading={isSeoCodesLoading}
      onChange={(_event, value) => {
        if (errors !== undefined) errors.seoCodeId = '';
        dispatch(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin='none'
          size='small'
          color='secondary'
          fullWidth
          error={!!errors?.seoCodeId}
          helperText={errors?.seoCodeId}
          label='Socio-Economic Objective (SEO)'
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
      noOptionsText='No such SEO found.'
    />
  );
}
