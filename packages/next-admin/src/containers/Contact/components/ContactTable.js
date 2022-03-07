/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  BasicTable,
  Button,
  FlexGroup,
  FlexItem,
  Health,
  Icon,
  Spacer,
  Switch,
  Text,
} from '@antoree/ant-ui';
import PropTypes from 'prop-types';
import bananaChecked from 'assets/icons/banana_checked.svg';
import bananaUnchecked from 'assets/icons/banana_unchecked.svg';
import { useBreadcrumbs } from 'hooks';
import moment from 'moment';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { CONTACT_STATUS } from '../constant';
import DetailModal from './DetailModal';
import LearningRequestModal from './LearningRequestModal';
import UtmPopover from './UtmPopover';
import NoteModal from './NoteModal';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Contact List" />,
  },
];

function ContactTable({
  isLoading,
  isFetching,
  error,
  contacts,
  updateLearningRequestNoteMutation,
  pageIndex,
  pageSize,
  data,
  onTableChangeHandler,
  isMultiSelected,
  updateContactAllChecked,
  isCheckedAll,
  updateContactChecked,
  onChangeSwitch,
  showReassign,
  onChangeSelectedContactId,
  updateContactMutation,
}) {
  const intl = useIntl();
  useBreadcrumbs(breadcrumbs);

  return (
    <BasicTable
      tableLayout="fixed"
      loading={isLoading || isFetching}
      error={error?.toString()}
      itemId="id"
      items={contacts ?? []}
      isSelectable
      hasActions
      columns={[
        {
          field: 'id',
          name: <FormattedMessage defaultMessage="Contact ID" />,
          render: id => (
            <DetailModal
              id={id}
              updateContactMutation={updateContactMutation}
            />
          ),
        },
        {
          field: 'name',
          name: <FormattedMessage defaultMessage="Học viên" />,
          render: (name, { phone, learningRequestCount, id }) => (
            <FlexGroup
              style={{ marginLeft: '-30px' }}
              alignItems="center"
              gutterSize="xs"
            >
              <FlexItem grow={false}>
                <LearningRequestModal
                  learningRequestCount={learningRequestCount}
                  contactId={id}
                />
              </FlexItem>
              <FlexItem className="w-28" style={{ marginLeft: '14px' }}>
                <strong className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {name}
                </strong>
                <Spacer size="xs" />
                <Text color="#828282" className="text-xs">
                  {phone}
                </Text>
              </FlexItem>
            </FlexGroup>
          ),
          width: 200,
        },
        {
          field: 'status',
          name: <FormattedMessage defaultMessage="Trạng thái" />,
          truncateText: true,
          textOnly: true,
          // width: 121,
          render: stt => {
            const matchedStatus = CONTACT_STATUS.find(
              ({ value }) => value === stt,
            );
            return matchedStatus ? (
              <Health color={matchedStatus.color}>
                {intl.formatMessage(matchedStatus.label)}
              </Health>
            ) : null;
          },
        },
        {
          field: 'createdAt',
          name: <FormattedMessage defaultMessage="Ngày tạo" />,
          truncateText: true,
          textOnly: true,
          render: dateUpdated =>
            dateUpdated ? (
              <FormattedDate
                value={moment(dateUpdated, 'YYYY-MM-DD HH:mm:ss').toDate()}
                year="numeric"
                month="short"
                day="2-digit"
                hour="2-digit"
                minute="2-digit"
                hourCycle="h23"
              />
            ) : null,
          // width: 121,
        },
        {
          field: 'carer.displayName',
          name: <FormattedMessage defaultMessage="Saleman" />,
          render: (displayName, { carer }) => (
            <FlexGroup alignItems="center" gutterSize="xs">
              <FlexItem className="w-28">
                <strong className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {displayName}
                </strong>
                <Spacer size="xs" />
                <Text color="#828282" className="text-xs">
                  {carer?.email}
                </Text>
              </FlexItem>
            </FlexGroup>
          ),
          width: 200,
        },
        {
          field: 'utmSource',
          name: <FormattedMessage defaultMessage="Nguồn" />,
          render: (utmSource, { utmCampaign }) => (
            <UtmPopover utmSource={utmSource} utmCampaign={utmCampaign} />
          ),
        },
        {
          field: 'id',
          name: <FormattedMessage defaultMessage="Thao tác" />,
          render: (id, { hasLearningRequestNoted }) => (
            <FlexGroup alignItems="center" gutterSize="xs">
              <FlexItem>
                <NoteModal
                  hasLearningRequestNoted={hasLearningRequestNoted}
                  contactId={id}
                  updateLearningRequestNoteMutation={
                    updateLearningRequestNoteMutation
                  }
                />
              </FlexItem>
              <FlexItem>
                <Button
                  color="warning"
                  size="s"
                  minWidth={20}
                  fill
                  style={{
                    display: isMultiSelected ? 'none' : 'block',
                  }}
                  disabled={isMultiSelected}
                  onClick={() => {
                    showReassign();
                    onChangeSelectedContactId(id);
                  }}
                >
                  <Text size="s" color="black">
                    <p>
                      <>
                        <Icon type="aggregate" />
                      </>
                    </p>
                  </Text>
                </Button>
              </FlexItem>
            </FlexGroup>
          ),
        },
        {
          field: 'id',
          name: (
            <div>
              <Switch
                checked={isMultiSelected}
                onChange={e => onChangeSwitch(e)}
                label=""
              />
              {!isMultiSelected && (
                <span>
                  <FormattedMessage defaultMessage="Chọn nhiều" />
                </span>
              )}
              {isMultiSelected && (
                <>
                  <span
                    style={{
                      color: '#00C081',
                      cursor: 'pointer',
                    }}
                    onClick={() => showReassign()}
                    onKeyDown={() => showReassign()}
                  >
                    <FormattedMessage defaultMessage="Chia chuối" />
                  </span>
                  <Icon
                    className="ml-2"
                    size="l"
                    style={{
                      cursor: 'pointer',
                    }}
                    onClick={updateContactAllChecked}
                    type={isCheckedAll ? bananaChecked : bananaUnchecked}
                  />
                </>
              )}
            </div>
          ),
          render: (id, { checked }) => (
            <div style={{ display: isMultiSelected ? 'block' : 'none' }}>
              <Icon
                size="original"
                style={{
                  cursor: 'pointer',
                }}
                onClick={() => updateContactChecked(id)}
                type={checked ? bananaChecked : bananaUnchecked}
              />
            </div>
          ),
        },
      ]}
      onChange={onTableChangeHandler}
      pagination={{
        pageIndex,
        pageSize,
        pageSizeOptions: [10, 25, 50, 100, 200],
        totalItemCount: data?.pagination?.totalItems ?? 0,
      }}
    />
  );
}
ContactTable.defaultProps = {
  isMultiSelected: undefined,
  updateContactAllChecked: undefined,
  isCheckedAll: undefined,
  updateContactChecked: undefined,
  onChangeSwitch: undefined,
  showReassign: undefined,
  onChangeSelectedContactId: undefined,
  updateContactMutation: undefined,
};

ContactTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.any.isRequired,
  contacts: PropTypes.any.isRequired,
  updateLearningRequestNoteMutation: PropTypes.any.isRequired,
  pageIndex: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  data: PropTypes.any.isRequired,
  onTableChangeHandler: PropTypes.any.isRequired,
  isMultiSelected: PropTypes.bool,
  updateContactAllChecked: PropTypes.func,
  isCheckedAll: PropTypes.bool,
  updateContactChecked: PropTypes.func,
  onChangeSwitch: PropTypes.func,
  showReassign: PropTypes.func,
  onChangeSelectedContactId: PropTypes.func,
  updateContactMutation: PropTypes.any,
};

export default ContactTable;
