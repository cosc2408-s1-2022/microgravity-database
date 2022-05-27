import { Autocomplete, TextField } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Code } from '../../util/types';

type CodeSelectorProps<T> = {
  name: string;
  label: string;
  value: T | null;
  dispatch: React.Dispatch<React.SetStateAction<T | null>>;
  errors?: Record<string, string>;
  queryKey: string;
  queryFn: () => Promise<AxiosResponse<T[]>>;
};

export default function CodeSelector<T extends Code>({
  name,
  label,
  value,
  dispatch,
  errors,
  queryKey,
  queryFn,
}: CodeSelectorProps<T>) {
  const [primaryOptions, setPrimaryOptions] = useState<T[]>();
  const [secondaryOptions, setSecondaryOptions] = useState<T[]>();
  const [tertiaryOptions, setTertiaryOptions] = useState<T[]>();
  const { data, isSuccess, isLoading } = useQuery<AxiosResponse<T[]>>(queryKey, queryFn);
  useEffect(() => {
    if (isSuccess && data) {
      setPrimaryOptions(data.data.filter((code) => code.code.toString().length === 2));
      setSecondaryOptions(data.data.filter((code) => code.code.toString().length === 4));
      setTertiaryOptions(data.data.filter((code) => code.code.toString().length === 6));
    }
  }, [isSuccess, data]);

  const [textFieldValue, setTextFieldValue] = useState<string>();
  let filteredOptions: T[] = primaryOptions || [];
  if (textFieldValue && textFieldValue.length >= 2) {
    if (textFieldValue.length < 4) {
      filteredOptions = secondaryOptions || [];
    } else {
      filteredOptions = tertiaryOptions || [];
    }
  }

  return (
    <Autocomplete
      disablePortal
      openText={label}
      options={filteredOptions || []}
      value={value}
      getOptionLabel={(option) => `${option.code} ${option.name}`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth
      loading={isLoading}
      filterOptions={(options, { inputValue }) => {
        if (inputValue) {
          if (/^[0-9]+$/.test(inputValue)) {
            const pattern = new RegExp(`^${inputValue}`);
            return options.filter((option) => pattern.test(option.code.toString()));
          } else {
            return options.filter((option) => {
              const matches = match(`${option.code} ${option.name}`, inputValue);
              return matches.length > 0;
            });
          }
        } else {
          return options;
        }
      }}
      onChange={(_event, value) => {
        if (errors !== undefined) errors[name] = '';
        dispatch(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={(event) => setTextFieldValue(event.target.value)}
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
        const optionString = `${option.code} ${option.name}`;
        const matches = match(optionString, inputValue, { requireMatchAll: true });
        const parts = parse(optionString, matches);
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
      noOptionsText='None found.'
    />
  );
}
