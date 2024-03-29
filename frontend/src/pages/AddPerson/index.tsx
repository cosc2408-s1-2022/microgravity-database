import { Box, Container, Grid, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { FormEvent, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import { Person } from '../../util/types';
import MessageSnackbar from '../../components/MessageSnackbar';
import AuthWrapper from '../../components/AuthWrapper';
import Captcha from '../../components/Captcha';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';

export default function AddPerson() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [firstName, setFirstName] = useState<string>();
  const [familyName, setFamilyName] = useState<string>();
  const [affiliation, setAffiliation] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [phone, setPhone] = useState<string>();

  const { error, isSuccess, isLoading, isError, mutate } = useMutation<AxiosResponse<Person>, AxiosError>(
    'addPerson',
    () =>
      api.post('/people/save', {
        firstName,
        familyName,
        affiliation,
        city,
        state,
        country,
        email,
        phone,
      }),
  );

  const [isCaptchaComplete, setIsCaptchaComplete] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries('getAllPeople');
      navigate('/home');
    }
  }, [isSuccess, navigate, queryClient]);

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
                <FormField
                  label='Email'
                  name='email'
                  autoComplete='email'
                  errors={error?.response?.data}
                  onChange={setEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  country='au'
                  onChange={setPhone}
                  placeholder='Phone'
                  disableCountryCode={true}
                  inputProps={{
                    autoComplete: 'tel',
                  }}
                  inputStyle={{
                    width: '100%',
                    height: '2.5rem',
                    fontSize: '1rem',
                    backgroundColor: '#F7F5F8',
                    borderRadius: '4px',
                    border: '1px #c4c4c4 solid',
                  }}
                  buttonStyle={{ borderRadius: '4px', border: '1px #c4c4c4 solid' }}
                />
              </Grid>
              <Grid item xs={12} display='flex' flexDirection='column' alignItems='center'>
                <Captcha onComplete={setIsCaptchaComplete} />
              </Grid>
              <Grid item xs={12} display='flex' justifyContent='center'>
                <LoadingButton
                  disabled={!isCaptchaComplete}
                  loading={isLoading}
                  type='submit'
                  variant='contained'
                  color='secondary'
                  sx={{ width: '75%' }}
                >
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
