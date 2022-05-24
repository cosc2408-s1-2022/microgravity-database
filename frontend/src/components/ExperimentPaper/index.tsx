import { Link, Paper, Typography } from '@mui/material';
import { Experiment } from '../../util/types';

type ExperimentPaperProps = {
  experiment: Experiment;
};

export default function ExperimentPaper({ experiment }: ExperimentPaperProps) {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: 1,
        mt: 2,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      }}
      component={Link}
      href={`/experiment/${experiment.id}`}
    >
      <Typography variant='h6'>{experiment.title}</Typography>
      <Typography variant='body1'>{`TOA: ${experiment.toa.name}`}</Typography>
      <Typography variant='body1'>{`Institution: ${experiment.leadInstitution}`}</Typography>
    </Paper>
  );
}
