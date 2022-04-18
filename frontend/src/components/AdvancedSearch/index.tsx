import { Button, Grid, GridProps, MenuItem } from '@mui/material';
import { Platform, ResultType, SearchState } from '../../types';
import React, { useState } from 'react';
import FormField from '../FormField';
import { useNavigate } from 'react-router-dom';
import DateElement from './DateElement';

export default function AdvancedSearch(props: SearchState | GridProps) {
  const searchProps = props as SearchState;
  const navigate = useNavigate();

  const [string, handleSearchStringChange] = useState(searchProps.string);
  const [resultType, handleResultTypeChange] = useState(searchProps.resultType);
  const [platform, handlePlatformChange] = useState(searchProps.platform);
  const [startDate, setStartDate] = useState(searchProps.startDate);
  const [endDate, setEndDate] = useState(searchProps.endDate);

  const state = {
    string: string,
    resultType: resultType,
    startDate: startDate,
    endDate: endDate,
    platform: platform,
  };

  console.log(state);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    Object.entries(state).forEach((e) => {
      if (typeof e[1] === 'string') {
        params.append(e[0], e[1]);
      }
    });
    navigate(`/search?${params.toString()}`);
  };

  // TODO: Add clear button to search fields
  return (
    <Grid {...props} bgcolor='primary.light'>
      <Grid component='form' onSubmit={handleSubmit} container item direction='column' padding={5} spacing={3}>
        <Grid item>
          <FormField defaultValue={string} name='searchString' label='Keyword(s)' onChange={handleSearchStringChange} />
        </Grid>
        <Grid item>
          <FormField select name='platform' label='Platform' value={platform} onChange={handlePlatformChange}>
            <MenuItem value={Platform.SPACE_STATION}>Space Station</MenuItem>
            <MenuItem value={Platform.SPACE_SHUTTLE}>Space Shuttle</MenuItem>
            <MenuItem value={Platform.RETRIEVABLE_CAPSULE}>Retrievable Capsule</MenuItem>
            <MenuItem value={Platform.SOUNDING_ROCKET}>Sounding Rocket</MenuItem>
            <MenuItem value={Platform.PARABOLIC_FLIGHT}>Parabolic Flight</MenuItem>
            <MenuItem value={Platform.GROUND_BASED_FACILITY}>Ground Based Facility</MenuItem>
          </FormField>
        </Grid>
        <Grid item>
          <FormField select name='resultType' label='Result Type' value={resultType} onChange={handleResultTypeChange}>
            <MenuItem value={ResultType.EXPERIMENT}>Experiment</MenuItem>
            <MenuItem value={ResultType.MISSION}>Mission</MenuItem>
          </FormField>
        </Grid>
        {resultType === ResultType.MISSION ? (
          <DateElement label='Start Date' value={startDate} callback={setStartDate} />
        ) : null}
        {resultType === ResultType.MISSION ? (
          <DateElement label='End Date' value={endDate} callback={setEndDate} />
        ) : null}
        <Grid item>
          <Button type='submit' variant='contained' color='secondary' fullWidth>
            Refine Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
