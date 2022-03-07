import {
  OverlayMask,
  Modal,
  ModalHeader,
  ModalHeaderTitle,
  ModalBody,
  ModalFooter,
  ButtonEmpty,
  Button,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';

function CustomConfirmModal(props) {
  const {
    closeModalhandler,
    onConfirm,
    onCancel,
    title,
    body,
    buttonColor,
    buttonForm,
    buttonType,
    cancelButtonText,
    confirmButtonText,
    // TODO: implemnt initialFocus
    // defaultFocusedButton,
  } = props;

  const confirmHandler = () => {
    // Trigger onConfirm() function prop
    onConfirm(closeModalhandler);
  };

  const cancelModalhandler = () => {
    closeModalhandler();

    // Trigger onCancel() function prop
    onCancel();
  };

  return (
    <OverlayMask>
      <Modal onClose={cancelModalhandler}>
        <ModalHeader>
          <ModalHeaderTitle>{title}</ModalHeaderTitle>
        </ModalHeader>
        <ModalBody>{body(closeModalhandler)}</ModalBody>
        <ModalFooter>
          <ButtonEmpty onClick={cancelModalhandler}>
            {cancelButtonText}
          </ButtonEmpty>
          <Button
            fill
            color={buttonColor}
            onClick={confirmHandler}
            form={buttonForm}
            type={buttonType}
          >
            {confirmButtonText}
          </Button>
        </ModalFooter>
      </Modal>
    </OverlayMask>
  );
}

CustomConfirmModal.defaultProps = {
  closeModalhandler: () => {},
  onConfirm: () => {},
  onCancel: () => {},
  title: null,
  body: null,
  buttonColor: 'primary',
  buttonForm: undefined,
  buttonType: undefined,
  cancelButtonText: "No, don't do it",
  confirmButtonText: 'Yes, do it',
};

CustomConfirmModal.propTypes = {
  closeModalhandler: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  title: PropTypes.elementType,
  body: PropTypes.node,
  buttonColor: PropTypes.oneOf([
    'primary',
    'secondary',
    'warning',
    'danger',
    'ghost',
  ]),
  buttonForm: PropTypes.string,
  buttonType: PropTypes.string,
  cancelButtonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
};

export default CustomConfirmModal;
