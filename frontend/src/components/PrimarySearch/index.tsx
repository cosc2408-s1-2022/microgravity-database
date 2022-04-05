import { Box } from '@mui/material';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import FormField from '../FormField';

export default function PrimarySearch() {
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
        required
        fullWidth
        label='Search'
        name='searchString'
        autoComplete='text'
        onChange={setSearchString}
      />
    </Box>
  );
}
