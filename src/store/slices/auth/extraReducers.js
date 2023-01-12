import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

export const getMe = createAsyncThunk(
  '/auth/getMe',
  async (userPool, { rejectWithValue }) => {
    const user = userPool.getCurrentUser();
    console.log('user', user);

    return new Promise((resolve, reject) => {
      user.getSession((err, session) => {
        console.log('session', session);
        console.log('err', err);
        if (err) {
          return reject(rejectWithValue(err));
        } else {
          if (session.isValid()) {
            return resolve(session);
          } else {
            return reject('Session Expired');
          }
        }
      });
    });
  }
);

export const login = createAsyncThunk(
  '/auth/login',
  async ({ username, password, userPool }, { rejectWithValue }) => {
    console.log('started');
    const authData = {
      Username: username,
      Password: password,
    };
    const authDetails = new AuthenticationDetails(authData);
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitoUser = new CognitoUser(userData);
    return new Promise((resolve, reject) => {
      cognitoUser.authenticateUser(authDetails, {
        onSuccess(result) {
          console.log(result);
          return resolve(result);
        },
        onFailure(err) {
          console.log(err);
          return reject(rejectWithValue(err));
        },
      });
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

export const confirmMail = createAsyncThunk(
  '/auth/confirmMail',
  async ({ username, userPool, code }, { rejectWithValue }) => {
    const userData = {
      Username: username,
      Pool: userPool,
    };
    const cognitUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          return reject(rejectWithValue(err));
        }

        console.log('result', result);

        return resolve({ user: result.user });
      });
    });
  }
);
