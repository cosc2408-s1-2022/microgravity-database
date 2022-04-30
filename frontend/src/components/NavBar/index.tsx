import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../../logo_no_text.svg';
import { Box, Button, Container, Link, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimarySearch from '../PrimarySearch';
import { UserAuth } from '../../util/types';
import { ManageSearchRounded, SearchRounded } from '@mui/icons-material';

export default function NavBar() {
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

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <AppBar position='sticky' sx={{ boxShadow: '0px 7px 7px rgba(0,0,0,0.07)' }}>
      <Toolbar>
        <Container maxWidth='lg'>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box component={Link} display='inline-flex' alignItems='center' href='/home'>
              <img src={Logo} id='logo' alt='RMIT LOGO' height={'32rem'} />
              <Typography variant='h6' sx={{ pl: 2 }}>
                Microgravity Database
              </Typography>
            </Box>
            <Box display='flex'>
              {['/', '/home'].includes(location.pathname) ? undefined : matches ? (
                <PrimarySearch />
              ) : (
                <Button href='/home' variant='contained' sx={{ ml: 1 }}>
                  <SearchRounded />
                </Button>
              )}
              {!location.pathname.includes('/search/advanced') ? (
                matches ? (
                  <Button
                    href='/search/advanced'
                    variant='contained'
                    sx={{ ml: 1, minWidth: 'auto', whiteSpace: 'nowrap', height: '2.5rem' }}
                  >
                    Advanced Search
                  </Button>
                ) : !['/login', '/register'].includes(location.pathname) ? (
                  <Button href='/search/advanced' variant='contained' sx={{ ml: 1 }}>
                    <ManageSearchRounded />
                  </Button>
                ) : undefined
              ) : undefined}
              {!authToken ? (
                <Box display='inline-flex' alignItems='center'>
                  <Button
                    variant='contained'
                    href='/login'
                    sx={{ minWidth: 'auto', ml: 1, whiteSpace: 'nowrap', height: '2.5rem' }}
                  >
                    Login
                  </Button>
                  <Button
                    variant='contained'
                    href='/register'
                    sx={{ minWidth: 'auto', ml: 1, whiteSpace: 'nowrap', height: '2.5rem' }}
                  >
                    Register
                  </Button>
                </Box>
              ) : (
                <Button variant='contained' sx={{ ml: 1 }} onClick={authElementProps.onClick} color='inherit'>
                  Logout
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
