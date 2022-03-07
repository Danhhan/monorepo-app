import { defineMessages } from 'react-intl';

const messages = {
  label: defineMessages({
    pageTitle: {
      defaultMessage: 'Hello !',
    },
    email: {
      defaultMessage: 'Email',
    },
    password: {
      defaultMessage: 'Password',
    },
    rememberMe: {
      defaultMessage: 'Remember me',
    },
    signIn: {
      defaultMessage: 'Sign in',
    },
    signUp: {
      defaultMessage: 'Sign up',
    },
    register: {
      defaultMessage: 'Register',
    },
  }),
  description: defineMessages({
    forgotPass: {
      defaultMessage: 'Forgot password ?',
    },
    register: {
      defaultMessage: 'Need an account?',
    },
  }),
  validate: defineMessages({
    require: {
      defaultMessage: '{field} is required',
    },
    email: {
      defaultMessage: 'Invaild email',
    },
    minLength: {
      defaultMessage: 'Minimum length is {length}',
    },
    sessionId: {
      defaultMessage: 'Invalid session id',
    },
  }),
  error: defineMessages({
    invalidIdentifier: {
      defaultMessage: 'Invaild email or password',
    },
    userNotFound: {
      defaultMessage: 'User not found',
    },
  }),
};

export default messages;
