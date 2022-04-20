import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import React, {ReactNode, useEffect, useState} from 'react';
import { Experiment, isPlatform, isResultType, ResultType, SearchResponse, SearchState } from '../../types';
import CircularProgress from '@mui/material/CircularProgress';
import { useMutation } from 'react-query';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import api from '../../util/api';
import { AxiosResponse } from 'axios';
import AdvancedSearch from '../../components/AdvancedSearch';
import { platform } from 'os';
import ExperimentResult from '../../components/Results/ExperimentResult';

export default function SearchResults() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const searchState: SearchState = { resultType: '', platform: '' };
  const params = new URLSearchParams(location.search);
  let results;

  // Validate URL params
  // TODO: Validate date (startDate < endDate)
  params.forEach((value: string | undefined, key: string) => {
    const isValidPlatform = key === 'platform' && isPlatform(value) && searchState.resultType === ResultType.MISSION;
    const isValidResultType = key === 'resultType' && isResultType(value);
    if (key === 'string' || isValidResultType || isValidPlatform) {
      searchState[key] = value;
    }
  });

  const { data, isLoading, mutate } = useMutation<AxiosResponse<SearchResponse>>('search', () => {
    return api.get('/search/advanced', {
      params: params,
    });
  });

  useEffect(() => {
    mutate();
  }, [location, mutate]);

  let resultsElement: ReactNode = null;
  if(isLoading) {
    resultsElement = (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
    );
  }
  else if (data && data?.data.results.length != 0) {
    results = data.data.results;
    console.log(results);
    if(searchState.resultType === ResultType.EXPERIMENT) {
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
    }
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
      <Header />
      <Grid container direction='row' wrap='nowrap' flexGrow={1}>
        <AdvancedSearch {...searchState} container item md={3} />
        <Grid container item direction='column'>
          {resultsElement}
        </Grid>
      </Grid>
    </Grid>
  );
}
