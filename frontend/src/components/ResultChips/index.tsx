import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import Grid from '@mui/material/Grid';

export default function ResultChips() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [variantExperiments, setVariantExperiments] = useState<any>('outlined');
  const [variantMission, setVariantMission] = useState<any>('outlined');
  const [variantFOR, setVariantFOR] = useState<any>('outlined');
  const [variantSEO, setVariantSEO] = useState<any>('outlined');

  const [iconExperiments, setIconExperiments] = useState<any>();
  const [iconMission, setIconMission] = useState<any>();
  const [iconFOR, setIconFOR] = useState<any>();
  const [iconSEO, setIconSEO] = useState<any>();

  const [colorExperiments, setColorExperiments] = useState<any>('secondary');
  const [colorMission, setColorMission] = useState<any>('secondary');
  const [colorFOR, setColorFOR] = useState<any>('secondary');
  const [colorSEO, setColorSEO] = useState<any>('secondary');

  const handleExperiments = () => {
    if (variantExperiments === 'filled') {
      setVariantExperiments('outlined');
      setIconExperiments('');
      setColorExperiments('secondary');
    } else if (variantExperiments === 'outlined') {
      setVariantExperiments('filled');
      setIconExperiments(<DoneIcon />);
      setColorExperiments('success');
    }
  };

  const handleMission = () => {
    if (variantMission === 'filled') {
      setVariantMission('outlined');
      setIconMission('');
      setColorMission('secondary');
    } else if (variantMission === 'outlined') {
      setVariantMission('filled');
      setIconMission(<DoneIcon />);
      setColorMission('success');
    }
  };

  const handleFOR = () => {
    if (variantFOR === 'filled') {
      setVariantFOR('outlined');
      setIconFOR('');
      setColorFOR('secondary');
    } else if (variantFOR === 'outlined') {
      setVariantFOR('filled');
      setIconFOR(<DoneIcon />);
      setColorFOR('success');
    }
  };

  const handleSEO = () => {
    if (variantSEO === 'filled') {
      setVariantSEO('outlined');
      setIconSEO('');
      setColorSEO('secondary');
    } else if (variantSEO === 'outlined') {
      setVariantSEO('filled');
      setIconSEO(<DoneIcon />);
      setColorSEO('success');
    }
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Stack spacing={2}>
        <Chip
          label='Experiments'
          variant={variantExperiments}
          color={colorExperiments}
          onClick={handleExperiments}
          icon={iconExperiments}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='Mission'
          variant={variantMission}
          color={colorMission}
          onClick={handleMission}
          icon={iconMission}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='FOR'
          variant={variantFOR}
          color={colorFOR}
          onClick={handleFOR}
          icon={iconFOR}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='SEO'
          variant={variantSEO}
          color={colorSEO}
          onClick={handleSEO}
          icon={iconSEO}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
      </Stack>
    </Grid>
  );
}
