/* eslint-disable no-nested-ternary */
import {
  FlexGroup,
  FlexItem,
  Text,
  notification,
  Spacer,
  Panel,
  Button,
} from '@antoree/ant-ui';
import { FormattedDate, FormattedMessage } from 'react-intl';
import moment from 'moment';
import React, { useMemo } from 'react';

import { TRIAL_TYPE, TESTING_TYPE } from 'constants/courses';
import { useToggle } from 'hooks';
import { Session } from 'services/session';
import { useRetrieveRoomUrlBySessionId } from 'services/videoCall';
import camera from 'assets/icons/camera.svg';

import Feedback from '../FeedbackModal';
import SessionStatus from './SessionStatus';
import { UPCOMING, UNHAPPENED, HAPPENED, ERROR_STATUS } from './constants';
import styles from './SessionListCard.module.scss';
import JoinConfirmation from '../JoinConfirmation';
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
  title,
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

  const showTestResult = HAPPENED === happenedStatus && test;

  return (
    <Panel
      className={styles.panelWraper}
      style={{ borderRadius: '8px' }}
      hasShadow={false}
    >
      <FlexGroup>
        <FlexItem style={{ fontSize: '14px' }}>
          <FormattedMessage
            defaultMessage="ID {sessionId} {sessionTitle}"
            values={{ sessionId: id, sessionTitle: title }}
          />
        </FlexItem>
        <FlexItem grow={false}>
          <div className="text-right">
            <SessionStatus status={happenedStatus} />
          </div>
        </FlexItem>
      </FlexGroup>
      <Spacer size="m" />
      <FlexGroup>
        <FlexItem>
          <Text className="font-semibold" style={{ fontSize: '14px' }}>
            <FormattedDate
              value={moment(shortTimeStartedAt, 'HH:mm').toDate()}
              timeStyle="short"
            />
            &nbsp;
            <span>-</span>
            &nbsp;
            <FormattedDate
              value={moment(shortTimeEndedAt, 'HH:mm').toDate()}
              timeStyle="short"
              hour12
            />
            <span>,</span>
            &nbsp;
            <FormattedDate
              value={moment(occurredAt, 'YYYY-MM-DD HH:mm:ss').toDate()}
              dateStyle="short"
            />
          </Text>
        </FlexItem>
      </FlexGroup>
      {/* <FlexGroup className="w-full" gutterSize="s" responsive={false}>
        <FlexItem>
          <Text className="pl-3">
            <FormattedDate
              value={moment(occurredAt, 'YYYY-MM-DD HH:mm:ss').toDate()}
              dateStyle="full"
            />
            <Spacer size="xs" />
            <FormattedDate
              value={moment(shortTimeStartedAt, 'HH:mm').toDate()}
              timeStyle="short"
            />
            &nbsp;
            <span>-</span>
            &nbsp;
            <FormattedDate
              value={moment(shortTimeEndedAt, 'HH:mm').toDate()}
              timeStyle="short"
            />
          </Text>
        </FlexItem>
      </FlexGroup> */}
      <Spacer size="m" />
      <FlexGroup>
        <FlexItem>
          <Button
            className="rounded-lg w-full"
            style={{ padding: '0px', textDecoration: 'none', fontSize: '14px' }}
            isLoading={isLoading}
            onClick={toggleModal}
            fill
            iconType={camera}
          >
            <FormattedMessage defaultMessage="Join" />
          </Button>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem>
          {[TESTING_TYPE].includes(courseType) ? (
            <Button
              className="rounded-lg w-full"
              style={{
                padding: '0px',
                textDecoration: 'none',
                fontSize: '14px',
              }}
              isLoading={isLoading}
              onClick={() =>
                showTestResult &&
                test &&
                test?.url &&
                window.open(test?.url, '_blank')
              }
              disabled={!(showTestResult && test && test?.url)}
              fill
              // iconType={result}
            >
              <FormattedMessage defaultMessage="View result" />
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
                  className="rounded-lg w-full"
                  style={{
                    padding: '0px',
                    textDecoration: 'none',
                    fontSize: '14px',
                  }}
                  isLoading={isLoading}
                  disabled={isFeedbackDisabled}
                  fill
                  // iconType={resultDisable}
                >
                  <FormattedMessage defaultMessage="View result" />
                </Button>
              )}
            </>
          )}
        </FlexItem>
        <FlexItem>
          <Button
            className="rounded-lg w-full"
            style={{
              padding: '0px',
              textDecoration: 'none',
              fontSize: '14px',
            }}
            minWidth={80}
            isLoading={isLoading}
            disabled={videoUrl?.length === 0}
            onClick={() => videoUrl?.length > 0 && toggle()}
            // iconType={play}
            fill
          >
            <FormattedMessage defaultMessage="Record" />
          </Button>
          <SessionRecord
            videoUrl={videoUrl}
            isVisiable={isVisiable}
            onClose={close}
          />
        </FlexItem>
        <JoinConfirmation
          id={courseId}
          isVisiable={isVisiableModal}
          onConfirm={handleCalling}
          onClose={closeModal}
          isInputHandle={[TESTING_TYPE, TRIAL_TYPE].includes(courseType)}
        />
      </FlexGroup>
      {/* <Spacer size="m" /> */}
      {/* <FlexGroup gutterSize="s">
        <FlexItem>
          <ButtonEmpty
            className="rounded-xl w-full"
            style={{ padding: '0px', textDecoration: 'none' }}
            isLoading={isLoading}
            onClick={toggleModal}
          >
            <div
              style={{
                width: '97px',
                height: '40px',
                textAlign: 'start',
                position: 'relative',
              }}
            >
              <span
                style={{
                  backgroundColor: '#00C081',
                  fontSize: '15px',
                  position: 'relative',
                  left: '0px',
                  top: '10px',
                  paddingTop: '20px',
                  borderRadius: '5px',
                }}
                className="pl-3 pr-3"
              >
                <Icon type={camera} className="mb-6" />
              </span>
              &nbsp;
              <span
                style={{
                  position: 'absolute',
                  top: '9px',
                  fontSize: '12px',
                }}
              >
                <FormattedMessage defaultMessage="video call" />
              </span>
            </div>
          </ButtonEmpty>
        </FlexItem>
        <FlexItem>
          {[TESTING_TYPE].includes(courseType) ? (
            <ButtonEmpty
              className="rounded-xl w-full"
              style={{ padding: '0px', textDecoration: 'none' }}
              isLoading={isLoading}
              disabled={test?.url === (undefined || '')}
              onClick={() => window.open(test?.url, '_blank')}
            >
              <div
                style={{
                  width: '105px',
                  height: '40px',
                  textAlign: 'start',
                  position: 'relative',
                }}
              >
                {showTestResult && test && test?.url ? (
                  <>
                    {' '}
                    <span
                      style={{
                        backgroundColor: '#00C081',
                        fontSize: '15px',
                        position: 'relative',
                        left: '0px',
                        top: '10px',
                        paddingTop: '20px',
                        borderRadius: '5px',
                      }}
                      className="pl-3 pr-3"
                    >
                      <Icon type={result} className="mb-6" />
                    </span>
                    &nbsp;
                    <span
                      style={{
                        position: 'absolute',
                        top: '9px',
                        fontSize: '12px',
                      }}
                    >
                      <FormattedMessage defaultMessage="View result" />
                    </span>{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <span
                      style={{
                        backgroundColor: '#E5E5E5',
                        fontSize: '15px',
                        position: 'relative',
                        left: '0px',
                        top: '10px',
                        paddingTop: '20px',
                        borderRadius: '5px',
                      }}
                      className="pl-3 pr-3"
                    >
                      <Icon type={resultDisable} className="mb-6" />
                    </span>
                    &nbsp;
                    <span
                      style={{
                        position: 'absolute',
                        top: '9px',
                        fontSize: '12px',
                        color: '#999999',
                      }}
                    >
                      <FormattedMessage defaultMessage="View result" />
                    </span>{' '}
                  </>
                )}
              </div>
            </ButtonEmpty>
          ) : (
            <>
              {!isFeedbackDisabled ? (
                <Feedback
                  id={id}
                  courseId={courseId}
                  disabled={isFeedbackDisabled}
                />
              ) : (
                <ButtonEmpty
                  className="rounded-xl w-full"
                  style={{ padding: '0px', textDecoration: 'none' }}
                  isLoading={isLoading}
                  disabled={isFeedbackDisabled}
                >
                  <div
                    style={{
                      width: '105px',
                      height: '40px',
                      textAlign: 'start',
                      position: 'relative',
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: '#E5E5E5',
                        fontSize: '15px',
                        position: 'relative',
                        left: '0px',
                        top: '10px',
                        paddingTop: '20px',
                        borderRadius: '5px',
                      }}
                      className="pl-3 pr-3"
                    >
                      <Icon type={resultDisable} className="mb-6" />
                    </span>
                    &nbsp;
                    <span
                      style={{
                        position: 'absolute',
                        top: '9px',
                        fontSize: '12px',
                        color: '#999999',
                      }}
                    >
                      <FormattedMessage defaultMessage="View result" />
                    </span>
                  </div>
                </ButtonEmpty>
              )}{' '}
            </>
          )}
        </FlexItem>
        <FlexItem grow={false}>
          <ButtonEmpty
            className="rounded-xl w-full"
            style={{ padding: '0px', textDecoration: 'none' }}
            isLoading={isLoading}
            disabled={videoUrl?.length === 0}
            onClick={toggle}
          >
            <div
              style={{
                width: '105px',
                height: '40px',
                textAlign: 'start',
                position: 'relative',
              }}
            >
              {videoUrl?.length > 0 ? (
                <>
                  <span
                    style={{
                      backgroundColor: '#00C081',
                      fontSize: '15px',
                      position: 'relative',
                      left: '0px',
                      top: '10px',
                      paddingTop: '20px',
                      borderRadius: '5px',
                    }}
                    className="pl-3 pr-3"
                  >
                    <Icon type={play} className="mb-6" />
                  </span>
                  &nbsp;
                  <span
                    style={{
                      position: 'absolute',
                      top: '9px',
                      fontSize: '12px',
                    }}
                  >
                    <FormattedMessage defaultMessage="Record" />
                  </span>{' '}
                </>
              ) : (
                <>
                  {' '}
                  <span
                    style={{
                      backgroundColor: '#E5E5E5',
                      fontSize: '15px',
                      position: 'relative',
                      left: '0px',
                      top: '10px',
                      paddingTop: '20px',
                      borderRadius: '5px',
                    }}
                    className="pl-3 pr-3"
                  >
                    <Icon type={playDisable} className="mb-6" />
                  </span>
                  &nbsp;
                  <span
                    style={{
                      position: 'absolute',
                      top: '9px',
                      fontSize: '12px',
                      color: '#999999',
                    }}
                  >
                    <FormattedMessage defaultMessage="Record" />
                  </span>
                </>
              )}
            </div>
          </ButtonEmpty>
          <SessionRecord
            videoUrl={videoUrl}
            isVisiable={isVisiable}
            onClose={close}
          />
        </FlexItem>
        <JoinConfirmation
          id={courseId}
          isVisiable={isVisiableModal}
          onConfirm={handleCalling}
          onClose={closeModal}
          isInputHandle={[TESTING_TYPE, TRIAL_TYPE].includes(courseType)}
        />
      </FlexGroup> */}
    </Panel>
  );
};

export default SessionListCard;
