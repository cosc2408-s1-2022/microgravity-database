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
  styled,
  alpha,
  InputBase,
  Toolbar,
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

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
            {/*<Typography variant='h6'>RMIT Logo</Typography> */}
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
