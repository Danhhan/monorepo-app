import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';

import { useAuth } from 'services/auth/contexts';

interface PrivateRouterProps extends RouteProps {
  redirectPath?: string;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({
  children,
  redirectPath = '/',
  ...rest
}) => {
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Redirect
        to={{
          pathname: redirectPath,
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest}>{children}</Route>;
};

export default PrivateRouter;
