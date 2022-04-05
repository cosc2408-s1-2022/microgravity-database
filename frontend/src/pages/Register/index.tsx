import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import FormField from '../../components/FormField';
import { AuthenticationResponse, Role } from '../../types';
import { Navigate } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../util/api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const passwordsMatchingError = password && password !== confirmPassword && 'Passwords must match.';

  const { data, error, isSuccess, mutate } = useMutation<AxiosResponse<AuthenticationResponse>, AxiosError>(
    'register',
    () => {
      return api.post(`/users/register`, {
        username: username,
        password: password,
        role: Role.ROLE_USER,
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
      <Container
        component='main'
        maxWidth='xs'
        sx={{
          minHeight: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
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
                  onChange={setUsername}
                  errors={error?.response?.data}
                  margin='normal'
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  required
                  name='password'
                  label='Password'
                  type='password'
                  autoComplete='new-password'
                  onChange={setPassword}
                  errors={error?.response?.data}
                  margin='normal'
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <FormField
                  required
                  name='confirmPassword'
                  label='Confirm Password'
                  type='password'
                  autoComplete='confirm-password'
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
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
