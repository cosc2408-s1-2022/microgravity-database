import { Box, Card, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getSeoCode } from '../../util/apiCalls';
import { SeoCodeResult } from '../../util/types';
import ExperimentPaper from '../../components/ExperimentPaper';

export default function ViewSeoCode() {
  const id = useParams().id as unknown as string;
  const [seoCode, setSeoCode] = useState<SeoCodeResult>();
  const { data, isSuccess, isLoading } = useQuery(['seoCode', id], ({ queryKey }) => {
    const [, id] = queryKey;
    return getSeoCode({ id });
  });

  useEffect(() => {
    if (isSuccess && data) {
      setSeoCode(data);
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
                  Socio-Economic Objective (SEO) classification
                </Typography>
                <Box display='inline-flex' alignItems='center'>
                  <Typography variant='body1' sx={{ pr: 1 }}>
                    {seoCode?.code}
                  </Typography>
                </Box>
                <Box display='inline-flex' alignItems='center'>
                  <Typography variant='h6' sx={{ pr: 1 }}>
                    Socio-Economic Objective (SEO) name
                  </Typography>
                </Box>
                <Box display='inline-flex' alignItems='center'>
                  <Typography variant='body1' sx={{ pr: 1 }}>
                    {seoCode?.name}
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
                {seoCode?.experiments && seoCode?.experiments.length > 0 ? (
                  seoCode.experiments.map((e) => <ExperimentPaper experiment={e} key={e.id} />)
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
