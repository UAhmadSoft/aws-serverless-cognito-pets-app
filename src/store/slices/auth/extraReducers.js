import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userApi from 'api/users';
import { toast } from 'react-toastify';

import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

export const getMe = createAsyncThunk(
  '/auth/getMe',
  async (_, { rejectWithValue }) => {
    return userApi
      .getMe()
      .then((res) => ({ token: res.data.token, user: res.data.user }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const getMyNotifications = createAsyncThunk(
  '/auth/getMyNotifications',
  async (_, { rejectWithValue }) => {
    return userApi
      .getMyNotifications()
      .then((res) => ({ notifications: res.data.notifications }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const updatePassword = createAsyncThunk(
  '/auth/update-password',
  async (newProfile, { rejectWithValue }) => {
    return userApi
      .updatePassword(newProfile)
      .then((res) => ({ user: res.data.user }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const updateMe = createAsyncThunk(
  '/auth/updateMe',
  async (newProfile, { rejectWithValue }) => {
    return userApi
      .updateMe(newProfile)
      .then((res) => ({ user: res.data.user }))
      .catch((err) => {
        return rejectWithValue(err);
      });
  }
);

export const login = createAsyncThunk(
  '/auth/login',
  async (values, { rejectWithValue }) => {
    return userApi
      .logIn(values)
      .then((res) => ({ token: res.data.token, user: res.data.user }))
      .catch((err) => {
        toast.error(err);
        return rejectWithValue(err);
      });
  }
);

export const signUp = createAsyncThunk(
  '/auth/signUp',
  async ({ data, userPool }, { rejectWithValue }) => {
    const user = {
      username: data.username,
      email: data.email,
      password: data.password,
      age: data.age,
      name: data.name,
    };

    const attrList = []; // * For Other Attributes
    const emailAttribute = {
      Name: 'email',
      Value: user.email,
    };
    const usernameAttribute = {
      Name: 'username',
      Value: user.username,
    };
    const ageAttribute = {
      Name: 'age',
      Value: `${user.age}`,
    };
    const nameAttribute = {
      Name: 'name',
      Value: user.name,
    };
    const pictureAttribute = {
      Name: 'picture',
      Value: 'https://i.imgur.com/BAzCK7Y.png',
    };
    const genderAttribute = {
      Name: 'gender',
      Value: 'make',
    };
    const phoneNumberAttribute = {
      Name: 'phone_number',
      Value: '+923175115069',
    };

    // attrList.push(new CognitoUserAttribute(usernameAttribute));
    attrList.push(new CognitoUserAttribute(emailAttribute));
    // attrList.push(new CognitoUserAttribute(ageAttribute));
    attrList.push(new CognitoUserAttribute(nameAttribute));
    attrList.push(new CognitoUserAttribute(pictureAttribute));
    attrList.push(new CognitoUserAttribute(genderAttribute));
    attrList.push(new CognitoUserAttribute(phoneNumberAttribute));

    return new Promise((resolve, reject) => {
      userPool.signUp(
        user.username,
        user.password,
        // [],
        attrList,
        null,
        (err, result) => {
          console.log('err', err);
          console.log('result', result);
          if (err) return reject(rejectWithValue(err));
          // if (err) return reject( err.message || 'Something went wrong');
          return resolve({ user: result.user });
        }
      );
    });
  }
);
