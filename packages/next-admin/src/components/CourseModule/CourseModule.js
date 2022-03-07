/* eslint-disable camelcase */
import {
  Avatar,
  BasicTable,
  Button,
  FlexGroup,
  FlexItem,
  Health,
  notification,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import {
  STATUS,
  STATUS_CANCELLED,
  STATUS_COMPLETED,
} from 'configs/app.constants';
import { useCurrentUser } from 'hooks';
import { cancelCourse } from 'services/course';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import CancelConfirm from './CancelConfirm';
import ListVideos from './ListVideo';

function CourseModule({
  isLoading,
  isFetching,
  error,
  data,
  onTableChangeHandler,
  pageIndex,
  pageSize,
  URL,
  pathName,
}) {
  const intl = useIntl();
  const [{ id: currentUserId }] = useCurrentUser();
  const queryClient = useQueryClient();
  const [idCancel, setIdCancel] = useState();
  const [courseType, setCourseType] = useState();
  const openRecording = url => () => {
    window.open(url, '_blank');
  };

  const cancelCourseMutation = useMutation(
    mutateData => cancelCourse(mutateData),
    {
      onSuccess: () => {
        notification.success({
          title: <FormattedMessage defaultMessage="Cancel Success" />,
        });
        queryClient.invalidateQueries(URL);
      },
      onError: err => {
        notification.error({
          title: err?.message ?? (
            <FormattedMessage defaultMessage="Cancel Error!" />
          ),
        });
      },
    },
  );
  const handleCancelCourse = () => {
    if (!courseType) {
      notification.error({
        title: <FormattedMessage defaultMessage="Not found course's type" />,
      });
      return;
    }
    cancelCourseMutation.mutate(
      {
        courseId: idCancel,
        type: courseType,
      },
      {
        onSuccess: () => {
          setIdCancel();
          setCourseType();
        },
      },
    );
  };

  return (
    <div
      style={{
        maxWidth: '100vw',
        height: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
      }}
    >
      <BasicTable
        tableLayout="fixed"
        loading={isLoading || isFetching}
        error={error?.toString()}
        items={data?.data ?? []}
        enabled={isLoading || isFetching}
        style={{ margin: '0 12px', width: 'fit-content' }}
        columns={[
          {
            name: <FormattedMessage defaultMessage="LR ID" />,
            truncateText: true,
            textOnly: true,
            width: 60,
            // eslint-disable-next-line react/prop-types
            render: ({ lrId, referCourseId }) => <span>{lrId}</span>,
          },
          {
            field: 'id',
            name: <FormattedMessage defaultMessage="Course ID" />,
            render: (id, type) => (
              <Link to={`${pathName}/${id}`}>
                <span style={{ color: '#00C081' }}>{id}</span>
              </Link>
            ),
            truncateText: true,
            textOnly: true,
            width: 80,
          },
          {
            field: 'tester.name',
            name: <FormattedMessage defaultMessage="Giáo viên" />,
            truncateText: true,
            textOnly: true,
            width: 180,
            render: (name, { tester }) => (
              <FlexGroup responsive={false} alignItems="center" gutterSize="s">
                <FlexItem grow={false}>
                  <Avatar
                    name={tester?.name ?? ''}
                    imageUrl={tester?.avatar ?? ''}
                    size="m"
                    type="space"
                  />
                </FlexItem>
                <FlexItem>
                  <span
                    style={{ width: '80%' }}
                    className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {tester?.name}
                  </span>

                  <p
                    style={{ width: '80%' }}
                    className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {tester?.email}
                  </p>
                </FlexItem>
              </FlexGroup>
            ),
          },
          {
            field: 'student.name',
            name: <FormattedMessage defaultMessage="Học viên" />,
            render: (name, { student, id }) => (
              <FlexGroup alignItems="center" gutterSize="xs">
                <FlexItem>
                  <Link
                    to={`${pathName}/${id}`}
                    // className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                    // style={{ color: '#00C081', width: '95%' }}
                  >
                    <span>{name}</span>
                  </Link>
                  <Spacer size="xs" />
                  <Text color="#828282" className="text-xs">
                    {student?.new_phone ? `0${student?.new_phone}` : `Unknow`}
                  </Text>
                </FlexItem>
              </FlexGroup>
            ),
            truncateText: true,
            textOnly: true,
            width: 160,
          },
          {
            field: 'sale.name',
            name: <FormattedMessage defaultMessage="Phụ trách" />,
            truncateText: true,
            textOnly: true,
            width: 160,
            render: (name, { sale }) => (
              <FlexGroup alignItems="center" gutterSize="xs">
                <FlexItem>
                  <strong
                    style={{ width: '80%' }}
                    className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                  >
                    {name}
                  </strong>
                  <Spacer size="xs" />
                  <Text
                    style={{ width: '80%' }}
                    className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                    color="#828282"
                  >
                    {sale?.email}
                  </Text>
                </FlexItem>
              </FlexGroup>
            ),
          },
          {
            name: <FormattedMessage defaultMessage="Thông tin" />,
            // eslint-disable-next-line react/prop-types
            render: ({ test_time, status }) => {
              const matchedStatus = STATUS.find(
                ({ value }) => value === status,
              );

              return (
                <>
                  <div>
                    {matchedStatus ? (
                      <Health color={matchedStatus.color}>
                        {intl.formatMessage(matchedStatus.label)}
                      </Health>
                    ) : null}
                  </div>
                  {test_time ? (
                    <FormattedDate
                      value={moment(test_time, 'YYYY-MM-DD HH:mm:ss').toDate()}
                      year="numeric"
                      month="short"
                      day="2-digit"
                      hour="2-digit"
                      minute="2-digit"
                      hourCycle="h23"
                    />
                  ) : null}
                </>
              );
            },
            width: 100,
            truncateText: true,
            textOnly: true,
          },
          {
            name: <FormattedMessage defaultMessage="Thời gian" />,
            truncateText: true,
            textOnly: true,
            width: 180,
            // eslint-disable-next-line react/prop-types
            render: ({ schedule }) => {
              return (
                <>
                  {schedule ? (
                    <>
                      <FormattedDate
                        value={moment(
                          // eslint-disable-next-line react/prop-types
                          schedule?.timeFrom,
                          'HH:mm:ss',
                        ).toDate()}
                        hour="2-digit"
                        minute="2-digit"
                        hourCycle="h23"
                      />
                      &nbsp; - &nbsp;
                      <FormattedDate
                        value={moment(
                          // eslint-disable-next-line react/prop-types
                          schedule?.timeTo,
                          'HH:mm:ss',
                        ).toDate()}
                        hour="2-digit"
                        minute="2-digit"
                        hourCycle="h23"
                      />
                      ,&nbsp;
                      <FormattedDate
                        value={moment(
                          // eslint-disable-next-line react/prop-types
                          schedule?.day,
                          'YYYY-MM-DD',
                        ).toDate()}
                        year="numeric"
                        month="short"
                        day="2-digit"
                      />
                    </>
                  ) : null}
                </>
              );
            },
          },
          {
            field: 'video_url',
            name: <FormattedMessage defaultMessage="Thao tác" />,
            render: (video_url = [], { sale, id, status, type }) => (
              <FlexGroup>
                <FlexItem grow={false}>
                  <Button
                    size="s"
                    color="danger"
                    fill
                    fullWidth
                    className="rounded-lg"
                    isDisabled={
                      // eslint-disable-next-line no-nested-ternary
                      [STATUS_CANCELLED, STATUS_COMPLETED].includes(status)
                        ? true
                        : !sale
                        ? false
                        : // eslint-disable-next-line react/prop-types
                          currentUserId !== sale?.id
                    }
                    isLoading={cancelCourseMutation.isLoading}
                    onClick={() => {
                      setIdCancel(id);
                      setCourseType(type);
                    }}
                    minWidth={10}
                  >
                    <FormattedMessage defaultMessage="Huỷ" />
                  </Button>
                  <CancelConfirm
                    courseId={id}
                    isVisiable={id === idCancel}
                    close={() => setIdCancel()}
                    isLoading={cancelCourseMutation.isLoading}
                    handleSubmit={() => handleCancelCourse()}
                  />
                </FlexItem>
                <FlexItem>
                  <ListVideos url={video_url} openRecording={openRecording} />
                </FlexItem>
              </FlexGroup>
            ),
            truncateText: true,
            textOnly: true,
            width: 190,
          },
        ]}
        onChange={onTableChangeHandler}
        pagination={{
          pageIndex,
          pageSize,
          totalItemCount: data?.pagination?.totalItems ?? 0,
        }}
      />
    </div>
  );
}
CourseModule.defaultProps = {
  isLoading: false,
  isFetching: false,
  error: undefined,
  data: undefined,
  onTableChangeHandler: undefined,
  pageIndex: undefined,
  pageSize: undefined,
  URL: undefined,
};
/* eslint-disable react/forbid-prop-types */
CourseModule.propTypes = {
  isLoading: PropTypes.bool,
  isFetching: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any,
  onTableChangeHandler: PropTypes.any,
  pageIndex: PropTypes.number,
  pageSize: PropTypes.number,
  URL: PropTypes.string,
  pathName: PropTypes.string.isRequired,
};
export default CourseModule;
