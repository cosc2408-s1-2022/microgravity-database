import {Alert, Autocomplete, Box, Container, Snackbar, TextField, Typography} from '@mui/material';
import {DatePicker, LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {AxiosError, AxiosResponse} from 'axios';
import {useEffect, useState} from 'react';
import {useMutation, useQuery} from 'react-query';
import {Navigate} from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import moment from 'moment';
import lodash from 'lodash';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Header from '../../components/NavBar';
import AuthWrapper from '../../components/AuthWrapper';
import {Mission, Platform, UserRole} from '../../util/types';

// TODO Refactor into smaller sub-components.
export default function AddMission() {
    const [platforms, setPlatforms] = useState<Platform[]>();
    const {
        data: platformsData,
        isSuccess: isPlatformsSuccess,
        isLoading: isPlatformsLoading,
    } = useQuery<AxiosResponse<Platform[]>, AxiosError>('getAllPlatforms', () => api.get('/platforms'));
    useEffect(() => {
        if (isPlatformsSuccess && platformsData) setPlatforms(platformsData.data);
    }, [isPlatformsSuccess, platformsData]);

    const [name, setName] = useState<string>();
    const [launchDate, setLaunchDate] = useState<Date | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [platform, setPlatform] = useState<Platform | null>();
    const startDateError = launchDate && startDate && launchDate < startDate;
    const endDateError = startDate && endDate && endDate < startDate;
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
            platformId: platform?.id,
        }),
    );

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        !endDateError && mutateMission();
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
        return <Navigate to='/home'/>;
    }

    return (
        <AuthWrapper role={UserRole.ROLE_USER}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Header/>
                <Container maxWidth='xs'>
                    <Box sx={{
                        my: -2,
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 'auto',
                        width: 'auto',
                        bgcolor: '#F7F5F8',
                        p: 3,
                        borderRadius: '16px',
                    }}>
                        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Typography variant='h3' sx={{mt: 1, mb: 3}}>
                                Add Mission
                            </Typography>
                        </Box>
                        <Box component='form' noValidate onSubmit={handleSubmit}>
                            <FormField label='Name' name='name' errors={missionError?.response?.data}
                                       onChange={setName}/>
                            <DatePicker
                                label='Launch Date'
                                views={['year']}
                                value={launchDate}
                                onChange={(value) => {
                                    if (missionError?.response?.data != undefined) {
                                        missionError.response.data.launchDate = '';
                                    }
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
                                    if (missionError?.response?.data != undefined) {
                                        missionError.response.data.startDate = '';
                                    }
                                    setStartDate(value);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin='normal'
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
                            <DatePicker
                                label='End Date'
                                views={['year']}
                                value={endDate}
                                onChange={(value) => {
                                    if (missionError?.response?.data != undefined) {
                                        missionError.response.data.endDate = '';
                                    }
                                    setEndDate(value);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin='normal'
                                        fullWidth
                                        error={endDateError || (isMissionError && !!missionError?.response?.data?.endDate)}
                                        helperText={
                                            endDateError ? 'End date cannot be before the start date.' : missionError?.response?.data?.endDate
                                        }
                                    />
                                )}
                            />
                            <Autocomplete
                                disablePortal
                                openText='Platform'
                                options={platforms || []}
                                getOptionLabel={(option) => lodash.startCase(option.name)}
                                fullWidth
                                loading={isPlatformsLoading}
                                onChange={(_event, value) => {
                                    if (missionError?.response?.data != undefined) {
                                        missionError.response.data.platformId = '';
                                    }
                                    setPlatform(value);
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        margin='normal'
                                        fullWidth
                                        error={isMissionError && !!missionError?.response?.data?.platformId}
                                        helperText={missionError?.response?.data?.platformId}
                                        label='Platform'
                                    />
                                )}
                                renderOption={(props, option, {inputValue}) => {
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
                            <LoadingButton
                                loading={isMissionLoading}
                                type='submit'
                                variant='contained'
                                color='secondary'
                                fullWidth
                                sx={{mt: 3, mb: 2}}
                            >
                                Add Mission
                            </LoadingButton>
                        </Box>
                        <Snackbar open={errorSnackbarOpen} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
                            <Alert severity='error' onClose={handleErrorSnackbarClose}>
                                Failed to add mission.
                            </Alert>
                        </Snackbar>
                    </Box>
                </Container>
            </LocalizationProvider>
        </AuthWrapper>
    );
}
