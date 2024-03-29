import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import React, { ReactNode, useEffect, useState } from 'react';
import {
  Experiment,
  ForCode,
  isPlatform,
  isResultType,
  Mission,
  Platforms,
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
import ExperimentResult from '../../components/Results/Experiment';
import MissionResult from '../../components/Results/Mission';
import SeoCodeResult from '../../components/Results/SeoCode';
import ForCodeResult from '../../components/Results/ForCode';

export default function AdvancedSearchPage() {
  const location = useLocation();
  const [page, setPage] = useState(1);

  const searchState: SearchState = { resultType: ResultType.MISSION, platform: Platforms.SPACE_STATION, page: page };
  const params = new URLSearchParams(location.search);
  let results: Experiment[] | Mission[] | ForCode[] | SeoCode[];

  // Validate URL params
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
  }, [refetch, location.search, page]);

  let resultsElement: ReactNode = null;
  let pages = 1;

  if (isLoading) {
    resultsElement = (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
      </Box>
    );
  } else if (data && data?.data.results.length !== 0) {
    pages = data.data.totalPages;
    if (searchState.resultType === ResultType.EXPERIMENT) {
      results = data.data.results as Experiment[];
      resultsElement = results.map((item: Experiment, index) => {
        return (
          <ExperimentResult
            key={item.id}
            id={item.id.toString()}
            objective={item.experimentObjectives}
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
            id={item.id.toString()}
            name={item.name}
            startDate={item.startDate}
            endDate={item.endDate}
            launchDate={item.launchDate}
            experimentCount={item.experiments.length}
            platform={item.platform}
            bgcolor={index % 2 === 0 ? '#F0F0F0' : '#FFFFFF'}
          />
        );
      });
    } else if (searchState.resultType === ResultType.FOR_CODE) {
      results = data.data.results as ForCode[];
      resultsElement = results.map((item: ForCode, index) => {
        return <ForCodeResult key={item.id} forCode={item} bgcolor={index % 2 === 0 ? '#F0F0F0' : '#FFFFFF'} />;
      });
    } else if (searchState.resultType === ResultType.SEO_CODE) {
      results = data.data.results as SeoCode[];
      resultsElement = results.map((item: SeoCode, index) => {
        return <SeoCodeResult key={item.id} seoCode={item} bgcolor={index % 2 === 0 ? '#F0F0F0' : '#FFFFFF'} />;
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

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Container maxWidth='lg'>
      <Grid container direction='column' height='100vh' wrap='nowrap'>
        <Grid container item direction='row' wrap='nowrap' flexGrow={1} xs={12}>
          <AdvancedSearch searchState={searchState} container item md={4} xs={6} />
          <Grid container item direction='column' alignItems='center' md={8} xs={6}>
            {resultsElement}
            {pages > 1 ? (
              <Grid item my={2}>
                <Pagination
                  count={pages}
                  variant='outlined'
                  shape='rounded'
                  color='secondary'
                  siblingCount={0}
                  page={page}
                  onChange={handlePageChange}
                />
              </Grid>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
