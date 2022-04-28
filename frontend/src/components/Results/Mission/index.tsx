import { Grid, GridProps, Link, Typography } from '@mui/material';
import { MissionResultsProps } from '../../../util/types';

export default function MissionResult(props: GridProps & MissionResultsProps) {
  const url = `/mission/${props.id}`;
  return (
    <Grid container item component={Link} href={url} bgcolor={props.bgcolor} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            <Typography display={'inline'}> Mission Name : </Typography> {props.name}
          </Typography>
        </Grid>
        <Grid item m={1}>
          <Typography display={'inline'}>Start Date : </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.startDate}
          </Typography>
        </Grid>
        <Grid item m={1}>
          <Typography display={'inline'}>End Date : </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.endDate}
          </Typography>
        </Grid>
        <Grid item m={1}>
          <Typography display={'inline'}>Launch Date : </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.launchDate?.split('-')[0]}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
