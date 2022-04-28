import { Box, Card, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { ForCodeResult } from '../../util/types';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getForCode } from '../../util/apiCalls';
import ExperimentPaper from '../../components/ExperimentPaper';

export default function ViewForCode() {
  const id = useParams().id as unknown as string;
  const [forCode, setForCode] = useState<ForCodeResult>();
  const { data, isSuccess, isLoading } = useQuery(['forCode', id], ({ queryKey }) => {
    const [, id] = queryKey;
    return getForCode({ id });
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
          <Container maxWidth='md' sx={{ my: 4 }}>
            <Card
              elevation={2}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                p: 2,
              }}
            >
              <Card
                elevation={24}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 2,
                }}
              >
                <Typography variant='h5' fontWeight='bold'>
                  Fields of Research (FoR) Classification{' '}
                </Typography>
                <Box display='inline-flex' alignItems='center'>
                  <Typography variant='body1' sx={{ pr: 1 }}>
                    {forCode?.code}
                  </Typography>
                </Box>
                <Box display='inline-flex' alignItems='center'>
                  <Typography variant='h6' sx={{ pr: 1 }}>
                    Fields of Research (FoR) Name
                  </Typography>
                </Box>
                <Box display='inline-flex' alignItems='center'>
                  <Typography variant='body1' sx={{ pr: 1 }}>
                    {forCode?.name}
                  </Typography>
                </Box>
              </Card>
              <Card
                elevation={24}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: 2,
                  mt: 2,
                }}
              >
                <Box display='inline-flex' alignItems='center'>
                  <Typography variant='h5' fontWeight='bold' sx={{ pr: 1 }}>
                    Experiments
                  </Typography>
                </Box>
                {forCode?.experiments && forCode?.experiments.length > 0 ? (
                  forCode.experiments.map((e) => <ExperimentPaper experiment={e} key={e.id} />)
                ) : (
                  <Typography>None yet.</Typography>
                )}
              </Card>
            </Card>
          </Container>
        </>
      )}
    </>
  );
}
