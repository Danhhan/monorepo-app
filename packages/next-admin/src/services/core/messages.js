import { defineMessages } from 'react-intl';

const messages = {
  error: defineMessages({
    requestFailed: {
      defaultMessage: 'Something Went Wrong',
    },
    sessionExpired: {
      defaultMessage: 'Session expired. Please sign in again !',
    },
  }),
};

export default messages;
