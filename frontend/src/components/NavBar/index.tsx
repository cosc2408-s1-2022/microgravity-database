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
    <AppBar position='sticky' sx={{ boxShadow: '0px 7px 7px rgba(0,0,0,0.07)' }}>
      <Toolbar>
        <Grid container wrap='nowrap'>
          {/* Left nav elements */}
          <Grid container item alignItems='center'>
            {/*  Logo + text link*/}
            <Grid item component={Link} href={'/home'}>
              <img src={Logo} alt='RMIT LOGO' height={'40vmin'} />
            </Grid>
            <Grid item component={Link} href={'/home'} >
              <Typography variant='h6' mx='15px' >
                Microgravity Database
              </Typography>
            </Grid>
            {/* Search elements*/}
            {(props.hasSearch?? true) ? (
                <Grid item>
                  <PrimarySearch />
                </Grid>
            ) : null}
            <Grid item>
              <Button component={Link} href='/search/advanced' sx={{padding: 0}}>
                Advanced Search
              </Button>
            </Grid>
          </Grid>
          {/* Right nav elements */}
          <Grid
            container
            item
            direction='row-reverse'
            md={1}
            columnSpacing={10}
            wrap='nowrap'
            justifyContent='space-between'
          >
            {registerElement}
            {authElement}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
