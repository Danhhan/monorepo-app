/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import {
  Avatar,
  Button,
  ButtonEmpty,
  Card,
  FlexGroup,
  FlexItem,
  Icon,
  Link,
  notification,
  PageContent,
  Text,
  Title,
} from '@antoree/ant-ui';
import camera from 'assets/icons/camera.svg';
import clockIcon from 'assets/icons/clock.svg';
import clockOutlinedIcon from 'assets/icons/clock_outlined.svg';
import qrCode from 'assets/images/antoree_qr_code.png';
import appStore from 'assets/images/download_app_app_store.png';
import playStore from 'assets/images/download_app_play_store.png';
import {
  COMPLETED_STATUS,
  TESTING_TYPE,
  TRIAL_TYPE,
  CANCEL_STATUS,
} from 'constants/courses';
import ChangeCourse from 'containers/Courses/components/ChangeCourse';
import JoinConfirmation from 'containers/Sessions/components/JoinConfirmation';
import SessionRecord from 'containers/Sessions/components/SessionRecordModal';
import { useToggle } from 'hooks';
import moment from 'moment';
import 'moment/locale/vi';
import Countdown from 'react-countdown';
import { FormattedMessage } from 'react-intl';
import { Course, useRetrieveCancelCourse } from 'services/course';
import { useRetrieveSessionsByCourseId } from 'services/session';
import { useRetrieveRoomUrlBySessionId } from 'services/videoCall';
import { useHistory, useLocation } from 'react-router-dom';
import { ERROR_STATUS } from '../TestingSteps/components/TestingCourseRecently/constants';
import styles from './TestingCourse.module.scss';

moment.locale('vi');

export type TestingCourseProps = {
  course: Course;
};

const TestingCourse: React.FC<TestingCourseProps> = ({ course }) => {
  const { teacher } = course;

  const { data, isLoading } = useRetrieveSessionsByCourseId(
    {
      courseId: course.id,
    },
    {
      enabled: !!course.id,
      refetchOnWindowFocus: false,
    },
  );

  const session = data?.data?.sessions?.[0];
  const history = useHistory();

  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const {
    isVisiable: isVisiableRecord,
    toggle: toggleRecord,
    close: closeRecord,
  } = useToggle();

  const {
    isVisiable: isVisiableChangeCourse,
    toggle: toggleChangeCourse,
    close: closeChangeCourse,
  } = useToggle();

  const { mutate } = useRetrieveRoomUrlBySessionId({
    onSuccess: res => {
      const typeRes = typeof res.data.vcUrl;
      if (typeRes === 'object') {
        notification.error({
          title: <FormattedMessage defaultMessage="Can't start session" />,
        });
      } else {
        res.data.vcUrl
          ? window.open(res.data.vcUrl, '_blank')
          : window.open(res.data.studentUrl, '_blank');
      }
    },
    onError: res => {
      const errorFinded = ERROR_STATUS.find(
        errItem => errItem.code === res?.response?.status,
      );
      if (errorFinded) {
        notification.error({
          title: errorFinded.message,
        });
      } else {
        notification.error({
          title: <FormattedMessage defaultMessage="Can't start session" />,
        });
      }
    },
  });

  const {
    mutate: mutateChangeCourse,
    isLoading: isLoadingCancel,
  } = useRetrieveCancelCourse({
    onSuccess: () => {
      // window.location.reload();
      history.push('/testing/booking?step=2');
      // if(location.pathname==""){

      // }
      sessionStorage.setItem('stepsave', '2');
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

  const handleCalling = (isCourseID: boolean, idPara?: number) => {
    mutate(
      {
        courseId: isCourseID ? idPara : undefined,
        sessionId: !isCourseID ? course.id : undefined,
        whoami: 'student',
        source: 'web',
      },
      {
        onSuccess: () => {
          closeModal();
        },
      },
    );
  };

  return (
    <PageContent hasBorder hasShadow={false} className="flex">
      <FlexGroup justifyContent="spaceAround" alignItems="center">
        <FlexItem
          grow={false}
          style={{
            width: 432,
          }}
        >
          <FlexGroup
            className="shadow-xl rounded-xl p-8"
            direction="column"
            alignItems="center"
          >
            <Title size="s">
              <h6 className="text-2xl">Buổi test Tiếng Anh</h6>
            </Title>
            <div className="h-2" />
            <Text size="m">
              <p>ID: {course?.id}</p>
            </Text>
            <div className="h-8" />
            <Card
              className={styles.customCard}
              paddingSize="none"
              layout="horizontal"
              titleSize="xs"
              style={{
                borderRadius: 12,
                paddingRight: 16,
              }}
              icon={
                <Avatar
                  name={teacher.name || ''}
                  type="space"
                  className="w-32 h-36 rounded-l-xl rounded-r-lg"
                  imageUrl={teacher.avatarUrl}
                />
              }
              titleElement="h2"
              title={
                <>
                  <div className="h-4" />
                  <div className="flex flex-row justify-between">
                    <Text color="subdued" size="m">
                      <p>{teacher.nationality}&nbsp;</p>
                    </Text>
                  </div>
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '20vw',
                      fontSize: '18px',
                      textDecoration: 'none',
                    }}
                  >
                    {teacher.name}
                  </span>
                  <div className="h-4" />
                  <ButtonEmpty
                    color="text"
                    style={{ padding: 0 }}
                    disabled={
                      course.status === COMPLETED_STATUS ||
                      course.status === CANCEL_STATUS
                    }
                    onClick={toggleChangeCourse}
                  >
                    Đổi giáo viên / Lịch học
                  </ButtonEmpty>
                </>
              }
              onClick={() => {}}
              description={<></>}
            />
            <div className="h-6" />
            {session && (
              <Card
                className={styles.customCard}
                paddingSize="none"
                layout="horizontal"
                titleSize="xs"
                style={{
                  borderRadius: 12,
                  paddingRight: 16,
                }}
                icon={
                  <div className="w-32 h-36 rounded-l-xl rounded-r-lg flex flex-col justify-center">
                    <Title size="m">
                      <h1
                        className="font-semibold"
                        style={{ textTransform: 'capitalize', fontSize: 22 }}
                      >
                        {moment(session.occurredAt)?.format('dddd')}
                      </h1>
                    </Title>
                    <Text size="s">
                      {moment(session.occurredAt)?.format('DD-MM-YYYY')}
                    </Text>
                  </div>
                }
                titleElement="h2"
                title={
                  <>
                    <div className="h-4" />
                    <div className="flex flex-row items-center">
                      <Icon type={clockIcon} />
                      &nbsp;
                      <Text color="#008F60" size="s">
                        <p>
                          <Countdown
                            date={moment(session.occurredAt).toDate()}
                            precision={3}
                            renderer={({
                              days,
                              hours,
                              minutes,
                              seconds,
                              completed,
                            }) => {
                              if (course.status === COMPLETED_STATUS)
                                return <>Đã hoàn thành</>;
                              if (completed) return <>Đã đến giờ học</>;
                              return (
                                <span>
                                  {days}d {hours}h&nbsp;{minutes}m&nbsp;
                                  {seconds}s
                                </span>
                              );
                            }}
                            autoStart
                          />
                        </p>
                      </Text>
                    </div>
                    <div className="h-2" />
                    <div className="flex flex-row items-center">
                      <Icon type={clockOutlinedIcon} />
                      <div className="w-2" />
                      <Text size="m" className="font-semibold">
                        <p>
                          {session.shortTimeStartedAt}&nbsp;-&nbsp;
                          {session.shortTimeEndedAt}
                        </p>
                      </Text>
                    </div>
                    <div className="h-2" />
                    <ButtonEmpty
                      disabled={!session.test}
                      color="text"
                      style={{ padding: 0 }}
                      onClick={() => window.open(session.test?.url, '_blank')}
                    >
                      <Icon
                        type="filebeatApp"
                        color="disabled"
                        className="mr-2"
                      />
                      Xem kết quả
                    </ButtonEmpty>
                    <ButtonEmpty
                      disabled={
                        !(session.videoUrl && session.videoUrl.length > 0)
                      }
                      color="text"
                      style={{ padding: 0 }}
                      onClick={toggleRecord}
                    >
                      <Icon
                        type="videoPlayer"
                        color="disabled"
                        className="mr-2"
                      />
                      Xem video buổi học
                    </ButtonEmpty>
                  </>
                }
                onClick={() => {}}
                description={<></>}
              />
            )}
            <div className="h-6" />
            <Button
              className="w-full h-12"
              isLoading={isLoading}
              onClick={toggleModal}
              fill
              fullWidth
              size="m"
              iconType={camera}
            >
              <FormattedMessage defaultMessage="Tham gia" />
            </Button>
          </FlexGroup>
        </FlexItem>
        <FlexItem grow={false}>
          <FlexGroup direction="column" alignItems="center">
            <Title size="s">
              <h1 className="text-2xl">Học qua ứng dụng Antoree</h1>
            </Title>
            <div className="h-2" />
            <Text size="m" color="subdued">
              <p>Trải nghiệm học thử miễn phí với hơn 3000 giáo viên</p>
            </Text>
            <div className="h-4" />
            <img src={qrCode} alt="qr-code" />
            <div className="h-4" />
            <Link
              to="https://antoreestudent.page.link/launch"
              target="_blank"
              external={false}
            >
              <img src={playStore} alt="play-store" />{' '}
            </Link>
            <div className="h-4" />
            <Link
              to="https://antoreestudent.page.link/launch"
              target="_blank"
              external={false}
            >
              <img src={appStore} alt="app-store" />
            </Link>
          </FlexGroup>
        </FlexItem>
        <SessionRecord
          videoUrl={session?.videoUrl}
          isVisiable={isVisiableRecord}
          onClose={closeRecord}
        />
        <JoinConfirmation
          id={course.id}
          isVisiable={isVisiableModal}
          onConfirm={handleCalling}
          onClose={closeModal}
          isInputHandle={[TESTING_TYPE, TRIAL_TYPE].includes(course.courseType)}
        />
        <ChangeCourse
          isVisiable={isVisiableChangeCourse}
          onClose={closeChangeCourse}
          onChangeCourse={() => mutateChangeCourse({ courseId: course.id })}
          isLoading={isLoadingCancel}
        />
      </FlexGroup>
    </PageContent>
  );
};

export default TestingCourse;
