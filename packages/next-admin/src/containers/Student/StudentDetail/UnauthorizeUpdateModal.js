import {
  Modal,
  ModalHeaderTitle,
  ModalFooter,
  ModalBody,
  ButtonEmpty,
  Title,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

const UnauthorizeUpdateModal = ({ close, isVisible, carer }) => {
  return isVisible && carer ? (
    <Modal className="p-4" onClose={close}>
      <ModalHeaderTitle>
        <Title size="s">
          <p>
            <FormattedMessage defaultMessage="This contact has been care by someone" />
          </p>
        </Title>
        <Spacer size="s" />
        <Text size="m" color="subdued">
          <p>
            <FormattedMessage defaultMessage="Saleman Information:" />
          </p>
        </Text>
      </ModalHeaderTitle>
      <ModalBody>
        <img
          width={200}
          height={200}
          className="object-contain my-8 mx-auto block rounded-full"
          src={carer?.avatarUrl}
          alt="confirm-img"
        />
        <Text>Name:&nbsp;{`${carer?.firstName} ${carer?.lastName}`}</Text>
        <Text>Email:&nbsp;{carer?.email}</Text>
      </ModalBody>
      <ModalFooter style={{ justifyContent: 'center' }}>
        <ButtonEmpty onClick={close}>
          <FormattedMessage defaultMessage="Okay" />
        </ButtonEmpty>
      </ModalFooter>
    </Modal>
  ) : null;
};

UnauthorizeUpdateModal.defaultProps = {
  close: () => {},
  isVisible: false,
  carer: undefined,
};

UnauthorizeUpdateModal.propTypes = {
  close: PropTypes.func,
  isVisible: PropTypes.bool,
  carer: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
  }),
};

export default UnauthorizeUpdateModal;
