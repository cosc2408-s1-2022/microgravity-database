import { Box, Container, Grid, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import { Person } from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import AuthWrapper from '../../components/AuthWrapper';

export default function AddPerson() {
  const navigate = useNavigate();

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

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  return (
    <AuthWrapper>
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
          <MessageSnackbar open={isError} message='Failed to add person.' severity='error' />
        </Box>
      </Container>
    </AuthWrapper>
  );
}
