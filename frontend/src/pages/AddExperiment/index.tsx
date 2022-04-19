import { Alert, Autocomplete, Box, Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import { Experiment, ForCode, Mission, SeoCode } from '../../types';
import api from '../../util/api';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

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
    }),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // console.log({
    //   title,
    //   toa,
    //   leadInstitution,
    //   experimentAim,
    //   experimentObjective,
    //   experimentModuleDrawing,
    //   experimentPublications,
    //   missionId: mission?.id,
    //   platformId: mission?.platform.id,
    //   forCodeId: forCode?.id,
    //   seoCodeId: seoCode?.id,
    // });
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
    <Container maxWidth='sm'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h3' sx={{ mt: 6, mb: 3 }}>
          Add Experiment
        </Typography>
      </Box>
      <Box component='form' noValidate onSubmit={handleSubmit}>
        <FormField label='Title' name='title' errors={experimentError?.response?.data} onChange={setTitle} />
        <FormField label='Toa' name='toa' errors={experimentError?.response?.data} onChange={setToa} />
        <FormField
          label='Lead Institution'
          name='leadInstitution'
          errors={experimentError?.response?.data}
          onChange={setLeadInstitution}
        />
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
          onChange={(_event, value) => setMission(value)}
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
        <Autocomplete
          disablePortal
          openText='FOR Code'
          options={forCodes || []}
          getOptionLabel={(option) => option.name}
          fullWidth
          loading={isForCodesLoading}
          onChange={(_event, value) => setForCode(value)}
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
        <Autocomplete
          disablePortal
          openText='SEO Code'
          options={seoCodes || []}
          getOptionLabel={(option) => option.name}
          fullWidth
          loading={isSeoCodesLoading}
          onChange={(_event, value) => setSeoCode(value)}
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
        <LoadingButton
          loading={isExperimentLoading}
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth
          sx={{ mt: 3, mb: 2 }}
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
