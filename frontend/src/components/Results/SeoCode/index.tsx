import { Box, Grid, Link, LinkProps, Typography } from '@mui/material';
import { SeoCode } from '../../../util/types';

interface SeoCodeResultProps extends LinkProps {
  seoCode: SeoCode;
}

export default function SeoCodeResult({ seoCode, ...rest }: SeoCodeResultProps) {
  return (
    <Grid
      {...rest}
      container
      item
      component={Link}
      href={`/seoCode/${seoCode.id}`}
      padding={3}
      alignItems='baseline'
      target='_blank'
      rel='noreferrer noopener'
    >
      <Box display='flex' flexDirection='column' alignItems='flex-start' justifyContent='center'>
        <Box>
          <Typography display={'inline'}>Code: </Typography>
          <Typography color={'primary.dark'} display={'inline'} variant='body1'>
            {seoCode.code}
          </Typography>
        </Box>
        <Box>
          <Typography display={'inline'}>Name: </Typography>
          <Typography display={'inline'} color='primary.dark' variant='body1'>
            {seoCode.name}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
