import axios, { AxiosResponse } from 'axios';
import { Experiment } from './types';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const api = axios.create({
  baseURL: backendUrl,
});

const makeTypedAPICall =
  <In, Out>(apiCall: (args: In) => Promise<AxiosResponse<Out>>) =>
  (args: In) =>
    apiCall(args).then((res) => res.data);

export const getExperiment = makeTypedAPICall<{ id: string }, Experiment>((args) => {
  const search = new URLSearchParams();
  search.append('id', args.id);
  return api.get(`${backendUrl}/experiments/get?${search.toString()}`);
});

export default api;
