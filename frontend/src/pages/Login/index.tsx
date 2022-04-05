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
      main: '#fffff',
    },
  },
});
const innerTheme = createTheme({
  typography: {
    fontFamily: 'Roboto',
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
              <Avatar src='/rmit.svg' sx={{ width: 170, height: 60 }} variant='square' />
            </Box>
            <Search>
              <SearchIconWrapper />
              <StyledInputBase text-color='white' placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
            </Search>
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
          <br></br>
          <br></br>
          <ThemeProvider theme={innerTheme}>
            <Container maxWidth='sm'>
              <Box
                sx={{
                  marginTop: 5,
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
                <Typography variant='h3' align='center' color='Text-primary' gutterBottom>
                  Welcome to RMIT Microgravity Database
                </Typography>
              </Box>

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
          </ThemeProvider>
        </div>
      </main>
    </>
  );
}
