import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../../logo_no_text.svg';
import { Button, Grid, Link } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

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
    <Button variant='contained' color='secondary' onClick={authElementProps.onClick}>
      {authElementProps.text}
    </Button>
  );

  const registerElement = authToken ? null : (
    <Button variant='contained' color='secondary' component={Link} href='/register'>
      Register
    </Button>
  );

  return (
    <AppBar position='sticky' sx={{ boxShadow: '0px 7px 7px rgba(0,0,0,0.07)' }}>
      <Toolbar>
        <Grid container wrap='nowrap' justifyContent='space-between'>
          <Grid container item component={Link} href='/home' alignItems='center'>
            <img src={Logo} alt='RMIT LOGO' height={'40vmin'} />
            <Typography variant='h6' color='primary.dark' ml='15px'>
              Microgravity Database
            </Typography>
          </Grid>

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
