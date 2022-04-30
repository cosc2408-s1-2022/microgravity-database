import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Paper,
  ToggleButtonGroup,
  ToggleButton,
  Typography,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Pagination,
  SelectChangeEvent,
} from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import CenteredCircularProgress from '../../../components/CenteredCircularProgress';
import { UserRole, User, ResultsResponse } from '../../../util/types';
import api from '../../../util/api';
import { useLoggedInUser } from '../../../util/hooks';
import { ClearRounded, PersonRounded, SearchRounded, ShieldRounded } from '@mui/icons-material';
import MessageSnackbar from '../../../components/MessageSnackbar';

export default function Users() {
  const navigate = useNavigate();

  const { user: loggedInUser, isLoading: isLoggedInUserLoading, isError: isLoggedInUserError } = useLoggedInUser();
  useEffect(() => {
    if (isLoggedInUserError) {
      navigate('/login');
    }
  }, [isLoggedInUserError, navigate]);

  const [usersPage, setUsersPage] = useState<ResultsResponse<User>>();
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>();
  const [searchString, setSearchString] = useState('');
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    setSearchString(e.target.value);
  };
  const handleSearchInputClick = () => {
    if (searchString) {
      setSearchString('');
    }
  };
  const handlePageChange = (_e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  const handleSizeChange = (e: SelectChangeEvent<string | number>) => {
    setSize(e.target.value as number);
  };
  const {
    data: usersData,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
    refetch: refetchUsers,
  } = useQuery<AxiosResponse<ResultsResponse<User>>>(
    ['getAllUsers', page, size, searchString],
    ({ queryKey }) => {
      const [, page, size, searchString] = queryKey;
      if (searchString) {
        return api.get('/search/users', {
          params: {
            string: searchString,
            page,
            size,
          },
        });
      } else {
        return api.get('/users', {
          params: {
            page,
            size,
          },
        });
      }
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetchUsers();
  }, [refetchUsers, page, size, searchString]);

  useEffect(() => {
    if (isUsersSuccess && usersData && loggedInUser) {
      setUsersPage(usersData.data);
    }
  }, [isUsersSuccess, usersData, loggedInUser]);

  const [changedUsers, setChangedUsers] = useState<User[]>([]);
  const {
    isLoading: isSaveUsersLoading,
    isSuccess: isSaveUsersSuccess,
    isError: isSaveUsersError,
    mutate: saveUsers,
  } = useMutation('saveUsers', () => api.post('/users/saveAll', changedUsers));
  const handleSaveChanges = () => {
    saveUsers();
  };
  const handleDiscardChanges = () => {
    setChangedUsers([]);
  };
  useEffect(() => {
    if (isSaveUsersSuccess) {
      setChangedUsers([]);
      refetchUsers();
    }
  }, [isSaveUsersSuccess, refetchUsers]);

  return isLoggedInUserLoading || isUsersLoading || !loggedInUser ? (
    <CenteredCircularProgress />
  ) : loggedInUser.role === UserRole.ROLE_ADMIN ? (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
          <FormControl size='small' variant='outlined'>
            <InputLabel htmlFor='search-input' color='secondary'>
              Search
            </InputLabel>
            <OutlinedInput
              id='search-input'
              type='text'
              value={searchString}
              autoFocus={!!searchString}
              onChange={handleSearchInputChange}
              label='Search'
              color='secondary'
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton onClick={handleSearchInputClick} edge='end'>
                    {searchString ? <ClearRounded /> : <SearchRounded />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl size='small' variant='outlined'>
            <InputLabel id='select-size' color='secondary'>
              Result Size
            </InputLabel>
            <Select
              labelId='select-size'
              value={size || ''}
              label='Result Size'
              color='secondary'
              sx={{ minWidth: '8rem' }}
              onChange={handleSizeChange}
            >
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={32}>32</MenuItem>
              <MenuItem value={96}>96</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {usersPage?.results.map((u) => {
          const currentRole = changedUsers.find((cu) => cu.id === u.id)?.role;
          const roleChanged = currentRole && currentRole !== u.role;
          const isLoggedInUser = u.id === loggedInUser.id;
          return (
            <Grid item key={u.id} xs={12}>
              <Paper
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  p: 1,
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                }}
              >
                <Box display='flex' flexDirection='column' flexGrow={1}>
                  <Typography variant='body1' fontWeight='bold' flexGrow={1} pr={2}>
                    {`${u.username} ${isLoggedInUser ? '(You)' : ''}`}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' flexGrow={1} pr={2}>
                    {`Joined ${moment(u.createdAt).fromNow()}`}
                  </Typography>
                </Box>
                <ToggleButtonGroup
                  exclusive
                  disabled={isLoggedInUser}
                  value={currentRole || u.role}
                  onChange={(_e, value) => {
                    if (value && value !== currentRole) {
                      setChangedUsers((prev) =>
                        prev.findIndex((cu) => cu.id === u.id) === -1
                          ? prev.concat({ ...u, role: value })
                          : prev.filter((cu) => cu.id !== u.id),
                      );
                    }
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
                  <ToggleButton size='small' value={UserRole.ROLE_USER}>
                    <Typography variant='body2' textTransform='none' mx={0.5}>
                      User
                    </Typography>
                    <PersonRounded />
                  </ToggleButton>
                  <ToggleButton size='small' value={UserRole.ROLE_ADMIN}>
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
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Pagination
            count={usersPage?.totalPages}
            variant='outlined'
            shape='rounded'
            color='secondary'
            page={page}
            onChange={handlePageChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            sx={{ mt: 2, mr: 1 }}
            variant='contained'
            onClick={handleSaveChanges}
            disabled={isSaveUsersLoading || changedUsers.length === 0}
          >
            Save Changes
          </Button>
          <Button
            sx={{ mt: 2, backgroundColor: 'gray' }}
            variant='contained'
            onClick={handleDiscardChanges}
            disabled={isSaveUsersLoading || changedUsers.length === 0}
          >
            Discard
          </Button>
        </Grid>
      </Grid>
      <MessageSnackbar open={isSaveUsersSuccess} message='Your changes are saved.' severity='success' />
      <MessageSnackbar open={isSaveUsersError} message='Could not save changes. Please try again.' severity='error' />
    </Container>
  ) : (
    <Navigate to='/login' />
  );
}
