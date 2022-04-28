import { Link, Paper, PaperProps, Typography } from '@mui/material';
import { Experiment } from '../../util/types';

type ExperimentPaperProps = {
  experiment: Experiment;
};

export default function ExperimentPaper({ experiment }: ExperimentPaperProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 1,
        mt: 2,
      }}
      component={Link}
      href={`/experiments/${experiment.id}`}
    >
      <Typography variant='h6'>{experiment.title}</Typography>
      <Typography variant='body1'>{experiment.toa}</Typography>
      <Typography variant='body1'>{experiment.leadInstitution}</Typography>
    </Paper>
  );
}
