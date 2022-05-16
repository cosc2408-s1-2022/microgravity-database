import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AxiosResponse, AxiosError } from 'axios';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthWrapper from '../../components/AuthWrapper';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import MessageSnackbar from '../../components/MessageSnackbar';
import api from '../../util/api';
import { Person, UserRole } from '../../util/types';

export default function EditPerson() {
  const navigate = useNavigate();
  const location = useLocation();
  const person = location.state as Person;
  if (!person) {
    navigate('/', {
      state: {
        isError: true,
        message: 'Person could not be found.',
      },
    });
  }

  const [firstName, setFirstName] = useState<string>(person.firstName);
  const [familyName, setFamilyName] = useState<string>(person.familyName);
  const [affiliation, setAffiliation] = useState<string>(person.affiliation);
  const [city, setCity] = useState<string>(person.city);
  const [state, setState] = useState<string>(person.state);
  const [country, setCountry] = useState<string>(person.country);

  const { error, isSuccess, isLoading, isError, mutate } = useMutation<AxiosResponse<Person>, AxiosError>(
    'savePerson',
    () =>
      api.post('/people/save', {
        ...person,
        firstName,
        familyName,
        affiliation,
        city,
        state,
        country,
      }),
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(-1);
    }
  }, [isSuccess, navigate]);

  return (
    <AuthWrapper role={UserRole.ROLE_ADMIN}>
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
                  value={firstName}
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
                  value={familyName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Affiliation'
                  name='affiliation'
                  autoComplete='organization'
                  errors={error?.response?.data}
                  onChange={setAffiliation}
                  value={affiliation}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='City'
                  name='city'
                  autoComplete='address-level2'
                  errors={error?.response?.data}
                  onChange={setCity}
                  value={city}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='State'
                  name='state'
                  autoComplete='address-level1'
                  errors={error?.response?.data}
                  onChange={setState}
                  value={state}
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  label='Country'
                  name='country'
                  autoComplete='country-name'
                  errors={error?.response?.data}
                  onChange={setCountry}
                  value={country}
                />
              </Grid>
              <Grid item xs={12}>
                <Box display='flex' alignItems='center'>
                  <LoadingButton
                    sx={{ mr: 2 }}
                    loading={isLoading}
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
          <MessageSnackbar open={isError} message='Failed to save person.' severity='error' />
        </Box>
      </Container>
    </AuthWrapper>
  );
}
