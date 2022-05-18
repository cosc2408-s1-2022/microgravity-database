import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import LoadingButton from '../../components/LoadingButton';
import api from '../../util/api';
import { AuthenticationResponse, UserRole } from '../../util/types';

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>();
  const [familyName, setFamilyName] = useState<string>();
  const [affiliation, setAffiliation] = useState<string>();
  const [city, setCity] = useState<string>();
  const [state, setState] = useState<string>();
  const [country, setCountry] = useState<string>();

  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const passwordsMatchingError = password && password !== confirmPassword && 'Passwords must match.';
  const passLengthValidation = (value: string) => {
    return value.length >= 8;
  };
  const passwordRegex =
    password &&
    !passLengthValidation(password) &&
    // 'Password has to have at least 8 characters with one special character eg. !@#$%*';
    'Password has to have at least 8 characters';

  const { data, error, isSuccess, isLoading, mutate } = useMutation<AxiosResponse<AuthenticationResponse>, AxiosError>(
    'register',
    () => {
      return api.post(`/users/register`, {
        user: {
          username: username,
          password: password,
          role: UserRole.ROLE_USER,
        },
        person: {
          firstName,
          familyName,
          affiliation,
          city,
          state,
          country,
        },
      });
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  useEffect(() => {
    if (isSuccess && data) {
      // Add token to localstorage for persistence
      const authToken: string = data?.data.jwt;
      localStorage.setItem('authToken', authToken);
      navigate('/home');
    }
  }, [data, isSuccess, navigate]);

  return (
    <>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'fixed',
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          outline: 'none',
          zIndex: '-1',
        }}
      >
        <source src={'/space.mp4'} type='video/mp4' />
      </video>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: 'blur(8px)',
          zIndex: '-1',
        }}
      />
      <div>
        <Container maxWidth='xs'>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: 'auto',
              width: 'auto',
              bgcolor: '#faebefff',
              p: 3,
              borderRadius: '16px',
            }}
          >
            <Typography variant='h4' fontWeight='bold'>
              Register Researcher
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
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
                    required
                    name='username'
                    label='Username'
                    autoComplete='username'
                    errors={error?.response?.data}
                    onChange={setUsername}
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
                <Grid item xs={6}>
                  <FormField
                    label='City'
                    name='city'
                    autoComplete='address-level2'
                    errors={error?.response?.data}
                    onChange={setCity}
                  />
                </Grid>
                <Grid item xs={6}>
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
                    required
                    name='password'
                    label='Password'
                    type='password'
                    autoComplete='new-password'
                    errors={
                      passwordRegex
                        ? {
                            password: passwordRegex,
                          }
                        : undefined
                    }
                    onChange={setPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormField
                    required
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                    autoComplete='new-password'
                    errors={
                      passwordsMatchingError
                        ? {
                            confirmPassword: passwordsMatchingError,
                          }
                        : undefined
                    }
                    onChange={setConfirmPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    color='secondary'
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ my: 1 }}
                    loading={isLoading}
                  >
                    Register
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Link href={'/login'} color='text.primary' sx={{ textDecoration: 'underline' }}>
                    Already have an account? Login
                  </Link>
                </Grid>
                <Grid item xs={12}>
                  <Link href={'/register/basic'} color='text.primary' sx={{ textDecoration: 'underline' }}>
                    Do not wish to register as a researcher?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
