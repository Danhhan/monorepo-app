import { useContext } from 'react';
import { CurrentUserContext } from 'contexts/UserContext';

const useCurrentUser = () => {
  const { currentUser, fetchCurrentUser } = useContext(CurrentUserContext);

  return [currentUser, fetchCurrentUser];
};

export default useCurrentUser;
