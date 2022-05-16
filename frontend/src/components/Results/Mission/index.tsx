import { Box, Grid, GridProps, Link, Typography } from '@mui/material';
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
      <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
        <Box>
          <Typography display={'inline'}>Mission Name: </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {props.name}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>Start Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.startDate ? moment(props.startDate).year() : 'Not Specified'}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>End Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.endDate ? moment(props.endDate).year() : 'Not Specified'}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>Launch Date: </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {moment(props.launchDate).year()}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
