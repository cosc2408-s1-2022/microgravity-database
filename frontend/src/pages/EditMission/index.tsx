import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AxiosResponse, AxiosError } from 'axios';
import lodash from 'lodash';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import AutocompleteSelector from '../../components/AutocompleteSelector';
import Captcha from '../../components/Captcha';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import MessageSnackbar from '../../components/MessageSnackbar';
import api from '../../util/api';
import { Mission, Platform, UserRole } from '../../util/types';

export default function EditMission() {
  const navigate = useNavigate();
  const location = useLocation();
  const mission = location.state as Mission;
  if (!mission) {
    navigate('/', {
      state: {
        isError: true,
        message: 'Mission could not be found.',
      },
    });
  }

  const [name, setName] = useState<string>(mission.name);
  const [launchDate, setLaunchDate] = useState<Date | null>(mission.launchDate);
  const [startDate, setStartDate] = useState<Date | null>(mission.startDate ?? null);
  const [endDate, setEndDate] = useState<Date | null>(mission.endDate ?? null);
  const [platform, setPlatform] = useState<Platform | null>(mission.platform);
  const startDateError = launchDate && startDate && launchDate < startDate;
  const endDateError = startDate && endDate && endDate < startDate;
  const {
    error: missionError,
    isSuccess: isMissionSuccess,
    isLoading: isMissionLoading,
    isError: isMissionError,
    mutate: mutateMission,
  } = useMutation<AxiosResponse<Mission>, AxiosError>('saveMission', () => {
    const launchDateString = launchDate && moment(launchDate).format('YYYY-MM-DD');
    const startDateString = startDate && moment(startDate).format('YYYY-MM-DD');
    const endDateString = endDate && moment(endDate).format('YYYY-MM-DD');
    return api.post('/missions/save', {
      id: mission.id,
      name: name || '',
      launchDate: launchDateString === 'Invalid date' ? null : launchDateString,
      startDate: startDateString === 'Invalid date' ? null : startDateString,
      endDate: endDateString === 'Invalid date' ? null : endDateString,
      platformId: platform?.id,
    });
  });

  const [isCaptchaComplete, setIsCaptchaComplete] = useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    !endDateError && mutateMission();
  };

  useEffect(() => {
    if (isMissionSuccess) {
      navigate(-1);
    }
  }, [isMissionSuccess, navigate]);

  return (
    <AuthWrapper role={UserRole.ROLE_ADMIN}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Container maxWidth='sm'>
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Typography variant='h3' sx={{ mt: 1, mb: 3 }}>
                Edit Mission
              </Typography>
            </Box>
            <Box component='form' noValidate onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormField
                    autoFocus
                    label='Name'
                    name='name'
                    value={name}
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
                <Grid item xs={12} display='flex' justifyContent='center' alignItems='center'>
                  <LoadingButton
                    sx={{ mr: 2, width: '50%' }}
                    disabled={!isCaptchaComplete}
                    loading={isMissionLoading}
                    onClick={handleSubmit}
                    variant='contained'
                    color='secondary'
                  >
                    Save Changes
                  </LoadingButton>
                  <Button
                    sx={{ backgroundColor: 'gray', width: '50%' }}
                    variant='contained'
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <MessageSnackbar open={isMissionError} message='Failed to save mission.' severity='error' />
          </Box>
        </Container>
      </LocalizationProvider>
    </AuthWrapper>
  );
}
