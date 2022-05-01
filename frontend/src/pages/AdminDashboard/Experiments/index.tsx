import {
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { ClearRounded, SearchRounded } from '@mui/icons-material';
import AuthWrapper from '../../../components/AuthWrapper';
import ViewExperiments from '../../../components/AdminDashboard/ViewExperiments';

export default function Experiments() {
  const [size, setSize] = useState<number>();
  const [searchString, setSearchString] = useState<string>();
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
  };
  const handleSearchInputClick = () => {
    if (searchString) {
      setSearchString(undefined);
    }
  };
  const handleSizeChange = (e: SelectChangeEvent<string | number>) => {
    setSize(e.target.value as number);
  };

  return (
    <AuthWrapper>
      <Container maxWidth='lg' sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} display='flex' justifyContent='space-between' alignItems='center'>
            <FormControl size='small' variant='outlined'>
              <InputLabel htmlFor='search-input' color='secondary'>
                Search
              </InputLabel>
              <OutlinedInput
                id='search-input'
                type='text'
                value={searchString || ''}
                onChange={handleSearchInputChange}
                label='Search'
                color='secondary'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton onClick={handleSearchInputClick} edge='end'>
                      {searchString ? <ClearRounded /> : <SearchRounded />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl size='small' variant='outlined'>
              <InputLabel id='select-size' color='secondary'>
                Result Size
              </InputLabel>
              <Select
                labelId='select-size'
                value={size || ''}
                label='Result Size'
                color='secondary'
                sx={{ minWidth: '8rem' }}
                onChange={handleSizeChange}
              >
                <MenuItem value={8}>Default</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={32}>32</MenuItem>
                <MenuItem value={96}>96</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <ViewExperiments size={size} searchString={searchString} />
          </Grid>
        </Grid>
      </Container>
    </AuthWrapper>
  );
}
