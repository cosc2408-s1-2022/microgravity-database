import PrimarySearch from '../../components/PrimarySearch';
import Logo from '../../logo-navbar.svg';
import { Box, Container, Grid, Link, Typography } from '@mui/material';
import { Platforms } from '../../util/types';
import lodash from 'lodash';
import MessageSnackbar from '../../components/MessageSnackbar';
import { useLocation } from 'react-router-dom';

export default function HomePage() {
  const { state } = useLocation() as { state: { isError: boolean; message: string } };

  return (
    <Container maxWidth='md'>
      <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' height='60%'>
        <Box display='flex' sx={{ width: '100%', my: 8 }}>
          <img src={Logo} id='homepage-logo' alt='Australian Space Database Logo' />
        </Box>
        <Box display='flex' sx={{ width: '100%' }} flexDirection='column'>
          <Box flexGrow={1} mb={2}>
            <PrimarySearch />
          </Box>
          <Grid container flexGrow={1} spacing={2}>
            {Object.values(Platforms).map((platform) => (
              <Grid item key={platform} xs={2}>
                <Link
                  href={`/search/advanced?resultType=mission&platform=${platform}`}
                  sx={{ mt: 1 }}
                  flexGrow={1}
                  display='flex'
                  flexDirection='column'
                  alignItems='center'
                >
                  <img
                    src={require(`../../../public/platformLogos/${platform}.svg`)}
                    style={{ marginBottom: '0.5rem' }}
                    className='platform-logo'
                    alt='Australian Space Database Logo'
                  />
                  {lodash(platform)
                    .startCase()
                    .split(' ')
                    .map((word, i) => (
                      <Typography
                        key={i}
                        display='inline-block'
                        color='text.secondary'
                        fontWeight='bold'
                        sx={{ textDecoration: 'underline' }}
                      >
                        {word}
                      </Typography>
                    ))}
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      <MessageSnackbar
        open={state?.isError || false}
        message={state?.message || 'Sorry, something went wrong.'}
        severity='error'
      />
    </Container>
  );
}
