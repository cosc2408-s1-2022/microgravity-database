import { Button, Grid, GridProps, MenuItem } from '@mui/material';
import { Platform, ResultType, SearchState } from '../../types';
import React, { useState } from 'react';
import FormField from '../FormField';
import { useNavigate } from 'react-router-dom';
import DateElement from './DateElement';
import moment from 'moment';
import SelectElement from './SelectElement';

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    Object.entries(state).forEach((e) => {
      if (typeof e[1] === 'string' && e[1] !== '') {
        params.append(e[0], e[1]);
      }
    });
    navigate(`/search?${params.toString()}`);
  };


  const handleClear = () => {
    handleSearchStringChange(undefined);
    handleResultTypeChange('');
    handlePlatformChange('');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <Grid {...props} bgcolor='primary.light'>
      <Grid component='form' onSubmit={handleSubmit} container item direction='column' padding={5} spacing={3}>
        <Grid item>
          <FormField value={string} name='searchString' label='Keyword(s)' onChange={handleSearchStringChange} />
        </Grid>

        <SelectElement name='resultType' label='Result Type' value={resultType} callback={handleResultTypeChange}>
          <MenuItem value={ResultType.EXPERIMENT}>Experiment</MenuItem>
          <MenuItem value={ResultType.MISSION}>Mission</MenuItem>
        </SelectElement>

        {resultType === ResultType.MISSION ? (
            <SelectElement name='platform' label='Platform' value={platform} callback={handlePlatformChange}>
              <MenuItem value={Platform.SPACE_STATION}>Space Station</MenuItem>
              <MenuItem value={Platform.SPACE_SHUTTLE}>Space Shuttle</MenuItem>
              <MenuItem value={Platform.RETRIEVABLE_CAPSULE}>Retrievable Capsule</MenuItem>
              <MenuItem value={Platform.SOUNDING_ROCKET}>Sounding Rocket</MenuItem>
              <MenuItem value={Platform.PARABOLIC_FLIGHT}>Parabolic Flight</MenuItem>
              <MenuItem value={Platform.GROUND_BASED_FACILITY}>Ground Based Facility</MenuItem>
            </SelectElement>
          ) : null}

        {resultType === ResultType.MISSION ? (
            <DateElement label='Start Date' value={startDate} callback={setStartDate} />
          ) : null}

        {resultType === ResultType.MISSION ? (
            <DateElement label='End Date' value={endDate} min={moment(startDate)} callback={setEndDate} />
          ) : null}

        <Grid container item justifyContent='space-between'>
          <Button type='submit' variant='contained' color='secondary'>
            Refine Search
          </Button>
          <Button onClick={handleClear} color='secondary'>
            Clear
          </Button>
        </Grid>

      </Grid>
    </Grid>
  );
}
