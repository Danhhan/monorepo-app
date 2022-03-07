import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';

const isAuthenticated: () => Boolean = () => {
  const token = localStorage.getItem('token');

  return Boolean(token);
};

interface PrivateRouterProps extends RouteProps {
  redirectPath?: string;
}

const PrivateRouter: React.FC<PrivateRouterProps> = ({
  children,
  redirectPath = '/',
  ...rest
}) => {
  const location = useLocation();
  if (!isAuthenticated()) {
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
