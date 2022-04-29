import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from '../../util/api';
import { Mission } from '../../util/types';
import lodash from 'lodash';
import moment from 'moment';
import { RocketLaunchRounded, DateRangeRounded, ScienceRounded } from '@mui/icons-material';
import ExperimentPaper from '../../components/ExperimentPaper';

export default function ViewMission() {
  const id = useParams().id as unknown as number;
  const [mission, setMission] = useState<Mission>();
  const { data, isSuccess, isLoading } = useQuery<AxiosResponse<Mission>>(['getMission', id], ({ queryKey }) => {
    const [, id] = queryKey;
    return api.get(`/missions/${id}`);
  });

  useEffect(() => {
    if (isSuccess && data) {
      setMission(data.data);
    }
  }, [isSuccess, data]);

  return isLoading ? (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress size={24} color='primary' />
    </Box>
  ) : (
    <Container maxWidth='md'>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 2,
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        }}
      >
        <Typography variant='h4' fontWeight='bold'>
          {`${mission?.name} (${moment(mission?.launchDate).year()})`}
        </Typography>
        <Typography variant='h6' sx={{ pr: 1 }}>
          {lodash(mission?.platform.name).startCase()}
        </Typography>
        <Typography variant='body1' sx={{ pr: 1 }} color='GrayText'>{`${moment(mission?.startDate).year()} - ${moment(
          mission?.endDate,
        ).year()}`}</Typography>
      </Paper>
      <Paper
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          p: 2,
          mt: 2,
          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        }}
      >
        <Typography variant='h5' fontWeight='bold' sx={{ pr: 1 }}>
          Experiments
        </Typography>
        {mission?.experiments && mission?.experiments.length > 0 ? (
          mission.experiments.map((e) => <ExperimentPaper experiment={e} key={e.id} />)
        ) : (
          <Typography>None yet.</Typography>
        )}
      </Paper>
    </Container>
  );
}
