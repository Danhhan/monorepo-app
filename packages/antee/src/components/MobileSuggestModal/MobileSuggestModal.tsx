/* eslint-disable radix */
import { Button, Text, Title, Spacer, Modal, ModalBody } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import styles from './MobileSuggestModal.module.scss';

export type MobileSuggestModalProps = {
  isVisiable: boolean;
  onConfirm?: (isCourseID: boolean, idPara?: number) => void;
  isLoading?: boolean;
  id?: number;
  onClose: () => void;
  isInputHandle?: boolean;
};

const MobileSuggestModal: React.FC<MobileSuggestModalProps> = ({
  onConfirm = (isCourseID: boolean, idPara?: number) => {},
  isVisiable = false,
  id,
  isLoading = false,
  onClose = () => {},
  isInputHandle = false,
}) => {
  return isVisiable ? (
    <Modal
      onClose={onClose}
      className="m-auto"
      maxWidth="80vw"
      style={{ maxHeight: '80vh', maxWidth: '80%' }}
    >
      <ModalBody className={styles.confirmSessionBg}>
        <div className=" h-full flex flex-col items-center justify-center justify-items-center text-white">
          <Title className="text-center text-white" size="m">
            <p>
              <FormattedMessage defaultMessage="Tải app Antoree để tham gia buổi test" />
            </p>
          </Title>
          <Text className="text-center" size="s">
            <p>
              <FormattedMessage defaultMessage="Chức năng tham gia gọi trên thiết bị di động chỉ hỗ trợ qua app Antoree." />
            </p>
          </Text>
          <Spacer size="m" />
          <Button fill>
            <a
              style={{ textDecoration: 'none', color: 'white' }}
              target="_blank"
              rel="noreferrer"
              href="http://bit.ly/Antoree-App"
            >
              <Text>
                <FormattedMessage defaultMessage="Tải app ngay" />
              </Text>
            </a>
          </Button>
        </div>
      </ModalBody>
    </Modal>
  ) : null;
};

export default MobileSuggestModal;
