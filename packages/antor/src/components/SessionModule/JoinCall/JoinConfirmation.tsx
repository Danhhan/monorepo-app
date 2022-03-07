/* eslint-disable radix */
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  FlexGroup,
  FlexItem,
  Button,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';

import styles from './JoinConfirmation.module.scss';

export type JoinConfirmationProps = {
  handleCalling?: (isCourseID: boolean, idPara?: number) => void;
  closeModal?: () => void;
  isLoading?: boolean;
  id?: number;
  isModalVisible?: boolean;
  isInputHandle?: boolean;
};

const JoinConfirmation: React.FC<JoinConfirmationProps> = ({
  handleCalling = (isCourseID: boolean, idPara?: number) => {},
  closeModal = () => {},
  id,
  isLoading = false,
  isModalVisible = false,
  isInputHandle = false,
}) => {
  return isModalVisible ? (
    <Modal onClose={closeModal}>
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
                handleCalling(isInputHandle, id);
              }}
              isLoading={isLoading}
            >
              <FormattedMessage defaultMessage="Start session" />
            </Button>
          </FlexItem>
          <FlexItem>
            <Button color="danger" fill onClick={closeModal}>
              <FormattedMessage defaultMessage="Cancel" />
            </Button>
          </FlexItem>
        </FlexGroup>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default JoinConfirmation;
