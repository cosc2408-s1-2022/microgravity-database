import { Container } from '@mui/material';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <Container maxWidth='md' sx={{ p: 4, display: 'flex', justifyContent: 'space-evenly' }}>
      <Link to='/admin/users'>Users</Link>
      <Link to='/admin/experiments'>Experiments</Link>
    </Container>
  );
}
