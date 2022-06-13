import { Autocomplete, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

type AutocompleteSelectorProps<T> = {
  name: string;
  label: string;
  value: T | null;
  dispatch: React.Dispatch<React.SetStateAction<T | null>>;
  errors?: Record<string, string>;
  queryKey: string;
  queryFn: () => Promise<AxiosResponse<T[]>>;
  matchFn: (value: T) => string;
  equalityFn: (value: T, option: T) => boolean;
  noOptionsComponent?: React.ReactNode;
};

export default function AutocompleteSelector<T>({
  name,
  label,
  value,
  dispatch,
  errors,
  queryKey,
  queryFn,
  matchFn,
  equalityFn,
  noOptionsComponent,
}: AutocompleteSelectorProps<T>) {
  const [options, setOptions] = useState<T[]>();
  const { data, isSuccess, isLoading } = useQuery<AxiosResponse<T[]>>(queryKey, queryFn);
  useEffect(() => {
    if (isSuccess && data) setOptions(data.data);
  }, [isSuccess, data]);

  return (
    <Autocomplete
      disablePortal
      openText={label}
      options={options || []}
      value={value}
      getOptionLabel={(option) => matchFn(option)}
      isOptionEqualToValue={(option, value) => equalityFn(option, value)}
      fullWidth
      loading={isLoading}
      onChange={(_event, value) => {
        if (errors !== undefined) errors[name] = '';
        dispatch(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin='none'
          size='small'
          color='secondary'
          fullWidth
          required
          error={!!errors?.[name]}
          helperText={errors?.[name]}
          label={label}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(matchFn(option), inputValue);
        const parts = parse(matchFn(option), matches);
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
      noOptionsText={noOptionsComponent ?? 'None found.'}
    />
  );
}
