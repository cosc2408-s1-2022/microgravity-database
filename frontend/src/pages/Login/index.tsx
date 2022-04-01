import React from 'react';
import {
  Typography,
  AppBar,
  CssBaseline,
  Container,
  Box,
  Avatar,
  TextField,
  FormControlLabel,
  Button,
  Checkbox,
  Toolbar,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';
import { Search, SearchIconWrapper, StyledInputBase } from './styling';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

export default function Login() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position='relative' style={{ paddingLeft: 20, padding: 10 }}>
          <Toolbar>
            <Box sx={{ flexGrow: 10 }}>
              <Avatar
                src='/rmit.png'
                sx={{ width: 170, height: 60 }}
                variant='square'
              />
            </Box>
            <Search>
              <SearchIconWrapper />
              <StyledInputBase
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
              />
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
            <Typography
              variant='h3'
              align='center'
              color='textPrimary'
              gutterBottom
            >
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
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  autoFocus
                />
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                />
                <FormControlLabel
                  control={<Checkbox value='remember' color='primary' />}
                  label='Remember me'
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                // TODO
                {/*<Grid container>*/}
                {/*  <Grid item xs>*/}
                {/*    <Link href='#' variant='body2'>*/}
                {/*      Forgot password?*/}
                {/*    </Link>*/}
                {/*  </Grid>*/}
                {/*  <Grid item>*/}
                {/*    <Link href='#' variant='body2'>*/}
                {/*      {"Don't have an account? Sign Up"}*/}
                {/*    </Link>*/}
                {/*  </Grid>*/}
                {/*</Grid>*/}
              </Box>
            </Box>
          </Container>
        </div>
      </main>
    </>
  );
}
