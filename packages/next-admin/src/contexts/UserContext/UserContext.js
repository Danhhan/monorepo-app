import { createContext } from 'react';

const UserContext = createContext({
  currentUser: {},
  fetchCurrentUser: () => {},
});

export default UserContext;
