import * as React from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import NavBar from '../../components/NavBar';
import AdvancedSearchChips from '../../components/AdvancedSearchChips';

export default function AdvancedSearch() {
  return (
    <section>
      <Grid container direction='column' height='100vh'>
        <NavBar />
        <Grid container direction='row' justifyContent={'center'}>
          <Grid container justifyContent={'flex-start'} item xs='auto'>
            <Card sx={{ maxWidth: 400 }} square={true}>
              <CardContent>
                <AdvancedSearchChips />
              </CardContent>
            </Card>
          </Grid>
          <Grid container justifyContent={'flex-start'} item xs='auto'>
            <Card sx={{ maxWidth: 400 }} square={true}>
              <CardContent>
                <Typography variant='body2' color='text.secondary'>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                  industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                  scrambled it to make a type specimen book.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
}
