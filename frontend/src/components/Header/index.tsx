import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LogoWhite from '../../logo_no_text.svg';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function SearchAppBar() {
  if (window.location.pathname === '/login') {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' noWrap component='div' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
              <Box sx={{ fontWeight: 'bold' }}>
                <a href={'/home'}>
                  <img src={LogoWhite} alt='RMIT LOGO' height={'40vmin'} />
                </a>
              </Box>
            </Typography>
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Microgravity Database
            </Typography>
            <Button component={Link} to='/register' color='inherit'>
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
              <Box sx={{ fontWeight: 'bold' }}>
                <a href={'/home'}>
                  <img src={LogoWhite} alt='RMIT LOGO' height={'40vmin'} />
                </a>
              </Box>
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
              <Box sx={{ fontWeight: 'bold' }}>
                <a href={'/home'}>
                  <img src={LogoWhite} alt='RMIT LOGO' height={'40vmin'} />
                </a>
              </Box>
            </Typography>
            <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              Microgravity Database
            </Typography>
            <Button component={Link} to='/login' color='inherit'>
              Login
            </Button>
            <Button component={Link} to='/register' color='inherit'>
              Register
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
