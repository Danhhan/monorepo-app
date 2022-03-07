import {
  ButtonEmpty,
  ComboBox,
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useQuery } from 'react-query';
import {
  getNoteCustomerReject,
  GET_NOTE_CUSTOMER_REJECT,
} from 'services/learningRequest';
import { REASON_NOTE_LR_LIST } from '../constant';

function NoteHistory({ isLoading, optionsLR, selectedTab }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  // const [isEnabled, setEnabled] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { data, isFetching } = useQuery(
    [GET_NOTE_CUSTOMER_REJECT(selectedId)],
    () => getNoteCustomerReject(selectedId),
    {
      enabled: Boolean(selectedId),
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  );
  const getResonTypeLabel = value => {
    if (!value) return '';
    const result = REASON_NOTE_LR_LIST.find(
      reasonNote => reasonNote.value === value,
    );
    return result.label;
  };
  useEffect(() => {
    setSelectedId(optionsLR[0]?.id);
    setSelectedOptions(optionsLR);
  }, [optionsLR]);
  return (
    <>
      <FlexGroup>
        <FlexItem>
          <ComboBox
            isLoading={isLoading}
            fullWidth
            placeholder="Chọn learning request"
            singleSelection={{ asPlainText: true }}
            options={optionsLR}
            selectedOptions={selectedOptions}
            onChange={option => {
              setSelectedOptions(option);
              setSelectedId(option[0]?.id);
            }}
            compressed
            borderRadius={8}
          />
        </FlexItem>
      </FlexGroup>
      {isFetching && (
        <div className="flex justify-items-center items-center p-4 flex-col ">
          <LoadingSpinner size="xl" />
          <Spacer size="m" />
          <Text size="l">
            <p>
              <FormattedMessage defaultMessage="Loading" />
            </p>
          </Text>
        </div>
      )}
      {data?.length > 0 &&
        !isFetching &&
        data?.map(note => (
          <FlexGroup key={note?.id}>
            <FlexItem grow={9}>
              <FlexGroup>
                <FlexItem grow={false}>
                  <Text size="s">{note?.createdAt}</Text>
                </FlexItem>
                <FlexItem grow={false}>
                  <Text size="s">
                    {note?.createdBy ? `Bởi ${note?.createdBy}` : ''}
                  </Text>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem grow={false}>
                  <Title size="xxs">
                    <p>{getResonTypeLabel(note?.reasonType)}</p>
                  </Title>
                </FlexItem>
              </FlexGroup>
              <FlexGroup>
                <FlexItem grow={false}>
                  <Text size="s">{note?.desc}</Text>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
            {/* <FlexItem grow={1}>
              {data?.id && <ButtonEmpty size="xs">Xóa</ButtonEmpty>}
            </FlexItem> */}
          </FlexGroup>
        ))}
    </>
  );
}
NoteHistory.defaultProps = {
  isLoading: undefined,
  optionsLR: [],
  selectedTab: undefined,
};

NoteHistory.propTypes = {
  isLoading: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  optionsLR: PropTypes.array,
  selectedTab: PropTypes.string,
};
export default NoteHistory;
