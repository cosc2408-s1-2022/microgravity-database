import { Box, Card, CircularProgress, Container, Grid, Paper, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getSeoCode } from '../../util/apiCalls';
import { SeoCodeResult } from '../../util/types';

export default function ViewSeoCode() {
  const id = useParams().id as unknown as string;
  const [forCode, setForCode] = useState<SeoCodeResult>();
  const { data, isSuccess, isLoading } = useQuery(['seoCode', id], ({ queryKey }) => {
    const [, id] = queryKey;
    return getSeoCode({ id });
  });

  useEffect(() => {
    if (isSuccess && data) {
      setForCode(data);
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
          <Container maxWidth='md'>
            <Paper sx={{ alignItems: 'center', justifyContent: 'center', mt: 3 }}>
              <Grid container display='flex'>
                <Grid item sm={12} display='flex'>
                  <Card
                    sx={{
                      p: 2,
                      m: 2,
                      width: '100%',
                    }}
                  >
                    <Box display='inline-flex' flexDirection='column' sx={{ m: 1.5 }}>
                      <Typography variant='h6' fontWeight='bold'>
                        Fields of Research (FoR) Classification{' '}
                      </Typography>
                      <Typography variant='body1'>{forCode?.code}</Typography>
                    </Box>
                    <Box display='inline-flex' flexDirection='column' sx={{ m: 1.5 }}>
                      <Typography variant='h6' fontWeight='bold'>
                        Fields of Research (FoR) Name{' '}
                      </Typography>
                      <Typography variant='body1'>{forCode?.name}</Typography>
                    </Box>
                  </Card>
                </Grid>
                <Grid item sm={12} display='flex'>
                  <Card
                    sx={{
                      p: 2,
                      m: 2,
                      flexDirection: 'column',
                      width: '100%',
                    }}
                  >
                    <Box display='inline-flex' alignItems='center' flexDirection='column'>
                      <Typography variant='h6' fontWeight='bold'>
                        Experiments
                      </Typography>
                      {forCode?.experiments.map((experiment) => (
                        <Box key={experiment.id} flexDirection='column' alignItems='left'>
                          <Typography variant='body1'>{experiment.title}</Typography>
                          <Typography variant='body1'>{experiment.experimentAim}</Typography>
                          <Typography variant='body1'>{experiment.experimentObjective}</Typography>
                          <Typography variant='body1'>{experiment.experimentPublications}</Typography>
                          <Typography variant='body1'>{experiment.platform.name}</Typography>
                          <Typography variant='body1'>{experiment.leadInstitution}</Typography>
                          <Typography variant='body1'>{experiment.principalInvestigator}</Typography>
                          <Typography variant='body1'>{experiment.toa}</Typography>
                        </Box>
                      ))}
                    </Box>
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
