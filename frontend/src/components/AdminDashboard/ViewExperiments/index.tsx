import {
  DeleteRounded,
  DoneRounded,
  EditRounded,
  NewReleasesRounded,
  RestartAltRounded,
  VerifiedSharp,
  WarningRounded,
} from '@mui/icons-material';
import {
  Link,
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  Typography,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { AxiosResponse } from 'axios';
import moment from 'moment';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import api from '../../../util/api';
import { Experiment, ResultsResponse } from '../../../util/types';
import CenteredNoneFound from '../../CenteredNoneFound';
import MessageSnackbar from '../../MessageSnackbar';

type ViewExperimentsProps = {
  page?: number;
  size?: number;
  searchString?: string;
  onPageChange: (_e: ChangeEvent<unknown>, page: number) => void;
};

export default function ViewExperiments({ page, size, searchString, onPageChange }: ViewExperimentsProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [experiments, setExperiments] = useState<ResultsResponse<Experiment>>();
  const {
    data: experimentsData,
    isSuccess: isExperimentsSuccess,
    isLoading: hasPendingRequests,
    isError: isExperimentsError,
    refetch: refetchExperiments,
  } = useQuery<AxiosResponse<ResultsResponse<Experiment>>>(
    ['getExperiments', page, size, searchString],
    ({ queryKey, signal }) => {
      const [, page, size, searchString] = queryKey;
      const params = new URLSearchParams();
      searchString && params.append('string', searchString as string);
      page && params.append('page', page as string);
      size && params.append('size', size as string);

      const paramsEncoded = encodeURI(params.toString());
      const url = searchString
        ? `/search?${paramsEncoded}`
        : `/experiments/paginated${paramsEncoded !== '' ? `?${paramsEncoded}` : ''}`;

      return api.get(url, { signal });
    },
    {
      enabled: false,
    },
  );
  useEffect(() => {
    if (hasPendingRequests) queryClient.cancelQueries('getExperiments');
    refetchExperiments();
  }, [refetchExperiments, page, size, searchString, hasPendingRequests, queryClient]);
  useEffect(() => {
    if (isExperimentsSuccess && experimentsData) {
      setExperiments(experimentsData.data);
    }
  }, [isExperimentsSuccess, experimentsData]);

  const {
    isLoading: isToggleDeleteLoading,
    isSuccess: isToggleDeleteSuccess,
    mutate: toggleExperimentDelete,
  } = useMutation('toggleExperimentDelete', (id: number) => api.post(`/experiments/${id}/toggleDelete`));
  useEffect(() => {
    if (isToggleDeleteSuccess) {
      refetchExperiments();
    }
  }, [isToggleDeleteSuccess, refetchExperiments]);

  const {
    isLoading: isApproveLoading,
    isSuccess: isApproveSuccess,
    mutate: approveExperiment,
  } = useMutation('approveExperiment', (id: number) => api.post(`/experiments/${id}/approve`));
  useEffect(() => {
    if (isApproveSuccess) {
      refetchExperiments();
    }
  }, [isApproveSuccess, refetchExperiments]);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Grid container spacing={2} mb={3}>
      {experiments?.totalElements === 0 ? (
        <Grid item xs={12}>
          <CenteredNoneFound />
        </Grid>
      ) : (
        experiments?.results.map((e) => (
          <Grid item key={e.id} xs={12}>
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
                {e.approved && !e.deleted ? (
                  <Tooltip title='This experiment has been approved by an admin.'>
                    <VerifiedSharp fontSize='medium' color='success' />
                  </Tooltip>
                ) : e.deleted ? (
                  <Tooltip title='This experiment has been deleted and will not be publicly visible.'>
                    <WarningRounded fontSize='medium' color='warning' />
                  </Tooltip>
                ) : (
                  <Tooltip title='This experiment requires approval.'>
                    <NewReleasesRounded fontSize='medium' color='error' />
                  </Tooltip>
                )}
                <Link ml={1} href={`/experiment/${e.id}`}>
                  <Typography variant='body2' fontWeight='bold' color={e.deleted ? 'text.secondary' : 'text.primary'}>
                    {e.title} {e.deleted && ' (DELETED)'}
                  </Typography>
                  <Typography variant='body2' color='text.secondary' flexGrow={1} pr={2}>
                    {e.mission.name} &bull; Added {moment(e.createdAt).fromNow()}
                  </Typography>
                </Link>
              </Box>
              <Box display='flex' ml={2} justifyContent='flex-end' alignItems='center' sx={{ width: '20rem' }}>
                {!e.approved && !e.deleted && (
                  <Button
                    onClick={() => {
                      approveExperiment(e.id);
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
                    navigate('/admin/experiments/edit', {
                      state: e,
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
                    toggleExperimentDelete(e.id);
                  }}
                  disabled={isToggleDeleteLoading}
                  variant='contained'
                  color='primary'
                  sx={matches ? { mr: 1, width: '7rem' } : { mr: 1 }}
                >
                  {matches && (
                    <Typography variant='body1' color='primary' textTransform='none' mr={1}>
                      {e.deleted ? 'Restore' : 'Delete'}
                    </Typography>
                  )}
                  {e.deleted ? <RestartAltRounded fontSize='small' /> : <DeleteRounded fontSize='small' />}
                </Button>
              </Box>
            </Paper>
          </Grid>
        ))
      )}
      <Grid item xs={12} display='flex' justifyContent='center'>
        <Pagination
          count={experiments?.totalPages}
          variant='outlined'
          shape='rounded'
          color='secondary'
          page={page || 1}
          siblingCount={0}
          onChange={onPageChange}
        />
      </Grid>
      <MessageSnackbar
        open={isExperimentsError}
        message='Could not load experiments. Please try again.'
        severity='error'
      />
      <MessageSnackbar open={isApproveSuccess} message='Experiment approved.' severity='success' />
    </Grid>
  );
}
