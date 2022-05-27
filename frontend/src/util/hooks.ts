import { AxiosResponse } from 'axios';
import { useState, useEffect, useReducer } from 'react';
import { useQuery } from 'react-query';
import {
  ExperimentPersonRequestEntry,
  ExperimentPublicationEntry,
  PeopleReducerState,
  PublicationsReducerState,
  User,
} from '../util/types';
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
    enabled: false,
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

export const usePeopleReducer = (initialState: PeopleReducerState) => {
  const peopleReducer = (
    state: { uid: number; data: ExperimentPersonRequestEntry[] },
    action: { type: string; payload: ExperimentPersonRequestEntry },
  ) => {
    switch (action.type) {
      case 'ADD': {
        return { uid: state.uid + 1, data: [...state.data, action.payload] };
      }
      case 'REMOVE': {
        return { uid: state.uid, data: state.data.filter((entry) => entry.id !== action.payload.id) };
      }
      case 'MODIFY': {
        return {
          uid: state.uid,
          data: state.data.map((entry) => {
            if (entry.id === action.payload.id) return action.payload;

            return entry;
          }),
        };
      }
      default: {
        return state;
      }
    }
  };

  return useReducer(peopleReducer, initialState);
};

export const usePublicationsReducer = (initialState: PublicationsReducerState) => {
  const publicationsReducer = (
    state: { uid: number; data: ExperimentPublicationEntry[] },
    action: { type: string; payload: ExperimentPublicationEntry },
  ) => {
    switch (action.type) {
      case 'ADD': {
        return { uid: state.uid + 1, data: [...state.data, action.payload] };
      }
      case 'REMOVE': {
        return {
          uid: state.uid,
          data: state.data.filter((entry) => entry.id !== action.payload.id),
        };
      }
      case 'MODIFY': {
        return {
          uid: state.uid,
          data: state.data.map((entry) => {
            if (entry.id === action.payload.id) return action.payload;

            return entry;
          }),
        };
      }
      default: {
        return state;
      }
    }
  };

  return useReducer(publicationsReducer, initialState);
};
