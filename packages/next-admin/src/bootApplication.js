/* eslint-disable no-console */
import { getToken, removeToken } from 'helpers';
import * as authServices from 'services/auth';

const checkAuthenticated = async () => {
  try {
    const token = getToken();

    if (token) {
      await authServices.checkAuthenticated();

      return { authenticated: true, error: null };
    }

    removeToken();

    return {
      authenticated: false,
      error: new Error('unauthenticated'),
    };
  } catch (error) {
    removeToken();
    return {
      authenticated: false,
      error: new Error('unauthenticated'),
    };
  }
};

function intialBoot() {
  console.log(
    '%c Initial application booting...',
    'color: blue; font-weight: bold;',
  );

  let status = 'pending';
  let authenticated = false;

  const suspender = checkAuthenticated()
    .then(data => {
      status = 'success';
      authenticated = data.authenticated;

      if (authenticated) {
        console.log(
          '%c User has authenticated',
          'color: green; font-weight: bold;',
        );
      } else {
        console.log(
          '%c Unauthenticated user',
          'color: red; font-weight: bold;',
        );
      }

      console.log(
        '%c Boot application success!',
        'color: green; font-weight: bold;',
      );
    })
    .catch(() => {
      status = 'error';
      authenticated = false;
      console.log(
        '%c Boot application error!',
        'color: red; font-weight: bold;',
      );
    });

  return ({ onAuthenticated = () => {} } = {}) => {
    if (status === 'pending') throw suspender;

    if (authenticated) {
      onAuthenticated();
    }

    return authenticated;
  };
}

export default intialBoot;
