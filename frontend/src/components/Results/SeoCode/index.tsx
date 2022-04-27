import { Grid, GridProps, Link, Typography } from '@mui/material';
import { SeoCode } from '../../../types';

export default function SeoCodeResult(props: GridProps & SeoCode) {
  const url = `/forCode/${props.id}`;
  return (
    <Grid container item component={Link} href={url} bgcolor={props.bgcolor} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography color='primary.dark' variant='body1'>
            {props.name}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
