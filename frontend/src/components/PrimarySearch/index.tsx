import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Component } from 'react';

class PrimarySearch extends Component<{ className: string }, never> {
  render() {
    return (
      <div className={this.props.className}>
        <TextField
          id='outlined-basic'
          label='Keyword(s)'
          variant='outlined'
          className='col-6'
          sx={{ color: 'primary.light' }}
          size='small'
        />
        <Button variant='contained' className='ms-4'>
          <SearchIcon />
        </Button>
      </div>
    );
  }
}

export default PrimarySearch;
