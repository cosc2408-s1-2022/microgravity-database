import { Autocomplete, Box, Button, TextField, TextFieldProps, Typography } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosError, AxiosResponse } from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import api from '../../../util/api';
import { Mission } from '../../../util/types';

type MissionSelectorProps<T extends string = string> = Omit<TextFieldProps, 'onChange'> & {
  errors?: Record<string | T, string>;
  value: Mission | null;
  dispatch: React.Dispatch<React.SetStateAction<Mission | null>>;
};

export default function MissionSelector({ value, dispatch, errors }: MissionSelectorProps) {
  const [missions, setMissions] = useState<Mission[]>();
  const {
    data: missionsData,
    isSuccess: isMissionsSuccess,
    isLoading: isMissionsLoading,
  } = useQuery<AxiosResponse<Mission[]>, AxiosError>('getAllMissions', () => api.get('/missions'));
  useEffect(() => {
    if (isMissionsSuccess && missionsData) setMissions(missionsData.data);
  }, [isMissionsSuccess, missionsData]);

  return (
    <Autocomplete
      disablePortal
      openText='Mission'
      options={missions || []}
      value={value}
      loading={isMissionsLoading}
      getOptionLabel={(option) => `${option.name} (${moment(option.launchDate).year()})`}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      fullWidth
      onChange={(_event, value) => {
        if (errors !== undefined) errors.missionId = '';
        dispatch(value);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          margin='none'
          size='small'
          fullWidth
          color='secondary'
          error={!!errors?.missionId}
          helperText={errors?.missionId}
          label='Mission'
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(`${option.name} (${moment(option.launchDate).year()})`, inputValue);
        const parts = parse(`${option.name} (${moment(option.launchDate).year()})`, matches);
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
      noOptionsText={
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='body1' flexGrow={1}>
            No such missions found.
          </Typography>
          <Button variant='contained' color='secondary' href='/addMission' target='_blank' rel='noreferrer noopener'>
            Add new?
          </Button>
        </Box>
      }
    />
  );
}
