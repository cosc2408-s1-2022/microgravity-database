import { Box, Container, Tab, Tabs } from '@mui/material';
import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  useEffect(() => {
    switch (value) {
      case 0:
        navigate('users');
        break;
      case 1:
        navigate('experiments');
        break;
      default:
        break;
    }
  }, [value, navigate]);

  return (
    <Container maxWidth='lg' sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={(_e, v) => setValue(v)} indicatorColor='secondary' textColor='secondary'>
          <Tab label='Users' sx={{ fontSize: 'large', color: 'text.primary', textTransform: 'none' }} />
          <Tab label='Experiments' sx={{ fontSize: 'large', color: 'text.primary', textTransform: 'none' }} />
        </Tabs>
      </Box>
      <Outlet />
    </Container>
  );
}
