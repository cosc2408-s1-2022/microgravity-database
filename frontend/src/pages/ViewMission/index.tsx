import { Box, CircularProgress, Container, Paper, Typography } from '@mui/material';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import api from '../../util/api';
import { Mission } from '../../util/types';
import lodash from 'lodash';
import moment from 'moment';
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
          {`${mission?.name}`}
        </Typography>
        <Typography variant='h6' sx={{ pr: 1 }}>
          {lodash(mission?.platform.name).startCase()}
        </Typography>
        <Typography variant='body1' sx={{ pr: 1 }} color='GrayText'>
          {mission?.startDate && mission?.endDate
            ? `${moment(mission.startDate).format('MMMM YYYY')} - ${moment(mission.endDate).format('MMMM YYYY')}`
            : mission?.startDate
            ? `${moment(mission.startDate).format('MMMM YYYY')} - Present`
            : mission?.endDate
            ? `Unknown - ${moment(mission.endDate).format('MMMM YYYY')}`
            : ''}
        </Typography>
        <Typography variant='body1' mt={4}>
          {`Launched ${moment(mission?.launchDate).format('MMMM Do YYYY')} (${moment(mission?.launchDate).fromNow()}).`}
        </Typography>
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
          Experiments (Total {mission?.experiments?.length})
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
