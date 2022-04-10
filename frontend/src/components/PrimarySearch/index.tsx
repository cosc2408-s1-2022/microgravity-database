import { Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormField from '../FormField';
import { SearchState } from '../../types';

export default function PrimarySearch(props: SearchState) {
  const [searchString, setSearchString] = useState('');
  const [hasSubmit, setHasSubmit] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmit(true);
  };

  if (hasSubmit) {
    return <Navigate to='/searchResults' state={{ searchString: searchString }} />;
  }

  return (
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
          value={searchString ? searchString : props.searchString}
          onChange={setSearchString}
        />
      </Grid>
      <Grid item>
        <Button type='submit' variant='contained' color='secondary' style={{ padding: '8px', marginLeft: '15px' }}>
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
