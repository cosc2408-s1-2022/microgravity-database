import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoWhite from '../../logo_no_text.svg';
import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function SearchAppBar() {
  if (window.location.pathname === '/login') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Link
                component={RouterLink}
                to='/home'
                sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img src={LogoWhite} alt='RMIT LOGO' height={'40vmin'} />
              </Link>
            </Typography>
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Microgravity Database
            </Typography>
            <Button component={RouterLink} to='/register' color='inherit'>
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else if (window.location.pathname === '/register') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Link
                component={RouterLink}
                to='/home'
                sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img src={LogoWhite} alt='RMIT LOGO' height={'40vmin'} />
              </Link>
            </Typography>
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Microgravity Database
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  } else {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Link
                component={RouterLink}
                to='/home'
                sx={{ fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <img src={LogoWhite} alt='RMIT LOGO' height={'40vmin'} />
              </Link>
            </Typography>
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Microgravity Database
            </Typography>
            <Button component={RouterLink} to='/login' color='inherit'>
              Login
            </Button>
            <Button component={RouterLink} to='/register' color='inherit'>
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
