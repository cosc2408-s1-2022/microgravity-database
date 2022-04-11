import * as React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import NavBar from '../../components/NavBar';
import PlatformChips from '../../components/PlatformChips';
import ResultChips from '../../components/ResultChips';

export default function AdvancedSearch() {
  return (
    <section>
      <Grid container direction='column' height='100vh'>
        <NavBar />
        <Grid container justifyContent='center'>
          {/* TODO Change Color ??? */}
          <Typography variant={'h3'} color={'#000000'} sx={{ fontWeight: 'bold' }}>
            Advanced Search
          </Typography>
        </Grid>
        <Grid container direction='row' justifyContent={'center'}>
          <Grid container justifyContent={'flex-start'} item xs='auto'>
            <Card sx={{ maxWidth: 400 }} square={true}>
              <CardContent>
                <Grid container justifyContent='center'>
                  {/* TODO Change Color ??? */}
                  <Typography variant={'h6'} color={'#000000'}>
                    Platform
                  </Typography>
                </Grid>
                <PlatformChips />
              </CardContent>
            </Card>
          </Grid>
          <Grid container justifyContent={'flex-start'} item xs='auto'>
            <Card sx={{ maxWidth: 400 }} square={true}>
              <CardContent>
                <Grid container justifyContent='center'>
                  {/* TODO Change Color ??? */}
                  <Typography variant={'h6'} color={'#000000'}>
                    Result Type
                  </Typography>
                </Grid>
                <ResultChips />
              </CardContent>
            </Card>
          </Grid>
          <Grid container justifyContent={'flex-start'} item xs='auto'>
            <Card sx={{ maxWidth: 400 }} square={true}>
              <CardContent>
                <Typography variant={'h6'} color={'#000000'}>
                  Active Filters
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}
