import { Box, Container, Tab, Tabs } from '@mui/material';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container maxWidth='lg' sx={{ mt: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={(() => {
            switch (location.pathname) {
              case '/admin/dashboard/users':
                return 0;
              case '/admin/dashboard/experiments':
                return 1;
              case '/admin/dashboard/missions':
                return 2;
            }
          })()}
          onChange={(_e, v) => {
            switch (v) {
              case 0:
                navigate('users');
                break;
              case 1:
                navigate('experiments');
                break;
              case 2:
                navigate('missions');
                break;
              default:
                break;
            }
          }}
          indicatorColor='secondary'
          textColor='secondary'
        >
          <Tab label='Users' sx={{ fontSize: 'large', color: 'text.primary', textTransform: 'none' }} />
          <Tab label='Experiments' sx={{ fontSize: 'large', color: 'text.primary', textTransform: 'none' }} />
          <Tab label='Missions' sx={{ fontSize: 'large', color: 'text.primary', textTransform: 'none' }} />
        </Tabs>
      </Box>
      <Outlet />
    </Container>
  );
}
