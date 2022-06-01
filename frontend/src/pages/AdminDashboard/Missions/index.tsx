import { ClearRounded, SearchRounded } from '@mui/icons-material';
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
import { useState, ChangeEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ViewMissions from '../../../components/AdminDashboard/ViewMissions';
import AuthWrapper from '../../../components/AuthWrapper';
import { UserRole } from '../../../util/types';

export default function Missions() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const pageParam = searchParams.get('page');
  const sizeParam = searchParams.get('size');
  const searchStringParam = searchParams.get('string');

  const [page, setPage] = useState<number | undefined>(pageParam ? Number(pageParam) : undefined);
  const [size, setSize] = useState<number | undefined>(sizeParam ? Number(sizeParam) : undefined);
  const [searchString, setSearchString] = useState<string | undefined>(searchStringParam ?? undefined);
  const handlePageChange = (_e: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };
  const handleSizeChange = (e: SelectChangeEvent<string | number>) => {
    setSize(e.target.value as number);
    setPage(undefined);
  };
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchString(e.target.value);
    setPage(undefined);
  };
  const handleSearchInputClick = () => {
    if (searchString) {
      setSearchString(undefined);
      setPage(undefined);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams();
    page && params.append('page', page.toString());
    size && params.append('size', size.toString());
    searchString && params.append('string', searchString);

    const paramsEncoded = encodeURI(params.toString());
    paramsEncoded && navigate(`?${paramsEncoded}`);
  }, [page, size, searchString, navigate]);

  return (
    <AuthWrapper role={UserRole.ROLE_ADMIN}>
      <Container maxWidth='lg' sx={{ mt: 2 }}>
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
            <ViewMissions page={page} size={size} searchString={searchString} onPageChange={handlePageChange} />
          </Grid>
        </Grid>
      </Container>
    </AuthWrapper>
  );
}
