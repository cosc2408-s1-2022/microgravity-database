import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logo from '../../logo_no_text.svg';
import { Box, Button, Container, Link, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimarySearch from '../PrimarySearch';
import {
  AdminPanelSettingsRounded,
  AssignmentIndRounded,
  LockOpenRounded,
  LogoutRounded,
  ManageSearchRounded,
  SearchRounded,
} from '@mui/icons-material';
import { useLoggedInUser } from '../../util/hooks';
import { UserRole } from '../../util/types';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user: loggedInUser, isLoading: isLoggedInUserLoading, isError: isLoggedInUserError } = useLoggedInUser();
  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
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
              {!isLoggedInUserLoading && loggedInUser && loggedInUser.role === UserRole.ROLE_ADMIN ? (
                matches ? (
                  <Button
                    variant='contained'
                    href='/admin/dashboard'
                    sx={{ minWidth: 'auto', ml: 1, whiteSpace: 'nowrap', height: '2.5rem' }}
                  >
                    Admin Dashboard
                  </Button>
                ) : (
                  <Button href='/admin/dashboard' variant='contained' sx={{ ml: 1 }}>
                    <AdminPanelSettingsRounded />
                  </Button>
                )
              ) : undefined}
              {!isLoggedInUserLoading && isLoggedInUserError ? (
                matches ? (
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
                  <Box display='inline-flex' alignItems='center'>
                    <Button href='/login' variant='contained' sx={{ ml: 1 }} onClick={logout}>
                      <LockOpenRounded />
                    </Button>
                    <Button href='/register' variant='contained' sx={{ ml: 1 }} onClick={logout}>
                      <AssignmentIndRounded />
                    </Button>
                  </Box>
                )
              ) : matches ? (
                <Button variant='contained' sx={{ ml: 1 }} onClick={logout}>
                  Logout
                </Button>
              ) : (
                <Button variant='contained' sx={{ ml: 1 }} onClick={logout}>
                  <LogoutRounded />
                </Button>
              )}
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
