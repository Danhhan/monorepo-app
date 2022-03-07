/* eslint-disable no-nested-ternary */
import {
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalHeaderTitle,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import AvatarWithLabel from 'components/AvatarWithLabel';
import { useToggle } from 'hooks';
import { useIntl } from 'react-intl';
import { User } from 'services/course';
import styled from '@emotion/styled';

export type CourseNoteProps = {
  id: number;
  student: User;
  note: string;
};
export const StyleWrapperButton = styled.div`
  .euiButtonEmpty__content {
    align-items: baseline;
  }
`;
const CourseNote: React.FC<CourseNoteProps> = ({ id, student, note }) => {
  const { isVisiable, toggle, close } = useToggle();
  const intl = useIntl();
  return (
    <>
      <StyleWrapperButton>
        <ButtonEmpty
          onClick={(e: any) => {
            e.stopPropagation();
            toggle();
          }}
        >
          <p>View note</p>
        </ButtonEmpty>
      </StyleWrapperButton>

      {isVisiable && (
        <Modal
          onClose={(e: any) => {
            e.stopPropagation();
            close();
          }}
          style={{ minWidth: 480 }}
        >
          <ModalHeader>
            <ModalHeaderTitle>
              <h1>Student note</h1>
            </ModalHeaderTitle>
          </ModalHeader>
          <ModalBody>
            <FlexGroup responsive={false} gutterSize="s">
              <AvatarWithLabel student={student} />
            </FlexGroup>
            <Spacer size="m" />
            <FlexGroup responsive={false} gutterSize="s">
              <FlexItem grow={false}>
                <Text color="subdued" className="text-base">
                  <p>Course ID {id}</p>
                </Text>
              </FlexItem>
            </FlexGroup>
            <FlexGroup responsive={false} gutterSize="s">
              <FlexItem grow={false}>
                <p>{note}</p>
              </FlexItem>
            </FlexGroup>
          </ModalBody>

          <ModalFooter>
            <ButtonEmpty
              color="text"
              onClick={(e: any) => {
                e.stopPropagation();
                close();
              }}
            >
              Close
            </ButtonEmpty>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
};

export default CourseNote;
