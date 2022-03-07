import {
  Button,
  ButtonEmpty,
  FormRow,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalHeaderTitle,
  TextArea,
} from '@antoree/ant-ui';
import { useState } from 'react';

export type AbsenceReasonModalProps = {
  close: () => void;
  onConfirmAbsent: (absenceReason: string) => void;
  isLoading: boolean;
};
const AbsenceReasonModal: React.FC<AbsenceReasonModalProps> = ({
  close,
  onConfirmAbsent,
  isLoading,
}) => {
  const [absenceReason, setAbsenceReason] = useState<string>();
  const [isRequired, setRequired] = useState(false);

  const handleConfirm = () => {
    if (!absenceReason) {
      setRequired(true);
      return;
    }
    onConfirmAbsent(absenceReason);
  };

  return (
    <>
      <Modal onClose={close}>
        <ModalHeader>
          <ModalHeaderTitle>
            <h1>Absence reason</h1>
          </ModalHeaderTitle>
        </ModalHeader>

        <ModalBody>
          <FormRow
            fullWidth
            label="Reason"
            required
            isInvalid={isRequired}
            error="Required"
          >
            <TextArea
              placeholder="Enter your reason"
              aria-label="Absence reason"
              onChange={e => {
                setAbsenceReason(e.target.value);
                if (e.target.value) {
                  setRequired(false);
                } else setRequired(true);
              }}
            />
          </FormRow>
          <span style={{ color: '#69707D' }}>
            Help your student know the details.
          </span>
        </ModalBody>

        <ModalFooter>
          <ButtonEmpty onClick={close}>Cancel</ButtonEmpty>
          <Button fill onClick={handleConfirm} isLoading={isLoading}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AbsenceReasonModal;
