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
                          <Card sx={{ p: 0.5, m: 2, minWidth: '350' }} elevation={3}>
                            <Grid container direction='row' alignItems='center'>
                              <Grid item>
                                <FlagIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant={'h6'}>Missions :</Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography>{data?.mission.name}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container item>
                              <Grid item>
                                <Typography variant={'h6'} display={'inline'}>
                                  Fields of Research classification :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography display={'inline'}>{data?.forCode.id}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container>
                              <Grid item>
                                <Typography variant={'h6'} display={'inline'}>
                                  FoR Classification Name :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography display={'inline'}>{data?.forCode.name}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Card sx={{ p: 0.5, m: 2, minWidth: '350' }} elevation={3}>
                            <Grid container direction={'row'} alignItems={'center'}>
                              <Grid item>
                                <RocketLaunchIcon />
                              </Grid>
                              <Grid item>
                                <Typography variant={'h6'} display={'inline'}>
                                  Platform :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography display={'inline'}>{data?.platform.name}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container item>
                              <Grid item>
                                <Typography variant={'h6'} display={'inline'}>
                                  Socio-Economic Objective classification :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid>
                                  <Typography display={'inline'}>{data?.seoCode.id}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid container item>
                              <Grid item>
                                <Typography variant={'h6'} display={'inline'}>
                                  SEO Classification Name :
                                </Typography>
                              </Grid>
                              <Grid container direction='column' alignItems='left'>
                                <Grid item>
                                  <Typography display={'inline'}>{data?.seoCode.name}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Card>
                        </Grid>
                      </Grid>
                      <Grid container sx={{ p: 0.5 }}>
                        <Grid item sx={{ m: 2 }}>
                          <Card elevation={10}>
                            <Grid item>
                              <Typography>Researchers :</Typography>
                              <Grid item spacing={2}>
                                {data?.people.map((person) => (
                                  <Grid item key={person.person.id}>
                                    <Typography>{`${person.person.familyName[0]}. ${person.person.firstName}`}</Typography>
                                  </Grid>
                                ))}
                              </Grid>
                            </Grid>
                            <Grid item>
                              <Typography>Experiment Publication :</Typography>
                              <Typography>{data?.experimentPublications}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Lead Institution :</Typography>
                              <Typography>{data?.leadInstitution}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Type of Activity (ToA) :</Typography>
                              <Typography>{data?.toa}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Experiment Aim :</Typography>
                              <Typography>{data?.experimentAim}</Typography>
                            </Grid>
                            <Grid item>
                              <Typography>Experiment Objective :</Typography>
                              <Typography>{data?.experimentObjective}</Typography>
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
