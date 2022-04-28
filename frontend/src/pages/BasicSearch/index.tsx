import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
import { Experiment, SearchResponse } from '../../util/types';
import api from '../../util/api';
import React, { ReactNode, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Pagination, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import NavBar from '../../components/NavBar';
import ExperimentResult from '../../components/Results/Experiment';

export default function BasicSearchPage() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const params = new URLSearchParams(location.search);
  let results: Experiment[];

  const { data, isLoading, refetch } = useQuery<AxiosResponse<SearchResponse>>(
    'search',
    () => {
      return api.get('/search/', {
        params: { string: params.get('string'), page: page },
      });
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [refetch, location.search, page]);

  let resultsElement: ReactNode;
  let pages = 1;
  if (isLoading) {
    resultsElement = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (data && data?.data.results.length != 0) {
    results = data.data.results as Experiment[];
    pages = data.data.totalPages;
    resultsElement = results.map((item: Experiment, index) => {
      return (
        <ExperimentResult
          key={item.id}
          id={item.id}
          title={item.title}
          objective={item.experimentObjective}
          people={item.people}
          mission={item.mission}
          bgcolor={index % 2 === 0 ? '#F0F0F0' : '#FFFFFF'}
        />
      );
    });
  } else {
    resultsElement = (
      <Grid container direction='column' justifyContent='center' alignItems='center' flexGrow={1}>
        <SentimentVeryDissatisfiedIcon />
        <Typography variant='h6'>Sorry! Nothing found.</Typography>
      </Grid>
    );
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid container direction='column' height='100vh' wrap='nowrap'>
      <NavBar />
      <Grid container direction='column' alignSelf='center' alignItems='center'>
        {resultsElement}
        {pages > 1 ? (
          <Grid item my={2}>
            <Pagination count={pages} onChange={handlePageChange} />
          </Grid>
        ) : null}
      </Grid>
    </Grid>
  );
}
