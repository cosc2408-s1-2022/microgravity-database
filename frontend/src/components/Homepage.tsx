import { Component } from 'react';
import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import PrimarySearch from './Search/PrimarySearch';
import { Typography } from '@mui/material';

class FacilityElement extends Component<{ facility: string }, never> {
  render() {
    const facility = this.props.facility;
    return (
      <Link to='/search' state={facility} className='link'>
        <Typography
          sx={{ color: 'gray' }}
          variant='body1'
          className='mx-4 d-inline'
        >
          {facility}
        </Typography>
      </Link>
    );
  }
}

class Homepage extends Component {
  render() {
    return (
      <div className='d-flex align-items-center h-100'>
        <div className='container mx-auto'>
          <div className='row'>
            <div className='col-4 mx-auto'>
              <img src={logo} className='img-fluid' alt='RMIT Logo' />
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
    );
  }
}

export default Homepage;
