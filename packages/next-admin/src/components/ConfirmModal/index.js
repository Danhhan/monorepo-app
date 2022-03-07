import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

let showModalHandler = () => {
  // eslint-disable-next-line no-console
  console.warn('Setup <GlobalConfirmModal /> before use this method.');
};

// Confirm info modal
export const showConfirmInfo = confirmModalProps =>
  showModalHandler({
    ...confirmModalProps,
    buttonColor: 'primary',
  });

// Confirm destroy modal
export const showConfirmDestroy = confirmModalProps =>
  showModalHandler({
    ...confirmModalProps,
    buttonColor: 'danger',
    defaultFocusedButton: 'cancel',
  });

function GlobalConfirmModal() {
  const [isVisible, setIsVisible] = useState(false);
  const [confirmModalProps, setConfirmModalProps] = useState({});

  const closeModalhandler = () => {
    setIsVisible(false);

    // Reset confirm modal state
    setConfirmModalProps({});
  };

  showModalHandler = props => {
    // Set confirm modal state
    setConfirmModalProps({ ...props });

    setIsVisible(true);
  };

  return isVisible ? (
    <ConfirmModal
      closeModalhandler={closeModalhandler}
      {...confirmModalProps}
    />
  ) : null;
}

ConfirmModal.destroy = showConfirmDestroy;
ConfirmModal.info = showConfirmInfo;

export { GlobalConfirmModal, ConfirmModal };
