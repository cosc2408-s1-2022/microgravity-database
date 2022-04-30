import {
  Container,
  FormControl,
  Grid,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Divider,
  SelectChangeEvent,
} from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import CenteredCircularProgress from '../../../components/CenteredCircularProgress';
import { UserRole } from '../../../util/types';
import { useLoggedInUser } from '../../../util/hooks';
import { ClearRounded, SearchRounded } from '@mui/icons-material';
import UserSearch from '../../../components/UserSearch';

export default function Users() {
  const navigate = useNavigate();

  const { user: loggedInUser, isLoading: isLoggedInUserLoading, isError: isLoggedInUserError } = useLoggedInUser();
  useEffect(() => {
    if (isLoggedInUserError) {
      navigate('/login');
    }
  }, [isLoggedInUserError, navigate]);

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

  return isLoggedInUserLoading || !loggedInUser ? (
    <CenteredCircularProgress />
  ) : loggedInUser.role === UserRole.ROLE_ADMIN ? (
    <Container maxWidth='sm' sx={{ mt: 4 }}>
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
          <UserSearch size={size} searchString={searchString} loggedInUser={loggedInUser} />
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Navigate to='/login' />
  );
}
