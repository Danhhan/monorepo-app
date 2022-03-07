/* eslint-disable react/prop-types */
import {
  Modal,
  ModalHeaderTitle,
  ModalFooter,
  ModalBody,
  Button,
  ButtonEmpty,
  Title,
  Spacer,
  Text,
} from '@antoree/ant-ui';

import bgImage from 'assets/images/questions-confirm.png';
import { FormattedMessage } from 'react-intl';

const CancelConfirm = ({
  handleSubmit,
  isLoading,
  isVisiable,
  close,
  courseId,
}) => {
  // const [{ permissions }] = useCurrentUser();

  return (
    <>
      {isVisiable && (
        <Modal className="p-4" onClose={close}>
          <ModalHeaderTitle>
            <Title>
              <FormattedMessage defaultMessage="Cancle Testing Course" />
            </Title>
            <Spacer size="s" />
            <Text size="s" color="subdued">
              <FormattedMessage
                defaultMessage="Do You Want To Cancel Course With {id}?"
                values={{ id: courseId }}
              />
            </Text>
          </ModalHeaderTitle>
          <ModalBody>
            <img
              width={300}
              // height={180}
              className="object-contain m-auto block"
              src={bgImage}
              alt="confirm-img"
            />
          </ModalBody>
          <ModalFooter>
            <ButtonEmpty onClick={close}>
              <FormattedMessage defaultMessage="Cancel" />
            </ButtonEmpty>

            <Button onClick={handleSubmit} fill isLoading={isLoading}>
              <FormattedMessage defaultMessage="Confirm" />
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default CancelConfirm;
