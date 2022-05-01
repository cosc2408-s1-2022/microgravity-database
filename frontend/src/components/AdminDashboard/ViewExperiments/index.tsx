import { DeleteRounded, EditRounded } from '@mui/icons-material';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { Box, Button, Grid, Pagination, Paper, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import api from '../../../util/api';
import { Experiment, ResultsResponse } from '../../../util/types';
import CenteredNoneFound from '../../CenteredNoneFound';
import MessageSnackbar from '../../MessageSnackbar';

type ViewExperimentsProps = {
  size?: number;
  searchString?: string;
};

export default function ViewExperiments({ size, searchString }: ViewExperimentsProps) {
  const queryClient = useQueryClient();

  const [experiments, setExperiments] = useState<ResultsResponse<Experiment>>();
  const [page, setPage] = useState<number>();
  const handlePageChange = (_e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
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
        : `/experiments${paramsEncoded !== '' ? `?${paramsEncoded}` : ''}`;

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
    mutate,
  } = useMutation('toggleExperimentDelete', (id: number) => api.post(`/experiments/${id}/toggleDelete`));
  useEffect(() => {
    if (isToggleDeleteSuccess) {
      refetchExperiments();
    }
  }, [isToggleDeleteSuccess, refetchExperiments]);

  console.log(experiments);

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
              <Box display='flex' flexDirection='column' flexGrow={1}>
                <Typography
                  variant='body1'
                  fontWeight='bold'
                  flexGrow={1}
                  pr={2}
                  color={e.deleted ? 'text.secondary' : 'text.primary'}
                >
                  {e.title} {e.deleted && ' (DELETED)'}
                </Typography>
                <Typography variant='body2' color='text.secondary' flexGrow={1} pr={2}>
                  {e.mission.name}
                </Typography>
              </Box>
              <Button variant='contained' color='primary' sx={{ mr: 1 }}>
                <EditRounded fontSize='medium' />
              </Button>
              <Button
                onClick={() => {
                  mutate(e.id);
                }}
                disabled={isToggleDeleteLoading}
                variant='contained'
                color='primary'
              >
                {e.deleted ? <RestartAltRoundedIcon fontSize='medium' /> : <DeleteRounded fontSize='medium' />}
              </Button>
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
          onChange={handlePageChange}
        />
      </Grid>
      <MessageSnackbar
        open={isExperimentsError}
        message='Could not load experiments. Please try again.'
        severity='error'
      />
      <MessageSnackbar
        open={isExperimentsError}
        message='Could not load experiments. Please try again.'
        severity='error'
      />
    </Grid>
  );
}
