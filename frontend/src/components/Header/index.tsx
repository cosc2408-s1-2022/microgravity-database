import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../assets/RMIT-LOGO-WHITE.png';
import { Button, Grid } from '@mui/material';
import { useLocation, useNavigate, Link } from 'react-router-dom';

// TODO: Create search component to include in bar props (i.e. search=true)

export default function Header() {
  const authToken: string | null = localStorage.getItem('authToken');
  const location = useLocation();
  const navigate = useNavigate();

  // Check if token exists in local storage and update element accordingly
  const authElementProps = {
    text: authToken ? 'logout' : ('login' as string),
    onClick: authToken
      ? () => {
          // Clear token and refresh
          localStorage.setItem('authToken', '');
          navigate(location.pathname);
        }
      : () => {
          navigate('/login');
        },
  };

  const authElement = (
      <Button color='inherit' onClick={authElementProps.onClick}>
        {authElementProps.text}
      </Button>
  );

  const registerElement = authToken ? null : (
    <Button component={Link} color='inherit' to='/register'>
      Register
    </Button>
  );

  return (
    <Box sx={{ flexGrow: 0 }}>
      <AppBar position='static'>
        <Toolbar>
          <Grid container wrap='nowrap' direction='row'>

            <Grid container item direction='row' wrap='nowrap' alignItems='center'>
              <Grid item>
                <a href={'/home'}>
                  <img src={logo} alt='RMIT LOGO' height={'40vmin'} />
                </a>
              </Grid>

              <Typography variant='h6' noWrap component='div' ml='15px'>
                Microgravity Database
              </Typography>
            </Grid>

            <Grid container item direction='row' justifyContent='end'>
              {authElement}
              {registerElement}
            </Grid>

          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
