import { Box, Button, Card, CardActions, CardContent, Container, Divider, Pagination, Typography } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import React, { useEffect, useState } from 'react';
import FormField from '../../components/FormField';
import { SearchResponse } from '../../types';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from 'react-query';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import api from '../../util/api';
import { AxiosResponse } from 'axios';

export type SearchState = {
  searchString: string;
};

export default function SearchResults() {
  const { state } = useLocation() as { state: SearchState };
  const [searchString, setSearchString] = useState(state.searchString);
  const [page, setPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const params = new URLSearchParams();
  params.append('string', searchString);
  params.append('page', `${page}`);

  const { data, isLoading, mutate } = useMutation<AxiosResponse<SearchResponse>>('search', () => {
    return api.get('/search', {
      params: params,
    });
  });

  useEffect(() => mutate(), [mutate]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  if (!searchString) {
    return <Navigate to='/home' />;
  }

  return (
    <>
      <Header />
      <Container>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <FormField
            margin='normal'
            fullWidth
            label='Search'
            name='searchString'
            autoComplete='text'
            value={searchString}
            onChange={setSearchString}
          />
        </Box>
        <Divider sx={{ mt: '2rem', mb: '1.5rem' }} variant='middle' />
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
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            ))}
            <Pagination sx={{ mb: '2rem' }} count={data?.data.totalPages} shape='rounded' onChange={handlePageChange} />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <SentimentVeryDissatisfiedIcon />
            <Typography variant='h6'>Sorry! Nothing found.</Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
