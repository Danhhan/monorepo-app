import PropTypes from 'prop-types';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { isAuthenticated } from 'helpers';

function PrivateRouter({ children, redirectPath, ...rest }) {
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
}

PrivateRouter.defaultProps = {
  redirectPath: '/',
};

PrivateRouter.propTypes = {
  redirectPath: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PrivateRouter;
