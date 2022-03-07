import {
  Button,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Text,
  Title,
} from '@antoree/ant-ui';
import bgImage404 from 'assets/images/Errors/404.svg';
import bgImage500 from 'assets/images/Errors/500.svg';
import { STATUS_CODE } from 'configs/app.constants';
import { useErrorModal } from 'hooks';
import { FormattedMessage } from 'react-intl';

function ErrorModal() {
  const [state, dispatch] = useErrorModal();
  const { isVisiable, error } = state;
  // eslint-disable-next-line no-underscore-dangle
  const statusCode = error?.response?.data?._status;
  const urlBgImage =
    statusCode === STATUS_CODE.NOT_FOUND ? bgImage404 : bgImage500;
  // eslint-disable-next-line no-underscore-dangle
  const errorMessage = error?.response?.data?._messages;
  const closeModal = () => {
    dispatch({
      type: 'CLOSE_ERROR_MODAL',
    });
  };
  return (
    <>
      {isVisiable && (
        <Modal
          maxWidth={false}
          onClose={closeModal}
          style={{
            width: 448,
            height: 400,
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          <ModalHeader
            style={{
              backgroundColor: '#F5F7FA',
              padding: 0,
            }}
          >
            <img
              width={183.63}
              className="object-contain m-auto block"
              src={urlBgImage}
              alt="confirm-img"
            />
          </ModalHeader>
          <ModalBody>
            <FlexGroup>
              <FlexItem>
                <Title className="text-left" size="m">
                  <p>Phát hiện lỗi</p>
                </Title>
                <Text className="text-left text-red-600" size="m">
                  <p>
                    {errorMessage ||
                      `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's`}
                  </p>
                </Text>
              </FlexItem>
            </FlexGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              fill
              style={{ backgroundColor: '#343741', border: 'none' }}
              onClick={closeModal}
            >
              <FormattedMessage defaultMessage="Đóng" />
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

export default ErrorModal;
