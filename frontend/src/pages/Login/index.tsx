import React, { useState } from 'react';
import {
  Typography,
  AppBar,
  CssBaseline,
  Container,
  Box,
  Avatar,
  FormControlLabel,
  Button,
  Checkbox,
  Toolbar,
  Grid,
  Link,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Search, SearchIconWrapper, StyledInputBase } from './styling';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthenticationResponse } from '../../types';
import { Navigate } from 'react-router-dom';
import FormField from '../../components/FormField';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { data, error, isSuccess, mutate } = useMutation<AxiosResponse<AuthenticationResponse>, AxiosError>(
    'login',
    () => {
      return axios.post(`${backendUrl}/api/users/login`, {
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
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position='relative' style={{ paddingLeft: 20, padding: 10 }}>
          <Toolbar>
            <Box sx={{ flexGrow: 10 }}>
              <Avatar src='/rmit.png' sx={{ width: 170, height: 60 }} variant='square' />
            </Box>
            <Search>
              <SearchIconWrapper />
              <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <main>
        <div
          style={{
            backgroundColor: '#FCF6F5FF',
          }}
        >
          <Container maxWidth='sm'>
            <Typography variant='h3' align='center' color='textPrimary' gutterBottom>
              Welcome to RMIT Microgravity Database
            </Typography>
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                height: 'auto',
                width: 'auto',
                bgcolor: '#FAEBEFFF',
                p: 5,
                borderRadius: '16px',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
              <Typography component='h1' variant='h5'>
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
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
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
