import { RETRIEVE_CURRENT_USER, retrieveCurrentUser } from 'services/user';

import { queryClient } from './AppProvider';

export const initBoot = () => {
  let status = 'pending';
  // eslint-disable-next-line no-console
  console.info('%c Booting application...', 'color: blue; font-weight: bold;');
  const suspender = (onAuthenticated: () => void) =>
    queryClient
      .fetchQuery([RETRIEVE_CURRENT_USER], () => retrieveCurrentUser())
      .then(() => {
        onAuthenticated();
      })
      .finally(() => {
        status = 'success';
      });
  return {
    start(onAuthenticated: () => void) {
      if (status === 'pending') {
        throw suspender(onAuthenticated);
      }
    },
  };
};
