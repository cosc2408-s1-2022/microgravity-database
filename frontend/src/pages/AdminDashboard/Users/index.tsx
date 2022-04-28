import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  Select,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  Autocomplete,
  TextField,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import CenteredCircularProgress from '../../../components/CenteredCircularProgress';
import { Page, Role, User } from '../../../types';
import api from '../../../util/api';
import { useLoggedInUser } from '../../../util/hooks';
import { ClearRounded, PersonRounded, SearchRounded, ShieldRounded } from '@mui/icons-material';

export default function Users() {
  const navigate = useNavigate();
  const { user: loggedInUser, isLoading: isLoggedInUserLoading, isError: isLoggedInUserError } = useLoggedInUser();
  useEffect(() => {
    if (isLoggedInUserError) {
      navigate('/login');
    }
  }, [isLoggedInUserError, navigate]);

  const [usersPage, setUsersPage] = useState<Page<User>>();
  const [users, setUsers] = useState<User[]>();
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
    refetch: refetchUsers,
  } = useQuery<AxiosResponse<Page<User>>>('getAllUsers', () => api.get('/users'));

  useEffect(() => {
    if (isUsersSuccess && usersData && loggedInUser) {
      setUsersPage(usersData.data);
      setUsers(usersData.data.content);
    }
  }, [isUsersSuccess, usersData, loggedInUser]);

  const [searchString, setSearchString] = useState('');
  const handleSearchInputClick = () => {
    if (searchString) {
      setSearchString('');
    }
  };
  const filterBySearchString = (user: User): boolean => {
    if (!searchString) return true;
    const searchStringSplit = searchString.split(/(\s+)/).filter((s) => s.trim().length > 0);
    return searchStringSplit.every(
      (s) => user.username.toLowerCase().includes(s) || user.role.toLowerCase().includes(s),
    );
  };

  const [changedUsers, setChangedUsers] = useState<User[]>();
  const {
    isLoading: isSaveUsersLoading,
    isSuccess: isSaveUsersSuccess,
    mutate: saveUsers,
  } = useMutation('saveUsers', () => api.post('/users/saveAll', { users }));
  const handleSaveChanges = () => {
    saveUsers();
    refetchUsers();
  };

  return isLoggedInUserLoading || isUsersLoading || !loggedInUser ? (
    <CenteredCircularProgress />
  ) : loggedInUser.role === Role.ROLE_ADMIN ? (
    <Container maxWidth='sm' sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent='flex-end' alignItems='center'>
          <FormControl size='small' variant='outlined'>
            <InputLabel htmlFor='search-input'>Search</InputLabel>
            <OutlinedInput
              id='search-input'
              type='text'
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={handleSearchInputClick} edge='end'>
                    {searchString ? <ClearRounded /> : <SearchRounded />}
                  </IconButton>
                </InputAdornment>
              }
              label='Password'
            />
          </FormControl>
        </Grid>
        {usersPage?.content.filter(filterBySearchString).map((u) => {
          const currentRole = users?.find((cu) => cu.id === u.id)?.role;
          const roleChanged = currentRole !== u.role;
          return (
            <Grid item key={u.id} xs={12}>
              <Paper sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', p: 1 }}>
                <Box display='flex' flexDirection='column' flexGrow={1}>
                  <Typography variant='body1' flexGrow={1} pr={2}>
                    {u.username}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' flexGrow={1} pr={2}>
                    {`Joined ${moment(u.createdAt).fromNow()}`}
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  exclusive
                  disabled={u.id === loggedInUser.id}
                  value={currentRole}
                  onChange={(_event, value) => {
                    value && setUsers((prev) => prev?.map((pu) => (pu.id === u.id ? { ...pu, role: value } : pu)));
                  }}
                  sx={
                    roleChanged
                      ? {
                          border: 1,
                          borderColor: 'red',
                        }
                      : {
                          border: 1,
                          borderColor: 'transparent',
                        }
                  }
                >
                  <ToggleButton size='small' value={Role.ROLE_USER}>
                    <Typography variant='body2' textTransform='none' mx={0.5}>
                      User
                    </Typography>
                    <PersonRounded />
                  </ToggleButton>
                  <ToggleButton size='small' value={Role.ROLE_ADMIN}>
                    <Typography variant='body2' textTransform='none' mx={0.5}>
                      Admin
                    </Typography>
                    <ShieldRounded />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      <Button sx={{ mt: 2 }} variant='contained' disabled={} onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </Container>
  ) : (
    <Navigate to='/login' />
  );
}
