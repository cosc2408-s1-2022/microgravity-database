import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useReducer, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import { Experiment, ExperimentPersonRequest, ForCode, Mission, Person, Role, SeoCode } from '../../types';
import api from '../../util/api';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';

// TODO Refactor into smaller sub-components.
export default function AddExperiment() {
  const navigate = useNavigate();

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

  const [roles, setRoles] = useState<Role[]>();
  const {
    data: rolesData,
    isSuccess: isRolesSuccess,
    isLoading: isRolesLoading,
  } = useQuery<AxiosResponse<Role[]>, AxiosError>('getAllRoles', () => api.get('/roles'));
  useEffect(() => {
    if (isRolesSuccess && rolesData) setRoles(rolesData.data);
  }, [isRolesSuccess, rolesData]);

  const [title, setTitle] = useState<string>();
  const [toa, setToa] = useState<string>();
  const [leadInstitution, setLeadInstitution] = useState<string>();
  const [experimentAim, setExperimentAim] = useState<string>();
  const [experimentObjective, setExperimentObjective] = useState<string>();
  const [experimentModuleDrawing, setExperimentModuleDrawing] = useState<string>();
  const [experimentPublications, setExperimentPublications] = useState<string>();
  const [mission, setMission] = useState<Mission | null>();
  const [forCode, setForCode] = useState<ForCode | null>();
  const [seoCode, setSeoCode] = useState<SeoCode | null>();
  type ExperimentPersonRequestEntry = {
    id: number;
    data: ExperimentPersonRequest;
  };
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
  const [peopleState, dispatchPeople] = useReducer(peopleReducer, { uid: 0, data: [] });
  const {
    error: experimentError,
    isSuccess: isExperimentSuccess,
    isLoading: isExperimentLoading,
    isError: isExperimentError,
    mutate: mutateExperiment,
  } = useMutation<AxiosResponse<Experiment>, AxiosError>('addExperiment', () =>
    api.post('/experiments/add', {
      title,
      toa,
      leadInstitution,
      experimentAim,
      experimentObjective,
      experimentModuleDrawing,
      experimentPublications,
      missionId: mission?.id,
      platformId: mission?.platform.id,
      forCodeId: forCode?.id,
      seoCodeId: seoCode?.id,
      experimentPersonRequests: peopleState.data.map((entry) => entry.data),
    }),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutateExperiment();
  };

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };
  useEffect(() => {
    if (isExperimentError) {
      setErrorSnackbarOpen(true);
    }
  }, [isExperimentError]);

  if (isExperimentSuccess) {
    return <Navigate to='/home' />;
  }

  return (
    <Container maxWidth='lg'>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Typography variant='h3' sx={{ mt: 6, mb: 3 }}>
          Add Experiment
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
        <FormField label='Title' name='title' errors={experimentError?.response?.data} onChange={setTitle} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormField label='TOA' name='toa' errors={experimentError?.response?.data} onChange={setToa} />
          </Grid>
          <Grid item xs={6}>
            <FormField
              label='Lead Institution'
              name='leadInstitution'
              errors={experimentError?.response?.data}
              onChange={setLeadInstitution}
            />
          </Grid>
        </Grid>
        <FormField
          label='Experiment Aim'
          name='experimentAim'
          errors={experimentError?.response?.data}
          onChange={setExperimentAim}
        />
        <FormField
          label='Experiment Objective'
          name='experimentObjective'
          multiline
          minRows={4}
          errors={experimentError?.response?.data}
          onChange={setExperimentObjective}
        />
        <FormField
          label='Experiment Module Drawing'
          name='experimentModuleDrawing'
          errors={experimentError?.response?.data}
          onChange={setExperimentModuleDrawing}
        />
        <FormField
          label='Experiment Publications'
          name='Experiment Publications'
          errors={experimentError?.response?.data}
          onChange={setExperimentPublications}
        />
        <Autocomplete
          disablePortal
          openText='Mission'
          options={missions || []}
          getOptionLabel={(option) => option.name}
          loading={isMissionsLoading}
          fullWidth
          onChange={(_event, value) => {
            if (experimentError?.response?.data != undefined) {
              experimentError.response.data.missionId = '';
            }
            setMission(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              margin='normal'
              fullWidth
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
                <Typography variant='body1'>Add a new mission?</Typography>
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
              fullWidth
              loading={isForCodesLoading}
              onChange={(_event, value) => {
                if (experimentError?.response?.data != undefined) {
                  experimentError.response.data.forCodeId = '';
                }
                setForCode(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='normal'
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
              fullWidth
              loading={isSeoCodesLoading}
              onChange={(_event, value) => {
                if (experimentError?.response?.data != undefined) {
                  experimentError.response.data.seoCodeId = '';
                }
                setSeoCode(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  margin='normal'
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
        <Paper sx={{ width: '100%', mt: 2, border: '1px #c4c4c4 solid' }} variant='outlined'>
          <Box p={1} display='flex' alignItems='center'>
            <Typography sx={{ p: 1 }}>Add People</Typography>
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
                  renderInput={(params) => <TextField {...params} margin='normal' fullWidth label='Person' />}
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
                  filterOptions={(options) =>
                    options.filter((option) => !peopleState.data.some((entry) => entry.data.personId === option.id))
                  }
                  noOptionsText={
                    <Box display='flex' justifyContent='space-between' alignItems='center'>
                      <Typography variant='body1' flexGrow={1}>
                        No such person found.
                      </Typography>
                      <Button variant='outlined' onClick={() => navigate('/addPerson')} sx={{ textTransform: 'none' }}>
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
                  renderInput={(params) => <TextField {...params} margin='normal' fullWidth label='Role' />}
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
        <LoadingButton
          loading={isExperimentLoading}
          type='submit'
          variant='contained'
          color='secondary'
          sx={{ width: '50%', mt: 3, mb: 2 }}
        >
          Add Experiment
        </LoadingButton>
      </Box>
      <Snackbar open={errorSnackbarOpen} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
        <Alert severity='error' onClose={handleErrorSnackbarClose}>
          Failed to add experiment.
        </Alert>
      </Snackbar>
    </Container>
  );
}
