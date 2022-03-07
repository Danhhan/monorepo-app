import { createContext, useContext } from 'react';
import { useRetrieveCurrentUser } from 'services/user';

export interface IUserContext {
  id: number;
  displayName: string;
  firstName: string;
  avatarUrl: string;
  permissions: string[];
}

const UserContext = createContext<IUserContext>({
  displayName: '',
  firstName: '',
  avatarUrl: '',
  permissions: [],
  id: 0,
});

export const UserProvider: React.FC<{}> = ({ children }) => {
  const { data } = useRetrieveCurrentUser({
    enabled: !!localStorage.getItem('token'),
  });

  return (
    <UserContext.Provider
      value={{
        displayName: data?.data.displayName ?? '',
        id: data?.data.id ?? 0,
        firstName: data?.data.firstName ?? '',
        avatarUrl: data?.data.avatar ?? '',
        permissions: data?.data.permissions ?? [],
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => useContext(UserContext);
