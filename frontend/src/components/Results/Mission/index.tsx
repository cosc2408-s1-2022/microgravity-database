import { Box, Grid, GridProps, Link, Typography } from '@mui/material';
import moment from 'moment';
import { MissionResultsProps } from '../../../util/types';
import lodash from 'lodash';

export default function MissionResult(props: GridProps & MissionResultsProps) {
  console.log(props);
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
      <Grid item xs={6} display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
        <Box>
          <Typography display={'inline'}>Name: </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {props.name}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>Platform: </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {lodash(props.platform.name).startCase()}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>Total Experiments: </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {props.experimentCount}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={6} display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
        <Box>
          <Typography display={'inline'}>Launch Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {`${moment(props.launchDate).format('MMMM Do YYYY')} (${moment(props.launchDate).fromNow()})`}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>Start Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.startDate ? moment(props.startDate).format('MMMM Do YYYY') : 'Not Specified'}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>End Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.endDate ? moment(props.endDate).format('MMMM Do YYYY') : 'Not Specified'}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
