import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { getCurrentUser, GET_CURRENT_USER } from 'services/auth';
import UserContext from './UserContext';

// eslint-disable-next-line react/prop-types
function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  const queryClient = useQueryClient();

  const fetchCurrentUser = async () => {
    try {
      const data = await queryClient.fetchQuery(
        GET_CURRENT_USER,
        () => getCurrentUser(),
        {
          staleTime: 10000,
        },
      );

      setCurrentUser(data);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
