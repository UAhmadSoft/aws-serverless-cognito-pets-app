import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import {
  getMe,
  login,
  updateMe,
  signUp,
  updatePassword,
  getMyNotifications,
  confirmMail,
} from './extraReducers';

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { LOCALSTORAGE_KEY } from 'index';

const POOL_DATA = {
  UserPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
  ClientId: process.env.REACT_APP_AWS_COGNITO_CLIENT_ID,
};

const initialState = {
  authenticating: true,
  user: null,
  loading: false,
  isLoggedIn: false,
  notifications: [],
  userPool: new CognitoUserPool(POOL_DATA),
  access_token: null,
  id_token: null,
  refresh_token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.access_token = null;
      state.id_token = null;
      state.refresh_token = null;
    },
  },
  extraReducers: {
    [getMe.pending]: (state, { payload }) => {
      state.authenticating = true;
    },
    [getMe.fulfilled]: (state, { payload }) => {
      return {
        ...state,
        token: payload.token,
        user: {
          email: payload.idToken.payload.email,
          name: payload.idToken.payload.name,
          phone_number: payload.idToken.payload.phone_number,
          picture: payload.idToken.payload.picture,
          username: payload.accessToken.payload.username,
        },
        access_token: payload.accessToken.jwtToken,
        id_token: payload.idToken.jwtToken,
        refresh_token: payload.refreshToken.token,
        isLoggedIn: true,
        loading: false,
        authenticating: false,
        notifications: [],
      };
    },
    [getMe.rejected]: (state, { payload }) => {
      state.authenticating = false;
    },
    [getMyNotifications.fulfilled]: (state, { payload }) => {
      state.notifications = payload.notifications;
    },

    [login.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      return {
        token: payload.token,
        user: {
          email: payload.idToken.payload.email,
          name: payload.idToken.payload.name,
          phone_number: payload.idToken.payload.phone_number,
          picture: payload.idToken.payload.picture,
          username: payload.accessToken.payload.username,
        },
        access_token: payload.accessToken.jwtToken,
        id_token: payload.idToken.jwtToken,
        refresh_token: payload.refreshToken.token,
        isLoggedIn: true,
        loading: false,
        authenticating: false,
        notifications: [],
      };
    },
    [login.rejected]: (state, { payload }) => {
      toast.error(payload.message);
      state.loading = false;
    },

    [signUp.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [signUp.fulfilled]: (state, { payload }) => {
      toast.success('signup successfull');
      console.log('payload', payload);
      // toast.success(payload.message);
      state.loading = false;
    },
    [signUp.rejected]: (state, { payload }) => {
      toast.error(payload.message);
      state.loading = false;
    },
    [confirmMail.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [confirmMail.fulfilled]: (state, { payload }) => {
      toast.success('Email Verification Successfull!');
      console.log('payload', payload);
      // toast.success(payload.message);
      state.loading = false;
    },
    [confirmMail.rejected]: (state, { payload }) => {
      toast.error(payload.message);
      state.loading = false;
    },

    [updateMe.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [updateMe.fulfilled]: (state, { payload }) => ({
      ...state,
      user: payload.user,
      isLoggedIn: true,
    }),
    [updatePassword.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [updatePassword.fulfilled]: (state, { payload }) => ({
      ...state,
      user: payload.user,
      isLoggedIn: true,
      notifications: [],
    }),
  },
});

export const { logout } = authSlice.actions;
export default authSlice;
