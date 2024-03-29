import { AxiosResponse } from 'axios';
import api from './api';
import { Experiment, ForCode, SeoCode } from './types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;

const makeTypedAPICall =
  <In, Out>(apiCall: (args: In) => Promise<AxiosResponse<Out>>) =>
  (args: In) =>
    apiCall(args).then((res) => res.data);

export const getExperiment = makeTypedAPICall<{ id: string }, Experiment>((args) => {
  const search = new URLSearchParams();
  search.append('id', args.id);
  return api.get(`${backendUrl}/experiments/get?${search.toString()}`);
});

export const getForCode = makeTypedAPICall<{ id: string }, ForCode>((args) => {
  return api.get(`${backendUrl}/forCodes/${args.id.toString()}`);
});

export const getSeoCode = makeTypedAPICall<{ id: string }, SeoCode>((args) => {
  return api.get(`${backendUrl}/seoCodes/${args.id.toString()}`);
});
