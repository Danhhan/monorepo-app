/* eslint-disable radix */
import {
  Button,
  Text,
  FlexItem,
  Modal,
  ModalBody,
  ModalHeader,
  Spacer,
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
          <h2>Change the course schedule</h2>
        </Text>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col justify-center items-center">
          <Text size="s">
            <p>
              Cancel the current course and choose your teacher, date & time
              again.
            </p>
          </Text>
          <Spacer />
          <img src={ImgNotFound} alt="not-found" />
        </div>
        <Spacer />
        <FlexGrid
          columns={1}
          gutterSize="s"
          style={{ textAlign: 'center', margin: 'auto' }}
        >
          <FlexItem>
            <Button
              fill
              onClick={onChangeCourse}
              isLoading={isLoading}
              style={{ width: '60%' }}
              className="mx-auto"
            >
              <FormattedMessage defaultMessage="Continue to change" />
            </Button>
          </FlexItem>
          <FlexItem>
            <ButtonEmpty
              color="text"
              onClick={onClose}
              style={{ width: '60%' }}
              className="mx-auto"
            >
              <FormattedMessage defaultMessage="No, just keep this" />
            </ButtonEmpty>
          </FlexItem>
        </FlexGrid>
      </ModalBody>
    </Modal>
  ) : null;
};

export default ChangeCourse;
