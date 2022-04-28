import { Grid, GridProps, Link, Typography } from '@mui/material';
import { ExperimentResultsProps } from '../../../util/types';

export default function ExperimentResult(props: GridProps & ExperimentResultsProps) {
  const url = `/experiment?id=${props.id}`;
  return (
    <Grid container item component={Link} href={url} bgcolor={props.bgcolor} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3}>
        <Grid item>
          <Typography color='primary.dark' variant='body1' display={'inline'}>
            <Typography display={'inline'}>Mission : </Typography> {props.mission.name}
          </Typography>
        </Grid>
        <Typography>Experiment Researchers :</Typography>
        <Grid container item spacing={2}>
          {props.people.map((person) => (
            <Grid item key={person.person.id}>
              <Typography color='primary.dark' variant='body2' fontWeight='lighter'>
                {`${person.person.familyName[0]}. ${person.person.firstName}`}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item md>
        <Grid item>
          <Typography display={'inline'}>Experiment Title : </Typography>
          <Typography color='primary.dark' variant='body1' fontSize={16} display={'inline'}>
            {props.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography display={'inline'}>Experiment Objective : </Typography>
          <Typography display={'inline'} color={'primary.dark'} variant={'body1'}>
            {props.objective}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}