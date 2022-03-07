/* eslint-disable radix */
import {
  Button,
  Text,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalHeader,
  Spacer,
  ButtonEmpty,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import styles from './CreateConfirmation.module.scss';

export type CreateConfirmationProps = {
  isVisiable: boolean;
  onConfirm?: () => void;
  isLoading?: boolean;
  timeFrom?: string;
  isTesting?: boolean;
  dateFrom?: string;
  teacherInfo: {
    name: string;
    country: string;
    rating: number;
    avatar: string;
  };
  onClose: () => void;
};

const CreateConfirmation: React.FC<CreateConfirmationProps> = ({
  onConfirm = () => {},
  isVisiable = false,
  teacherInfo,
  isLoading,
  timeFrom,
  isTesting,
  dateFrom,
  onClose = () => {},
}) => {
  return isVisiable ? (
    <Modal onClose={onClose}>
      <ModalHeader style={{ justifyContent: 'center' }}>
        <Text textAlign="center">
          <h3>
            <FormattedMessage defaultMessage="Xác nhận đặt lịch" />
          </h3>
        </Text>
      </ModalHeader>
      <ModalBody>
        <Text size="s">
          <p>
            <FormattedMessage
              defaultMessage="Buổi {type} của bạn bắt đầu lúc : {timeFrom}, {date}."
              values={{
                type: isTesting ? 'test' : 'học thử',
                date: dateFrom,
                timeFrom,
              }}
            />
          </p>
        </Text>
        <Spacer />
        <div
          style={{ maxHeight: '40vh' }}
          className="flex flex-col justify-center items-center h-auto"
        >
          <div className={styles.confirmSessionBg} />
        </div>
        <Spacer />
        <FlexGroup direction="column">
          <FlexItem>
            <Button
              fill
              color="warning"
              onClick={() => {
                onConfirm();
              }}
              style={{ width: '60%' }}
              className="mx-auto"
              isLoading={isLoading}
            >
              <FormattedMessage defaultMessage="Xác nhận" />
            </Button>
          </FlexItem>
          <FlexItem>
            <ButtonEmpty
              color="text"
              style={{ width: '60%' }}
              className="mx-auto"
              onClick={onClose}
            >
              <FormattedMessage defaultMessage="Đặt lịch khác" />
            </ButtonEmpty>
          </FlexItem>
        </FlexGroup>
      </ModalBody>
    </Modal>
  ) : null;
};

export default CreateConfirmation;
