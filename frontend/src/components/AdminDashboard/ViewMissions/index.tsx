import {
  VerifiedSharp,
  WarningRounded,
  NewReleasesRounded,
  DoneRounded,
  EditRounded,
  DeleteRounded,
  RestartAltRounded,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  Link,
  Pagination,
  Paper,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { ChangeEvent, useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../../util/api';
import { ResultsResponse, Mission } from '../../../util/types';
import CenteredNoneFound from '../../CenteredNoneFound';
import MessageSnackbar from '../../MessageSnackbar';
import lodash from 'lodash';

type ViewMissionProps = {
  page?: number;
  size?: number;
  searchString?: string;
  onPageChange: (_e: ChangeEvent<unknown>, page: number) => void;
};

export default function ViewMissions({ page, size, searchString, onPageChange }: ViewMissionProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [missions, setMissions] = useState<ResultsResponse<Mission>>();
  const {
    data: missionsData,
    isSuccess: isMissionsSuccess,
    isLoading: hasPendingRequests,
    isError: isMissionsError,
    refetch: refetchMissions,
  } = useQuery<AxiosResponse<ResultsResponse<Mission>>>(
    ['getMissions', page, size, searchString],
    ({ queryKey, signal }) => {
      const [, page, size, searchString] = queryKey;
      const params = new URLSearchParams();
      searchString && params.append('string', searchString as string);
      page && params.append('page', page as string);
      size && params.append('size', size as string);

      const paramsEncoded = encodeURI(params.toString());
      const url = searchString
        ? `/search/missions?${paramsEncoded}`
        : `/missions/paginated${paramsEncoded !== '' ? `?${paramsEncoded}` : ''}`;

      return api.get(url, { signal });
    },
    {
      enabled: false,
    },
  );
  useEffect(() => {
    if (hasPendingRequests) queryClient.cancelQueries('getMissions');
    refetchMissions();
  }, [refetchMissions, page, size, searchString, hasPendingRequests, queryClient]);
  useEffect(() => {
    if (isMissionsSuccess && missionsData) {
      setMissions(missionsData.data);
    }
  }, [isMissionsSuccess, missionsData]);

  const {
    isLoading: isToggleDeleteLoading,
    isSuccess: isToggleDeleteSuccess,
    mutate: toggleMissionDelete,
  } = useMutation('toggleMissionDelete', (id: number) => api.post(`/missions/${id}/toggleDelete`));
  useEffect(() => {
    if (isToggleDeleteSuccess) {
      refetchMissions();
    }
  }, [isToggleDeleteSuccess, refetchMissions]);

  const {
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    mutate: approveMission,
  } = useMutation('approveMission', (id: number) => api.post(`/missions/${id}/approve`));
  useEffect(() => {
    if (isApproveSuccess) {
      refetchMissions();
    }
  }, [isApproveSuccess, refetchMissions]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container spacing={2} mb={3}>
      {missions?.totalElements === 0 ? (
        <Grid item xs={12}>
          <CenteredNoneFound />
        </Grid>
      ) : (
        missions?.results.map((m) => (
          <Grid item key={m.id} xs={12}>
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
                {m.approved && !m.deleted ? (
                  <Tooltip title='This mission has been approved by an admin.'>
                    <VerifiedSharp fontSize='medium' color='success' />
                  </Tooltip>
                ) : m.deleted ? (
                  <Tooltip title='This mission has been deleted and will not be publicly visible.'>
                    <WarningRounded fontSize='medium' color='warning' />
                  </Tooltip>
                ) : (
                  <Tooltip title='This mission requires approval.'>
                    <NewReleasesRounded fontSize='medium' color='error' />
                  </Tooltip>
                )}
                <Link ml={1} href={`/mission/${m.id}`}>
                  <Typography variant='body2' fontWeight='bold' color={m.deleted ? 'text.secondary' : 'text.primary'}>
                    {m.name} {m.deleted && ' (DELETED)'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' flexGrow={1} pr={2}>
                    {moment(m.launchDate).year()} &bull; {lodash(m.platform.name).startCase()} &bull; Added{' '}
                    {moment(m.createdAt).fromNow()}
                  </Typography>
                </Link>
              </Box>
              <Box display='flex' ml={2} justifyContent='flex-end' alignItems='center' sx={{ width: '20rem' }}>
                {!m.approved && !m.deleted && (
                  <Button
                    onClick={() => {
                      approveMission(m.id);
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
                    navigate('/admin/missions/edit', {
                      state: m,
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
                    toggleMissionDelete(m.id);
                  }}
                  disabled={isToggleDeleteLoading}
                  variant='contained'
                  color='primary'
                  sx={matches ? { mr: 1, width: '7rem' } : { mr: 1 }}
                >
                  {matches && (
                    <Typography variant='body1' color='primary' textTransform='none' mr={1}>
                      {m.deleted ? 'Restore' : 'Delete'}
                    </Typography>
                  )}
                  {m.deleted ? <RestartAltRounded fontSize='small' /> : <DeleteRounded fontSize='small' />}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))
      )}
      <Grid item xs={12} display='flex' justifyContent='center'>
        <Pagination
          count={missions?.totalPages}
          variant='outlined'
          shape='rounded'
          color='secondary'
          page={page || 1}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Grid>
      <MessageSnackbar open={isMissionsError} message='Could not load missions. Please try again.' severity='error' />
      <MessageSnackbar open={isApproveSuccess} message='Mission approved.' severity='success' />
    </Grid>
  );
}
