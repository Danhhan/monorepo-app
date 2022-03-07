import { useState, useCallback } from 'react';

const useFormModal = ({ visibleDefault = false } = {}) => {
  const [isVisible, setIsVisible] = useState(visibleDefault);

  const [extendedData, setExtendedData] = useState();

  const show = useCallback(data => {
    setIsVisible(true);

    // Store temporary data
    setExtendedData(data);
  }, []);

  const close = useCallback(() => {
    setIsVisible(false);

    // Reset temporary data
    setExtendedData();
  }, []);

  return { isVisible, show, close, extendedData };
};

export default useFormModal;
