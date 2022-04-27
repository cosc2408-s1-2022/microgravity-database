import * as React from 'react';
import NavBar from '../../components/NavBar';
import PrimarySearch from '../../components/PrimarySearch';
import { ReactComponent as Logo } from '../../logo_black.svg';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Platform } from '../../types';

function PlatformElement(props: { platform: Platform; text: string }) {
  return (
    <Grid item>
      <Button variant='contained'>
        <Link to={`/search/advanced?platform=${props.platform}`} style={{ textDecoration: 'none' }}>
          <Typography sx={{ color: 'white' }} variant='body1' display='inline'>
            {props.text}
          </Typography>
        </Link>
      </Button>
    </Grid>
  );
}

export default function HomePage() {
  return (
    <Grid container direction='column' height='100vh' wrap='nowrap'>
      <NavBar hasSearch={false} />
      <Grid container item direction='column' alignItems='center' justifyContent='center' flexGrow={1}>
        <Grid item md={4}>
          <Logo />
        </Grid>
        <PrimarySearch mt='35px' />
        <Grid container item justifyContent='center' spacing={2} mt={1}>
          <PlatformElement platform={Platform.SPACE_STATION} text='Space Station' />
          <PlatformElement platform={Platform.SPACE_SHUTTLE} text='Space Shuttle' />
          <PlatformElement platform={Platform.RETRIEVABLE_CAPSULE} text='Retrievable Capsule' />
          <PlatformElement platform={Platform.SOUNDING_ROCKET} text='Sounding Rocket' />
          <PlatformElement platform={Platform.PARABOLIC_FLIGHT} text='Parabolic Flight' />
          <PlatformElement platform={Platform.GROUND_BASED_FACILITY} text='Ground Based Facility' />
        </Grid>
      </Grid>
    </Grid>
  );
}
