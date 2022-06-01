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
import ColoredLine from '../../components/ColoredLine';

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
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography variant='h4' fontWeight='bold' mb={3}>
                  {experiment?.title}
                  <ColoredLine />
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
                        <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold' pr={1}>
                          Mission
                        </Typography>
                        <Typography variant='body1'>{`${experiment?.mission.name} (${moment(
                          experiment?.mission.launchDate,
                        ).year()})`}</Typography>
                      </Link>
                      <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold' pr={1} mt={3}>
                        Platform
                      </Typography>
                      <Typography variant='body1'>{lodash(experiment?.platform.name).startCase()}</Typography>
                      <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold' pr={1} mt={3}>
                        Activity
                      </Typography>
                      <Typography variant='body1'>{experiment?.activity.name}</Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={6} display='flex'>
                    {experiment?.activity.name === 'Scientific Research' ? (
                      <Card
                        sx={{
                          p: 2,
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                      >
                        <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold'>
                          Type of Activity (ToA)
                        </Typography>
                        <Typography variant='body1'>{experiment?.toa?.name}</Typography>
                        <Link href={`/forCode/${experiment?.forCode?.id}`}>
                          <Typography style={{ color: '#cc0808' }} mt={3} variant='h5' fontWeight='bold'>
                            Field of Research (FoR)
                          </Typography>
                          <Typography variant='body1'>{`${experiment?.forCode?.code} ${experiment?.forCode?.name}`}</Typography>
                        </Link>
                        <Link href={`/seoCode/${experiment?.seoCode?.id}`}>
                          <Typography style={{ color: '#cc0808' }} mt={3} variant='h5' fontWeight='bold'>
                            Socio-Economic Objective (SEO)
                          </Typography>
                          <Typography variant='body1'>{`${experiment?.seoCode?.code} ${experiment?.seoCode?.name}`}</Typography>
                        </Link>
                      </Card>
                    ) : experiment?.activity.name === 'Industry' ? (
                      <Card
                        sx={{
                          p: 2,
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                      >
                        <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold'>
                          Spacecraft
                        </Typography>
                        <Typography variant='body1'>{experiment?.spacecraft}</Typography>
                        <Typography style={{ color: '#cc0808' }} mt={2} variant='h5' fontWeight='bold'>
                          Subsystem
                        </Typography>
                        <Typography variant='body1'>{experiment?.subsystem?.name}</Typography>
                        <Typography style={{ color: '#cc0808' }} mt={2} variant='h5' fontWeight='bold'>
                          Payload
                        </Typography>
                        <Typography variant='body1'>{experiment?.payload}</Typography>
                      </Card>
                    ) : experiment?.activity.name === 'Human Spaceflight' ? (
                      <Card
                        sx={{
                          p: 2,
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                        }}
                      >
                        <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold'>
                          Number of Test Subjects
                        </Typography>
                        <Typography variant='body1'>{experiment?.testSubjectCount}</Typography>
                        <Typography style={{ color: '#cc0808' }} mt={3} variant='h5' fontWeight='bold'>
                          Area
                        </Typography>
                        <Typography variant='body1'>{experiment?.area?.name}</Typography>
                        <Typography style={{ color: '#cc0808' }} mt={3} variant='h5' fontWeight='bold'>
                          Test Subject Type
                        </Typography>
                        <Typography variant='body1'>{experiment?.testSubjectType?.name}</Typography>
                      </Card>
                    ) : undefined}
                  </Grid>
                </Grid>
                <ColoredLine />
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{ p: 2, mt: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                >
                  <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold'>
                    Researchers
                  </Typography>
                  {experiment?.people && experiment?.people.length ? (
                    <Grid container spacing={2}>
                      {experiment?.people.map((person, i) => (
                        <Grid item xs={4} key={i}>
                          <Typography variant={'body1'} fontWeight='bold'>
                            {`${person.person.firstName} ${person.person.familyName}`}
                          </Typography>
                          <Typography variant={'body2'}>{`${person.role.name}`}</Typography>
                          <Typography variant={'body2'}>{`${person.person.affiliation}`}</Typography>
                          <Typography
                            variant={'body2'}
                          >{`${person.person.city}, ${person.person.state}, ${person.person.country}`}</Typography>
                          <Box display='inline-flex'>
                            <Box mr={0.5}>
                              {person.person.email && (
                                <Typography variant={'body2'} fontWeight='bold'>
                                  Email:
                                </Typography>
                              )}
                              {person.person.phone && (
                                <Typography variant={'body2'} fontWeight='bold'>
                                  Phone:
                                </Typography>
                              )}
                            </Box>
                            <Box>
                              {person.person.email && (
                                <Typography variant={'body2'}>{`${person.person.email}`}</Typography>
                              )}
                              {person.person.phone && (
                                <Typography variant={'body2'}>{`${person.person.phone}`}</Typography>
                              )}
                            </Box>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant='body1'>None found.</Typography>
                  )}
                  <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold' mt={3}>
                    Lead Institution
                  </Typography>
                  <Typography variant='body1'>{experiment?.leadInstitution || 'Not specified.'}</Typography>
                </Card>
                <ColoredLine />
              </Grid>
              <Grid item xs={12}>
                <Card
                  sx={{ p: 2, mt: 3, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
                >
                  <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold'>
                    Experiment Objectives
                  </Typography>
                  <Typography variant='body1'>{experiment?.experimentObjectives || 'Not specified.'}</Typography>
                  <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold' mt={3}>
                    Experiment Publications
                  </Typography>
                  {experiment?.publications && experiment?.publications.length > 0 ? (
                    experiment.publications.map((publication, i) => (
                      <Box display='flex' key={i}>
                        <Box mr={1}>
                          <Typography sx={{ display: 'inline' }} variant='body2'>{`[${i + 1}]`}</Typography>
                        </Box>
                        <Box>
                          {publication.authors &&
                            publication.authors.length > 0 &&
                            publication.authors.map((person, i) => (
                              <Typography sx={{ display: 'inline' }} key={i} variant='body2' fontWeight='bold'>
                                {`${person.firstName.at(0)}. ${person.lastName}, `}
                              </Typography>
                            ))}
                          <Typography sx={{ display: 'inline' }} variant={'body2'}>
                            {`(${publication.yearPublished}), "${publication.title}", `}
                          </Typography>
                          <Typography sx={{ display: 'inline', fontStyle: 'italic' }} variant={'body2'}>
                            {`${publication.journal}, ${publication.volumeNumber}, `}
                          </Typography>
                          <Typography sx={{ display: 'inline' }} variant={'body2'}>
                            {`${publication.issueNumber}, DOI: ${publication.doi}, pp. ${publication.pagesUsed}.`}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  ) : (
                    <Typography variant='body1'>None found.</Typography>
                  )}
                  <Typography style={{ color: '#cc0808' }} variant='h5' fontWeight='bold' mt={3}>
                    Experiment Attachments
                  </Typography>
                  {experiment?.attachments && experiment?.attachments.length > 0 ? (
                    <Box display='flex' flexWrap='wrap'>
                      {experiment.attachments.map((attachment) =>
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
                  ) : (
                    <Typography variant='body1'>None found.</Typography>
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
