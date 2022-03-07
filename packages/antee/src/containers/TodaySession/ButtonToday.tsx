import { Button, Outline } from '@antoree/ant-ui';
import React from 'react';
import { useToggle } from 'hooks';
import { COMPLETED_STATUS, TESTING_TYPE, TRIAL_TYPE } from 'constants/courses';
import { UNHAPPENED, HAPPENDED } from './TodayStatus';
import useTimer from '../../hooks/useTimer';

import JoinConfirmation from '../Sessions/components/JoinConfirmation';

export type ButtonTodayProps = {
  courseid: any;
  mutate: any;
  styles: any;
  item: {
    shortTimeStartedAt: string;
    // eslint-disable-next-line camelcase
    shortDateOccurred_at: string;
    shortTimeEndedAt: string;
    courseType: number;
    happenedStatus: number;
  };
};

const ButtonToday = ({
  courseid,
  mutate,
  styles,
  // eslint-disable-next-line camelcase
  item: {
    shortTimeStartedAt,
    // eslint-disable-next-line camelcase
    shortDateOccurred_at,
    shortTimeEndedAt,
    courseType,
    happenedStatus,
  },
}: ButtonTodayProps) => {
  const { VideoCameraIcon } = Outline;
  const timer = useTimer(
    shortTimeStartedAt,
    shortDateOccurred_at,
    shortTimeEndedAt,
  );

  const handleCalling = (isCourseID: boolean, idPara?: number) => {
    mutate(
      {
        courseId: isCourseID ? idPara : undefined,
        sessionId: !isCourseID ? courseid : undefined,
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
  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();
  return (
    <div>
      {timer === 'Đã kết thúc' ||
      happenedStatus === UNHAPPENED ||
      happenedStatus === HAPPENDED ? (
        <Button
          type="button"
          onClick={toggleModal}
          iconType={() => (
            <div className="flex justify-center items-center">
              <VideoCameraIcon className="h-6 w-6" />
            </div>
          )}
          style={{
            marginTop: '24px',
            width: '100%',
            backgroundColor: 'rgba(171, 180, 196, 0.1)',
            borderColor: '#b1b1c4',
            textAlign: 'center',
            padding: '8px',

            border: 'none',
            color: '#ABB4C4',
            textDecoration: 'none',
            fontWeight: 600,
          }}
          className={`${styles.btnAntee}`}
        >
          Tham gia
        </Button>
      ) : (
        <Button
          type="button"
          onClick={toggleModal}
          iconType={() => (
            <div className="flex justify-center items-center">
              <VideoCameraIcon className="h-6 w-6" />
            </div>
          )}
          style={{
            marginTop: '24px',
            width: '100%',
            backgroundColor: '#00C081',
            borderColor: '#00C081',
            textAlign: 'center',
            padding: '8px',

            border: 'none',
            color: 'white',
            textDecoration: 'none',
            fontWeight: 600,
          }}
          className={`${styles.btnAntee}`}
        >
          Tham gia
        </Button>
      )}
      <JoinConfirmation
        id={courseid}
        isVisiable={isVisiableModal}
        onConfirm={handleCalling}
        onClose={closeModal}
        isInputHandle={[TESTING_TYPE, TRIAL_TYPE].includes(courseType)}
      />
    </div>
  );
};

export default ButtonToday;
