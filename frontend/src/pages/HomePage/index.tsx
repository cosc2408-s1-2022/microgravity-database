import PrimarySearch from '../../components/PrimarySearch';
import Logo from '../../asd-logo-black.svg';
import { Box, Grid, Link, Typography } from '@mui/material';
import { Platforms } from '../../util/types';
import lodash from 'lodash';
import MessageSnackbar from '../../components/MessageSnackbar';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const { state } = useLocation() as { state: { isError: boolean; message: string } };

  return (
    <Grid container justifyContent='center' height='60%'>
      <Grid container direction='column' justifyContent='center' alignItems='center'>
        <Grid item display='flex' sx={{ my: 8 }}>
          <img src={Logo} id='homepage-logo' alt='Australian Space Database Logo' />
        </Grid>
        <Grid item>
          <Grid container flexDirection='column' alignItems='center'>
            <Grid item style={{ width: '100%' }}>
              <PrimarySearch />
            </Grid>
            <Grid item>
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
    </Grid>
  );
}
