/* eslint-disable radix */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-else-return */
/* eslint-disable react/prop-types */
import {
  Button,
  Modal,
  HorizontalRule,
  Title,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ButtonEmpty,
  notification,
} from '@antoree/ant-ui';
import { useSendTestResult } from 'services/session';
import { FormattedMessage } from 'react-intl';
import { useToggle } from 'hooks';
import TestResultForm from './TestResultForm';

export type TestResultProps = {
  title: string;
  sessionId: number | string;
  studentName: string;
  isAdult: boolean;
  test: {
    url: string;
  };
  avatarUrl: string;
  onReload: () => void;
};

const TestResult: React.FC<TestResultProps> = ({
  title,
  sessionId,
  studentName,
  isAdult,
  test,
  avatarUrl,
  onReload,
}) => {
  const { isVisiable, close, open } = useToggle();

  const { mutate, isLoading } = useSendTestResult({
    onSuccess: data => {
      notification.success({
        title: <FormattedMessage defaultMessage="Send test result success" />,
      });
      onReload();
      window.open(data?.data?.url, '_blank');
      close();
    },
    onError: () => {
      notification.error({
        title: <FormattedMessage defaultMessage="Send test result fail" />,
      });
    },
  });

  return (
    <>
      {!test ? (
        <ButtonEmpty onClick={() => open()} className="h-6">
          Add result
        </ButtonEmpty>
      ) : (
        <ButtonEmpty
          onClick={() => window.open(test?.url, '_blank')}
          className="h-6"
          iconType="checkInCircleFilled"
          color="text"
        >
          View result
        </ButtonEmpty>
      )}

      {isVisiable && (
        <Modal
          style={{ width: '800px', maxWidth: '1000px' }}
          onClose={close}
          maxWidth={false}
        >
          <ModalHeader>
            <Title size="m">
              <h2>
                {/* <FormattedMessage defaultMessage="Test Result" /> */}
                <FormattedMessage defaultMessage="Add test result" />
              </h2>
            </Title>
          </ModalHeader>
          <HorizontalRule margin="s" />
          <ModalBody>
            <TestResultForm
              mutate={mutate}
              title={title}
              sessionId={sessionId}
              studentName={studentName}
              avatarUrl={avatarUrl}
              isAdult={isAdult}
            />
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={close}>
              {/* <FormattedMessage defaultMessage="Cancel" /> */}
              <FormattedMessage defaultMessage="Close" />
            </ButtonEmpty>
            <Button
              fill
              type="submit"
              form="test-result-form"
              isLoading={isLoading}
              // onClick={() => {
              //   console.log('handleConfirm here');
              // }}
            >
              {/* <FormattedMessage defaultMessage="Send" /> */}
              <FormattedMessage defaultMessage="Submit" />
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default TestResult;
