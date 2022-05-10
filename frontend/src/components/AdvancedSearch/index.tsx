import { Button, Grid, GridProps, MenuItem } from '@mui/material';
import { Platforms, ResultType, SearchState } from '../../util/types';
import React, { useState } from 'react';
import FormField from '../FormField';
import { useNavigate } from 'react-router-dom';
import DateElement from './DateElement';
import moment from 'moment';
import SelectElement from './SelectElement';

interface AdvSearchProps extends GridProps {
  searchState: SearchState;
}

export default function AdvancedSearch({ searchState, ...gridProps }: AdvSearchProps) {
  const navigate = useNavigate();

  const [string, handleSearchStringChange] = useState(searchState.string);
  const [resultType, handleResultTypeChange] = useState(searchState.resultType);
  const [platform, handlePlatformChange] = useState(searchState.platform);
  const [startDate, setStartDate] = useState(searchState.startDate);
  const [endDate, setEndDate] = useState(searchState.endDate);

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
    navigate(`/search/advanced?${params.toString()}`);
  };

  const handleReset = () => {
    handleSearchStringChange('');
    handleResultTypeChange(ResultType.EXPERIMENT);
    handlePlatformChange(Platforms.SPACE_STATION);
    setStartDate('');
    setEndDate('');
    navigate(`/search/advanced`);
  };

  return (
    <Grid {...gridProps} bgcolor='primary.light'>
      <Grid component='form' onSubmit={handleSubmit} container item direction='column' padding={5} spacing={3}>
        <Grid item>
          <FormField value={string} name='searchString' label='Keyword(s)' onChange={handleSearchStringChange} />
        </Grid>

        <SelectElement name='resultType' label='Result Type' value={resultType} callback={handleResultTypeChange}>
          <MenuItem value={ResultType.EXPERIMENT}>Experiment</MenuItem>
          <MenuItem value={ResultType.MISSION}>Mission</MenuItem>
          <MenuItem value={ResultType.FOR_CODE}>FOR Code</MenuItem>
          <MenuItem value={ResultType.SEO_CODE}>SEO Code</MenuItem>
        </SelectElement>

        <SelectElement name='platform' label='Platform' value={platform} callback={handlePlatformChange}>
          <MenuItem value={Platforms.SPACE_STATION}>Space Station</MenuItem>
          <MenuItem value={Platforms.SPACE_SHUTTLE}>Space Shuttle</MenuItem>
          <MenuItem value={Platforms.RETRIEVABLE_CAPSULE}>Retrievable Capsule</MenuItem>
          <MenuItem value={Platforms.SOUNDING_ROCKET}>Sounding Rocket</MenuItem>
          <MenuItem value={Platforms.PARABOLIC_FLIGHT}>Parabolic Flight</MenuItem>
          <MenuItem value={Platforms.GROUND_BASED_FACILITY}>Ground Based Facility</MenuItem>
        </SelectElement>

        <DateElement
          disabled={resultType !== ResultType.MISSION}
          label='Start Date'
          value={startDate}
          callback={setStartDate}
        />
        <DateElement
          disabled={resultType !== ResultType.MISSION}
          label='End Date'
          value={endDate}
          min={moment(startDate)}
          callback={setEndDate}
        />

        <Grid container item justifyContent='space-between'>
          <Button fullWidth type='submit' variant='contained'>
            Refine Search
          </Button>
          <Button sx={{ mt: 2 }} fullWidth onClick={handleReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
