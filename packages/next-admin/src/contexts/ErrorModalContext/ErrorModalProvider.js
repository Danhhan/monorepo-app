import { useReducer } from 'react';
import ErrorModalContext from './ErrorModalContext';
import errorModalReducer, { initState } from './ErrorModalReducer';
// eslint-disable-next-line react/prop-types
function ErrorModalProvider({ children }) {
  const [state, dispatch] = useReducer(errorModalReducer, initState);
  return (
    <ErrorModalContext.Provider value={[state, dispatch]}>
      {children}
    </ErrorModalContext.Provider>
  );
}

export default ErrorModalProvider;
