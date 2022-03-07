import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import HeaderActionContext from './HeaderActionContext';

function HeaderActionProvider({ children }) {
  const [actions, setActions] = useState([]);

  const handleAddAction = useCallback(items => setActions(items), []);

  return (
    <HeaderActionContext.Provider value={{ actions, handleAddAction }}>
      {children}
    </HeaderActionContext.Provider>
  );
}

HeaderActionProvider.defaultProps = {
  children: null,
};

HeaderActionProvider.propTypes = {
  children: PropTypes.element,
};

export default HeaderActionProvider;
