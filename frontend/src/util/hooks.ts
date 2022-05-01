import { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { User } from '../util/types';
import api from './api';

export const useLoggedInUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsloading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {
    data,
    isLoading: isQueryLoading,
    isError: isQueryError,
    refetch: refetchQuery,
  } = useQuery<AxiosResponse<User>>('getAuthenticatedUser', () => api.get('/users/authenticated'), {
    retry: false,
  });

  const authToken = localStorage.getItem('authToken');
  useEffect(() => {
    refetchQuery();
  }, [refetchQuery, authToken]);

  useEffect(() => data && setUser(data.data), [data]);
  useEffect(() => setIsloading(isQueryLoading), [isQueryLoading]);
  useEffect(() => setIsError(isQueryError), [isQueryError]);

  return { user, isLoading, isError };
};
