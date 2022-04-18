import * as React from 'react';
import NavBar from '../../components/NavBar';
import PrimarySearch from '../../components/PrimarySearch';
import { ReactComponent as Logo } from '../../logo_black.svg';
import { Grid } from '@mui/material';

export default function HomePage() {
  return (
    <Grid container direction='column' height='100vh'>
      <NavBar />
      <Grid container item direction='column' alignItems='center' justifyContent='center' flexGrow={1}>
        <Grid item md={4}>
          <Logo />
        </Grid>
        <PrimarySearch searchString='' />
      </Grid>
    </Grid>
  );
}
