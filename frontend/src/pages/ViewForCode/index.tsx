import { Box, Card, CircularProgress, Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
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
              {forCode?.name}
            </Typography>
            <Box display='inline-flex' alignItems='center'>
              <Typography variant='h6' sx={{ pr: 1 }}>
                Field of Research Classification
              </Typography>
            </Box>
            <Box display='inline-flex' alignItems='center'>
              <Typography variant='body1' sx={{ pr: 1 }}>
                {forCode?.code}
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
            {forCode?.experiments && forCode?.experiments.length > 0 ? (
              forCode.experiments.map((e) => <ExperimentPaper experiment={e} key={e.id} />)
            ) : (
              <Typography>None yet.</Typography>
            )}
          </Card>
        </Container>
      )}
    </>
  );
}
