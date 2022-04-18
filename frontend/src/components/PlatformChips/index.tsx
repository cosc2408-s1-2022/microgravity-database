import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import DoneIcon from '@mui/icons-material/Done';
import Grid from '@mui/material/Grid';

export default function PlatformChips() {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const [variantSpaceStation, setVariantSpaceStation] = useState<any>('outlined');
  const [variantSpaceShuttle, setVariantSpaceShuttle] = useState<any>('outlined');
  const [variantRetrievableCapsules, setVariantRetrievableCapsules] = useState<any>('outlined');
  const [variantSoundingRockets, setVariantSoundingRockets] = useState<any>('outlined');
  const [variantParabolicFlights, setVariantParabolicFlights] = useState<any>('outlined');
  const [variantGroundBasedSystems, setVariantGroundBasedSystems] = useState<any>('outlined');

  const [iconSpaceStation, setIconSpaceStation] = useState<any>();
  const [iconSpaceShuttle, setIconSpaceShuttle] = useState<any>();
  const [iconRetrievableCapsules, setIconRetrievableCapsules] = useState<any>();
  const [iconSoundingRockets, setIconSoundingRockets] = useState<any>();
  const [iconParabolicFlights, setIconParabolicFlights] = useState<any>();
  const [iconGroundBasedSystems, setIconGroundBasedSystems] = useState<any>();

  const [colorSpaceStation, setColorSpaceStation] = useState<any>('secondary');
  const [colorSpaceShuttle, setColorSpaceShuttle] = useState<any>('secondary');
  const [colorRetrievableCapsules, setColorRetrievableCapsules] = useState<any>('secondary');
  const [colorSoundingRockets, setColorSoundingRockets] = useState<any>('secondary');
  const [colorParabolicFlights, setColorParabolicFlights] = useState<any>('secondary');
  const [colorGroundBasedSystems, setColorGroundBasedSystems] = useState<any>('secondary');

  const handleSpaceStation = () => {
    if (variantSpaceStation === 'filled') {
      setVariantSpaceStation('outlined');
      setIconSpaceStation('');
      setColorSpaceStation('secondary');
    } else if (variantSpaceStation === 'outlined') {
      setVariantSpaceStation('filled');
      setIconSpaceStation(<DoneIcon />);
      setColorSpaceStation('success');
    }
  };

  const handleSpaceShuttle = () => {
    if (variantSpaceShuttle === 'filled') {
      setVariantSpaceShuttle('outlined');
      setIconSpaceShuttle('');
      setColorSpaceShuttle('secondary');
    } else if (variantSpaceShuttle === 'outlined') {
      setVariantSpaceShuttle('filled');
      setIconSpaceShuttle(<DoneIcon />);
      setColorSpaceShuttle('success');
    }
  };

  const handleRetrievableCapsules = () => {
    if (variantRetrievableCapsules === 'filled') {
      setVariantRetrievableCapsules('outlined');
      setIconRetrievableCapsules('');
      setColorRetrievableCapsules('secondary');
    } else if (variantRetrievableCapsules === 'outlined') {
      setVariantRetrievableCapsules('filled');
      setIconRetrievableCapsules(<DoneIcon />);
      setColorRetrievableCapsules('success');
    }
  };

  const handleSoundingRockets = () => {
    if (variantSoundingRockets === 'filled') {
      setVariantSoundingRockets('outlined');
      setIconSoundingRockets('');
      setColorSoundingRockets('secondary');
    } else if (variantSoundingRockets === 'outlined') {
      setVariantSoundingRockets('filled');
      setIconSoundingRockets(<DoneIcon />);
      setColorSoundingRockets('success');
    }
  };

  const handleParabolicFlights = () => {
    if (variantParabolicFlights === 'filled') {
      setVariantParabolicFlights('outlined');
      setIconParabolicFlights('');
      setColorParabolicFlights('secondary');
    } else if (variantParabolicFlights === 'outlined') {
      setVariantParabolicFlights('filled');
      setIconParabolicFlights(<DoneIcon />);
      setColorParabolicFlights('success');
    }
  };

  const handleGroundBasedSystems = () => {
    if (variantGroundBasedSystems === 'filled') {
      setVariantGroundBasedSystems('outlined');
      setIconGroundBasedSystems('');
      setColorGroundBasedSystems('secondary');
    } else if (variantGroundBasedSystems === 'outlined') {
      setVariantGroundBasedSystems('filled');
      setIconGroundBasedSystems(<DoneIcon />);
      setColorGroundBasedSystems('success');
    }
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <Stack spacing={2}>
        <Chip
          label='Space Station'
          variant={variantSpaceStation}
          color={colorSpaceStation}
          onClick={handleSpaceStation}
          icon={iconSpaceStation}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='Space Shuttle'
          variant={variantSpaceShuttle}
          color={colorSpaceShuttle}
          onClick={handleSpaceShuttle}
          icon={iconSpaceShuttle}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='Retrievable Capsules'
          variant={variantRetrievableCapsules}
          color={colorRetrievableCapsules}
          onClick={handleRetrievableCapsules}
          icon={iconRetrievableCapsules}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='Sounding Rockets'
          variant={variantSoundingRockets}
          color={colorSoundingRockets}
          onClick={handleSoundingRockets}
          icon={iconSoundingRockets}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='Parabolic Flights'
          variant={variantParabolicFlights}
          color={colorParabolicFlights}
          onClick={handleParabolicFlights}
          icon={iconParabolicFlights}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
        <Chip
          label='Groud Based Systems'
          variant={variantGroundBasedSystems}
          color={colorGroundBasedSystems}
          onClick={handleGroundBasedSystems}
          icon={iconGroundBasedSystems}
          sx={{ borderRadius: 1, fontSize: 15, fontWeight: 'bold' }}
          size='small'
        />
      </Stack>
    </Grid>
  );
}
