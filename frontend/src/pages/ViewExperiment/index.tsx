import NavBar from '../../components/NavBar';
import React, { useState } from 'react';
import { Box, Card, Grid, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getExperiment } from '../../util/api';
import CircularProgress from '@mui/material/CircularProgress';
import FlagIcon from '@mui/icons-material/Flag';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function ViewExperiment() {
  const [id] = useState(new URLSearchParams(useLocation().search).get('id') as string);
  const { data, isLoading } = useQuery('experiments', () => getExperiment({ id: id }));

  return (
    <>
      {isLoading ? (
        // TODO Center Loading Process And Change Color ?
        <Grid>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        </Grid>
      ) : (
        <Grid container alignItems='stretch'>
          <NavBar />
          <Grid item xs={1.5} />
          <Grid item xs={9}>
            <Grid container justifyContent='center'>
              <Box display='flex' alignItems='center' justifyContent='center'>
                <Paper elevation={24}>
                  <Grid container alignItems={'center'}>
                    <Grid container direction='column' alignContent='center' wrap='nowrap' my={3}>
                      <Typography variant='h4' textAlign='center'>
                        {data?.title}
                      </Typography>
                      <Grid container rowSpacing={0}>
                        <Grid item xs={12} md={6}>
                          <Card sx={{ p: 2, m: 2, minWidth: '350' }} elevation={3}>
                            <Grid container direction='row' alignItems='center'>
                              <Grid item>
                                <FlagIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant={'h5'}>Missions :</Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography gutterBottom={true} variant={'body1'}>
                                    {data?.mission.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container item>
                              <Grid item>
                                <Typography variant={'h5'} display={'inline'}>
                                  Fields of Research classification :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography gutterBottom={true} variant={'body1'} display={'inline'}>
                                    {data?.forCode.id}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item>
                                <Typography variant={'h5'} display={'inline'}>
                                  FoR Classification Name :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography gutterBottom={true} variant={'body1'} display={'inline'}>
                                    {data?.forCode.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Card sx={{ p: 2, m: 2, minWidth: '350' }} elevation={3}>
                            <Grid container direction={'row'} alignItems={'center'}>
                              <Grid item>
                                <RocketLaunchIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant={'h5'} display={'inline'}>
                                  Platform :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography gutterBottom={true} variant={'body1'} display={'inline'}>
                                    {(() => {
                                      if (data?.platform.name === 'spaceStation') {
                                        return 'Space Station';
                                      } else if (data?.platform.name === 'spaceShuttle') {
                                        return 'Space Shuttle';
                                      } else if (data?.platform.name === 'retrievableCapsule') {
                                        return 'Retrievable Capsule';
                                      } else if (data?.platform.name === 'soundingRocket') {
                                        return 'Sounding Rocket';
                                      } else if (data?.platform.name === 'parabolicFlight') {
                                        return 'Parabolic Flight';
                                      } else if (data?.platform.name === 'groundBasedFacility') {
                                        return 'Ground Based Facility';
                                      }
                                    })()}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container item>
                              <Grid item>
                                <Typography variant={'h5'} display={'inline'}>
                                  Socio-Economic Objective classification :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid>
                                  <Typography gutterBottom={true} variant={'body1'} display={'inline'}>
                                    {data?.seoCode.id}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container item>
                              <Grid item>
                                <Typography variant={'h5'} display={'inline'}>
                                  SEO Classification Name :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography gutterBottom={true} variant={'body1'} display={'inline'}>
                                    {data?.seoCode.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid container>
                        <Grid container>
                          <Card sx={{ p: 2, m: 2 }} elevation={10}>
                            <Grid item>
                              <Typography gutterBottom variant={'h5'}>
                                Researchers :
                              </Typography>
                              <Grid item spacing={2} direction='column'>
                                {data?.people.map((person) => (
                                  <Grid container key={person.person.id}>
                                    <Grid item>
                                      <Typography gutterBottom variant={'body1'} display={'block'}>
                                        {person.person.familyName[0]}. {person.person.firstName}
                                        {' affiliated with '}
                                        {person.person.affiliation} {' works at '} {person.person.city} {' in '}{' '}
                                        {person.person.state} , {person.person.country}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography gutterBottom variant={'h5'} display={'inline'}>
                                Experiment Publication :{' '}
                              </Typography>
                              <Typography gutterBottom variant={'body1'}>
                                {data?.experimentPublications}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography gutterBottom variant={'h5'} display={'inline'}>
                                Lead Institution :{' '}
                              </Typography>
                              <Typography gutterBottom variant={'body1'}>
                                {data?.leadInstitution}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography gutterBottom variant={'h5'}>
                                Type of Activity (ToA) :
                              </Typography>
                              <Typography gutterBottom variant={'body1'}>
                                {data?.toa}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography gutterBottom variant={'h5'}>
                                Experiment Aim :
                              </Typography>
                              <Typography gutterBottom variant={'body1'}>
                                {data?.experimentAim}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography gutterBottom variant={'h5'}>
                                Experiment Objective :
                              </Typography>
                              <Typography gutterBottom variant={'body1'}>
                                {data?.experimentObjective}
                              </Typography>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={1.5} />
        </Grid>
      )}
    </>
  );
}
