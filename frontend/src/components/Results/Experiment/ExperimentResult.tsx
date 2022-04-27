import { Grid, GridProps, Link, Typography } from '@mui/material';
import { ExperimentPerson, Mission } from '../../../util/types';

export default function ExperimentResult(
  props: GridProps & {
    id: string | undefined;
    objective: string | undefined;
    people: ExperimentPerson[];
    mission: Mission;
  },
) {
  const url = `/experiment/${props.id}`;
  return (
    <Grid container item component={Link} href={url} bgcolor={props.bgcolor} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography color='primary.dark' variant='body1'>
            {props.mission.name}
          </Typography>
        </Grid>
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
        <Typography color='primary.dark' variant='body1' fontSize={16}>
          {props.objective}
        </Typography>
      </Grid>
    </Grid>
  );
}
