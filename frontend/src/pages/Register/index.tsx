import * as React from 'react';
import { useState } from 'react';
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import FormField from '../../components/FormField';
import { AuthenticationResponse, UserRole } from '../../util/types';
import { Navigate } from 'react-router-dom';
import api from '../../util/api';
import Header from '../../components/NavBar';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordsMatchingError = password && password !== confirmPassword && 'Passwords must match.';
  const passLengthValidation = (value: string) => {
    const re = new RegExp(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`);
    return re.test(value);
  };
  const passwordRegex =
    password &&
    !passLengthValidation(password) &&
    'Password has to have at least 8 characters with one special character eg. !@#$%*';

  const { data, error, isSuccess, mutate } = useMutation<AxiosResponse<AuthenticationResponse>, AxiosError>(
    'register',
    () => {
      return api.post(`/users/register`, {
        username: username,
        password: password,
        role: UserRole.ROLE_USER,
      });
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  if (isSuccess && data) {
    return <Navigate to='/login' />;
  }

  return (
    <>
      <Header />
      <main>
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'absolute',
            width: '100%',
            left: '50%',
            top: '50%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translate(-50%, -50%)',
            zIndex: '-1',
          }}
        >
          <source src={'/space.mp4'} type='video/mp4' />
        </video>
        <div>
          <Container maxWidth='sm'>
            <Grid container justifyContent='center'>
              <Box
                sx={{
                  marginTop: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: 'auto',
                  width: 'auto',
                  bgcolor: '#FAEBEFFF',
                  p: 3,
                  borderRadius: '16px',
                }}
              >
                <Typography component='h1' variant='h4' fontWeight='bold'>
                  Register
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
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
                  </Grid>
                  <Button color='error' type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Register
                  </Button>
                  <Grid item>
                    <Link href={'/login'} variant='body2' color='secondary'>
                      {'Already have an account? Login'}
                    </Link>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Container>
        </div>
      </main>
    </>
  );
}
