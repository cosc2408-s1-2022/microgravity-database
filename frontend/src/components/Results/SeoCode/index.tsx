import { Grid, GridProps, Link, Typography } from '@mui/material';
import { SeoCode } from '../../../util/types';

export default function SeoCodeResult(props: GridProps & SeoCode) {
  const url = `/forCode/${props.id}`;
  return (
    <Grid container item component={Link} href={url} bgcolor={props.bgcolor} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography display={'inline'} variant='body1'>
            Socio-Economic Objective Classification (SEO) :
            <Typography color={'primary.dark'} variant={'body1'} display={'inline'}>
              {' '}
              {props.id}{' '}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography display={'inline'} color='primary.dark' variant='body1'>
          <Typography display={'inline'}>Socio-Economic Objective Classification Name : </Typography> {props.name}
        </Typography>
      </Grid>
    </Grid>
  );
}
