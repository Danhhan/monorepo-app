/* eslint-disable react/self-closing-comp */
/* eslint-disable no-underscore-dangle */
import {
  Button,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  TabbedContent,
  Text,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { useToggle } from 'hooks';
import { getLearningRequestsBy, GET_LR_BY } from 'services/learningRequest';
import { HISTORY_NOTE_ID, NEW_NOTE_ID, TAGS } from '../constant';
import CreateNoteForm from './CreateNoteForm';
import NoteHistory from './NoteHistory';

function NoteModal({
  contactId,
  updateLearningRequestNoteMutation,
  hasLearningRequestNoted,
}) {
  const UPDATE_LEARNING_REQUEST_NOTE_FORM_ID = 'update-learning-request-note';
  const [optionsLR, setOptionsLR] = useState([]);
  const [selectedTab, setSelectedTab] = useState(NEW_NOTE_ID);
  const { isVisiable, open, close } = useToggle();

  const intl = useIntl();

  const { data, isLoading } = useQuery(
    [GET_LR_BY(contactId)],
    () => getLearningRequestsBy(contactId),
    {
      enabled: isVisiable,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );
  const getTagText = value => {
    const tags = TAGS.find(tag => tag.value === value);
    if (tags) {
      return `(${intl.formatMessage(tags.label)})`;
    }
    return '';
  };

  useEffect(() => {
    const learningRequests =
      data?.learningRequests?.length > 0
        ? data?.learningRequests?.map(({ name, id, level, tag }) => ({
            label: `LR ${id} ${name} Level ${level} ${getTagText(tag)}`,
            id,
            key: id,
            level,
          }))
        : [];
    setOptionsLR(learningRequests);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const tabs = [
    {
      id: NEW_NOTE_ID,
      name: <p>Ghi chú mới</p>,
      content: (
        <CreateNoteForm
          updateLearningRequestNoteMutation={updateLearningRequestNoteMutation}
          isLoading={isLoading}
          optionsLR={optionsLR}
        />
      ),
    },
    {
      id: HISTORY_NOTE_ID,
      name: 'Lịch sử ghi chú',
      content: (
        <>
          <Spacer />
          <NoteHistory
            isLoading={isLoading}
            optionsLR={optionsLR}
            selectedTab={selectedTab}
          />
        </>
      ),
    },
  ];
  return (
    <>
      {hasLearningRequestNoted ? (
        <Button size="s" fill onClick={open} iconType="eye">
          <FormattedMessage defaultMessage="Ghi chú" />
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: '#343741',
            border: 'none',
          }}
          size="s"
          fill
          onClick={open}
          iconType="plusInCircle"
        >
          <FormattedMessage defaultMessage="Ghi chú" />
        </Button>
      )}
      {isVisiable && (
        <Modal
          maxWidth={false}
          style={{ width: '633px', backgroundColor: '#F9FBFB' }}
          onClose={close}
        >
          <ModalHeader>
            <FlexGroup>
              <FlexItem>
                <Title className="text-left" size="xs">
                  <p>Ghi chú</p>
                </Title>
              </FlexItem>
            </FlexGroup>
          </ModalHeader>
          <ModalBody>
            <TabbedContent
              tabs={tabs}
              initialSelectedTab={hasLearningRequestNoted ? tabs[1] : tabs[0]}
              autoFocus="selected"
              onTabClick={tab => {
                setSelectedTab(tab?.id);
              }}
              expand
            />
          </ModalBody>

          <ModalFooter>
            <ButtonEmpty onClick={close}>
              <Text size="s" color="black">
                <FormattedMessage defaultMessage="Đóng" />
              </Text>
            </ButtonEmpty>
            {((selectedTab === NEW_NOTE_ID && !hasLearningRequestNoted) ||
              selectedTab === NEW_NOTE_ID) && (
              <Button
                fill
                type="submit"
                form={UPDATE_LEARNING_REQUEST_NOTE_FORM_ID}
                isLoading={updateLearningRequestNoteMutation.isLoading}
              >
                <Text size="s">
                  <FormattedMessage defaultMessage="Cập nhật" />
                </Text>
              </Button>
            )}
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}
NoteModal.defaultProps = {
  contactId: undefined,
  updateLearningRequestNoteMutation: undefined,
  hasLearningRequestNoted: false,
};

NoteModal.propTypes = {
  contactId: PropTypes.number,
  // eslint-disable-next-line react/forbid-prop-types
  updateLearningRequestNoteMutation: PropTypes.any,
  hasLearningRequestNoted: PropTypes.bool,
};
export default NoteModal;
