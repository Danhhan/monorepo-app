import { useContext } from 'react';
import { ErrorModalContext } from '../contexts/ErrorModalContext';

const useErrorModal = () => {
  const [state, dispatch] = useContext(ErrorModalContext);

  return [state, dispatch];
};
export default useErrorModal;
