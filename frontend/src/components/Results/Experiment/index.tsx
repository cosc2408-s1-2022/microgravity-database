import { Grid, GridProps, Link, Typography } from '@mui/material';
import { ExperimentResultsProps } from '../../../util/types';

export default function ExperimentResult(props: GridProps & ExperimentResultsProps) {
  return (
    <Grid
      container
      item
      component={Link}
      href={`/experiment/${props.id}`}
      bgcolor={props.bgcolor}
      padding={3}
      alignItems='baseline'
    >
      <Grid container item direction='column' xs={4}>
        <Grid item>
          <Typography display={'inline'}>Mission: </Typography>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            {props.mission.name}
          </Typography>
        </Grid>
        <Typography>Researchers:</Typography>
        <Grid container item spacing={2}>
          {props.people.map((person) => (
            <Grid item key={person.person.id}>
              <Typography color='primary.dark' variant='body2' fontWeight='lighter'>
                {`${person.person.firstName.at(0)}. ${person.person.familyName}`}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <Grid item>
          <Typography display={'inline'}>Experiment Title: </Typography>
          <Typography color='primary.dark' variant='body1' fontSize={16} display={'inline'}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display={'inline'}>Experiment Objective: </Typography>
          <Typography id='text-overflow-ellipsis' display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.objective || 'Not specified'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
