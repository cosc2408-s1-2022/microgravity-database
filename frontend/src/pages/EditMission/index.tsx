import { Autocomplete, Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { AxiosResponse, AxiosError } from 'axios';
import lodash from 'lodash';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
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

  const [platforms, setPlatforms] = useState<Platform[]>();
  const {
    data: platformsData,
    isSuccess: isPlatformsSuccess,
    isLoading: isPlatformsLoading,
  } = useQuery<AxiosResponse<Platform[]>, AxiosError>('getAllPlatforms', () => api.get('/platforms'));
  useEffect(() => {
    if (isPlatformsSuccess && platformsData) setPlatforms(platformsData.data);
  }, [isPlatformsSuccess, platformsData]);

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
  } = useMutation<AxiosResponse<Mission>, AxiosError>('saveMission', () =>
    api.post('/missions/save', {
      id: mission.id,
      name: name || '',
      launchDate: launchDate && moment(launchDate).year().toString(),
      startDate: startDate && moment(startDate).year().toString(),
      endDate: endDate && moment(endDate).year().toString(),
      platformId: platform?.id,
    }),
  );

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
                    value={name}
                    errors={missionError?.response?.data}
                    onChange={setName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    label='Launch Date'
                    views={['year']}
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
                  <DatePicker
                    label='Start Date'
                    views={['year']}
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
                  <DatePicker
                    label='End Date'
                    views={['year']}
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
                  <Autocomplete
                    disablePortal
                    openText='Platform'
                    options={platforms || []}
                    getOptionLabel={(option) => lodash.startCase(option.name)}
                    fullWidth
                    loading={isPlatformsLoading}
                    value={platform}
                    onChange={(_event, value) => {
                      if (missionError?.response?.data !== undefined) {
                        missionError.response.data.platformId = '';
                      }
                      setPlatform(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size='small'
                        color='secondary'
                        fullWidth
                        error={isMissionError && !!missionError?.response?.data?.platformId}
                        helperText={missionError?.response?.data?.platformId}
                        label='Platform'
                      />
                    )}
                    renderOption={(props, option, { inputValue }) => {
                      const startCaseValue = lodash.startCase(option.name);
                      const matches = match(startCaseValue, inputValue);
                      const parts = parse(startCaseValue, matches);
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
                    noOptionsText='No such platforms found.'
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box display='flex' alignItems='center'>
                    <LoadingButton
                      sx={{ mr: 2 }}
                      loading={isMissionLoading}
                      onClick={handleSubmit}
                      variant='contained'
                      color='secondary'
                    >
                      Save Changes
                    </LoadingButton>
                    <Button sx={{ backgroundColor: 'gray' }} variant='contained' onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                  </Box>
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
