import { Box, Grid, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  Experiment,
  ForCode,
  isPlatform,
  isResultType,
  Mission,
  Platform,
  ResultType,
  SearchResponse,
  SearchState,
  SeoCode,
} from '../../util/types';
import CircularProgress from '@mui/material/CircularProgress';
import { useQuery } from 'react-query';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import api from '../../util/api';
import { AxiosResponse } from 'axios';
import AdvancedSearch from '../../components/AdvancedSearch';
import ExperimentResult from '../../components/Results/Experiment/ExperimentResult';
import MissionResult from '../../components/Results/Mission/MissionResult';
import SeoCodeResult from '../../components/Results/SeoCode';
import ForCodeResult from '../../components/Results/ForCode';

export default function AdvancedSearchPage() {
  const location = useLocation();
  // TODO Handling Pagination @Matt
  const [page, setPage] = useState(1);

  const searchState: SearchState = { resultType: ResultType.EXPERIMENT, platform: Platform.SPACE_STATION };
  const params = new URLSearchParams(location.search);
  let results: Experiment[] | Mission[] | ForCode[] | SeoCode[];

  // Validate URL params
  // TODO: Validate date (startDate < endDate)
  params.forEach((value: string | undefined, key: string) => {
    const isValidKey = key === 'string' || key === 'startDate' || key === 'endDate';
    const isValidPlatform = key === 'platform' && isPlatform(value);
    const isValidResultType = key === 'resultType' && isResultType(value);

    if (isValidKey || isValidResultType || isValidPlatform) {
      searchState[key] = value;
    }
  });

  const { data, isLoading, refetch } = useQuery<AxiosResponse<SearchResponse>>(
    ['search', searchState],
    ({ queryKey }) => {
      const [, searchState] = queryKey;
      return api.get('/search/advanced', {
        params: searchState,
      });
    },
    { enabled: false },
  );

  useEffect(() => {
    refetch();
  }, [refetch, location.search]);

  let resultsElement: ReactNode = null;
  if (isLoading) {
    resultsElement = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (data && data?.data.results.length != 0) {
    if (searchState.resultType === ResultType.EXPERIMENT) {
      results = data.data.results as Experiment[];
      resultsElement = results.map((item: Experiment, index) => {
        return (
          <ExperimentResult
            key={item.id}
            id={item.id}
            objective={item.experimentObjective}
            title={item.title}
            people={item.people}
            mission={item.mission}
            bgcolor={index % 2 === 0 ? '#F0F0F0' : '#FFFFFF'}
          />
        );
      });
    } else if (searchState.resultType === ResultType.MISSION) {
      results = data.data.results as Mission[];
      resultsElement = results.map((item: Mission, index) => {
        return (
          <MissionResult
            key={item.id}
            id={item.id}
            name={item.name}
            startDate={item.startDateString}
            endDate={item.endDateString}
            launchDate={item.launchDate as unknown as string}
            bgcolor={index % 2 === 0 ? '#F0F0F0' : '#FFFFFF'}
          />
        );
      });
    } else if (searchState.resultType === ResultType.FOR_CODE) {
      results = data.data.results as unknown as ForCode[];
      resultsElement = results.map((item: ForCode, index) => {
        return (
          <ForCodeResult
            key={item.id}
            id={item.id}
            code={item.code}
            name={item.name}
            bgcolor={index % 2 === 0 ? '#F0F0F0' : '#FFFFFF'}
          />
        );
      });
    } else if (searchState.resultType === ResultType.SEO_CODE) {
      results = data.data.results as unknown as SeoCode[];
      resultsElement = results.map((item: SeoCode, index) => {
        return (
          <SeoCodeResult
            key={item.id}
            id={item.id}
            code={item.code}
            name={item.name}
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

  // TODO Handling Pagination @Matt
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Grid container direction='column' height='100vh' wrap='nowrap'>
      <NavBar />
      <Grid container direction='row' wrap='nowrap' flexGrow={1}>
        <AdvancedSearch {...searchState} container item md={3} />
        <Grid container item direction='column'>
          {resultsElement}
        </Grid>
      </Grid>
    </Grid>
  );
}
