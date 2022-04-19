import { Box, Container, Typography } from '@mui/material';

export default function AddExperiment() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant='h3' sx={{ mt: 6, mb: 3 }}>
          Add Experiment
        </Typography>
      </Box>
    </Container>
  );
}
