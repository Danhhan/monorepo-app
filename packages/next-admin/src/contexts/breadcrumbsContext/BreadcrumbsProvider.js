import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import BreadcrumbsContext from './BreadcrumbsContext';

function BreadcrumbsProvider({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const replaceBreadcrumbsHandler = useCallback(
    items => setBreadcrumbs(items),
    [],
  );

  return (
    <BreadcrumbsContext.Provider
      value={{ breadcrumbs, replaceBreadcrumbsHandler }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
}

BreadcrumbsProvider.defaultProps = {
  children: null,
};

BreadcrumbsProvider.propTypes = {
  children: PropTypes.element,
};

export default BreadcrumbsProvider;
