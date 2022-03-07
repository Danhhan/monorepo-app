/* eslint-disable radix */
import {
  Button,
  Text,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ButtonEmpty,
  Spacer,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import styles from './CancelConfirmation.module.scss';

export type CancelConfirmationProps = {
  isVisiable: boolean;
  onConfirm?: Function;
  isLoading?: boolean;
  onClose: () => void;
};

const CancelConfirmation: React.FC<CancelConfirmationProps> = ({
  onConfirm = () => {},
  isVisiable = false,
  isLoading = false,
  onClose = () => {},
}) => {
  return isVisiable ? (
    <Modal onClose={onClose}>
      <ModalHeader style={{ justifyContent: 'center' }}>
        <Text textAlign="center">
          <h3>
            <FormattedMessage defaultMessage="Change the test schedule" />
          </h3>
        </Text>
      </ModalHeader>

      <ModalBody>
        <Text size="s">
          <FormattedMessage defaultMessage="Cancel the current session and choose your testing teacher, date & time again." />
        </Text>
        <Spacer />
        <div className="flex flex-col justify-center items-center h-auto">
          <div className={styles.confirmSessionBg} />
        </div>
        <Spacer />
      </ModalBody>
      <ModalFooter>
        <FlexGroup direction="column">
          <FlexItem>
            <Button
              fill
              onClick={() => {
                onConfirm();
              }}
              isLoading={isLoading}
            >
              <FormattedMessage defaultMessage="Continue to change" />
            </Button>
          </FlexItem>
          <FlexItem>
            <ButtonEmpty color="text" onClick={onClose}>
              <FormattedMessage defaultMessage="No, just keep this" />
            </ButtonEmpty>
          </FlexItem>
        </FlexGroup>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default CancelConfirmation;
