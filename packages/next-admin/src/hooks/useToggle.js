import { useState, useCallback } from 'react';

const useToggle = () => {
  const [isVisiable, setIsVisiable] = useState(false);

  const toggle = useCallback(() => {
    setIsVisiable(prevState => !prevState);
  }, []);

  const close = useCallback(() => {
    setIsVisiable(false);
  }, []);

  const open = useCallback(() => {
    setIsVisiable(true);
  }, []);

  return {
    isVisiable,
    toggle,
    open,
    close,
  };
};

export default useToggle;
