/* eslint-disable no-nested-ternary */
import {
  FlexGroup,
  FlexItem,
  Health,
  Icon,
  notification,
  Outline,
  Popover,
  Text,
  Title,
} from '@antoree/ant-ui';
import { daysToString } from '@antoree/helpers';
import {
  AbsenceReasonModal,
  ConfirmSession,
  CountdownTimer,
  JoinCall,
  PeriodicalEvaluation,
  SessionActions,
  TestResult,
} from 'components';
import { CourseType, TESTING_TYPE, TRIAL_TYPE } from 'constants/courses';
import { ABSENT_BY_TEACHER, SESSION_STATUS, UPCOMING } from 'constants/session';
import { useCurrentUser } from 'contexts';
import { useToggle } from 'hooks';
import moment from 'moment';
import { useCallback, useState, useEffect } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import {
  useCancelSession,
  useRetrieveSessionById,
  useUndoAbsentSession,
} from 'services';
import { Session } from 'services/session';

export type SessionCardProps = {
  children?: React.ReactNode;
  courseType: CourseType | undefined;
  session: Session;
};

const SessionCard: React.FC<SessionCardProps> = ({
  session: sessionProp,
  courseType,
}) => {
  const [isOpenPopoverReason, setOpenPopoverReason] = useState<boolean>(false);
  const [session, setSession] = useState<Session>(sessionProp);
  const [isEnabledSession, setIsEnabledSession] = useState(false);
  const { id: currentUserId } = useCurrentUser();

  const { ClockIcon: ClockIconOutline } = Outline;
  const sessionStatus = SESSION_STATUS.find(
    item => item?.value === session?.happenedStatus,
  );

  const renderHappenStatus = () => {
    if (sessionStatus?.label) {
      return (
        <p>
          <FormattedMessage {...sessionStatus?.label} />
        </p>
      );
    }
    return <FormattedMessage defaultMessage="Unknown" />;
  };

  const { mutate: mutateUndo, isLoading } = useUndoAbsentSession({
    onSuccess: data => {
      setSession(data?.data?.sessions);
      notification.success({
        title: <FormattedMessage defaultMessage="Undo successful" />,
      });
    },
    onError: error => {
      notification.error({
        title: <FormattedMessage defaultMessage="Undo failed" />,
        text: <p>{error?.response?.data?.errors[0]?.message}</p>,
      });
    },
  });
  const { data: dataRes } = useRetrieveSessionById(
    { id: session?.id },
    {
      enabled: isEnabledSession,
      cacheTime: 0,
      refetchOnWindowFocus: false,
    },
  );

  const handleUndoAbsentSession = useCallback((issueId: number) => {
    mutateUndo({
      courseId: session?.course_id,
      sessionId: session?.id,
      issueId,
    });
  }, []);

  const {
    isVisiable: isVisiableAbsenceReason,
    toggle: openAbsenceReason,
    close: closeAbsenceReason,
  } = useToggle();

  const {
    mutate: mutateCancelSession,
    isLoading: isLoadingConfirmSession,
  } = useCancelSession({
    onSuccess: data => {
      setSession(data?.data?.sessions);
      notification.success({
        title: <FormattedMessage defaultMessage="Cancel successful" />,
      });
      closeAbsenceReason();
    },
    onError: error => {
      notification.error({
        title: <FormattedMessage defaultMessage="Cancel failed" />,
        text: <p>{error?.response?.data?.errors[0]?.message}</p>,
      });
    },
  });
  const handleConfirmAbsent = (absenceReason: string) => {
    mutateCancelSession({
      courseId: session?.course_id,
      sessionId: session?.id,
      _absent: 1,
      content: absenceReason,
    });
  };

  // reload session when create test result success
  useEffect(() => {
    if (dataRes?.data?.session) setSession(dataRes?.data?.session);
  }, [dataRes]);
  console.log('session?.student?.type', session?.student?.type);
  const adultValue = 2;
  const renderTextActions = () => {
    if (courseType?.value === TESTING_TYPE) {
      return (
        <TestResult
          test={session?.test}
          sessionId={session?.id}
          studentName={session?.student.name}
          isAdult={session?.student?.type === adultValue}
          title={session?.student.name}
          avatarUrl={session?.student?.avatarUrl}
          onReload={() => setIsEnabledSession(true)}
        />
      );
    }
    if (courseType?.value !== TESTING_TYPE) {
      return (
        <ConfirmSession
          session={session}
          view={currentUserId !== session?.teacher?.id}
          allowSubmit={currentUserId === session?.teacher?.id}
          onReload={(sessionRes: Session) => {
            if (sessionRes) {
              setSession(sessionRes);
            }
          }}
        />
      );
    }
    return null;
  };
  const renderIconActions = () => {
    if (session?.hasEvaluation) {
      return (
        <PeriodicalEvaluation
          session={session}
          view={
            (currentUserId !== session?.teacher?.id && session?.evaluation) ||
            currentUserId !== session?.teacher?.id
          }
          allowSubmit={
            (currentUserId === session?.teacher?.id && !session?.evaluation) ||
            currentUserId === session?.teacher?.id
          }
          onReload={(sessionRes: Session) => setSession(sessionRes)}
        />
      );
    }
    if (session?.issues) {
      return (
        <div
          onMouseEnter={() => setOpenPopoverReason(true)}
          onMouseLeave={() => setOpenPopoverReason(false)}
        >
          <Icon className="mr-2" type="alert" style={{ color: '#ED0000' }} />
          <Popover
            display="block"
            isOpen={isOpenPopoverReason}
            closePopover={() => {}}
            anchorPosition="downCenter"
            button={<></>}
          >
            <Title className="text-base font-semibold">
              {session?.issues?.sessionAbsent?.absentBy ===
              ABSENT_BY_TEACHER ? (
                <p>Teacher absence</p>
              ) : (
                <p>Student absence</p>
              )}
            </Title>
            <Text color="subdued" style={{ fontSize: '14px' }}>
              <p>{session?.issues?.sessionAbsent?.createdAt}</p>
            </Text>

            <p style={{ width: '320px' }}>
              {session?.issues?.sessionAbsent?.absentReason}
            </p>
          </Popover>
        </div>
      );
    }
    return null;
  };
  return (
    <FlexGroup gutterSize="none" responsive={false} style={{ height: 75 }}>
      <FlexItem
        style={{
          backgroundColor: 'rgba(52, 55, 65, 0.05)',
          borderRadius: '8px',
        }}
        grow={9}
      >
        <FlexGroup>
          <FlexItem grow={9}>
            <FlexGroup style={{ alignItems: 'center' }}>
              <FlexItem
                grow={false}
                className="pl-6"
                style={{ minWidth: '20%' }}
              >
                {sessionStatus?.value === UPCOMING ? (
                  <CountdownTimer occurredAt={session?.occurredAt} />
                ) : (
                  <Health color={sessionStatus?.color}>
                    {renderHappenStatus()}
                  </Health>
                )}
              </FlexItem>
              {/* end item col 1 */}
              <FlexItem grow={false} style={{ minWidth: '20%' }}>
                <FlexGroup gutterSize="s">
                  <FlexItem grow={false}>
                    <Text>
                      <Icon type="calendar" className="mr-1" />
                    </Text>
                  </FlexItem>
                  <FlexItem>
                    <FlexGroup gutterSize="s">
                      <FlexItem grow={false}>
                        <Text>{daysToString(session?.occurredAt, true)},</Text>
                      </FlexItem>
                      <FlexItem grow={false}>
                        <FormattedDate
                          value={moment(
                            session?.occurredAt,
                            'YYYY-MM-DD',
                          ).toDate()}
                          dateStyle="medium"
                        />
                      </FlexItem>
                    </FlexGroup>
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
              {/* end item col 2 */}
              <FlexItem grow={false} style={{ minWidth: '15%' }}>
                <FlexGroup gutterSize="xs">
                  <FlexItem grow={false}>
                    <Text>
                      <ClockIconOutline
                        className="h-5 w-5"
                        style={{ color: '#343741' }}
                      />
                    </Text>
                  </FlexItem>
                  <FlexItem grow={false}>
                    <Text style={{ color: '#343741' }}>
                      <p>
                        {session?.shortTimeStartedAt} -{' '}
                        {session?.shortTimeEndedAt}
                      </p>
                    </Text>
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
              {/* end item col 3 */}
              <FlexItem grow={false} style={{ minWidth: '15%' }}>
                {renderTextActions()}
              </FlexItem>
              {/* end item col 4 */}
              <FlexItem
                grow={false}
                className="items-center"
                // style={{ minWidth: '10%' }}
              >
                {renderIconActions()}
              </FlexItem>
            </FlexGroup>
          </FlexItem>
          <FlexItem grow={1}>
            <JoinCall courseType={courseType} session={session} />
          </FlexItem>
        </FlexGroup>
      </FlexItem>
      <FlexItem grow={false} style={{ justifyContent: 'center' }}>
        <SessionActions
          courseId={session?.course_id}
          sessionId={session?.id}
          issues={session?.issues}
          isLoading={isLoading}
          happenedStatus={session?.happenedStatus}
          isMainCourse={
            !(
              courseType?.value === TRIAL_TYPE ||
              courseType?.value === TESTING_TYPE
            )
          }
          openAbsenceReason={openAbsenceReason}
          onUndoAbsentSession={handleUndoAbsentSession}
        />
      </FlexItem>
      {isVisiableAbsenceReason && (
        <AbsenceReasonModal
          close={closeAbsenceReason}
          onConfirmAbsent={handleConfirmAbsent}
          isLoading={isLoadingConfirmSession}
        />
      )}
    </FlexGroup>
  );
};

export default SessionCard;
