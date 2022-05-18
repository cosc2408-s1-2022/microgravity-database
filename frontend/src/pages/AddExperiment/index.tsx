import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import * as React from 'react';
import { useEffect, useReducer, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';
import AuthWrapper from '../../components/AuthWrapper';
import {
  Experiment,
  ExperimentPersonRequest,
  ExperimentPublications,
  ExperimentPublicationsAuthorsResponse,
  ExperimentPublicationsResponse,
  ForCode,
  Mission,
  Person,
  Role,
  SeoCode,
} from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';

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
  const [experimentPublications, setExperimentPublications] = useState<ExperimentPublications[]>();
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
      forCodeId: forCode?.id,
      seoCodeId: seoCode?.id,
      experimentPersonRequests: peopleState.data.map((entry) => entry.data),
    }),
  );
  console.log('forCodes', forCodes);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('mission', mission);
    mutateExperiment();
  };

  useEffect(() => {
    if (isExperimentSuccess) {
      navigate('/home');
    }
  }, [isExperimentSuccess, navigate]);

  const [doi, setDoi] = useState('');
  const [manualButton, setManualButton] = useState(true);
  const [doiButton, setDoiButton] = useState(true);
  const [manualForm, setManualForm] = useState(false);
  const [doiForm, setDoiForm] = useState(false);

  const [doiDoi, setDoiDoi] = useState('');
  const [doiTitle, setDoiTitle] = useState('');
  const [doiJournal, setDoiJournal] = useState('');
  const [doiVolumeNumber, setDoiVolumeNumber] = useState('');
  const [doiIssueNumber, setDoiIssueNumber] = useState('');
  const [doiJournalDatabase, setDoiJournalDatabase] = useState('');
  const [doiPages, setDoiPages] = useState('');
  const [doiUrl, setDoiUrl] = useState('');
  const [doiAccessDate, setDoiAccessDate] = useState('');
  const [doiYearPublished, setDoiYearPublished] = useState('');
  const [doiAuthors, setDoiAuthors] = useState<ExperimentPublicationsAuthorsResponse[]>();
  const [doiSuccess, setDoiSuccess] = useState(true);

  const handleSetManual = () => {
    setManualButton(false);
    setManualForm(true);
  };
  const handleSetDoi = () => {
    setDoiButton(false);
    setDoiForm(true);
  };

  const handleClear = () => {
    setDoiDoi('');
    setDoiTitle('');
    setDoiJournal('');
    setDoiVolumeNumber('');
    setDoiIssueNumber('');
    setDoiJournalDatabase('');
    setDoiPages('');
    setDoiUrl('');
    setDoiAccessDate('');
    setDoiYearPublished('');
    setDoiAuthors([]);
  };

  const { data, isError, isSuccess, mutate, isLoading } = useMutation<
    AxiosResponse<ExperimentPublicationsResponse>,
    AxiosError
  >(() => {
    return axios.get(`https://api.crossref.org/works/${doi.toString()}`);
  });

  const handleGoBack = () => {
    setManualButton(true);
    setDoiButton(true);
    setManualForm(false);
    setDoiForm(false);
    setDoiSuccess(false);
    handleClear();
  };

  const handleFindDoi = async () => {
    mutate();
  };

  useEffect(() => {
    if (isSuccess && data) {
      setDoiForm(false);
      setDoiDoi(data?.data?.message?.DOI);
      setDoiTitle(data?.data?.message?.title);
      setDoiJournal(data?.data?.message?.['container-title']);
      setDoiVolumeNumber(data?.data?.message?.volume);
      setDoiIssueNumber(data?.data?.message?.issue);
      setDoiJournalDatabase(data?.data?.message?.publisher);
      setDoiUrl(data?.data?.message?.URL);
      setDoiPages(data?.data?.message?.page);
      const date = new Date(data?.data?.message?.created?.['date-time']);
      const convertedDate = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
      setDoiAccessDate(convertedDate);
      setDoiYearPublished(data?.data?.message?.issued?.['date-parts'][0][0] as string);
      setDoiAuthors(
        data?.data?.message?.author.map((author) => ({
          given: author.given,
          family: author.family,
        })),
      );

      setExperimentPublications([
        {
          doi: data?.data?.message?.DOI,
          authors: data?.data?.message?.author.map((author) => ({
            firstName: author.given,
            lastName: author.family,
          })),
          yearPublished: data?.data?.message?.issued?.['date-parts'][0][0] as string,
          title: data?.data?.message?.title[0],
          journal: data?.data?.message?.['container-title'][0],
          volumeNumber: data?.data?.message?.volume,
          issueNumber: data?.data?.message?.issue,
          pagesUsed: data?.data?.message?.page,
          journalDatabase: data?.data?.message?.publisher,
          url: data?.data?.message?.URL,
          accessDate: convertedDate,
        },
      ]);
      setDoiSuccess(true);
    }
  }, [isSuccess, data]);

  return (
    <AuthWrapper>
      <Container maxWidth='md'>
        <Box
          sx={{
            my: -2,
            mt: 4,
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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField
                  autoFocus
                  label='Title'
                  name='title'
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
                  errors={experimentError?.response?.data}
                  onChange={setLeadInstitution}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Aim'
                  name='experimentAim'
                  errors={experimentError?.response?.data}
                  onChange={setExperimentAim}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Experiment Objective'
                  name='experimentObjective'
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
                  errors={experimentError?.response?.data}
                  onChange={setExperimentModuleDrawing}
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignContent='space-between' alignItems='center'>
                  <Grid item sx={{ ml: 1 }}>
                    <Typography>Experiment Publications</Typography>
                  </Grid>
                  {manualButton && doiButton ? (
                    <>
                      <Grid item sx={{ ml: 1 }}>
                        <Button variant='contained' color='secondary' sx={{}} onClick={handleSetDoi}>
                          Enter DOI
                        </Button>
                      </Grid>
                      <Grid item sx={{ ml: 1 }}>
                        <Button variant='contained' color='secondary' sx={{}} onClick={handleSetManual}>
                          Enter Manually
                        </Button>
                      </Grid>
                    </>
                  ) : undefined}
                </Grid>
                {manualForm ? (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormField
                          name='doi'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='DOI'
                          value={doiDoi}
                          onChange={setDoi}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='title'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Title'
                          value={doiTitle}
                          onChange={setDoiTitle}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='journal'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Jornal'
                          value={doiJournal}
                          onChange={setDoiJournal}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='volumeNumber'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Volume Number'
                          value={doiVolumeNumber}
                          onChange={setDoiVolumeNumber}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='issueNumber'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Issue Number'
                          value={doiIssueNumber}
                          onChange={setDoiIssueNumber}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='journalDatabase'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Journal Database'
                          value={doiJournalDatabase}
                          onChange={setDoiJournalDatabase}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='url'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='URL'
                          value={doiUrl}
                          onChange={setDoiUrl}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='accessDate'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Access Date'
                          value={doiAccessDate}
                          onChange={setDoiAccessDate}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='yearPublished'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Year Published'
                          value={doiYearPublished}
                          onChange={setDoiYearPublished}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='authors'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Authors'
                          value={doiAuthors}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='pagesUsed'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Pages'
                          value={doiPages}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant='contained' fullWidth onClick={handleGoBack}>
                          Go Back
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant='contained' fullWidth onClick={handleClear}>
                          Clear
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : undefined}
                {doiForm ? (
                  <>
                    <FormField
                      autoFocus
                      required
                      label='DOI Name'
                      placeholder='Type or paste the DOI Name :'
                      name='DOI'
                      onChange={setDoi}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <LoadingButton
                              loading={isLoading}
                              variant='contained'
                              color='secondary'
                              sx={{ m: 1 }}
                              size='small'
                              onClick={handleFindDoi}
                            >
                              Search For DOI
                            </LoadingButton>
                            <Button variant='contained' size='small' onClick={handleGoBack}>
                              Go Back
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {isError ? (
                      <Typography color='red' sx={{ mt: 1 }}>
                        DOI Not Found Try Again
                      </Typography>
                    ) : undefined}
                  </>
                ) : undefined}
                {isSuccess && data && doiSuccess ? (
                  <>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormField
                          name='doi'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='DOI'
                          value={doiDoi}
                          onChange={setDoi}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='title'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Title'
                          value={doiTitle}
                          onChange={setDoiTitle}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='journal'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Jornal'
                          value={doiJournal}
                          onChange={setDoiJournal}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='volumeNumber'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Volume Number'
                          value={doiVolumeNumber}
                          onChange={setDoiVolumeNumber}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='issueNumber'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Issue Number'
                          value={doiIssueNumber}
                          onChange={setDoiIssueNumber}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='journalDatabase'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Journal Database'
                          value={doiJournalDatabase}
                          onChange={setDoiJournalDatabase}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='url'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='URL'
                          value={doiUrl}
                          onChange={setDoiUrl}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='accessDate'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Access Date'
                          value={doiAccessDate}
                          onChange={setDoiAccessDate}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='yearPublished'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Year Published'
                          value={doiYearPublished}
                          onChange={setDoiYearPublished}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='authors'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Authors'
                          value={doiAuthors}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormField
                          name='pagesUsed'
                          size='small'
                          color='secondary'
                          fullWidth
                          label='Pages'
                          value={doiPages}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant='contained' fullWidth onClick={handleGoBack}>
                          Go Back
                        </Button>
                      </Grid>
                      <Grid item xs={3}>
                        <Button variant='contained' fullWidth onClick={handleClear}>
                          Clear
                        </Button>
                      </Grid>
                    </Grid>
                  </>
                ) : undefined}
              </Grid>
            </Grid>
            <Autocomplete
              disablePortal
              openText='Mission'
              options={missions || []}
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
            <Paper sx={{ width: '100%', mt: 2, border: '1px #c4c4c4 solid' }} variant='outlined'>
              <Box display='flex' alignItems='center'>
                <Typography sx={{ p: 1, pl: 1.5 }}>Add People</Typography>
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
            <LoadingButton
              loading={isExperimentLoading}
              type='submit'
              variant='contained'
              color='secondary'
              sx={{ width: '50%', mt: 3, mb: 1 }}
            >
              Add Experiment
            </LoadingButton>
          </Box>
          <MessageSnackbar open={isExperimentError} message='Failed to add experiment.' severity='error' />
        </Box>
      </Container>
    </AuthWrapper>
  );
}
