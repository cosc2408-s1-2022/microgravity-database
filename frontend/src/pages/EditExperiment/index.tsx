import { Autocomplete, Box, Button, Container, Grid, IconButton, Paper, TextField, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import AuthWrapper from '../../components/AuthWrapper';
import {Experiment, ExperimentPersonRequestEntry, ForCode, Mission, Person, Role, SeoCode} from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import publicationsReducer from '../../util/reducers/PublicationsReducer';
import AddPublications from '../../components/AddPublications';

// TODO Refactor into smaller sub-components.
export default function EditExperiment() {
  const navigate = useNavigate();
  const location = useLocation();
  const experiment = location.state as Experiment;
  if (!experiment) {
    navigate('/', {
      state: {
        isError: true,
        message: 'Experiment could not be found.',
      },
    });
  }

  const [missions, setMissions] = useState<Mission[]>();
  const {
    data: missionsData,
    isSuccess: isMissionsSuccess,
    isLoading: isMissionsLoading,
  } = useQuery<AxiosResponse<Mission[]>, AxiosError>('getAllMissions', () => api.get('/missions'));
  useEffect(() => {
    if (isMissionsSuccess && missionsData) setMissions(missionsData.data);
  }, [isMissionsSuccess, missionsData]);

  const [forCodes, setForCodes] = useState<ForCode[]>();
  const {
    data: forCodesData,
    isSuccess: isForCodesSuccess,
    isLoading: isForCodesLoading,
  } = useQuery<AxiosResponse<ForCode[]>, AxiosError>('getAllForCodes', () => api.get('/forCodes'));
  useEffect(() => {
    if (isForCodesSuccess && forCodesData) setForCodes(forCodesData.data);
  }, [isForCodesSuccess, forCodesData]);

  const [seoCodes, setSeoCodes] = useState<SeoCode[]>();
  const {
    data: seoCodesData,
    isSuccess: isSeoCodesSuccess,
    isLoading: isSeoCodesLoading,
  } = useQuery<AxiosResponse<SeoCode[]>, AxiosError>('getAllSeoCodes', () => api.get('/seoCodes'));
  useEffect(() => {
    if (isSeoCodesSuccess && seoCodesData) setSeoCodes(seoCodesData.data);
  }, [isSeoCodesSuccess, seoCodesData]);

  const [people, setPeople] = useState<Person[]>();
  const {
    data: peopleData,
    isSuccess: isPeopleSuccess,
    isLoading: isPeopleLoading,
  } = useQuery<AxiosResponse<Person[]>, AxiosError>('getAllPeople', () => api.get('/people'));
  useEffect(() => {
    if (isPeopleSuccess && peopleData) setPeople(peopleData.data);
  }, [isPeopleSuccess, peopleData]);

  const peopleReducer = (
      state: { uid: number; data: ExperimentPersonRequestEntry[] },
      action: { type: string; payload: ExperimentPersonRequestEntry },
  ) => {
    switch (action.type) {
      case 'ADD': {
        return { uid: state.uid + 1, data: [...state.data, action.payload] };
      }
      case 'REMOVE': {
        return { uid: state.uid, data: state.data.filter((entry) => entry.id !== action.payload.id) };
      }
      case 'MODIFY': {
        return {
          uid: state.uid,
          data: state.data.map((entry) => {
            if (entry.id === action.payload.id) return action.payload;

            return entry;
          }),
        };
      }
      default: {
        return state;
      }
    }
  };


  const [roles, setRoles] = useState<Role[]>();
  const {
    data: rolesData,
    isSuccess: isRolesSuccess,
    isLoading: isRolesLoading,
  } = useQuery<AxiosResponse<Role[]>, AxiosError>('getAllRoles', () => api.get('/roles'));
  useEffect(() => {
    if (isRolesSuccess && rolesData) setRoles(rolesData.data);
  }, [isRolesSuccess, rolesData]);

  const [title, setTitle] = useState<string | undefined>(experiment?.title);
  const [toa, setToa] = useState<string | undefined>(experiment?.toa);
  const [leadInstitution, setLeadInstitution] = useState<string | undefined>(experiment?.leadInstitution);
  const [experimentAim, setExperimentAim] = useState<string | undefined>(experiment?.experimentAim);
  const [experimentObjective, setExperimentObjective] = useState<string | undefined>(experiment?.experimentObjective);
  const [experimentModuleDrawing, setExperimentModuleDrawing] = useState<string | undefined>(
    experiment?.experimentModuleDrawing,
  );
  const [mission, setMission] = useState<Mission | null>(experiment?.mission || null);
  const [forCode, setForCode] = useState<ForCode | null>(experiment?.forCode || null);
  const [seoCode, setSeoCode] = useState<SeoCode | null>(experiment?.seoCode || null);

  let uid = 0;
  const initialState = {
    uid: 0,
    data:
      experiment?.people.map((person) => ({
        id: uid++,
        data: {
          roleId: person.role.id,
          personId: person.id.personId,
        },
      })) || [],
  };
  initialState.uid = uid;
  const [peopleState, dispatchPeople] = useReducer(peopleReducer, initialState);

  const [publicationsState, dispatchPublications] = useReducer(publicationsReducer, {
    uid: 0,
    data:
      experiment?.experimentPublications.map((publication) => ({
        id: uid++,
        data: { ...publication },
      })),
  });

  const {
    error: experimentError,
    isSuccess: isExperimentSuccess,
    isLoading: isExperimentLoading,
    isError: isExperimentError,
    mutate: mutateExperiment,
  } = useMutation<AxiosResponse<Experiment>, AxiosError>('addExperiment', () =>
    api.post('/experiments/add', {
      id: experiment.id,
      title,
      toa,
      leadInstitution,
      experimentAim,
      experimentObjective,
      experimentModuleDrawing,
      missionId: mission?.id,
      forCodeId: forCode?.id,
      seoCodeId: seoCode?.id,
      experimentPublications: publicationsState.data.map((entry) => entry.data),
      experimentPersonRequests: peopleState.data.map((entry) => entry.data),
    }),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutateExperiment();
  };

  useEffect(() => {
    if (isExperimentSuccess) {
      navigate('/admin/dashboard/experiments');
    }
  }, [isExperimentSuccess, navigate]);

  return (
    <AuthWrapper>
      <Container maxWidth='md' sx={{ mb: 3 }}>
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            height: 'auto',
            width: 'auto',
            bgcolor: '#F7F5F8',
            p: 3,
            borderRadius: '16px',
          }}
        >
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Typography variant='h3' sx={{ mt: 1, mb: 3 }}>
              Edit Experiment
            </Typography>
          </Box>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            display='flex'
            flexDirection='column'
            alignItems='center'
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField
                  label='Title'
                  name='title'
                  value={title || ''}
                  errors={experimentError?.response?.data}
                  onChange={setTitle}
                />
              </Grid>
              <Grid item xs={6}>
                <FormField label='TOA' name='toa' errors={experimentError?.response?.data} onChange={setToa} />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  label='Lead Institution'
                  name='leadInstitution'
                  value={leadInstitution || ''}
                  errors={experimentError?.response?.data}
                  onChange={setLeadInstitution}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Aim'
                  name='experimentAim'
                  value={experimentAim || ''}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentAim}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Objective'
                  name='experimentObjective'
                  value={experimentObjective || ''}
                  multiline
                  minRows={4}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentObjective}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Module Drawing'
                  name='experimentModuleDrawing'
                  value={experimentModuleDrawing || ''}
                  errors={experimentError?.response?.data}
                  onChange={setExperimentModuleDrawing}
                />
              </Grid>
            </Grid>
            <Autocomplete
              disablePortal
              openText='Mission'
              options={missions || []}
              value={mission}
              isOptionEqualToValue={(option, value) => option.name === value.name}
              getOptionLabel={(option) => option.name}
              loading={isMissionsLoading}
              fullWidth
              onChange={(_event, value) => {
                if (experimentError?.response?.data !== undefined) {
                  experimentError.response.data.missionId = '';
                }
                setMission(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='normal'
                  size='small'
                  fullWidth
                  color='secondary'
                  error={isExperimentError && !!experimentError?.response?.data?.missionId}
                  helperText={experimentError?.response?.data?.missionId}
                  label='Mission'
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
              noOptionsText={
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                  <Typography variant='body1' flexGrow={1}>
                    No such missions found.
                  </Typography>
                  <Button variant='outlined' onClick={() => navigate('/addMission')} sx={{ textTransform: 'none' }}>
                    <Typography variant='body1' color='primary'>
                      Add a new mission?
                    </Typography>
                  </Button>
                </Box>
              }
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  openText='FOR Code'
                  options={forCodes || []}
                  getOptionLabel={(option) => option.name}
                  value={forCode}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  fullWidth
                  loading={isForCodesLoading}
                  onChange={(_event, value) => {
                    if (experimentError?.response?.data !== undefined) {
                      experimentError.response.data.forCodeId = '';
                    }
                    setForCode(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin='normal'
                      size='small'
                      color='secondary'
                      fullWidth
                      error={isExperimentError && !!experimentError?.response?.data?.forCodeId}
                      helperText={experimentError?.response?.data?.forCodeId}
                      label='FOR Code'
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
                  noOptionsText='No such FOR codes found.'
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  disablePortal
                  openText='SEO Code'
                  options={seoCodes || []}
                  getOptionLabel={(option) => option.name}
                  value={seoCode}
                  isOptionEqualToValue={(option, value) => option.name === value.name}
                  fullWidth
                  loading={isSeoCodesLoading}
                  onChange={(_event, value) => {
                    if (experimentError?.response?.data !== undefined) {
                      experimentError.response.data.seoCodeId = '';
                    }
                    setSeoCode(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      margin='normal'
                      size='small'
                      color='secondary'
                      fullWidth
                      error={isExperimentError && !!experimentError?.response?.data?.seoCodeId}
                      helperText={experimentError?.response?.data?.seoCodeId}
                      label='SEO Code'
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
                  noOptionsText='No such SEO codes found.'
                />
              </Grid>
            </Grid>
            {/* Publication entries */}
            <AddPublications
              publicationsState={publicationsState}
              dispatchPublications={dispatchPublications}
              errors={experimentError?.response?.data}
            />
            <Paper sx={{ width: '100%', mt: 2, border: '1px #c4c4c4 solid' }} variant='outlined'>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ p: 1, pl: 1.5 }}>Edit People</Typography>
                <IconButton
                  onClick={() => {
                    dispatchPeople({
                      type: 'ADD',
                      payload: { id: peopleState.uid, data: { personId: 0, roleId: 0 } },
                    });
                  }}
                >
                  <PersonAddRoundedIcon />
                </IconButton>
              </Box>
              {peopleState.data.map((entry) => (
                <Grid key={entry.id} container alignItems='center'>
                  <Grid item xs={5} sx={{ pl: 1 }}>
                    <Autocomplete
                      disablePortal
                      openText='Person'
                      options={people || []}
                      getOptionLabel={(option) => `${option.firstName} ${option.familyName}`}
                      value={people?.find((p) => p.id === entry.data.personId) || null}
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
                          dispatchPeople({ type: 'MODIFY', payload });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin='normal'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Person'
                        />
                      )}
                      renderOption={(props, option, { inputValue }) => {
                        const fullName = `${option.firstName} ${option.familyName}`;
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
                      getOptionDisabled={(option: Person) =>
                        peopleState.data.some((entry) => entry.data.personId === option.id)
                      }
                      noOptionsText={
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                          <Typography variant='body1' flexGrow={1}>
                            No such person found.
                          </Typography>
                          <Button
                            variant='outlined'
                            onClick={() => navigate('/addPerson')}
                            sx={{ textTransform: 'none' }}
                          >
                            <Typography variant='body1'>Add a new person?</Typography>
                          </Button>
                        </Box>
                      }
                    />
                  </Grid>
                  <Grid item xs={1} display='flex' justifyContent='center'>
                    <Typography variant='body1'>as</Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Autocomplete
                      disablePortal
                      openText='Role'
                      options={roles || []}
                      getOptionLabel={(option) => option.name}
                      value={roles?.find((r) => r.id === entry.data.roleId) || null}
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
                          dispatchPeople({ type: 'MODIFY', payload });
                        }
                      }}
                      renderInput={(params) => (
                        <TextField {...params} margin='normal' size='small' color='secondary' fullWidth label='Role' />
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
                    <IconButton
                      onClick={() => {
                        dispatchPeople({
                          type: 'REMOVE',
                          payload: { id: entry.id, data: entry.data },
                        });
                      }}
                    >
                      <PersonRemoveRoundedIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Box>
          <Box display='flex' alignItems='center' mt={3}>
            <LoadingButton
              sx={{ mr: 2 }}
              loading={isExperimentLoading}
              onClick={handleSubmit}
              variant='contained'
              color='secondary'
            >
              Save Changes
            </LoadingButton>
            <Button
              sx={{ backgroundColor: 'gray' }}
              variant='contained'
              onClick={() => navigate('/admin/dashboard/experiments')}
            >
              Cancel
            </Button>
          </Box>
          <MessageSnackbar open={isExperimentError} message='Failed to add experiment.' severity='error' />
        </Box>
      </Container>
    </AuthWrapper>
  );
}
