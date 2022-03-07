/* eslint-disable no-nested-ternary */
import {
  FlexGroup,
  FlexItem,
  Text,
  notification,
  Button,
  Spacer,
  Panel,
  Outline,
} from '@antoree/ant-ui';
import { FormattedDate, FormattedMessage } from 'react-intl';
import moment from 'moment';
import React, { useMemo } from 'react';
import { MobileSuggestModal } from 'components';
import { isMobile } from 'react-device-detect';
import { TRIAL_TYPE, TESTING_TYPE } from 'constants/courses';
import { useToggle } from 'hooks';
import { Session } from 'services/session';
import { useRetrieveRoomUrlBySessionId } from 'services/videoCall';

import Feedback from '../FeedbackModal';
import SessionStatus from './SessionStatus';
import { UPCOMING, UNHAPPENED, ERROR_STATUS } from './constants';
import styles from './SessionListCard.module.scss';
import JoinConfirmation from '../../../JoinConfirmation';
import SessionRecord from '../SessionRecordModal';

export type SessionListCardProps = {
  courseId: number;
  test?: {
    id: number;
    url: string;
  };
  courseType: number;
} & Session;

const SessionListCard: React.FC<SessionListCardProps> = ({
  courseId,
  id,
  teacher,
  occurredAt,
  happenedStatus,
  test,
  videoUrl,
  courseType,
  shortTimeEndedAt,
  shortTimeStartedAt,
  shortRepresentingDuration,
}) => {
  const { isVisiable, toggle, close } = useToggle();

  const {
    isVisiable: isVisiableModal,
    toggle: toggleModal,
    close: closeModal,
  } = useToggle();

  const { VideoCameraIcon } = Outline;

  const { mutate, isLoading } = useRetrieveRoomUrlBySessionId({
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

  const isFeedbackDisabled = useMemo<boolean>(
    () =>
      [TESTING_TYPE, TRIAL_TYPE].includes(courseType) ||
      [UPCOMING, UNHAPPENED].includes(happenedStatus),
    [happenedStatus, courseType],
  );

  const handleCalling = (isCourseID: boolean, idPara?: number) => {
    mutate(
      {
        courseId: isCourseID ? idPara : undefined,
        sessionId: !isCourseID ? id : undefined,
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
    <Panel className={styles.panelWraper}>
      <FlexGroup className="w-full" gutterSize="none" responsive={false}>
        <FlexItem>
          <Text size="s">
            <p>ID {id}</p>
          </Text>
        </FlexItem>
        <FlexItem className="items-end">
          <SessionStatus status={happenedStatus} />
        </FlexItem>
      </FlexGroup>
      <Spacer size="xs" />
      <Text size="xs">
        <FormattedDate
          value={moment(shortTimeStartedAt, 'HH:mm').toDate()}
          timeStyle="short"
        />
        &nbsp;
        <span>-</span>
        <FormattedDate
          value={moment(shortTimeEndedAt, 'HH:mm').toDate()}
          timeStyle="short"
        />
        , &nbsp;
        <FormattedDate
          value={moment(occurredAt, 'YYYY-MM-DD HH:mm:ss').toDate()}
          dateStyle="short"
        />
      </Text>
      <Spacer size="m" />
      <FlexGroup gutterSize="s" justifyContent="spaceAround">
        <FlexItem grow={10}>
          <Button
            fill
            minWidth={80}
            className="rounded-lg"
            style={{ padding: '0px', textDecoration: 'none' }}
            isLoading={isLoading}
            onClick={toggleModal}
          >
            <Text size="s">
              <p className="flex">
                <div className="h-6 w-6">
                  <VideoCameraIcon />
                </div>
                &nbsp;
                <FormattedMessage defaultMessage="Join" />
              </p>
            </Text>
          </Button>
        </FlexItem>
      </FlexGroup>
      <Spacer size="m" />
      <FlexGroup gutterSize="s" justifyContent="spaceAround">
        <FlexItem>
          {[TESTING_TYPE].includes(courseType) ? (
            <Button
              fill
              minWidth={80}
              style={{ padding: '0px', textDecoration: 'none' }}
              className="rounded-lg"
              isLoading={isLoading}
              disabled={!test?.url}
              onClick={() => window.open(test?.url, '_blank')}
            >
              <Text size="s">
                <p>
                  <FormattedMessage defaultMessage="View result" />
                </p>
              </Text>
            </Button>
          ) : (
            <>
              {!isFeedbackDisabled ? (
                <Feedback
                  id={id}
                  courseId={courseId}
                  disabled={isFeedbackDisabled}
                />
              ) : (
                <Button
                  fill
                  minWidth={80}
                  style={{ padding: '0px', textDecoration: 'none' }}
                  isLoading={isLoading}
                  disabled={isFeedbackDisabled}
                >
                  <Text size="m">
                    <p>
                      <FormattedMessage defaultMessage="View result" />
                    </p>
                  </Text>
                </Button>
              )}{' '}
            </>
          )}
        </FlexItem>
        <FlexItem>
          <Button
            fill
            className="rounded-lg"
            minWidth={80}
            style={{ padding: '0px', textDecoration: 'none' }}
            isLoading={isLoading}
            disabled={videoUrl?.length === 0}
            onClick={toggle}
          >
            <Text size="s">
              <p>
                <FormattedMessage defaultMessage="Record" />
              </p>
            </Text>
          </Button>
          <SessionRecord
            videoUrl={videoUrl}
            isVisiable={isVisiable}
            onClose={close}
          />
        </FlexItem>
        {isMobile ? (
          <MobileSuggestModal
            isVisiable={isVisiableModal}
            onConfirm={handleCalling}
            onClose={closeModal}
          />
        ) : (
          <JoinConfirmation
            id={courseId}
            isVisiable={isVisiableModal}
            onConfirm={handleCalling}
            onClose={closeModal}
            isInputHandle={[TESTING_TYPE, TRIAL_TYPE].includes(courseType)}
          />
        )}
      </FlexGroup>
    </Panel>
  );
};

export default SessionListCard;
