import { Box, Container, Grid, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import moment from 'moment';
import lodash from 'lodash';
import AuthWrapper from '../../components/AuthWrapper';
import { Mission, Platform } from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import Captcha from '../../components/Captcha';
import AutocompleteSelector from '../../components/AutocompleteSelector';

export default function AddMission() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState<string>();
  const [launchDate, setLaunchDate] = useState<Date | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [platform, setPlatform] = useState<Platform | null>(null);
  const startDateError = launchDate && startDate && launchDate < startDate;
  const endDateError = startDate && endDate && endDate < startDate;
  const {
    error: missionError,
    isSuccess: isMissionSuccess,
    isLoading: isMissionLoading,
    isError: isMissionError,
    mutate: mutateMission,
  } = useMutation<AxiosResponse<Mission>, AxiosError>('addMission', () => {
    const launchDateString = launchDate && moment(launchDate).format('YYYY-MM-DD');
    const startDateString = startDate && moment(startDate).format('YYYY-MM-DD');
    const endDateString = endDate && moment(endDate).format('YYYY-MM-DD');
    return api.post('/missions/save', {
      name: name || '',
      launchDate: launchDateString === 'Invalid date' ? null : launchDateString,
      startDate: startDateString === 'Invalid date' ? null : startDateString,
      endDate: endDateString === 'Invalid date' ? null : endDateString,
      platformId: platform?.id,
    });
  });

  const [isCaptchaComplete, setIsCaptchaComplete] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    !endDateError && mutateMission();
  };

  useEffect(() => {
    if (isMissionSuccess) {
      queryClient.invalidateQueries('getAllMissions');
      navigate('/home');
    }
  }, [isMissionSuccess, navigate, queryClient]);

  return (
    <AuthWrapper>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container maxWidth='sm'>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h3' fontWeight='bold' sx={{ mt: 1, mb: 3 }}>
                Add Mission
              </Typography>
            </Box>
            <Box component='form' noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormField
                    autoFocus
                    label='Name'
                    name='name'
                    errors={missionError?.response?.data}
                    onChange={setName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DesktopDatePicker
                    label='Launch Date'
                    views={['year', 'month', 'day']}
                    value={launchDate}
                    onChange={(value) => {
                      if (missionError?.response?.data !== undefined) {
                        missionError.response.data.launchDate = '';
                      }
                      setLaunchDate(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size='small'
                        color='secondary'
                        fullWidth
                        error={isMissionError && !!missionError?.response?.data?.launchDate}
                        helperText={missionError?.response?.data?.launchDate}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DesktopDatePicker
                    label='Start Date'
                    views={['year', 'month', 'day']}
                    value={startDate}
                    onChange={(value) => {
                      if (missionError?.response?.data !== undefined) {
                        missionError.response.data.startDate = '';
                      }
                      setStartDate(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size='small'
                        color='secondary'
                        fullWidth
                        error={startDateError || (isMissionError && !!missionError?.response?.data?.startDate)}
                        helperText={
                          startDateError
                            ? 'Start date cannot be before the launch date.'
                            : missionError?.response?.data?.startDate
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DesktopDatePicker
                    label='End Date'
                    views={['year', 'month', 'day']}
                    value={endDate}
                    onChange={(value) => {
                      if (missionError?.response?.data !== undefined) {
                        missionError.response.data.endDate = '';
                      }
                      setEndDate(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size='small'
                        color='secondary'
                        fullWidth
                        error={endDateError || (isMissionError && !!missionError?.response?.data?.endDate)}
                        helperText={
                          endDateError
                            ? 'End date cannot be before the start date.'
                            : missionError?.response?.data?.endDate
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <AutocompleteSelector<Platform>
                    name='platformId'
                    label='Platform'
                    value={platform}
                    dispatch={setPlatform}
                    errors={missionError?.response?.data}
                    queryKey='getAllPlatforms'
                    queryFn={() => api.get('/platforms')}
                    matchFn={(option) => lodash.startCase(option.name)}
                    equalityFn={(option, value) => option.id === value.id}
                  />
                </Grid>
                <Grid item xs={12} display='flex' flexDirection='column' alignItems='center'>
                  <Captcha onComplete={setIsCaptchaComplete} />
                </Grid>
                <Grid item xs={12} display='flex' justifyContent='center'>
                  <LoadingButton
                    disabled={!isCaptchaComplete}
                    loading={isMissionLoading}
                    type='submit'
                    variant='contained'
                    color='secondary'
                    sx={{ width: '75%' }}
                  >
                    Add Mission
                  </LoadingButton>
                </Grid>
              </Grid>
            </Box>
            <MessageSnackbar open={isMissionError} message='Failed to add mission.' severity='error' />
          </Box>
        </Container>
      </LocalizationProvider>
    </AuthWrapper>
  );
}
