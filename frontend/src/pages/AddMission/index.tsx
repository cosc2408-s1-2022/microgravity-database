import { Alert, Box, Container, MenuItem, Snackbar, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';
import { Mission, Platform } from '../../types';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import moment from 'moment';
import lodash from 'lodash';

export default function AddMission() {
  const [platforms, setPlatforms] = useState<Platform[]>();
  const { data: platformsData, isSuccess: isPlatformsSuccess } = useQuery<AxiosResponse<Platform[]>, AxiosError>(
    'getAllPlatforms',
    () => api.get('/platforms'),
  );
  useEffect(() => {
    if (isPlatformsSuccess && platformsData) setPlatforms(platformsData.data);
  }, [isPlatformsSuccess, platformsData]);

  const [name, setName] = useState<string>();
  const [launchDate, setLaunchDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [platformId, setPlatformId] = useState<string>('');
  const {
    error: missionError,
    isSuccess: isMissionSuccess,
    isLoading: isMissionLoading,
    isError: isMissionError,
    mutate: mutateMission,
  } = useMutation<AxiosResponse<Mission>, AxiosError>('addMission', () =>
    api.post('/missions/add', {
      name: name || '',
      launchDate: launchDate && moment(launchDate).year().toString(),
      startDate: startDate && moment(startDate).year().toString(),
      endDate: endDate && moment(endDate).year().toString(),
      platformId: parseInt(platformId),
    }),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({
      name,
      launchDate: moment(launchDate).year().toString(),
      startDate: moment(startDate).year().toString(),
      endDate: moment(endDate).year().toString(),
      platformId: parseInt(platformId, 10),
    });
    mutateMission();
  };

  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };
  useEffect(() => {
    if (isMissionError) {
      setErrorSnackbarOpen(true);
    }
  }, [isMissionError]);

  if (isMissionSuccess) {
    return <Navigate to='/home' />;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Container maxWidth='xs'>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h3' sx={{ mt: 6, mb: 3 }}>
            Add Mission
          </Typography>
        </Box>
        <Box component='form' noValidate onSubmit={handleSubmit}>
          <FormField label='Name' name='name' errors={missionError?.response?.data} onChange={setName} />
          <DatePicker
            label='Launch Date'
            views={['year']}
            value={launchDate}
            onChange={(value) => {
              setLaunchDate(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin='normal'
                fullWidth
                error={isMissionError && !!missionError?.response?.data?.launchDate}
                helperText={missionError?.response?.data?.launchDate}
              />
            )}
          />
          <DatePicker
            label='Start Date'
            views={['year']}
            value={startDate}
            onChange={(value) => {
              setStartDate(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin='normal'
                fullWidth
                error={isMissionError && !!missionError?.response?.data?.startDate}
                helperText={missionError?.response?.data?.startDate}
              />
            )}
          />
          <DatePicker
            label='End Date'
            views={['year']}
            value={endDate}
            onChange={(value) => {
              setEndDate(value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin='normal'
                fullWidth
                error={isMissionError && !!missionError?.response?.data?.endDate}
                helperText={missionError?.response?.data?.endDate}
              />
            )}
          />
          <TextField
            label='Select Platform'
            value={platformId}
            fullWidth
            sx={{ marginTop: 2 }}
            select
            onChange={(event) => {
              setPlatformId(event.target.value);
            }}
          >
            {/* Hidden menu item to suppress warning as platforms are fetched. */}
            <MenuItem value={''} style={{ display: 'none' }} />
            {platforms?.map((platform) => (
              <MenuItem key={platform.id} value={platform.id}>
                {lodash.startCase(platform.name)}
              </MenuItem>
            ))}
          </TextField>
          <LoadingButton
            loading={isMissionLoading}
            type='submit'
            variant='contained'
            color='secondary'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Add Mission
          </LoadingButton>
        </Box>
        <Snackbar open={errorSnackbarOpen} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
          <Alert severity='error' onClose={handleErrorSnackbarClose}>
            Failed to add mission.
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
}
