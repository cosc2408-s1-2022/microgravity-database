import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../../assets/RMIT-LOGO-BLACK.png';
import { Box, Button, Grid, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Theme from '../../theme';
import PrimarySearch from '../PrimarySearch';

export default function NavBar(props: { hasSearch?: boolean }) {
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
    <Button variant='contained' onClick={authElementProps.onClick}>
      {authElementProps.text}
    </Button>
  );

  const registerElement = authToken ? null : (
    <Button variant='contained' component={Link} href='/register'>
      Register
    </Button>
  );

  return (
    <Box>
      <AppBar
        style={{ backgroundColor: '#F7F5F8' }}
        position='sticky'
        sx={{ boxShadow: '0px 7px 7px rgba(0,0,0,0.07)' }}
      >
        <Toolbar>
          <Grid container wrap='nowrap'>
            {/* Left Nav */}
            <Grid container item alignItems='center' alignContent='center'>
              <Grid item component={Link} href={'/home'}>
                <img src={Logo} alt='RMIT LOGO' height={'40vmin'} />
              </Grid>
              <Grid item component={Link} href={'/home'}>
                <Typography sx={{ color: 'black' }} variant='h6' mx='15px'>
                  Microgravity Database
                </Typography>
              </Grid>
              {/* Search elements*/}
              <Grid item>
                <Button variant='contained' component={Link} href='/search/advanced'>
                  Advanced Search
                </Button>
              </Grid>
            </Grid>
            {/* Right nav elements */}
            <Grid
              container
              // item
              direction='row-reverse'
              md={1}
              alignItems='center'
              columnSpacing={2}
              wrap='nowrap'
              justifyContent='space-between'
            >
              <Grid item>{registerElement}</Grid>
              <Grid item>{authElement}</Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
