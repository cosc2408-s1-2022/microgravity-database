import PrimarySearch from '../../components/PrimarySearch';
import {ReactComponent as Logo} from '../../asd-black-logo.svg';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Platforms } from '../../util/types';
import lodash from 'lodash';
import MessageSnackbar from '../../components/MessageSnackbar';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const { state } = useLocation() as { state: { isError: boolean; message: string } };

  return (
    <Container maxWidth='md'>
      <Grid
        container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Grid item m = {10} xs={12}>
            <Typography textAlign='center' variant='h1' fontFamily='Roboto Slab' fontWeight='bold'>Australian Space Database</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container flexDirection='column' alignItems='center'>
            <Grid item xs={12} style={{ width: '100%' }}>
              <PrimarySearch />
            </Grid>
            <Grid item xs={12}>
              <Box display='inline-flex'>
                {Object.values(Platforms).map((platform) => (
                  <Link key={platform} href={`/search/advanced?platform=${platform}`} sx={{ m: 1 }}>
                    <Typography color='text.secondary' variant='body1' sx={{ textDecoration: 'underline' }}>
                      {lodash(platform).startCase()}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <MessageSnackbar
        open={state?.isError || false}
        message={state?.message || 'Sorry, something went wrong.'}
        severity='error'
      />
    </Container>
  );
}
