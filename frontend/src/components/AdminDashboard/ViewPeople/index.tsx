import {
  VerifiedSharp,
  WarningRounded,
  NewReleasesRounded,
  DoneRounded,
  EditRounded,
  RestartAltRounded,
  DeleteRounded,
} from '@mui/icons-material';
import { Box, Button, Grid, Pagination, Paper, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../../util/api';
import { Person, ResultsResponse } from '../../../util/types';
import CenteredNoneFound from '../../CenteredNoneFound';
import MessageSnackbar from '../../MessageSnackbar';

type ViewPeopleProps = {
  page?: number;
  size?: number;
  searchString?: string;
  onPageChange: (_e: ChangeEvent<unknown>, page: number) => void;
};

export default function ViewPeople({ page, size, searchString, onPageChange }: ViewPeopleProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [people, setPeople] = useState<ResultsResponse<Person>>();
  const {
    data: peopleData,
    isSuccess: isPeopleSuccess,
    isLoading: hasPendingRequests,
    isError: isPeopleError,
    refetch: refetchPeople,
  } = useQuery<AxiosResponse<ResultsResponse<Person>>>(
    ['getPeople', page, size, searchString],
    ({ queryKey, signal }) => {
      const [, page, size, searchString] = queryKey;
      const params = new URLSearchParams();
      searchString && params.append('string', searchString as string);
      page && params.append('page', page as string);
      size && params.append('size', size as string);

      const paramsEncoded = encodeURI(params.toString());
      const url = searchString
        ? `/search/people?${paramsEncoded}`
        : `/people/paginated${paramsEncoded !== '' ? `?${paramsEncoded}` : ''}`;

      return api.get(url, { signal });
    },
    {
      enabled: false,
    },
  );
  useEffect(() => {
    if (hasPendingRequests) queryClient.cancelQueries('getPeople');
    refetchPeople();
  }, [refetchPeople, page, size, searchString, hasPendingRequests, queryClient]);
  useEffect(() => {
    if (isPeopleSuccess && peopleData) {
      setPeople(peopleData.data);
    }
  }, [isPeopleSuccess, peopleData]);

  const {
    isLoading: isToggleDeleteLoading,
    isSuccess: isToggleDeleteSuccess,
    mutate: togglePersonDelete,
  } = useMutation('togglePersonDelete', (id: number) => api.post(`/people/${id}/toggleDelete`));
  useEffect(() => {
    if (isToggleDeleteSuccess) {
      refetchPeople();
    }
  }, [isToggleDeleteSuccess, refetchPeople]);

  const {
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    mutate: approvePerson,
  } = useMutation('approvePerson', (id: number) => api.post(`/people/${id}/approve`));
  useEffect(() => {
    if (isApproveSuccess) {
      refetchPeople();
    }
  }, [isApproveSuccess, refetchPeople]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container spacing={2} mb={3}>
      {people?.totalElements === 0 ? (
        <Grid item xs={12}>
          <CenteredNoneFound />
        </Grid>
      ) : (
        people?.results.map((p) => (
          <Grid item key={p.id} xs={12}>
            <Paper
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'nowrap',
                p: 1,
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
              }}
            >
              <Box display='flex' alignItems='center' flexGrow={1}>
                {p.approved && !p.deleted ? (
                  <Tooltip title='This person has been approved by an admin.'>
                    <VerifiedSharp fontSize='medium' color='success' />
                  </Tooltip>
                ) : p.deleted ? (
                  <Tooltip title='This person has been deleted and will not be publicly visible (including associated experiments).'>
                    <WarningRounded fontSize='medium' color='warning' />
                  </Tooltip>
                ) : (
                  <Tooltip title='This person requires approval.'>
                    <NewReleasesRounded fontSize='medium' color='error' />
                  </Tooltip>
                )}
                <Box ml={1}>
                  <Typography variant='body2' fontWeight='bold' color={p.deleted ? 'text.secondary' : 'text.primary'}>
                    {`${p.firstName} ${p.familyName}`} {p.deleted && ' (DELETED)'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' flexGrow={1} pr={2}>
                    {p.affiliation} &bull; Added {moment(p.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
              <Box display='flex' ml={2} justifyContent='flex-end' alignItems='center' sx={{ width: '20rem' }}>
                {!p.approved && !p.deleted && (
                  <Button
                    onClick={() => {
                      approvePerson(p.id);
                    }}
                    variant='contained'
                    color='primary'
                    disabled={isApproveLoading}
                    sx={matches ? { mr: 1, width: '7rem' } : { mr: 1 }}
                  >
                    {matches && (
                      <Typography variant='body1' color='primary' textTransform='none' mr={1}>
                        Approve
                      </Typography>
                    )}
                    <DoneRounded fontSize='small' />
                  </Button>
                )}
                <Button
                  onClick={() => {
                    navigate('/admin/people/edit', {
                      state: p,
                    });
                  }}
                  variant='contained'
                  color='primary'
                  sx={matches ? { mr: 1, width: '5rem' } : { mr: 1 }}
                >
                  {matches && (
                    <Typography variant='body1' color='primary' textTransform='none' mr={1}>
                      Edit
                    </Typography>
                  )}
                  <EditRounded fontSize='small' />
                </Button>
                <Button
                  onClick={() => {
                    togglePersonDelete(p.id);
                  }}
                  disabled={isToggleDeleteLoading}
                  variant='contained'
                  color='primary'
                  sx={matches ? { mr: 1, width: '7rem' } : { mr: 1 }}
                >
                  {matches && (
                    <Typography variant='body1' color='primary' textTransform='none' mr={1}>
                      {p.deleted ? 'Restore' : 'Delete'}
                    </Typography>
                  )}
                  {p.deleted ? <RestartAltRounded fontSize='small' /> : <DeleteRounded fontSize='small' />}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))
      )}
      <Grid item xs={12} display='flex' justifyContent='center'>
        <Pagination
          count={people?.totalPages}
          variant='outlined'
          shape='rounded'
          color='secondary'
          page={page || 1}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Grid>
      <MessageSnackbar open={isPeopleError} message='Could not load people. Please try again.' severity='error' />
      <MessageSnackbar open={isApproveSuccess} message='Person approved.' severity='success' />
    </Grid>
  );
}
