import config from 'configs/app.config';
import makeRequest, { HTTP_METHOD } from '../core';
import * as AUTH_URL from './constants';

export const signIn = async ({ username, password }) => {
  const params = {
    username,
    password,
    client_id: parseInt(config.clientId, 10),
    client_secret: config.clientSecret,
    grant_type: 'password',
  };

  const result = await makeRequest(AUTH_URL.SIGN_IN, HTTP_METHOD.POST, params);

  return result;
};

export const checkAuthenticated = async () => {
  const result = await makeRequest(
    AUTH_URL.CHECK_AUTHENTICATED,
    HTTP_METHOD.GET,
  );

  return result;
};

export const getCurrentUser = async () => {
  const result = await makeRequest(AUTH_URL.GET_CURRENT_USER, HTTP_METHOD.GET);
  // eslint-disable-next-line no-console

  return result;
};
