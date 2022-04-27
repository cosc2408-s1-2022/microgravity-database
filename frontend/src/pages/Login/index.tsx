import React, { useState } from 'react';
import { Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthenticationResponse } from '../../util/types';
import { Navigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import api from '../../util/api';
import Header from '../../components/NavBar';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data, error, isSuccess, mutate } = useMutation<AxiosResponse<AuthenticationResponse>, AxiosError>(
    'login',
    () => {
      return api.post('/users/login', {
        username: username,
        password: password,
      });
    },
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  if (isSuccess && data) {
    // Add token to localstorage for persistence
    const authToken: string = data?.data.jwt;
    localStorage.setItem('authToken', authToken);
    return <Navigate to='/home' />;
  }

  return (
    <>
      <CssBaseline />
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
          <source src='/space.mp4' type='video/mp4' />
        </video>
        <div>
          <Container maxWidth='sm'>
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
              <Typography variant='h3' align='center' color='Text-primary' gutterBottom>
                Welcome to RMIT Microgravity Database
              </Typography>
            </Box>

            <CssBaseline />
            <Box
              sx={{
                marginTop: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'auto',
                width: 'auto',
                bgcolor: '#FAEBEFFF',
                p: 4,
                borderRadius: '16px',
              }}
            >
              {/* <Avatar sx={{ m: 1, bgcolor: 'green' }} /> */}
              <Typography component='h1' variant='h4'>
                Login
              </Typography>
              <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <FormField
                  margin='normal'
                  required
                  fullWidth
                  id='Username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  errors={error?.response?.data}
                  onChange={setUsername}
                />
                <FormField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  errors={error?.response?.data}
                  onChange={setPassword}
                />
                <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' />
                <Button
                  color='error'
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2, '&.MuiButton-root': { color: 'white' } }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    {/*TODO forgot password ?*/}
                    <Link href='#' variant='body2'>
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href={'/register'} variant='body2'>
                      {"Don't have an account? Register Now"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </div>
      </main>
    </>
  );
}
