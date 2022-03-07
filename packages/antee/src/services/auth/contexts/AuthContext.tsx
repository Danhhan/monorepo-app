import { useCallback, useState, createContext, useContext } from 'react';
import { IS_USING_SUB_USER } from 'configs/env.conf';
import { Link, useHistory } from 'react-router-dom';

export interface IAuthContext {
  isAuthenticated: boolean;
  authenticateHandler: (accessToken?: string) => void;
  authenticateSubUserHandler: (accessToken?: string) => void;
  signOutHandler: () => void;
  signOutSubUserHandler: () => void;
  reGetUserProfile: () => void;
  choosedSubUser: boolean;
  setSubUserHandler: (userInput: {
    id?: number;
    userId?: number;
    name?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
  }) => void;
  userProfile: {
    id?: number;
    userId?: number;
    name?: string;
    email?: string;
    phone?: string;
    avatarUrl?: string;
  };
}

const initProfile = {
  id: undefined,
  userId: undefined,
  name: undefined,
  email: undefined,
  phone: undefined,
  avatarUrl: undefined,
};

export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: false,
  authenticateHandler: () => {},
  authenticateSubUserHandler: () => {},
  signOutHandler: () => {},
  signOutSubUserHandler: () => {},
  choosedSubUser: false,
  setSubUserHandler: () => {},
  reGetUserProfile: () => {},
  userProfile: initProfile,
});

export const AuthProvider: React.FC<{}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [choosedSubUser, setChoosedSubUser] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  const authenticateHandler = useCallback<(accessToken?: string) => void>(
    accessToken => {
      if (accessToken) {
        localStorage.setItem('token', accessToken);
        // window.location.reload();
      }

      if (IS_USING_SUB_USER) {
        reGetUserProfile();
      }

      setIsAuthenticated(true);
    },
    [],
  );

  const authenticateSubUserHandler = useCallback<
    (accessToken?: string) => void
  >(accessToken => {
    if (accessToken) {
      const preToken = localStorage.getItem('token');
      if (preToken) {
        localStorage.setItem('main-token', preToken);
        localStorage.setItem('token', accessToken);
      }

      setChoosedSubUser(true);
    }
  }, []);

  const setSubUserHandler = useCallback<
    (userInput: {
      id?: number;
      userId?: number;
      name?: string;
      email?: string;
      phone?: string;
      avatarUrl?: string;
    }) => void
  >(userInput => {
    if (userInput) {
      setUserProfile(userInput);
      localStorage.setItem('profile', JSON.stringify(userInput));
    }
  }, []);

  const reGetUserProfile = useCallback<() => void>(() => {
    const profile = localStorage.getItem('profile');
    if (profile) {
      const profileParsed = JSON.parse(profile);
      setUserProfile(profileParsed);

      setChoosedSubUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOutSubUserHandler = useCallback(() => {
    const preToken = localStorage.getItem('main-token');
    if (preToken) {
      localStorage.setItem('token', preToken);
      localStorage.removeItem('main-token');
    }
    localStorage.removeItem('profile');
    setUserProfile(initProfile);
    setChoosedSubUser(false);
  }, []);
  const history = useHistory();
  const signOutHandler = useCallback(() => {
    localStorage.removeItem('main-token');
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    setUserProfile(initProfile);
    setChoosedSubUser(false);
    setIsAuthenticated(false);
    {
      window?.location?.pathname === '/affiliates' ||
      window?.location?.pathname === '/affiliateList' ||
      window?.location?.pathname === '/affiliateDashboard'
        ? history?.push('/sign-in')
        : window?.location?.reload();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setSubUserHandler,
        authenticateHandler,
        authenticateSubUserHandler,
        signOutHandler,
        signOutSubUserHandler,
        isAuthenticated,
        choosedSubUser,
        reGetUserProfile,
        userProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
