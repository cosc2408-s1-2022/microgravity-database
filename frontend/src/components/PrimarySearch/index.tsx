import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export default function PrimarySearch() {
  return (
    <div>
      <TextField id='search' label='Search' type='search' variant='outlined' size='small' style={{ width: '100%' }} />
      <Button variant='contained' color='primary' style={{ marginLeft: 'auto' }}>
        <SearchIcon />
      </Button>
    </div>
  );
}
