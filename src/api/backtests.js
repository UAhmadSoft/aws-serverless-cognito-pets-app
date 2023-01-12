import { getSECURE_API, API, baseURL } from 'api';

const SECURE_API = getSECURE_API();
SECURE_API.interceptors.request.use((req) => {
  req.baseURL = `${req.baseURL}/backtests`;
  return req;
});

export const getAllBacktests = () => SECURE_API.get('');
