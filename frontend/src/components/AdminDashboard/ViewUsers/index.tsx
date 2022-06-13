import { PersonRounded, ShieldRounded } from '@mui/icons-material';
import { Box, Grid, Pagination, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../../../util/api';
import { ResultsResponse, User, UserRole } from '../../../util/types';
import CenteredNoneFound from '../../CenteredNoneFound';
import LoadingButton from '../../LoadingButton';
import MessageSnackbar from '../../MessageSnackbar';

type ViewUsersProps = {
  page?: number;
  size?: number;
  searchString?: string;
  loggedInUser: User;
  onPageChange: (_e: ChangeEvent<unknown>, page: number) => void;
};

export default function ViewUsers({ page, size, searchString, loggedInUser, onPageChange }: ViewUsersProps) {
  const queryClient = useQueryClient();

  const [users, setUsers] = useState<ResultsResponse<User>>();
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

      const paramsEncoded = encodeURI(params.toString());
      const url = searchString
        ? `/search/users?${paramsEncoded}`
        : `/users/paginated${paramsEncoded !== '' ? `?${paramsEncoded}` : ''}`;

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
      setUsers(usersData.data);
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
    <Grid container spacing={2} mb={3}>
      {users?.totalElements === 0 ? (
        <Grid item xs={12}>
          <CenteredNoneFound />
        </Grid>
      ) : (
        users?.results.map((u) => {
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
        })
      )}
      <Grid item xs={12} display='flex' justifyContent='center'>
        <Pagination
          count={users?.totalPages}
          variant='outlined'
          shape='rounded'
          color='secondary'
          page={page || 1}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Grid>
      <Grid item xs={12} display='flex' justifyContent='center'>
        <Box display='flex' alignItems='center' mt={3} width='50%'>
          <LoadingButton
            fullWidth
            sx={{ mt: 2, mr: 1 }}
            variant='contained'
            onClick={handleSaveChanges}
            disabled={changedUsers.length === 0}
            loading={isSaveUsersLoading}
          >
            Save Changes
          </LoadingButton>
          <LoadingButton
            fullWidth
            sx={{ mt: 2, backgroundColor: 'gray' }}
            variant='contained'
            onClick={handleDiscardChanges}
            disabled={changedUsers.length === 0}
            loading={isSaveUsersLoading}
          >
            Cancel
          </LoadingButton>
        </Box>
      </Grid>
      <MessageSnackbar open={isUsersError} message='Could not load users. Please try again.' severity='error' />
      <MessageSnackbar open={isSaveUsersSuccess} message='Your changes are saved.' severity='success' />
      <MessageSnackbar open={isSaveUsersError} message='Could not save changes. Please try again.' severity='error' />
    </Grid>
  );
}
