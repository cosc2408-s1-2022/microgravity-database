import { Box, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useLoggedInUser } from '../../util/hooks';
import { UserRole } from '../../util/types';

type AuthWrapperProps = {
  children: React.ReactNode;
  role: UserRole;
};

export default function AuthWrapper({ children, role }: AuthWrapperProps) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('authToken') !== null;
  useEffect(() => {
    if (!isLoggedIn) {
      return navigate('/login');
    }
  }, [isLoggedIn, navigate]);

  const { user, isLoading, isError } = useLoggedInUser();

  return isLoading && !isError ? (
    <Box sx={{ p: 4 }} display='flex' justifyContent='center'>
      <CircularProgress size={24} color='secondary' />
    </Box>
  ) : user?.role === role ? (
    <>{children}</>
  ) : (
    <Navigate to='/login' />
  );
}
