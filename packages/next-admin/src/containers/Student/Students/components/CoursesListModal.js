/* eslint-disable camelcase */
import {
  Avatar,
  BasicTable,
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Health,
  Link,
  LoadingSpinner,
  Modal,
  ModalBody,
  notification,
  Spacer,
  Text,
  Title,
} from '@antoree/ant-ui';
import {
  COURSE_STATUS,
  STATUS,
  TRIAL_COURSE_STATUS_CODE,
} from 'configs/app.constants';
import { useToggle } from 'hooks';
import moment from 'moment';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import { useQuery } from 'react-query';
import { getStudentCourses, GET_COURSES_STUDENT } from 'services/student';
import ListVideos from './ListVideos';

const CoursesListModal = ({ type, idStudent }) => {
  const intl = useIntl();
  const { isVisiable, toggle, close } = useToggle();

  const {
    data,
    error,
    isFetching,
    isLoading,
    // refetch,
  } = useQuery([GET_COURSES_STUDENT], () => getStudentCourses(idStudent), {
    enabled: isVisiable,
    refetchOnWindowFocus: false,
    onSuccess: dataRes => {},
    onError: err => {
      const errCode = err?.response?.status;
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: 'Get courses Failure!',
        text: mesError || (
          <FormattedMessage
            defaultMessage="Get courses failure please contact tech for help! Error: {code}"
            values={{ code: errCode }}
          />
        ),
      });
    },
  });

  const openRecording = url => () => {
    window.open(url, '_blank');
  };

  return (
    <>
      <Text
        size="s"
        textAlign="center"
        className="cursor-pointer"
        color="#008F60"
        onClick={toggle}
      >
        <p style={{ marginBottom: '0px' }}>
          <FormattedMessage defaultMessage="View" />
        </p>
      </Text>
      {isVisiable && (
        <Modal maxWidth={1200} onClose={close}>
          <ModalBody>
            {isFetching ? (
              <div className="flex justify-items-center items-center p-4 flex-col ">
                <LoadingSpinner size="xl" />
                <Spacer size="m" />
                <Text size="l">
                  <p>
                    <FormattedMessage defaultMessage="Loading" />
                  </p>
                </Text>
              </div>
            ) : (
              <div>
                <Title size="s" className="text-left">
                  <p>
                    <FormattedMessage defaultMessage="List Test - Trial Courses" />
                  </p>
                </Title>
                <Spacer />
                <BasicTable
                  tableLayout="fixed"
                  loading={isLoading}
                  error={error?.toString()}
                  items={data?.courses ?? []}
                  style={{
                    margin: '0 12px',
                    width: 'fit-content',
                    maxWidth: '80vw',
                    maxHeight: '80vh',
                    overflow: 'auto',
                  }}
                  columns={[
                    {
                      field: 'id',
                      name: <FormattedMessage defaultMessage="Course's ID" />,
                      render: (id, { type: courseType }) => (
                        <Link
                          target="_blank"
                          to={`/${
                            courseType === TRIAL_COURSE_STATUS_CODE
                              ? 'trial'
                              : 'testing'
                          }-courses/${id}`}
                        >
                          {id}
                        </Link>
                      ),
                      truncateText: true,
                      textOnly: true,
                      width: 100,
                    },
                    {
                      field: 'student.name',
                      name: <FormattedMessage defaultMessage="Student" />,
                      render: (name, { student }) => (
                        <FlexGroup
                          responsive={false}
                          alignItems="center"
                          gutterSize="s"
                        >
                          <FlexItem grow={false}>
                            <Avatar
                              name={name ?? ''}
                              imageUrl={student?.avatarUrlThumb ?? ''}
                              size="m"
                              type="space"
                            />
                          </FlexItem>
                          <FlexItem>
                            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                              <Link to={`/students/${idStudent}`}>{name}</Link>
                            </span>

                            <Spacer size="xs" />
                            <span>{student?.phone}</span>
                          </FlexItem>
                        </FlexGroup>
                      ),
                      truncateText: true,
                      textOnly: true,
                      width: 150,
                    },
                    {
                      field: 'teacher.name',
                      name: <FormattedMessage defaultMessage="Tester" />,
                      truncateText: true,
                      textOnly: true,
                      width: 150,
                      render: (name, { teacher }) => (
                        <FlexGroup
                          responsive={false}
                          alignItems="center"
                          gutterSize="s"
                        >
                          <FlexItem grow={false}>
                            <Avatar
                              name={name ?? ''}
                              imageUrl={teacher?.avatarUrlThumb ?? ''}
                              size="m"
                              type="space"
                            />
                          </FlexItem>
                          <FlexItem>
                            <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                              {name}
                            </span>

                            <Spacer size="xs" />
                            <span>{teacher?.phone}</span>
                          </FlexItem>
                        </FlexGroup>
                      ),
                    },
                    {
                      name: <FormattedMessage defaultMessage="Type" />,
                      // eslint-disable-next-line react/prop-types
                      render: ({ type: courseType }) => {
                        const matchedStatus = COURSE_STATUS.find(
                          ({ value }) => value === courseType,
                        );
                        return matchedStatus ? (
                          <Text
                            size="s"
                            className="px-2 py-1 rounded-md"
                            style={{ background: matchedStatus?.color }}
                            color={matchedStatus.textColor}
                          >
                            <p>{intl.formatMessage(matchedStatus.label)}</p>
                          </Text>
                        ) : null;
                      },
                      truncateText: true,
                      textOnly: true,
                      width: 100,
                    },
                    {
                      name: <FormattedMessage defaultMessage="Schedule" />,
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
                      width: 200,
                      truncateText: true,
                      textOnly: true,
                    },
                    {
                      name: <FormattedMessage defaultMessage="Status" />,
                      // eslint-disable-next-line react/prop-types
                      render: ({ status }) => {
                        const matchedStatus = STATUS.find(
                          ({ value }) => value === status,
                        );
                        return matchedStatus ? (
                          <Health color={matchedStatus.color}>
                            {intl.formatMessage(matchedStatus.label)}
                          </Health>
                        ) : null;
                      },
                      truncateText: true,
                      textOnly: true,
                      width: 100,
                    },
                    {
                      field: 'video_url',
                      name: <FormattedMessage defaultMessage="Video" />,
                      render: (url = []) => (
                        <ListVideos url={url} openRecording={openRecording} />
                      ),
                      truncateText: true,
                      textOnly: true,
                      width: 140,
                    },
                  ]}
                  // onChange={onTableChangeHandler}
                  // pagination={{
                  //   pageIndex,
                  //   pageSize,
                  //   totalItemCount: data?.pagination?.totalItems ?? 0,
                  // }}
                />
                <Spacer />
                <FlexGroup justifyContent="flexEnd">
                  <FlexItem grow={false}>
                    <ButtonEmpty onClick={close}>
                      <p>
                        <FormattedMessage defaultMessage="Close" />
                      </p>
                    </ButtonEmpty>
                  </FlexItem>
                </FlexGroup>
              </div>
            )}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};

CoursesListModal.defaultProps = {
  type: null,
  idStudent: null,
};

CoursesListModal.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  type: PropTypes.any,
  idStudent: PropTypes.number,
};

export default CoursesListModal;
