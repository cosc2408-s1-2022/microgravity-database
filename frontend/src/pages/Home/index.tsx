import { Box, Container, Typography } from '@mui/material';

export default function Home() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='sm'>
        <Typography variant='h2' component='h1' gutterBottom>
          Microgravity Database
        </Typography>
      </Container>
      <Box
        component='footer'
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
        }}
      >
        <Container maxWidth='sm'>
          <Typography variant='body1'>2022 &copy; RMIT University</Typography>
        </Container>
      </Box>
    </Box>
  );
}
