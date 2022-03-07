/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import {
  Avatar,
  ButtonIcon,
  FlexGroup,
  FlexItem,
  notification,
  Outline,
  Panel,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import {
  CANCEL_STATUS,
  COMPLETED_STATUS,
  DELAY_STATUS,
} from 'constants/courses';
import { useToggle } from 'hooks';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useRetrieveCancelCourse } from 'services/course';
import ChangeCourse from '../ChangeCourse';
import CourseProgress from '../CourseProgress';
import CourseStatus from './CourseStatus';
import CourseType from './CourseType';

// import styles from './CourseCard.module.scss';
export type CourseCardProps = {
  id: number;
  teacher: {
    name: string;
    avatarUrl: string;
    nationality: string;
  };
  totalDuration: number;
  totalPassedDuration: number;
  type: number;
  status: number;
  scheduleGroupTexts: [];
  title: string;
  averageRating: number;
  totalSession: number;
  refId: string;
  requestId: number;
  idSelected: number;
  onSelectCourse: (id: number, type: number) => void;
  onReset?: Function;
};

const CourseCard: React.FC<CourseCardProps> = props => {
  const {
    teacher,
    scheduleGroupTexts,
    totalDuration,
    totalPassedDuration,
    id,
    // title,
    type,
    status,
    // totalSession,
    // averageRating,
    // refId,
    // requestId,
    // idSelected,
    onReset,
    onSelectCourse,
  } = props;

  const [isHover, setIsHover] = useState<boolean>(false);

  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseLeave = () => {
    setIsHover(false);
  };

  const { mutate, isLoading: isLoadingCancel } = useRetrieveCancelCourse({
    onSuccess: () => {
      closeModal();
      onReset?.();
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

  const { PencilAltIcon } = Outline;

  return (
    <Panel
      className="p-3 "
      // style={
      //   idSelected === id || isHover
      //     ? { border: '1px solid #00C081' }
      //     : { border: '1px solid #D3DAE6' }
      // }
      color="subdued"
      onClick={() => onSelectCourse(id, 0)}
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
    >
      <FlexGroup alignItems="stretch">
        <FlexItem>
          <Text size="s">
            <FormattedMessage defaultMessage="Teacher" />
          </Text>
          <Spacer size="s" />
          <FlexGroup gutterSize="m" responsive={false}>
            <FlexItem grow={false} className="m-0">
              <Avatar
                imageUrl={teacher.avatarUrl}
                name="Phong"
                size="m"
                type="space"
                className="m-auto"
              />
            </FlexItem>
            <FlexItem>
              <Text size="s">
                <p
                  className="leading-8 md:max-w-xs"
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {teacher.name}
                </p>
              </Text>
              <Text size="s" color="text">
                <p
                  className="leading-8 md:max-w-xs"
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {teacher.nationality}
                </p>
              </Text>
            </FlexItem>
          </FlexGroup>
        </FlexItem>
        <FlexItem>
          <FlexGroup responsive={false}>
            <FlexItem>
              <Text size="s">
                <FormattedMessage defaultMessage="Type" />
              </Text>
              <Spacer size="m" />
              <FlexGroup>
                <FlexItem>
                  <CourseType type={type} />
                  <Spacer size="s" />
                  <Text size="xs">
                    <p>ID {id}</p>
                  </Text>
                </FlexItem>
              </FlexGroup>
            </FlexItem>
            <FlexItem>
              <Text size="s">
                <FormattedMessage defaultMessage="Schedule" />
              </Text>
              <Spacer size="m" />
              {/* <Spacer size="l" /> */}
              <Text size="s">
                {scheduleGroupTexts.map(item => (
                  <p
                    // className="white-space: pre-line"
                    style={{
                      minWidth: '100%',
                      width: '5vw',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                    }}
                    // title={item}
                  >
                    {item}
                    <br />
                  </p>
                ))}
              </Text>
            </FlexItem>
          </FlexGroup>
        </FlexItem>
        <FlexItem>
          <FlexGroup responsive={false}>
            <FlexItem>
              <Text size="s">
                <FormattedMessage defaultMessage="Progress" />
              </Text>
              <CourseProgress
                strokeWidth={2}
                sqSize={40}
                percentage={parseFloat(
                  totalPassedDuration !== 0
                    ? `${((totalPassedDuration / totalDuration) * 100).toFixed(
                        0,
                      )}`
                    : `0`,
                )}
                disable={false}
              />
            </FlexItem>
            <FlexItem>
              <Text size="s">
                <FormattedMessage defaultMessage="Action" />
              </Text>
              {[CANCEL_STATUS, DELAY_STATUS, COMPLETED_STATUS].includes(
                status,
              ) ? (
                <>
                  <Spacer size="m" />
                  <CourseStatus status={status} />
                </>
              ) : (
                <>
                  <Spacer size="m" />
                  <ButtonIcon
                    className="mx-auto"
                    size="s"
                    onClick={toggleModal}
                    type="submit"
                    iconType={() => (
                      <div className="flex justify-center items-center">
                        <PencilAltIcon className="h-6 w-6" />
                      </div>
                    )}
                    color="primary"
                    style={{
                      border: '#00c081',
                      color: '#00c081',
                      borderRadius: '0 5px 5px 0',
                    }}
                    aria-label="enter-test-btn"
                  />
                </>
              )}
              <ChangeCourse
                isVisiable={isVisiableModal}
                onClose={closeModal}
                onChangeCourse={onChangeCourse}
                isLoading={isLoadingCancel}
              />
            </FlexItem>
          </FlexGroup>
        </FlexItem>
      </FlexGroup>
    </Panel>
  );
};

export default CourseCard;
