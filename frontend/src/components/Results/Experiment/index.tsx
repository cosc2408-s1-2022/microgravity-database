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
      <Grid container item direction='column' md={3}>
        <Grid item>
          <Typography display={'inline'}>Mission:</Typography>
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
      <Grid item md>
        <Grid item>
          <Typography display={'inline'}>Experiment Title: </Typography>
          <Typography color='primary.dark' variant='body1' fontSize={16} display={'inline'}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display={'inline'}>Experiment Objective: </Typography>
          <Typography
            display={'inline'}
            color={'primary.dark'}
            variant={'body1'}
            // whiteSpace='nowrap'
            // textOverflow='ellipsis'
            // sx={{ overflow: 'hidden' }}
            py={1}
          >
            {props.objective
              ? (props.objective.substring(0, props.objective.indexOf('.')) || props.objective).concat('...')
              : 'Not specified'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
