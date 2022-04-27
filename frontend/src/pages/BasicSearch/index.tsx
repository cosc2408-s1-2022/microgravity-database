import { useMutation } from 'react-query';
import { AxiosResponse } from 'axios';
import { Experiment, ResultType, SearchResponse } from '../../types';
import api from '../../util/api';
import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Grid, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ExperimentResult from '../../components/Results/ExperimentResult';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import NavBar from '../../components/NavBar';

export default function BasicSearchPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let results;

  const { data, isLoading, mutate } = useMutation<AxiosResponse<SearchResponse>>('search', () => {
    return api.get('/search', {
      params: params,
    });
  });

  useEffect(() => {
    mutate();
  }, [location, mutate]);

  let resultsElement: ReactNode = null;
  if (isLoading) {
    resultsElement = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (data && data?.data.results.length != 0) {
    results = data.data.results;
    console.log(results);
    resultsElement = results.map((item: Experiment, index) => {
      return (
        <ExperimentResult
          key={item.id}
          id={item.id}
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

  return (
    <Grid container direction='column' height='100vh' wrap='nowrap'>
      <NavBar />
      <Grid container direction='column' alignSelf='center'>
        {resultsElement}
      </Grid>
    </Grid>
  );
}
