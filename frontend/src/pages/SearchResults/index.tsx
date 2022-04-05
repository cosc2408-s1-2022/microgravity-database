import { Button, Card, CardActions, CardContent, Container, Divider, Typography } from '@mui/material';
import { Navigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import PrimarySearch from '../../components/PrimarySearch';

export type SearchState = {
  searchString: string;
};

export default function SearchResults() {
  const { state } = useLocation() as { state: SearchState };
  const searchString = state.searchString;
  console.log(searchString);
  if (!searchString) {
    return <Navigate to='/home' />;
  }

  return (
    <>
      <Header />
      <Container>
        <PrimarySearch />
        <Divider sx={{ my: '2rem' }} variant='middle' />
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography color='text.secondary' gutterBottom>
              Platform
            </Typography>
            <Typography variant='h5' component='div'>
              Experiment title
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              Mission
            </Typography>
            <Typography variant='body2'>Lorem ipsum lorem ipsum lorem ipsum.</Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>Learn More</Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}
