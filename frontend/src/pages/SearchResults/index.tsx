import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Pagination,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import React, { useEffect, useState } from 'react';
import FormField from '../../components/FormField';
import { SearchResponse, SearchState } from '../../types';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from 'react-query';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import api from '../../util/api';
import { AxiosResponse } from 'axios';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchResults() {
  const { state } = useLocation() as { state: SearchState };
  const [searchString, setSearchString] = useState(state.searchString);
  const [page, setPage] = useState(1);

  const params = new URLSearchParams();
  params.append('string', searchString);
  params.append('page', `${page}`);

  const { data, isLoading, mutate } = useMutation<AxiosResponse<SearchResponse>>('search', () => {
    return api.get('/search', {
      params: params,
    });
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutate();
  };

  return (
    <>
      <NavBar />
      <Container>
        <Grid
          container
          item
          component='form'
          onSubmit={handleSubmit}
          direction='row'
          justifyContent='center'
          alignItems='center'
          mt='35px'
        >
          <Grid item md={6}>
            <FormField
              id='search'
              label='Search'
              type='search'
              variant='outlined'
              size='small'
              sx={{ width: '100%' }}
              name='searchString'
              value={searchString}
              onChange={setSearchString}
            />
          </Grid>
          <Grid item>
            <Button type='submit' variant='contained' color='primary' style={{ padding: '8px', marginLeft: '15px' }}>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
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
                  <Link component={RouterLink} to={`/experiment/${experiment.id}`} state={{ experiment: experiment }}>
                    Learn More
                  </Link>
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
