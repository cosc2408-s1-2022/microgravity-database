import { Grid, GridProps, Link, Typography } from '@mui/material';

export default function MissionResult(
  props: GridProps & {
    id: string | undefined;
    name: string | undefined;
    startDate: string | undefined;
    endDate: string | undefined;
  },
) {
  const url = `/mission/${props.id}`;
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
