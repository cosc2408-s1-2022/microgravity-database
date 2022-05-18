import { Box, Grid, Link, LinkProps, Typography } from '@mui/material';
import { ForCode } from '../../../util/types';

interface ForCodeResultProps extends LinkProps {
  forCode: ForCode;
}

export default function ForCodeResult({ forCode, ...rest }: ForCodeResultProps) {
  return (
    <Grid {...rest} container item component={Link} href={`/forCode/${forCode.id}`} padding={3} alignItems='baseline'>
      <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
        <Box>
          <Typography display={'inline'}>Fields of Research Classification (FoR): </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {forCode.code}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>Name: </Typography>
          <Typography display={'inline'} color='primary.dark' variant='body1'>
            {forCode.name}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
