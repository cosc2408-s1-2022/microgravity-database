import React, { useState } from 'react';
import { Avatar, Box, Button, Container, Grid, Link, Typography } from '@mui/material';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { AuthenticationResponse } from '../../types';
import { Navigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Header from '../../components/Header';
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
    console.log(data?.data.jwt);
    return <Navigate to='/home' />;
  }

  return (
    <>
      <Header />
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormField
                  name='username'
                  label='Username'
                  autoComplete='username'
                  onChange={setUsername}
                  errors={error?.response?.data}
                  margin='normal'
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  name='password'
                  label='Password'
                  type='password'
                  autoComplete='current-password'
                  onChange={setPassword}
                  errors={error?.response?.data}
                  margin='normal'
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Link href={'/register'} variant='body2'>
              Don't have an account? Sign Up
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
}
