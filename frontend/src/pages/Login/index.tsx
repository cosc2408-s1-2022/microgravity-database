import React, { useState } from 'react';
import { Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthenticationResponse } from '../../util/types';
import { Navigate } from 'react-router-dom';
import FormField from '../../components/FormField';
import api from '../../util/api';

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
              bgcolor: '#FAEBEFFF',
              p: 3,
              borderRadius: '16px',
            }}
          >
            <Typography variant='h4' fontWeight='bold'>
              Login
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormField
                    required
                    label='Username'
                    name='username'
                    autoComplete='username'
                    autoFocus
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
                    autoComplete='current-password'
                    errors={error?.response?.data}
                    onChange={setPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    color='error'
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 1, mb: 2, '&.MuiButton-root': { color: 'white' } }}
                  >
                    Sign In
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Link href={'/register'} color='text.primary' sx={{ textDecoration: 'underline' }}>
                    Don't have an account? Register
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
