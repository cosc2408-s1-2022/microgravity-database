import { Grid, GridProps, Link, Typography } from '@mui/material';
import moment from 'moment';
import { MissionResultsProps } from '../../../util/types';

export default function MissionResult(props: GridProps & MissionResultsProps) {
  return (
    <Grid
      container
      item
      component={Link}
      href={`/mission/${props.id}`}
      bgcolor={props.bgcolor}
      padding={3}
      alignItems='baseline'
    >
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            <Typography display={'inline'}> Mission Name : </Typography> {props.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display={'inline'}>Start Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.startDate ? moment(props.startDate).year() : 'Not Specified'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display={'inline'}>End Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.endDate ? moment(props.endDate).year() : 'Not Specified'}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display={'inline'}>Launch Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {moment(props.launchDate).year()}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
