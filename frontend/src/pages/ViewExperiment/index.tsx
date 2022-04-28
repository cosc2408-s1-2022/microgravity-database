import NavBar from '../../components/NavBar';
import React, { useEffect, useState } from 'react';
import { Box, Card, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import lodash from 'lodash';
import { Flag, RocketLaunch, Science } from '@mui/icons-material';
import { getExperiment } from '../../util/apiCalls';
import { Experiment } from '../../util/types';

export default function ViewExperiment() {
  const [id] = useState(new URLSearchParams(useLocation().search).get('id') as string);
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
        <>
          <NavBar />
          <Container maxWidth='md' sx={{ my: 4 }}>
            <Paper elevation={24} sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                        }}
                        elevation={3}
                      >
                        <Box display='inline-flex' alignItems='center'>
                          <Typography variant='h5' fontWeight='bold' pr={1}>
                            Mission
                          </Typography>
                          <Flag fontSize='medium' />
                        </Box>
                        <Typography variant='body1'>{experiment?.mission.name}</Typography>
                        <Typography mt={2} variant='h6' fontWeight='bold'>
                          Fields of Research classification
                        </Typography>
                        <Typography variant='body1'>{experiment?.forCode.id}</Typography>
                        <Typography mt={2} variant='h6' fontWeight='bold'>
                          FOR Classification Name
                        </Typography>
                        <Typography variant='body1'>{experiment?.forCode.name}</Typography>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={6} display='flex'>
                      <Card sx={{ p: 2, width: '100%', display: 'flex', flexDirection: 'column' }} elevation={3}>
                        <Box display='inline-flex' alignItems='center'>
                          <Typography variant='h5' fontWeight='bold' pr={1}>
                            Platform
                          </Typography>
                          <RocketLaunch fontSize='medium' />
                        </Box>
                        <Typography variant='body1'>{lodash(experiment?.platform.name).startCase()}</Typography>
                        <Typography mt={2} variant='h6' fontWeight='bold'>
                          Socio-Economic Objective classification
                        </Typography>
                        <Typography variant='body1'>{experiment?.seoCode.id}</Typography>
                        <Typography mt={2} variant='h6' fontWeight='bold'>
                          SEO Classification Name
                        </Typography>
                        <Typography variant='body1'>{experiment?.seoCode.name}</Typography>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Card sx={{ p: 2, mt: 3 }} elevation={3}>
                    <Box display='inline-flex' alignItems='center'>
                      <Typography variant='h5' fontWeight='bold'>
                        Researchers
                      </Typography>
                      <Science />
                    </Box>
                    {experiment?.people.map((person, i) => (
                      <Typography key={i} gutterBottom variant={'body1'} display={'block'}>
                        {`${person.person.familyName.at(0)}. ${person.person.firstName} affiliated with ${
                          person.person.affiliation
                        } works at ${person.person.city} in ${person.person.state}, ${person.person.country}`}
                      </Typography>
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
        </>
      )}
    </>
  );
}
