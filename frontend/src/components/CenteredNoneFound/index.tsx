import { Box, Typography } from '@mui/material';
import { SearchOffRounded } from '@mui/icons-material';

export default function CenteredNoneFound() {
  return (
    <Box my={2} display='flex' justifyContent='center' alignItems='center'>
      <SearchOffRounded fontSize='medium' />
      <Typography variant='body1'>None found.</Typography>
    </Box>
  );
}
