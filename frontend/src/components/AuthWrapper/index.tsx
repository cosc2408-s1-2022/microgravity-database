import { Box, CircularProgress } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserRole, User } from '../../types';
import api from '../../util/api';

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

  const [user, setUser] = useState<User>();
  const { data, isSuccess, isError } = useQuery<AxiosResponse<User>>(
    'getAuthenticatedUser',
    () => api.get('/users/authenticated'),
    {
      enabled: !user,
    },
  );
  useEffect(() => {
    if (isSuccess && data) {
      setUser(data.data);
    }
  }, [isSuccess, data, isError, navigate]);

  return !user && !isError ? (
    <Box sx={{ p: 4 }} display='flex' justifyContent='center'>
      <CircularProgress size={24} color='secondary' />
    </Box>
  ) : user?.role === role ? (
    <>{children}</>
  ) : (
    <Navigate to='/login' />
  );
}
