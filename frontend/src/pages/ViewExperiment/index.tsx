import NavBar from '../../components/NavBar';
import React from 'react';
import { Experiment } from '../../util/types';
import { Container, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ViewExperiment() {
  const { state } = useLocation() as { state: { experiment: Experiment } };
  const experiment = state.experiment;
  return (
    <>
      <NavBar />
      <Container>
        <Paper>
          <Typography variant='h4'>{experiment.title}</Typography>
          <Typography variant='h6'>{experiment.mission}</Typography>
          <Typography variant='body1'>{experiment.platform}</Typography>
        </Paper>
      </Container>
    </>
  );
}
