import { Component, ReactNode } from 'react';
import { AppBar, Button, Toolbar } from '@mui/material';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

class Header extends Component<{ className?: string }, never> {
  render() {
    // Elements to render inside header
    // TODO: update sign-in button according to authentication status
    const headerElements: ReactNode = (
      <div className='row flex-grow-1'>
        <div className='ms-auto col-1'>
          <Button variant='contained' className='col'>
            Sign In
          </Button>
        </div>
      </div>
    );

    return (
      <AppBar
        sx={{
          backgroundColor: 'secondary.main',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)',
        }}
        position='sticky'
        className={this.props.className}
      >
        <Toolbar>
          <div className='col-1'>
            <Link to='/'>
              <img src={logo} className='img-fluid' alt='RMIT Logo' />
            </Link>
          </div>
          {headerElements}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
