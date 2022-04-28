import { Box, CircularProgress } from '@mui/material';

export default function CenteredCircularProgress() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <CircularProgress size={24} color='primary' />
    </Box>
  );
}
