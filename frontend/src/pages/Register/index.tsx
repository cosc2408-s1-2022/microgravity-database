import * as React from 'react';
import { useState } from 'react';
import { AppBar, Avatar, Box, Button, Container, CssBaseline, Grid, Link, Toolbar, Typography } from '@mui/material';
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation } from 'react-query';
import FormField from '../../components/FormField';
import { AuthenticationResponse, Role } from '../../types';
import { Navigate } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import api from '../../util/api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fffff',
    },
  },
});
const innerTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
  },
});

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
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position='relative' style={{ paddingLeft: 20, padding: 10 }}>
          <Toolbar>
            <Box sx={{ flexGrow: 10 }}>
              <Avatar src='/rmit.svg' sx={{ width: 170, height: 60 }} variant='square' />
            </Box>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
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
          <br />
          <br />
          <ThemeProvider theme={innerTheme}>
            <Container component='main' maxWidth='xs'>
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
                <Typography component='h1' variant='h4'>
                  Register
                </Typography>
                <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <FormField
                        name='username'
                        label='Username'
                        autoComplete='username'
                        errors={error?.response?.data}
                        onChange={setUsername}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
                        name='password'
                        label='Password'
                        type='password'
                        autoComplete='new-password'
                        errors={error?.response?.data}
                        onChange={setPassword}
                      />
                      <Grid item>
                        <Typography variant='body2'>
                          Password at least 8 characters with one special character eg. !@#$%*
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <FormField
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
                  <Button color='error' type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Register
                  </Button>
                  <Grid item>
                    <Link href={'/login'} variant='body2'>
                      {'Already have an account? Login'}
                    </Link>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </main>
    </>
  );
}
