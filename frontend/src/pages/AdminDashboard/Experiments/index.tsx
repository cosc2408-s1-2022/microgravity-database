import { Box, Button, CircularProgress, Container, Grid, Pagination, Paper, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Experiment, Page } from '../../../types';
import { DeleteRounded, EditRounded, RestoreFromTrashRounded } from '@mui/icons-material';
import api from '../../../util/api';

export default function Experiments() {
  const [experimentPage, setExperimentPage] = useState<Page<Experiment>>();
  const [page, setPage] = useState<number>();

  const {
    data,
    isLoading: isExperimentsLoading,
    isSuccess: isExperimentsSuccess,
    refetch,
  } = useQuery<AxiosResponse<Page<Experiment>>>(
    ['getExperiments', page],
    ({ queryKey }) => {
      const [, page] = queryKey;
      return api.get('/experiments', {
        params: {
          page,
        },
      });
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const {
    isLoading: isToggleDeleteLoading,
    isSuccess: isToggleDeleteSuccess,
    mutate,
  } = useMutation('toggleExperimentDelete', (id: number) => api.post(`/experiments/${id}/toggleDelete`));

  useEffect(() => {
    if (isExperimentsSuccess && data) {
      setExperimentPage(data.data);
    }
  }, [isExperimentsSuccess, data]);

  useEffect(() => {
    if (isToggleDeleteSuccess) {
      refetch();
    }
  }, [isToggleDeleteSuccess, refetch]);

  return isExperimentsLoading ? (
    <Box display='flex' justifyContent='center'>
      <CircularProgress />
    </Box>
  ) : (
    <Container maxWidth='md' sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        {experimentPage?.content.map((e) => (
          <Grid item xs={12} key={e.id}>
            <Paper sx={{ display: 'flex', alignItems: 'center', flexWrap: 'nowrap', p: 1 }}>
              <Typography variant='body1' flexGrow={1} pr={2} color={e.deleted ? 'text.secondary' : 'text.primary'}>
                {e.title} {e.deleted && ' (DELETED)'}
              </Typography>
              <Button variant='outlined' color='secondary' size='small' sx={{ mr: 1 }}>
                <EditRounded fontSize='small' />
              </Button>
              <Button
                onClick={() => {
                  mutate(e.id);
                }}
                disabled={isToggleDeleteLoading}
                variant='outlined'
                color='secondary'
                size='small'
              >
                {e.deleted ? <RestoreFromTrashRounded fontSize='small' /> : <DeleteRounded fontSize='small' />}
              </Button>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} display='flex' justifyContent='center'>
          <Pagination
            count={experimentPage?.totalPages}
            variant='outlined'
            shape='rounded'
            color='primary'
            page={(page || 0) + 1}
            onChange={(_e, page) => {
              setPage((page || 1) - 1);
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
