import { PersonRounded, ShieldRounded } from '@mui/icons-material';
import { Box, Button, Grid, Pagination, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../../util/api';
import { ResultsResponse, User, UserRole } from '../../util/types';
import MessageSnackbar from '../MessageSnackbar';

type UserSearchProps = {
  size?: number;
  searchString?: string;
  loggedInUser: User;
};

export default function UserSearch({ size, searchString, loggedInUser }: UserSearchProps) {
  const queryClient = useQueryClient();

  const [users, setUsersPage] = useState<ResultsResponse<User>>();
  const [page, setPage] = useState<number>();
  const handlePageChange = (_e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  const {
    data: usersData,
    isSuccess: isUsersSuccess,
    isLoading: hasPendingRequests,
    isError: isUsersError,
    refetch: refetchUsers,
  } = useQuery<AxiosResponse<ResultsResponse<User>>>(
    ['getUsers', page, size, searchString],
    ({ queryKey, signal }) => {
      const [, page, size, searchString] = queryKey;
      const params = new URLSearchParams();
      searchString && params.append('string', searchString as string);
      page && params.append('page', page as string);
      size && params.append('size', size as string);

      let url = encodeURI(`/users?${params.toString()}`);
      url = searchString ? `/search${url}` : url;
      return api.get(url, { signal });
    },
    {
      enabled: false,
    },
  );
  useEffect(() => {
    if (hasPendingRequests) queryClient.cancelQueries('getUsers');
    refetchUsers();
  }, [refetchUsers, page, size, searchString, hasPendingRequests, queryClient]);
  useEffect(() => {
    if (isUsersSuccess && usersData) {
      setUsersPage(usersData.data);
    }
  }, [isUsersSuccess, usersData]);

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

  return (
    <Grid container spacing={2}>
      {users?.results.map((u) => {
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
          count={users?.totalPages}
          variant='outlined'
          shape='rounded'
          color='secondary'
          page={page || 1}
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
      <MessageSnackbar open={isUsersError} message='Could not load users. Please try again.' severity='error' />
      <MessageSnackbar open={isSaveUsersSuccess} message='Your changes are saved.' severity='success' />
      <MessageSnackbar open={isSaveUsersError} message='Could not save changes. Please try again.' severity='error' />
    </Grid>
  );
}
