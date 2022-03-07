/* eslint-disable radix */
import {
  Button,
  Text,
  Spacer,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
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
          <h2>Change the course schedule</h2>
        </Text>
      </ModalHeader>
      <ModalBody>
        <div className="flex flex-col justify-center items-center h-full">
          <Text size="s">
            <p>
              Cancel the current course and choose your teacher, date & time
              again.
            </p>
          </Text>
          <Spacer />
          <img src={ImgNotFound} alt="not-found" />
        </div>
      </ModalBody>
      <ModalFooter>
        <FlexGrid
          columns={1}
          gutterSize="s"
          style={{ textAlign: 'center', margin: 'auto' }}
        >
          <FlexItem>
            <Button
              fill
              style={{ width: '60%' }}
              className="mx-auto"
              onClick={onChangeCourse}
              isLoading={isLoading}
            >
              <FormattedMessage defaultMessage="Continue to change" />
            </Button>
          </FlexItem>
          <FlexItem>
            <ButtonEmpty
              style={{ width: '60%' }}
              className="mx-auto"
              onClick={onClose}
            >
              <FormattedMessage defaultMessage="No, just keep this" />
            </ButtonEmpty>
          </FlexItem>
        </FlexGrid>
      </ModalFooter>
    </Modal>
  ) : null;
};

export default ChangeCourse;
