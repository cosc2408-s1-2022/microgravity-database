import { Button, Grid, GridProps, MenuItem, TextField } from '@mui/material';
import { Platform, SearchState } from '../../types';
import React, { useState } from 'react';
import FormField from '../FormField';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { useNavigate } from 'react-router-dom';

enum DateBound {
  START_DATE,
  END_DATE,
}

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
      if (typeof e[1] === 'string') {
        params.append(e[0], e[1]);
      }
    });
    navigate(`/search?${params.toString()}`);
  };

  const handleDateChange = (date: Moment | null, dateBound: DateBound) => {
    let newDate: string | undefined = undefined;
    if (date) {
      newDate = date.year().toString();
    }

    const setDateFunc = dateBound === DateBound.START_DATE ? setStartDate : setEndDate;
    setDateFunc(newDate);
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
            <MenuItem value={'Experiment'}>Experiment</MenuItem>
          </FormField>
        </Grid>
        <Grid item>
          <DatePicker
            views={['year']}
            label='Start Date'
            value={startDate}
            maxDate={moment()}
            onChange={(e: Moment | null) => handleDateChange(e, DateBound.START_DATE)}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
        </Grid>
        <Grid item>
          <DatePicker
            views={['year']}
            label='End Date'
            value={endDate}
            onChange={(e: Moment | null) => handleDateChange(e, DateBound.END_DATE)}
            minDate={moment(startDate)}
            maxDate={moment()}
            renderInput={(params) => <TextField size='small' {...params} />}
          />
        </Grid>
        <Grid item>
          <Button type='submit' variant='contained' color='secondary' fullWidth>
            Refine Search
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
