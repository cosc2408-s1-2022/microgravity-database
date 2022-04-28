import { Grid, GridProps, Link, Typography } from '@mui/material';
import { ForCode } from '../../../util/types';

export default function ForCodeResult(props: GridProps & ForCode) {
  const url = `/forCode/${props.id}`;
  return (
    <Grid container item component={Link} href={url} bgcolor={props.bgcolor} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography display={'inline'}>Fields of Research Classification (FoR) : </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {props.id}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography display={'inline'} color='primary.dark' variant='body1'>
          <Typography display={'inline'}>Fields of Research Classification Name : </Typography> {props.name}
        </Typography>
      </Grid>
    </Grid>
  );
}
