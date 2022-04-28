import { Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormField from '../FormField';

export default function PrimarySearch() {
  const [string, setString] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();
    params.append('string', string);
    params.append('page', '1');
    navigate(`/search?${params.toString()}`);
  };

  return (
    <Grid
      container
      item
      component='form'
      onSubmit={handleSubmit}
      justifyContent='center'
      alignItems='center'
      wrap='nowrap'
    >
      <Grid item md={6}>
        <FormField required id='search' label='Keyword(s)' name='searchString' value={string} onChange={setString} />
      </Grid>
      <Grid item>
        <Button type='submit' variant='contained' color='secondary' style={{ padding: '8px', marginLeft: '15px' }}>
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  );
}
