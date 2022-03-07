import {
  BasicTable,
  Button,
  FlexGroup,
  FlexItem,
  Health,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spacer,
  Text,
  Title,
  NotificationBadge,
} from '@antoree/ant-ui';
import medal1 from 'assets/icons/medal_1.svg';
import medal2 from 'assets/icons/medal_2.svg';
import medal3 from 'assets/icons/medal_3.svg';
import medal4 from 'assets/icons/medal_4.svg';
import medal5 from 'assets/icons/medal_5.svg';
import { useToggle } from 'hooks';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getLearningRequestsBy, GET_LR_BY } from 'services/learningRequest';
import { CONTACT_STATUS, STUDENT_STATUS, TAGS } from '../constant';
import LearningRequestActions from './LearningRequestActions';

function LearningRequestModal({ contactId, learningRequestCount }) {
  const intl = useIntl();
  const { isVisiable, open, close } = useToggle();

  const { data, isFetching, error } = useQuery(
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
      return intl.formatMessage(tags.label);
    }
    return '';
  };
  const checkUtmSource = utmSource => {
    return ['mar-web', 'mar-mobile', '[Mobile][AS]', '[WEB][AS]'].find(source =>
      utmSource?.toUpperCase().includes(source.toUpperCase()),
    );
  };
  const medalFromStatus = status => {
    switch (status) {
      case 1:
        return medal1;
      case 2:
        return medal2;
      case 3:
        return medal3;
      case 4:
        return medal4;
      case 5:
        return medal5;
      default:
        return null;
    }
  };
  const renderMedal = id => {
    const index = data?.learningRequests.findIndex(lr => lr.id === id);
    const learningRequest = data?.learningRequests[index];
    let result;
    if (
      learningRequest?.student?.isStudent &&
      checkUtmSource(learningRequest.utmSource)
    ) {
      result = (
        <Icon
          size="original"
          style={{
            maxWidth: '50px',
            maxHeight: '56px',
            margin: '0px',
            display: 'block',
          }}
          type={medalFromStatus(learningRequest?.student?.type)}
        />
      );
    } else {
      result = <></>;
    }
    return result;
  };
  const renderStatus = (student, status) => {
    let result;
    if (student) {
      const matchedStatus = STUDENT_STATUS.find(
        ({ value }) => value === student?.type,
      );
      result = matchedStatus ? (
        <Health color={matchedStatus.color}>
          {intl.formatMessage(matchedStatus.label)}
        </Health>
      ) : null;
    } else {
      const matchedStatus = CONTACT_STATUS.find(
        ({ value }) => value === status,
      );
      result = matchedStatus ? (
        <Health color={matchedStatus.color}>
          {intl.formatMessage(matchedStatus.label)}
        </Health>
      ) : null;
    }
    return result;
  };
  return (
    <>
      <NotificationBadge
        size="m"
        style={{
          cursor: 'pointer',
          marginLeft: '-5px',
          backgroundColor: 'black',
        }}
        // color="subdued"
        onClick={open}
      >
        {learningRequestCount}
      </NotificationBadge>

      {isVisiable && (
        <Modal
          maxWidth={false}
          style={{ width: '1043px' }}
          onClose={() => {
            close();
          }}
        >
          <ModalHeader>
            <FlexGroup>
              <FlexItem>
                <Title className="text-left" size="xs">
                  <p>Learning request list</p>
                </Title>
              </FlexItem>
            </FlexGroup>
          </ModalHeader>

          <ModalBody>
            <div>
              <BasicTable
                tableLayout="fixed"
                loading={isFetching}
                error={error?.toString()}
                items={data?.learningRequests ?? []}
                columns={[
                  {
                    field: 'id',
                    render: id => (
                      <FlexItem grow={false}>{renderMedal(id)}</FlexItem>
                    ),
                    width: 60,
                  },
                  {
                    field: 'id',
                    name: <FormattedMessage defaultMessage="ID" />,
                    render: id => <Text>{id}</Text>,
                  },
                  {
                    field: 'name',
                    name: <FormattedMessage defaultMessage="Học viên" />,
                    render: (name, { phone }) => (
                      <FlexGroup alignItems="center" gutterSize="xs">
                        <FlexItem className="w-28">
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
                    // width: 200,
                  },
                  {
                    field: 'status',
                    name: <FormattedMessage defaultMessage="Trạng thái" />,
                    truncateText: true,
                    textOnly: true,
                    render: (tag, { student }) => (
                      <Text>{renderStatus(student, tag)}</Text>
                    ),
                  },
                  {
                    field: 'level',
                    name: <FormattedMessage defaultMessage="Level" />,
                    render: level => (
                      <Text style={{ color: '#0AA263' }}>Level {level}</Text>
                    ),
                  },
                  {
                    field: 'tag',
                    name: <FormattedMessage defaultMessage="Phân loại" />,
                    truncateText: true,
                    textOnly: true,
                    // width: 121,
                    render: tag => <Text>{getTagText(tag)}</Text>,
                  },
                  {
                    field: 'utmSource',
                    name: <FormattedMessage defaultMessage="Nguồn" />,
                    render: (utmSource, { utmCampaign }) => (
                      <FlexGroup alignItems="center" gutterSize="xs">
                        <FlexItem grow={false} className="w-28">
                          <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                            {utmSource}
                          </p>
                          <Spacer size="xs" />
                          <Text color="#828282" className="text-xs">
                            <p className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {utmCampaign}
                            </p>
                          </Text>
                        </FlexItem>
                      </FlexGroup>
                    ),
                    width: 150,
                  },
                  {
                    field: 'createdAt',
                    name: <FormattedMessage defaultMessage="Ngày tạo" />,
                    truncateText: true,
                    textOnly: true,
                    render: dateUpdated =>
                      dateUpdated ? (
                        <FormattedDate
                          value={moment(
                            dateUpdated,
                            'YYYY-MM-DD HH:mm:ss',
                          ).toDate()}
                          year="numeric"
                          month="short"
                          day="2-digit"
                          hour="2-digit"
                          minute="2-digit"
                          hourCycle="h23"
                        />
                      ) : null,
                    width: 200,
                  },
                  {
                    field: 'id',
                    name: <FormattedMessage defaultMessage="Thao tác" />,
                    truncateText: true,
                    textOnly: true,
                    render: (id, { level, levelMeta }) => (
                      <LearningRequestActions
                        contactId={contactId}
                        lrId={id}
                        level={level}
                        levelMeta={levelMeta}
                      />
                    ),
                    width: 150,
                  },
                ]}
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                close();
              }}
              style={{ backgroundColor: 'black', borderColor: 'transparent' }}
            >
              <Text size="s" color="white">
                <FormattedMessage defaultMessage="Đóng" />
              </Text>
            </Button>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

LearningRequestModal.defaultProps = {
  contactId: undefined,
  learningRequestCount: undefined,
};

LearningRequestModal.propTypes = {
  contactId: PropTypes.number,
  learningRequestCount: PropTypes.number,
};

export default LearningRequestModal;
