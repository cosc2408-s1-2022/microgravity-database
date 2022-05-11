import { Grid, Link, LinkProps, Typography } from '@mui/material';
import { ForCode } from '../../../util/types';

interface ForCodeResultProps extends LinkProps {
  forCode: ForCode;
}

export default function ForCodeResult({ forCode, ...rest }: ForCodeResultProps) {
  return (
    <Grid {...rest} container item component={Link} href={`/forCode/${forCode.id}`} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography display={'inline'}>Fields of Research Classification (FoR) : </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {forCode.code}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography display={'inline'} color='primary.dark' variant='body1'>
          <Typography display={'inline'}>Fields of Research Classification Name : </Typography> {forCode.name}
        </Typography>
      </Grid>
    </Grid>
  );
}
