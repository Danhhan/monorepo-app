import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalHeaderTitle,
  Button,
  LoadingContent,
  Spacer,
} from '@antoree/ant-ui';
import { Suspense } from 'react';
import { FormattedMessage } from 'react-intl';

import ErrorBoundary from 'components/ErrorBoundary';

import FeedbackForm from './FeedbackForm';

export type FeedbackModalProps = {
  id: number;
  closeModal: () => void;
  courseId: string | number;
};

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  id,
  closeModal,
  courseId,
}) => (
  <Modal style={{ width: 520 }} onClose={closeModal}>
    <ModalHeader>
      <ModalHeaderTitle>
        <FormattedMessage defaultMessage="Feedback from the teacher" />
      </ModalHeaderTitle>
    </ModalHeader>
    <ModalBody>
      <ErrorBoundary>
        <Suspense
          fallback={
            <div>
              <LoadingContent lines={3} />
              <Spacer />
              <LoadingContent lines={3} />
              <Spacer />
              <LoadingContent lines={3} />
            </div>
          }
        >
          <FeedbackForm id={id} courseId={courseId} />
        </Suspense>
      </ErrorBoundary>
    </ModalBody>
    <ModalFooter>
      <Button fill onClick={closeModal}>
        <FormattedMessage defaultMessage="close" />
      </Button>
    </ModalFooter>
  </Modal>
);

export default FeedbackModal;
