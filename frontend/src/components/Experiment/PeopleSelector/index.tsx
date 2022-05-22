import { PersonAddRounded, PersonRemoveRounded } from '@mui/icons-material';
import {
  TextFieldProps,
  Paper,
  Box,
  Typography,
  IconButton,
  Grid,
  Autocomplete,
  TextField,
  Button,
} from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosResponse, AxiosError } from 'axios';
import { error } from 'console';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import api from '../../../util/api';
import { ExperimentPersonRequestEntry, Person, Role } from '../../../util/types';

type PeopleSelectorProps<T extends string = string> = Omit<TextFieldProps, 'onChange'> & {
  state: { uid: number; data: ExperimentPersonRequestEntry[] };
  dispatch: React.Dispatch<{
    type: string;
    payload: ExperimentPersonRequestEntry;
  }>;
};

export default function PeopleSelector({ state, dispatch }: PeopleSelectorProps) {
  const [people, setPeople] = useState<Person[]>();
  const {
    data: peopleData,
    isSuccess: isPeopleSuccess,
    isLoading: isPeopleLoading,
  } = useQuery<AxiosResponse<Person[]>, AxiosError>('getAllPeople', () => api.get('/people'));
  useEffect(() => {
    if (isPeopleSuccess && peopleData) setPeople(peopleData.data);
  }, [isPeopleSuccess, peopleData]);

  const [roles, setRoles] = useState<Role[]>();
  const {
    data: rolesData,
    isSuccess: isRolesSuccess,
    isLoading: isRolesLoading,
  } = useQuery<AxiosResponse<Role[]>, AxiosError>('getAllRoles', () => api.get('/roles'));
  useEffect(() => {
    if (isRolesSuccess && rolesData) setRoles(rolesData.data);
  }, [isRolesSuccess, rolesData]);
  console.log(state.data);

  return (
    <Paper sx={{ width: '100%', border: '1px #c4c4c4 solid' }} variant='outlined'>
      <Box display='flex' alignItems='center'>
        <Typography sx={{ p: 1, pl: 1.5 }}>Add People</Typography>
        <IconButton
          onClick={() => {
            dispatch({
              type: 'ADD',
              payload: { id: state.uid, data: {} },
            });
          }}
        >
          <PersonAddRounded />
        </IconButton>
      </Box>
      {state.data.map((entry) => (
        <Grid key={entry.id} container>
          <Grid item xs={5} sx={{ pl: 2 }}>
            <Autocomplete
              disablePortal
              openText='Person'
              options={people || []}
              getOptionLabel={(option) => `${option.firstName} ${option.familyName} (${option.affiliation})`}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              fullWidth
              loading={isPeopleLoading}
              onChange={(_event, value) => {
                if (value) {
                  const payload = {
                    id: entry.id,
                    data: {
                      personId: value.id,
                      roleId: entry.data.roleId,
                    },
                  };
                  dispatch({ type: 'MODIFY', payload });
                }
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='dense'
                  size='small'
                  color='secondary'
                  fullWidth
                  label='Person'
                  error={!entry.data.personId}
                  helperText={entry.data.personId ? ' ' : 'Please select a person.'}
                />
              )}
              renderOption={(props, option, { inputValue }) => {
                const fullName = `${option.firstName} ${option.familyName} (${option.affiliation})`;
                const matches = match(fullName, inputValue);
                const parts = parse(fullName, matches);
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
              getOptionDisabled={(option: Person) => state.data.some((entry) => entry.data.personId === option.id)}
              noOptionsText={
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1' flexGrow={1}>
                    No such person found.
                  </Typography>
                  <Button
                    variant='contained'
                    color='secondary'
                    href='/addPerson'
                    target='_blank'
                    rel='noreferrer noopener'
                  >
                    Add new?
                  </Button>
                </Box>
              }
            />
          </Grid>
          <Grid item xs={1} display='flex' mt={2} justifyContent='center'>
            <Typography variant='body1'>as</Typography>
          </Grid>
          <Grid item xs={5}>
            <Autocomplete
              disablePortal
              openText='Role'
              options={roles || []}
              value={roles?.find((r) => r.id === entry.data.roleId) || null}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              fullWidth
              loading={isRolesLoading}
              onChange={(_event, value) => {
                if (value) {
                  const payload = {
                    id: entry.id,
                    data: {
                      personId: entry.data.personId,
                      roleId: value.id,
                    },
                  };
                  dispatch({ type: 'MODIFY', payload });
                }
              }}
              getOptionDisabled={(option: Role) =>
                state.data.some((entry) => entry.data.roleId === 1 && entry.data.roleId === option.id)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='dense'
                  size='small'
                  color='secondary'
                  fullWidth
                  label='Role'
                  error={!entry.data.roleId}
                  helperText={entry.data.roleId ? ' ' : 'Please specify a role.'}
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
              noOptionsText='No such roles found.'
            />
          </Grid>
          <Grid item xs={1} display='flex' justifyContent='center'>
            <Box  sx={{ mt: 1 }}>
              <IconButton
                onClick={() => {
                  dispatch({
                    type: 'REMOVE',
                    payload: { id: entry.id, data: entry.data },
                  });
                }}
              >
                <PersonRemoveRounded />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
}
