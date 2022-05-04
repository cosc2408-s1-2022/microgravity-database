import { useEffect, useState } from 'react';
import { Box, Card, CircularProgress, Container, Grid, Link, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import lodash from 'lodash';
import { getExperiment } from '../../util/apiCalls';
import { Experiment } from '../../util/types';
import moment from 'moment';

export default function ViewExperiment() {
  const id = useParams().id as unknown as string;
  const [experiment, setExperiment] = useState<Experiment>();
  const { data, isSuccess, isLoading } = useQuery(['experiments', id], ({ queryKey }) => {
    const [, id] = queryKey;
    return getExperiment({ id });
  });

  useEffect(() => {
    if (isSuccess && data) {
      setExperiment(data);
    }
  }, [isSuccess, data]);

  return (
    <>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Container maxWidth='md'>
          <Paper
            sx={{
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              borderRadius: '10px',
              p: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h4' fontWeight='bold' mb={3}>
                  {experiment?.title}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Grid container display='flex' spacing={3}>
                  <Grid item xs={12} md={6} display='flex'>
                    <Card
                      sx={{
                        p: 2,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                      }}
                    >
                      <Link href={`/mission/${experiment?.mission.id}`}>
                        <Typography variant='h5' fontWeight='bold' pr={1}>
                          Mission
                        </Typography>
                        <Typography variant='body1'>{`${experiment?.mission.name} (${moment(
                          experiment?.mission.launchDate,
                        ).year()})`}</Typography>
                      </Link>
                      <Typography variant='h5' fontWeight='bold' pr={1} mt={3}>
                        Platform
                      </Typography>
                      <Typography variant='body1'>{lodash(experiment?.platform.name).startCase()}</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} display='flex'>
                    <Card
                      sx={{
                        p: 2,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                      }}
                    >
                      <Link href={`/forCode/${experiment?.forCode.id}`}>
                        <Typography variant='h5' fontWeight='bold'>
                          Field of Research
                        </Typography>
                        <Typography variant='body1'>{experiment?.forCode.name}</Typography>
                        <Typography mt={2} variant='h5' fontWeight='bold'>
                          FOR Classification
                        </Typography>
                        <Typography variant='body1'>{experiment?.forCode.code}</Typography>
                      </Link>
                      <Link href={`/seoCode/${experiment?.seoCode.id}`}>
                        <Typography mt={2} variant='h5' fontWeight='bold'>
                          Socio-Economic Objective
                        </Typography>
                        <Typography variant='body1'>{experiment?.seoCode.name}</Typography>
                        <Typography mt={2} variant='h5' fontWeight='bold'>
                          SEO Classification
                        </Typography>
                        <Typography variant='body1'>{experiment?.seoCode.code}</Typography>
                      </Link>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{ p: 2, mt: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                >
                  <Typography variant='h5' fontWeight='bold'>
                    Researchers
                  </Typography>
                  {experiment?.people.map((person, i) => (
                    <Box key={i} mb={2}>
                      <Typography variant={'body1'} fontWeight='bold'>
                        {`${person.person.familyName.at(0)}. ${person.person.firstName}`}
                      </Typography>
                      <Typography variant={'body2'}>{`${person.role.name}`}</Typography>
                      <Typography variant={'body2'}>{`${person.person.affiliation}`}</Typography>
                      <Typography
                        variant={'body2'}
                      >{`${person.person.city}, ${person.person.state}, ${person.person.country}`}</Typography>
                    </Box>
                  ))}
                  <Typography variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Experiment Publication
                  </Typography>
                  <Typography variant='body1'>{experiment?.experimentPublications || 'None'}</Typography>
                  <Typography variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Lead Institution
                  </Typography>
                  <Typography variant='body1'>{experiment?.leadInstitution}</Typography>
                  <Typography variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Type of Activity (ToA)
                  </Typography>
                  <Typography variant='body1'>{experiment?.toa}</Typography>
                  <Typography variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Experiment Aim
                  </Typography>
                  <Typography variant='body1'>{experiment?.experimentAim}</Typography>
                  <Typography variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Experiment Objective
                  </Typography>
                  <Typography variant='body1'>{experiment?.experimentObjective}</Typography>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </>
  );
}
