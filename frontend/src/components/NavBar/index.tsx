import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../../logo_no_text.svg';
import { Button, Grid, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimarySearch from '../PrimarySearch';
import { UserAuth } from '../../util/types';

export default function NavBar(props: { hasSearch?: boolean }) {
  const authToken: UserAuth = localStorage.getItem('authToken');
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

  const authElement = <Button onClick={authElementProps.onClick}>{authElementProps.text}</Button>;

  const registerElement = authToken ? null : (
    <Button component={Link} href='/register'>
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
            <Grid item component={Link} href={'/home'}>
              <Typography variant='h6' mx='15px'>
                Microgravity Database
              </Typography>
            </Grid>
            {/* Search elements*/}
            {props.hasSearch ?? true ? (
              <Grid item>
                <PrimarySearch />
              </Grid>
            ) : null}
            <Grid item>
              <Button component={Link} href='/search/advanced'>
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
            columnSpacing={5}
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
