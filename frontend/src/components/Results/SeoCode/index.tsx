import { Grid, Link, LinkProps, Typography } from '@mui/material';
import { SeoCode } from '../../../util/types';

interface SeoCodeResultProps extends LinkProps {
  seoCode: SeoCode;
}

export default function SeoCodeResult({ seoCode, ...rest }: SeoCodeResultProps) {
  const url = `/seoCode/${seoCode.id}`;
  return (
    <Grid {...rest} container item component={Link} href={url} padding={3} alignItems='baseline'>
      <Grid container item direction='column' md={3} marginRight={5}>
        <Grid item>
          <Typography display={'inline'} variant='body1'>
            Socio-Economic Objective Classification (SEO) :
            <Typography color={'primary.dark'} variant={'body1'} display={'inline'}>
              {' '}
              {seoCode.code}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Typography display={'inline'} color='primary.dark' variant='body1'>
          <Typography display={'inline'}>Socio-Economic Objective Classification Name : </Typography> {seoCode.name}
        </Typography>
      </Grid>
    </Grid>
  );
}
