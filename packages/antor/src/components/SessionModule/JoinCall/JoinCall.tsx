/* eslint-disable radix */
import { Button, notification, Outline, Text } from '@antoree/ant-ui';
import { STATUS_CODE } from 'constants/common';
import { CourseType, TESTING_TYPE, TRIAL_TYPE } from 'constants/courses';
import { HAPPENING, UPCOMING } from 'constants/session';
import { useToggle } from 'hooks';
import { FormattedMessage } from 'react-intl';
import { Session } from 'services';
import { useRetrieveRoomUrlBySessionId } from 'services/videoCall';
import JoinConfirmation from './JoinConfirmation';

export type JoinCallProps = {
  session: Session;
  courseType: CourseType | undefined;
};

const JoinCall: React.FC<JoinCallProps> = ({ session, courseType }) => {
  const { VideoCameraIcon } = Outline;
  const { mutate, isLoading: isLoadingJoin } = useRetrieveRoomUrlBySessionId({
    onSuccess: res => {
      const typeRes = typeof res.data.vcUrl;
      if (typeRes === 'object') {
        notification.error({
          title: <FormattedMessage defaultMessage="Can't start session" />,
        });
      } else {
        res.data.vcUrl
          ? window.open(res.data.vcUrl, '_blank')
          : window.open(res.data.teacherUrl, '_blank');
      }
    },
    onError: res => {
      if (res?.response?.status === STATUS_CODE.BAD_REQUEST) {
        notification.error({
          title: (
            <FormattedMessage defaultMessage="Exceeds the limit of course duration" />
          ),
        });
      } else {
        notification.error({
          title: <FormattedMessage defaultMessage="Can't start session" />,
        });
      }
      notification.error({
        title: <FormattedMessage defaultMessage="Can't start session" />,
      });
    },
  });
  const { isVisiable, toggle, close } = useToggle();

  const handleCalling = (isCourseID: boolean, idPara?: number) => {
    close();
    mutate({
      courseId: isCourseID ? idPara : undefined,
      sessionId: !isCourseID ? session?.id : undefined,
      whoami: 'teacher',
      source: 'web',
    });
  };
  return (
    <>
      {[UPCOMING, HAPPENING].includes(session?.happenedStatus) ? (
        <Button fill className="h-full rounded-lg" onClick={toggle}>
          <Text>
            <VideoCameraIcon className="h-5 text-white w-full" />
            <p>Join Call</p>
          </Text>
        </Button>
      ) : (
        <Button
          style={{
            backgroundColor: 'rgba(171, 180, 196, 0.1)',
            outline: 'none',
            border: 'none',
            color: '#ABB4C4',
          }}
          className="h-full rounded-lg"
          onClick={toggle}
        >
          <Text>
            <VideoCameraIcon className="h-5 w-full" />
            <p>Join Call</p>
          </Text>
        </Button>
      )}
      <JoinConfirmation
        id={Number(session.course_id) || undefined}
        isInputHandle={
          courseType && [TESTING_TYPE, TRIAL_TYPE].includes(courseType.value)
        }
        isModalVisible={isVisiable}
        handleCalling={handleCalling}
        closeModal={close}
        isLoading={isLoadingJoin}
      />
    </>
  );
};

export default JoinCall;
