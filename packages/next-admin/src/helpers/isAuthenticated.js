import { getToken } from './token';

const isAuthenticated = () => {
  const token = getToken();

  return Boolean(token);
};

export default isAuthenticated;
