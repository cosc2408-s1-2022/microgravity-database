import { Box, Button, Grid, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import FormField from '../FormField';
import { SearchState } from '../../types';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

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
      component='form'
      onSubmit={handleSubmit}
      direction='row'
      justifyContent='center'
      alignItems='center'
      mt='35px'
      maxWidth={'sm'}
    >
      <Grid item md={12}>
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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
        <Grid item>
          <Button type='submit' variant='contained' color='primary' style={{ padding: '8px', marginLeft: '15px' }}>
            <SearchIcon />
            <Typography variant={'body1'} textTransform={'capitalize'}>
              Search
            </Typography>
          </Button>
        </Grid>
        <Grid item>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            style={{ padding: '8px', marginLeft: '15px' }}
            component={Link}
            to={'/advancedSearch'}
          >
            <ManageSearchIcon />
            <Typography variant={'body1'} textTransform={'capitalize'}>
              {' '}
              Advanced Search
            </Typography>
          </Button>
        </Grid>
      </Box>
    </Grid>
  );
}
