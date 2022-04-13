import { Box, Card, CardActions, CardContent, Grid, Link, Pagination, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import React, { useEffect, useState } from 'react';
import { isPlatform, SearchResponse, SearchState, SearchStateKeys } from '../../types';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from 'react-query';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import api from '../../util/api';
import { AxiosResponse } from 'axios';
import AdvancedSearch from '../../components/AdvancedSearch';
import { platform } from 'os';

export default function SearchResults() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const searchState: SearchState = { string: '' };
  const params = new URLSearchParams(location.search);

  // Validate URL params
  // TODO: Validate date (startDate < endDate)
  params.forEach((value: string | undefined, key: string) => {
    // Set value in state if key, value pair is valid
    const isValidPlatform = key == 'platform' && value && isPlatform(value);
    if (isValidPlatform && SearchStateKeys.includes(key)) {
      searchState[key] = value;
    }
  });

  const { data, isLoading, mutate } = useMutation<AxiosResponse<SearchResponse>>('search', () => {
    return api.get('/search', {
      params: params,
    });
  });

  useEffect(() => {
    mutate();
  }, [location, mutate]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid container direction='column' height='100vh'>
      <Header />
      <Grid container direction='row' wrap='nowrap' flexGrow={1}>
        <AdvancedSearch {...searchState} container item md={3} />
        <Grid container item direction='column'>
          {isLoading ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          ) : data && data?.data.results.length != 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              {data?.data.results.map((experiment) => (
                <Card key={experiment.id} sx={{ width: '100%', my: '1rem' }}>
                  <CardContent>
                    <Typography color='text.secondary' gutterBottom>
                      {experiment.platform}
                    </Typography>
                    <Typography variant='h5' component='div'>
                      {experiment.title}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                      {experiment.mission}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Link component={RouterLink} to={`/experiment/${experiment.id}`} state={{ experiment: experiment }}>
                      Learn More
                    </Link>
                  </CardActions>
                </Card>
              ))}
              <Pagination
                sx={{ mb: '2rem' }}
                count={data?.data.totalPages}
                shape='rounded'
                onChange={handlePageChange}
              />
            </Box>
          ) : (
            <Grid container direction='column' justifyContent='center' alignItems='center' flexGrow={1}>
              <SentimentVeryDissatisfiedIcon />
              <Typography variant='h6'>Sorry! Nothing found.</Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
