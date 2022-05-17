import { useEffect, useState } from 'react';
import { Box, Card, CircularProgress, Container, Grid, Link, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import lodash from 'lodash';
import { getExperiment } from '../../util/apiCalls';
import { Experiment } from '../../util/types';
import moment from 'moment';
import { BACKEND_URL } from '../../util/api';
import { PictureAsPdfRounded } from '@mui/icons-material';

export default function ViewExperiment() {
  const id = useParams().id as unknown as string;
  const [experiment, setExperiment] = useState<Experiment>();
  const { data, isSuccess, isLoading } = useQuery(['experiments', id], ({ queryKey }) => {
    const [, id] = queryKey;
    return getExperiment({ id });
  });
  const ColoredLine = () => (
      <hr
          style={{
            color: '#cc0808',
            backgroundColor: '#cc0808',
            height: 5
          }}
      />
  );

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
                  <ColoredLine/>
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
                        <Typography style={{ color: '#cc0808',}} variant='h5' fontWeight='bold' pr={1}>
                          Mission
                        </Typography>
                        <Typography variant='body1'>{`${experiment?.mission.name} (${moment(
                          experiment?.mission.launchDate,
                        ).year()})`}</Typography>
                      </Link>
                      <Typography style={{ color: '#cc0808',}} variant='h5' fontWeight='bold' pr={1} mt={3}>
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
                        <Typography style={{ color: '#cc0808',}}  variant='h5' fontWeight='bold'>
                          Field of Research
                        </Typography>
                        <Typography  variant='body1'>{experiment?.forCode.name}</Typography>
                        <Typography style={{ color: '#cc0808',}} mt={2} variant='h5' fontWeight='bold'>
                          FOR Classification
                        </Typography>
                        <Typography variant='body1'>{experiment?.forCode.code}</Typography>
                      </Link>
                      <Link href={`/seoCode/${experiment?.seoCode.id}`}>
                        <Typography style={{ color: '#cc0808',}} mt={2} variant='h5' fontWeight='bold'>
                          Socio-Economic Objective
                        </Typography>
                        <Typography  variant='body1'>{experiment?.seoCode.name}</Typography>
                        <Typography style={{ color: '#cc0808',}} mt={2} variant='h5' fontWeight='bold'>
                          SEO Classification
                        </Typography>
                        <Typography  variant='body1'>{experiment?.seoCode.code}</Typography>
                      </Link>
                    </Card>
                  </Grid>
                </Grid>
                <ColoredLine/>
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{ p: 2, mt: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}>
                  <Typography style={{ color: '#cc0808',}} variant='h5' fontWeight='bold'>
                    Researchers
                  </Typography>
                  {experiment?.people.map((person, i) => (
                    <Box key={i} mb={2}>
                      <Typography variant={'body1'} fontWeight='bold'>
                        {`${person.person.firstName} ${person.person.familyName}`}
                      </Typography>
                      <Typography variant={'body2'}>{`${person.role.name}`}</Typography>
                      <Typography variant={'body2'}>{`${person.person.affiliation}`}</Typography>
                      <Typography
                        variant={'body2'}
                      >{`${person.person.city}, ${person.person.state}, ${person.person.country}`}</Typography>
                    </Box>
                  ))}
                  <Typography style={{ color: '#cc0808',}} variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Lead Institution
                  </Typography>
                  <Typography variant='body1'>{experiment?.leadInstitution}</Typography>
                </Card>
                <ColoredLine/>
              </Grid>
              <Grid item xs={12}>
                <Card
                    sx={{ p: 2, mt: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                >
                  <Typography style={{ color: '#cc0808',}} variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Type of Activity (ToA)
                  </Typography>
                  <Typography variant='body1'>{experiment?.toa}</Typography>
                  <Typography style={{ color: '#cc0808',}} variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Experiment Aim
                  </Typography>
                  <Typography variant='body1'>{experiment?.experimentAim}</Typography>
                  <Typography style={{ color: '#cc0808',}} variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                    Experiment Objective
                  </Typography>
                  <Typography variant='body1'>{experiment?.experimentObjective}</Typography>
                  {experiment?.experimentAttachments && experiment?.experimentAttachments.length > 0 && (
                    <>
                      <Typography variant='h5' fontWeight='bold' sx={{ mt: 2 }}>
                        Experiment Attachments
                      </Typography>
                      <Box display='flex' flexWrap='wrap'>
                        {experiment.experimentAttachments.map((attachment) =>
                          attachment.mediaType.includes('image') ? (
                            <Box
                              m={2}
                              ml={0}
                              key={attachment.id}
                              sx={{ position: 'relative', width: '10rem', height: '12rem' }}
                              display='flex'
                              flexDirection='column'
                              justifyContent='flex-start'
                            >
                              <Link
                                href={`${BACKEND_URL}/images/${attachment.filename}`}
                                target='_blank'
                                rel='noreferrer noopener'
                              >
                                <Paper
                                  variant='outlined'
                                  component='img'
                                  sx={{
                                    width: '10rem',
                                    height: '10rem',
                                    objectFit: 'cover',
                                  }}
                                  alt='Attachment Image'
                                  src={`${BACKEND_URL}/images/${attachment.filename}`}
                                />
                                <Typography whiteSpace='nowrap' textOverflow='ellipsis' sx={{ overflow: 'hidden' }}>
                                  {`${attachment.filename.substring(attachment.filename.indexOf('DT') + 2)}`}
                                </Typography>
                              </Link>
                            </Box>
                          ) : (
                            <Box
                              m={2}
                              ml={0}
                              key={attachment.id}
                              sx={{ position: 'relative', width: '10rem', height: '12rem' }}
                              display='flex'
                              flexDirection='column'
                              justifyContent='flex-start'
                            >
                              <Link
                                href={`${BACKEND_URL}/documents/${attachment.filename}`}
                                target='_blank'
                                rel='noreferrer'
                              >
                                <Paper
                                  variant='outlined'
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '10rem',
                                    height: '10rem',
                                  }}
                                >
                                  <PictureAsPdfRounded fontSize='large' color='secondary' />
                                </Paper>
                                <Typography
                                  whiteSpace='nowrap'
                                  textOverflow='ellipsis'
                                  sx={{ overflow: 'hidden' }}
                                  py={1}
                                >
                                  {`${attachment.filename.substring(attachment.filename.indexOf('DT') + 2)}`}
                                </Typography>
                              </Link>
                            </Box>
                          ),
                        )}
                      </Box>
                    </>
                  )}
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      )}
    </>
  );
}
