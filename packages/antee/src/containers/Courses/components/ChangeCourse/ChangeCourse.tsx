/* eslint-disable radix */
import {
  Button,
  Text,
  FlexItem,
  Modal,
  ModalBody,
  Spacer,
  ModalHeader,
  FlexGrid,
  ButtonEmpty,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import ImgNotFound from 'assets/images/todayCourseNotFound.svg';

export type JoinConfirmationProps = {
  isVisiable: boolean;
  isLoading?: boolean;
  onClose: () => void;
  onChangeCourse: () => void;
};

const ChangeCourse: React.FC<JoinConfirmationProps> = ({
  isVisiable = false,
  isLoading = false,
  onClose = () => {},
  onChangeCourse = () => {},
}) => {
  return isVisiable ? (
    <Modal onClose={onClose}>
      <ModalHeader>
        <Text size="s" style={{ textAlign: 'center', width: '100%' }}>
          <h2>Thay đổi lịch khóa học</h2>
        </Text>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col justify-center items-center">
          <Text size="s">
            <p>
              Hủy khóa học hiện tại và chọn lại giáo viên, ngày và giờ của bạn
            </p>
          </Text>
          <Spacer />
          <img src={ImgNotFound} alt="not-found" />
        </div>
        <Spacer />

        <Button
          style={{ marginLeft: '35%' }}
          fill
          onClick={onChangeCourse}
          isLoading={isLoading}
        >
          <FormattedMessage defaultMessage="Tiếp tục thay đổi" />
        </Button>
        <ButtonEmpty
          style={{
            marginLeft: '30%',
            textAlign: 'center',
            alignItems: 'center',
          }}
          onClick={onClose}
        >
          <FormattedMessage defaultMessage="Tôi không muốn thay đổi" />
        </ButtonEmpty>
      </ModalBody>
    </Modal>
  ) : null;
};

export default ChangeCourse;
