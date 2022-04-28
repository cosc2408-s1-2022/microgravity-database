import { Alert, Box, Container, Grid, Snackbar, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Navigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import { Person } from '../../util/types';
import Header from '../../components/NavBar';

export default function AddPerson() {
  const [firstName, setFirstName] = useState<string>();
  const [familyName, setFamilyName] = useState<string>();
  const [affiliation, setAffiliation] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();

  const { error, isSuccess, isLoading, isError, mutate } = useMutation<AxiosResponse<Person>, AxiosError>(
    'addPerson',
    () =>
      api.post('/people/add', {
        firstName,
        familyName,
        affiliation,
        city,
        state,
        country,
      }),
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const handleErrorSnackbarClose = () => {
    setErrorSnackbarOpen(false);
  };
  useEffect(() => {
    if (isError) {
      setErrorSnackbarOpen(true);
    }
  }, [isError]);

  if (isSuccess) {
    return <Navigate to='/home' />;
  }

  return (
    <>
      <Header />
      <Container maxWidth={'sm'}>
        <Box
          sx={{
            my: -2,
            marginTop: 8,
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
              Add Person
            </Typography>
          </Box>
          <Box component='form' noValidate onSubmit={handleSubmit} flexGrow={1}>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <FormField
                  required
                  label='First Name'
                  name='firstName'
                  autoComplete='first-name'
                  autoFocus
                  errors={error?.response?.data}
                  onChange={setFirstName}
                />
              </Grid>
              <Grid item xs={6}>
                <FormField
                  required
                  label='Family Name'
                  name='familyName'
                  autoComplete='family-name'
                  errors={error?.response?.data}
                  onChange={setFamilyName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Affiliation'
                  name='affiliation'
                  autoComplete='organization'
                  errors={error?.response?.data}
                  onChange={setAffiliation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='City'
                  name='city'
                  autoComplete='address-level2'
                  errors={error?.response?.data}
                  onChange={setCity}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='State'
                  name='state'
                  autoComplete='address-level1'
                  errors={error?.response?.data}
                  onChange={setState}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Country'
                  name='country'
                  autoComplete='country-name'
                  errors={error?.response?.data}
                  onChange={setCountry}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton loading={isLoading} type='submit' variant='contained' color='secondary' fullWidth>
                  Add Person
                </LoadingButton>
              </Grid>
            </Grid>
          </Box>
          <Snackbar open={errorSnackbarOpen} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
            <Alert severity='error' onClose={handleErrorSnackbarClose}>
              Failed to add person.
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
}
