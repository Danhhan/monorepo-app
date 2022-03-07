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
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import styles from './JoinConfirmation.module.scss';

export type JoinConfirmationProps = {
  isVisiable: boolean;
  onConfirm?: (isCourseID: boolean, idPara?: number) => void;
  isLoading?: boolean;
  id?: number;
  onClose: () => void;
  isInputHandle?: boolean;
};

const JoinConfirmation: React.FC<JoinConfirmationProps> = ({
  onConfirm = (isCourseID: boolean, idPara?: number) => {},
  isVisiable = false,
  id,
  isLoading = false,
  onClose = () => {},
  isInputHandle = false,
}) => {
  return isVisiable ? (
    <Modal onClose={onClose}>
      <ModalHeader style={{ justifyContent: 'center' }}>
        <Text textAlign="center">
          <h3>
            <FormattedMessage defaultMessage="Join session" />
          </h3>
        </Text>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col justify-center items-center h-full">
          <div className={styles.confirmSessionBg} />
        </div>
      </ModalBody>
      <ModalFooter>
        <FlexGroup>
          <FlexItem>
            <Button
              fill
              onClick={() => {
                onConfirm(isInputHandle, id);
              }}
            >
              <FormattedMessage defaultMessage="Start session" />
            </Button>
          </FlexItem>
          <FlexItem>
            <Button color="danger" fill onClick={onClose}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </FlexItem>
        </FlexGroup>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default JoinConfirmation;
