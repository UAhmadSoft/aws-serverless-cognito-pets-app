import axios from 'axios';

export const baseURL =
  'https://zykdcdb41m.execute-api.ap-south-1.amazonaws.com/dev';

const responseCallback = res => {
  if (res.status === 200) return res;
  return Promise.reject(
    res.response?.data.message || res.message || 'Something Went Wrong'
  );
};

export const getSECURE_API = () => {
  const SECURE_API = axios.create({ baseURL });

  SECURE_API.interceptors.response.use(req => req, responseCallback);
  // To help our auth middleware
  SECURE_API.interceptors.request.use(req => {
    // console.log('token', token);
    let token = localStorage.getItem(
      `CognitoIdentityServiceProvider.${process.env.REACT_APP_AWS_COGNITO_CLIENT_ID}.umad.ahmad.idToken`
    );
    if (token) {
      req.headers.Authorization = token;
    }
    return req;
  });

  return SECURE_API;
};

export const API = axios.create({ baseURL });
API.interceptors.response.use(req => req, responseCallback);
