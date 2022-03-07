import {
  FlexGroup,
  FlexItem,
  ButtonEmpty,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Text,
  Spacer,
} from '@antoree/ant-ui';

import { FormattedMessage } from 'react-intl';

export type FilterBarProps = {
  closeModalDelete: () => void;
  isModalVisibleDelete: boolean;
};

const ModalDeleteAffiliate: React.FC<FilterBarProps> = ({
  closeModalDelete = () => {},
  isModalVisibleDelete = false,
}) => {
  let modalEditDelete;
  if (isModalVisibleDelete) {
    modalEditDelete = (
      <Modal onClose={closeModalDelete}>
        <ModalHeader>
          <Text>
            <h3>
              <FormattedMessage defaultMessage="Ẩn chiến dịch" />
            </h3>
          </Text>
        </ModalHeader>
        <ModalBody>
          <div>Chiến dịch ẩn có thể kích hoạt lại sau.</div>
          <Spacer />
          <div style={{ float: 'right' }}>
            <FlexGroup className="w-full h-full flex justify-end items-center">
              <FlexItem>
                <ButtonEmpty onClick={closeModalDelete} color="text">
                  <p style={{ color: '#000000' }}>Đóng</p>
                </ButtonEmpty>
              </FlexItem>
              <FlexItem>
                <Button
                  iconType="trash"
                  onClick={closeModalDelete}
                  fill
                  color="warning"
                >
                  <p>Xác nhận</p>
                </Button>
              </FlexItem>
            </FlexGroup>
          </div>
        </ModalBody>
      </Modal>
    );
  }
  return <>{modalEditDelete}</>;
};

export default ModalDeleteAffiliate;
