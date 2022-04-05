import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormField from '../FormField';
import { SearchState } from '../../pages/SearchResults';

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
    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <FormField
        margin='normal'
        fullWidth
        label='Search'
        name='searchString'
        autoComplete='text'
        value={searchString ? searchString : props.searchString}
        onChange={setSearchString}
      />
    </Box>
  );
}
