import { Box, Card, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getSeoCode } from '../../util/apiCalls';
import { SeoCode } from '../../util/types';
import ExperimentPaper from '../../components/ExperimentPaper';

export default function ViewSeoCode() {
  const id = useParams().id as unknown as string;
  const [seoCode, setSeoCode] = useState<SeoCode>();
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
        <Container maxWidth='md'>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 2,
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
            }}
          >
            <Typography variant='h4' fontWeight='bold'>
              {seoCode?.name}
            </Typography>
            <Box display='inline-flex' alignItems='center'>
              <Typography variant='h6' sx={{ pr: 1 }}>
                Socio-Economic Objective Classification
              </Typography>
            </Box>
            <Box display='inline-flex' alignItems='center'>
              <Typography variant='body1' sx={{ pr: 1 }}>
                {seoCode?.code}
              </Typography>
            </Box>
          </Card>
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              p: 2,
              mt: 2,
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
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
        </Container>
      )}
    </>
  );
}
