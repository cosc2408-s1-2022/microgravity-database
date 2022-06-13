import { Box, Button } from '@mui/material';
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
    <Box
      component='form'
      noValidate
      onSubmit={handleSubmit}
      display='flex'
      justifyContent='center'
      alignItems='stretch'
    >
      <FormField
        required
        id='search'
        label='Keyword(s)'
        name='searchString'
        value={string}
        onChange={setString}
        sx={{ flexGrow: 1 }}
      />
      <Button type='submit' disabled={!string} variant='contained' sx={{ ml: 1 }}>
        <SearchIcon />
      </Button>
    </Box>
  );
}
