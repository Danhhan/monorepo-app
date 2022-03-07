/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import {
  FlexGroup,
  FlexItem,
  Avatar,
  Title,
  Text,
  Panel,
  Spacer,
  FlexGrid,
  notification,
  ButtonIcon,
  BasicTable,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Course, useRetrieveCancelCourse } from 'services/course';

import {
  CANCEL_STATUS,
  DELAY_STATUS,
  COMPLETED_STATUS,
} from 'constants/courses';
import { useToggle } from 'hooks';
import { Session } from 'services/session';

import { useEffect } from 'react';
import CourseType from './CourseType';
import CourseStatus from './CourseStatus';
import ChangeCourse from '../ChangeCourse';

export type CourseCardProps = Course;

export type SessionCardProps = {
  courseId: string;
  test?: {
    id: number;
    url: string;
  };
  courseType: number;
} & Session;

const CourseCard: React.FC<CourseCardProps> = props => {
  const {
    teacher,
    scheduleGroupTexts,
    totalDuration,
    totalPassedDuration,
    formattedStartedAt,
    formattedEndedAt,
    shortTimeEndedAt,
    shortTimeStartedAt,
    id,
    // title,
    type,
    status,
    // totalSession,
    // averageRating,
    // refId,
    // requestId,
    idSelected,
    courseType,

    onSelectCourse,
  } = props;

  const history = useHistory();
  useEffect(() => {
    if (idSelected !== 0) {
      onSelectCourse(idSelected, courseType);
    }
  }, [courseType, idSelected, onSelectCourse]);

  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const { mutate, isLoading: isLoadingCancel } = useRetrieveCancelCourse({
    onSuccess: () => {
      history.push(`/testing`);
    },
    onError: err => {
      const mesError = err?.response?.data?.errors[0]?.message;

      notification.error({
        title: <FormattedMessage defaultMessage="Error!" />,
        text: mesError || (
          <FormattedMessage defaultMessage="Change Course Failed!" />
        ),
      });
    },
  });

  const onChangeCourse = () => {
    let courseId: string | number | null;
    // eslint-disable-next-line prefer-const
    courseId = id;
    mutate({
      courseId,
    });
  };

  return (
    <Panel
      className="p-5"
      style={
        idSelected === id
          ? {
              border: '1px solid #00C081',
              borderRadius: '8px',
              minHeight: '104px',
              padding: '12px 32px 16px 32px',
              margin: '0',
            }
          : {
              border: '1px solid #D3DAE6',
              borderRadius: '8px',
              minHeight: '104px',
              padding: '12px 32px 16px 32px',
              margin: '0',
            }
      }
      color="subdued"
      // borderRadius="m"
      onClick={() => onSelectCourse(id, type)}
    >
      <FlexGrid>
        <FlexGroup alignItems="stretch">
          <FlexItem>
            <Text size="xs">
              <FormattedMessage defaultMessage="Teacher" />
            </Text>
            <Spacer size="s" />
            <FlexGroup gutterSize="m" responsive={false}>
              <FlexItem grow={false} className="m-0">
                <Avatar
                  imageUrl={teacher.avatarUrl}
                  name="Phong"
                  size="l"
                  type="space"
                />
              </FlexItem>
              <FlexItem style={{ width: '100px' }}>
                {/* style={{ width: '156px' }} */}
                <Title size="xxs">
                  <h1
                    className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                    style={{
                      // height: '4rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 2,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {teacher.name}
                  </h1>
                </Title>
                <Text color="text" size="xs">
                  <p>{teacher.nationality}</p>
                </Text>
              </FlexItem>
            </FlexGroup>
          </FlexItem>
          <FlexItem style={{ width: '100px', minWidth: '80px' }} grow={false}>
            {/* style={{ width: '120px' }} grow={false} */}
            <Text size="xs">
              <FormattedMessage defaultMessage="Type" />
            </Text>
            <Spacer size="s" />
            <FlexGroup>
              <FlexItem>
                <CourseType type={type} />
                {/* <Text size="xs" className="pl-2 pt-1">
                  <p>{formattedStartedAt}</p>
                </Text> */}
              </FlexItem>
            </FlexGroup>
          </FlexItem>
          <FlexItem>
            <Text size="xs">
              <FormattedMessage defaultMessage="Lịch hoc" />
            </Text>
            <Spacer size="s" />
            <Text
              size="xs"
              style={{
                minHeight: '40px',
                // alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {/* {scheduleGroupTexts.map(item => (
                <>
                  <span>{item}</span>
                </>
              ))} */}
              <Text size="xs" className="pl-2 pt-1">
                <p>
                  {formattedStartedAt}- {formattedEndedAt}
                </p>
              </Text>
            </Text>
          </FlexItem>
          <FlexItem style={{ width: '100px' }} grow={false}>
            <Text size="xs">
              <FormattedMessage defaultMessage="Progress" />
            </Text>
            {[CANCEL_STATUS, DELAY_STATUS, COMPLETED_STATUS].includes(
              status,
            ) ? (
              <>
                <div
                  style={{
                    minHeight: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <CourseStatus status={status} />
                </div>
              </>
            ) : (
              <div
                style={{
                  minHeight: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Spacer size="m" />
                <div
                  style={{ backgroundColor: 'rgba(0, 192, 129, 0.15)' }}
                  className="rounded-md overflow-hidden relative"
                >
                  <div
                    className="w3-container w3-green"
                    style={{
                      width: '50%',
                      height: '15px',
                      backgroundColor: 'rgba(0, 192, 129, 0.3)',
                      padding: '0.1rem 0.1rem',
                      color: 'rgba(0, 192, 129, 0.3);',
                      fontSize: '10px',
                      textAlign: 'right',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <span
                      style={{
                        color: 'rgba(0, 192, 129, 1)',
                        fontSize: '10px',
                        position: 'absolute',
                        whiteSpace: 'nowrap',
                        right: '1rem',
                        paddingTop: '1px',
                        top: '0px',
                        bottom: '0px',
                      }}
                    >{`${totalPassedDuration}/${totalDuration}h`}</span>
                  </div>
                </div>
              </div>
            )}
          </FlexItem>
          <FlexItem grow={false}>
            <Text size="xs">
              <FormattedMessage defaultMessage="Action" />
            </Text>
            <Spacer size="s" />
            <div
              style={{
                minHeight: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <ButtonIcon
                iconType="documentEdit"
                onClick={toggleModal}
                isDisabled={[
                  CANCEL_STATUS,
                  DELAY_STATUS,
                  COMPLETED_STATUS,
                ].includes(status)}
                style={{
                  color: [
                    CANCEL_STATUS,
                    DELAY_STATUS,
                    COMPLETED_STATUS,
                  ].includes(status)
                    ? '#ABB4C4'
                    : '#5A606B',
                }}
              />
            </div>
            <ChangeCourse
              isVisiable={isVisiableModal}
              onClose={closeModal}
              onChangeCourse={onChangeCourse}
              isLoading={isLoadingCancel}
            />
          </FlexItem>
        </FlexGroup>
      </FlexGrid>
    </Panel>
  );
};

export default CourseCard;
