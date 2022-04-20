import { Alert, Box, Container, Grid, Snackbar, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { Navigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import { Person } from '../../types';
import api from '../../util/api';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
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
    <Container maxWidth={'sm'}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h3' sx={{ mt: 6, mb: 3 }}>
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
        </Grid>
        <FormField
          label='Affiliation'
          name='affiliation'
          autoComplete='organization'
          errors={error?.response?.data}
          onChange={setAffiliation}
        />
        <FormField
          label='City'
          name='city'
          autoComplete='address-level2'
          errors={error?.response?.data}
          onChange={setCity}
        />
        <FormField
          label='State'
          name='state'
          autoComplete='address-level1'
          errors={error?.response?.data}
          onChange={setState}
        />
        <FormField
          label='Country'
          name='country'
          autoComplete='country-name'
          errors={error?.response?.data}
          onChange={setCountry}
        />
        <LoadingButton
          loading={isLoading}
          type='submit'
          variant='contained'
          color='secondary'
          fullWidth
          sx={{ mt: 3, mb: 2 }}
        >
          Add Person
        </LoadingButton>
      </Box>
      <Snackbar open={errorSnackbarOpen} autoHideDuration={5000} onClose={handleErrorSnackbarClose}>
        <Alert severity='error' onClose={handleErrorSnackbarClose}>
          Failed to add person.
        </Alert>
      </Snackbar>
    </Container>
  );
}
