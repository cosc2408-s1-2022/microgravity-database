/*
import { Component } from 'react';
import logo from '../../assets/RMIT-LOGO-BLACK.png';
import { Link } from 'react-router-dom';
import PrimarySearch from '../../components/PrimarySearch';
import { Typography } from '@mui/material';
import Header from '../../components/Header';

class FacilityElement extends Component<{ facility: string }, never> {
  render() {
    const facility = this.props.facility;
    return (
      <Link to='/search' state={facility} className='link'>
        <Typography sx={{ color: 'gray' }} variant='body1' className='mx-4 d-inline'>
          {facility}
        </Typography>
      </Link>
    );
  }
}

class HomePage extends Component {
  render() {
    return (
      <div>
        <div className='container-fluid d-flex flex-column min-vh-100 overflow-hidden px-0'>
          <Header />
          <div className='row justify-content-center flex-grow-1'>
            <div className='my-auto mx-auto flex-grow-1'>
              <div className='row'>
                <div className='col-4 mx-auto'>
                  <img src={logo} className='img-fluid' alt='RMIT Logo' height={'40vmin'} />
                </div>
              </div>
              <div className='row mt-5'>
                <PrimarySearch className='justify-content-center d-flex' />
              </div>
              <div className='row mt-3'>
                <div className='col-md-10 mx-auto'>
                  <FacilityElement facility={'Space Stations'} />
                  <FacilityElement facility={'Space Shuttles'} />
                  <FacilityElement facility={'Retrievable Capsules'} />
                  <FacilityElement facility={'Sounding Rockets'} />
                  <FacilityElement facility={'Parabolic Flights'} />
                  <FacilityElement facility={'Ground Facilities'} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
*/
import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Header from '../../components/Header';
import PrimarySearch from '../../components/PrimarySearch';
import { ReactComponent as LogoBlack } from '../../logo_black.svg';

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        ...sx,
      }}
      {...other}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
        }}
      >
        <Item>
          <LogoBlack style={{ transform: 'scale(0.3)' }} />
          <PrimarySearch />
        </Item>
      </Box>
    </>
  );
}
