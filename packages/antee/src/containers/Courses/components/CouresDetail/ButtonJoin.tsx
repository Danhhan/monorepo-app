import { Button, Outline } from '@antoree/ant-ui';
import { TESTING_TYPE, TRIAL_TYPE } from 'constants/courses';
import { useToggle } from 'hooks';
import React from 'react';
import { UNHAPPENED, HAPPENDED } from './sessionstatus';
import useTimer from '../../../../hooks/useTimer';
import JoinConfirmation from '../../../Sessions/components/JoinConfirmation/JoinConfirmation';

export type ButtonJoinProps = {
  courseid?: number;
  mutate: any;
  item: {
    shortTimeStartedAt: string;
    // eslint-disable-next-line camelcase
    shortDateOccurred_at: string;
    shortTimeEndedAt: string;
    courseType: number;
    happenedStatus: number;
  };
};

const ButtonJoin = ({
  courseid,
  mutate,
  // eslint-disable-next-line camelcase
  item: {
    shortTimeStartedAt,
    happenedStatus,
    // eslint-disable-next-line camelcase
    shortDateOccurred_at,
    shortTimeEndedAt,
    courseType,
  },
}: ButtonJoinProps) => {
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
            marginTop: '0px',

            color: '#ABB4C4',
            backgroundColor: 'rgba(171, 180, 196, 0.1)',
            border: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
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
            marginTop: '5px',
            backgroundColor: '#00C081',
            borderColor: '#00C081',
            textAlign: 'center',
            color: 'white',
            textDecoration: 'none',
            fontSize: '14px',
            fontWeight: 600,
          }}
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

export default ButtonJoin;
