import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Logo from '../../logo-navbar.svg';
import { Box, Button, Container, Link, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PrimarySearch from '../PrimarySearch';
import {
  AddRounded,
  AdminPanelSettingsRounded,
  AssignmentIndRounded,
  LockOpenRounded,
  LogoutRounded,
  ManageSearchRounded,
  SearchRounded,
} from '@mui/icons-material';
import { useLoggedInUser } from '../../util/hooks';
import { UserRole } from '../../util/types';
import { useState } from 'react';

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const { user: loggedInUser, isLoading: isLoggedInUserLoading, isError: isLoggedInUserError } = useLoggedInUser();
  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));

  const [addMenuAnchor, setAddMenuAnchor] = useState<HTMLElement | null>(null);
  const open = Boolean(addMenuAnchor);
  const handleAddMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchor(event.currentTarget);
  };
  const handleAddMenuClose = () => {
    setAddMenuAnchor(null);
  };

  return (
    <AppBar position='sticky' sx={{ boxShadow: '0px 7px 7px rgba(0,0,0,0.07)' }}>
      <Toolbar>
        <Container maxWidth='lg'>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Box component={Link} display='flex' alignItems='center' href='/home'>
              <img src={Logo} id='navbar-logo' alt='Australian Space Database Logo' />
            </Box>
            {!isLoggedInUserLoading && (loggedInUser || isLoggedInUserError) && (
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
                  ) : !['/login', '/register', '/register/basic'].includes(location.pathname) ? (
                    <Button href='/search/advanced' variant='contained' sx={{ ml: 1 }}>
                      <ManageSearchRounded />
                    </Button>
                  ) : undefined
                ) : undefined}
                {loggedInUser && loggedInUser.role === UserRole.ROLE_ADMIN ? (
                  matches ? (
                    <Button
                      variant='contained'
                      href='/admin/dashboard/users'
                      sx={{ minWidth: 'auto', ml: 1, whiteSpace: 'nowrap', height: '2.5rem' }}
                    >
                      Admin Dashboard
                    </Button>
                  ) : (
                    <Button href='/admin/dashboard/users' variant='contained' sx={{ ml: 1 }}>
                      <AdminPanelSettingsRounded />
                    </Button>
                  )
                ) : undefined}
                {isLoggedInUserError ? (
                  matches ? (
                    <Box display='inline-flex' alignItems='center'>
                      {location.pathname !== '/login' && (
                        <Button
                          variant='contained'
                          href='/login'
                          sx={{ minWidth: 'auto', ml: 1, whiteSpace: 'nowrap', height: '2.5rem' }}
                        >
                          Login
                        </Button>
                      )}
                      {!location.pathname.includes('/register') && (
                        <Button
                          variant='contained'
                          href='/register'
                          sx={{ minWidth: 'auto', ml: 1, whiteSpace: 'nowrap', height: '2.5rem' }}
                        >
                          Register
                        </Button>
                      )}
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
                  <>
                    <Button variant='contained' sx={{ ml: 1 }} onClick={handleAddMenuOpen}>
                      Add New
                    </Button>
                    <Menu anchorEl={addMenuAnchor} open={open} onClose={handleAddMenuClose}>
                      <MenuItem
                        onClick={() => {
                          handleAddMenuClose();
                          navigate('/addExperiment');
                        }}
                      >
                        Experiment
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleAddMenuClose();
                          navigate('/addMission');
                        }}
                      >
                        Mission
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleAddMenuClose();
                          navigate('/addPerson');
                        }}
                      >
                        Person
                      </MenuItem>
                    </Menu>
                    <Button variant='contained' sx={{ ml: 1 }} onClick={logout}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant='contained' sx={{ ml: 1 }} onClick={handleAddMenuOpen}>
                      <AddRounded />
                    </Button>
                    <Menu anchorEl={addMenuAnchor} open={open} onClose={handleAddMenuClose}>
                      <MenuItem
                        onClick={() => {
                          handleAddMenuClose();
                          navigate('/addExperiment');
                        }}
                      >
                        Experiment
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleAddMenuClose();
                          navigate('/addMission');
                        }}
                      >
                        Mission
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          handleAddMenuClose();
                          navigate('/addPerson');
                        }}
                      >
                        Person
                      </MenuItem>
                    </Menu>
                    <Button variant='contained' sx={{ ml: 1 }} onClick={logout}>
                      <LogoutRounded />
                    </Button>
                  </>
                )}
              </Box>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
