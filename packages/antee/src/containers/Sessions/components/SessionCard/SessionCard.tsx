import {
  FlexGroup,
  FlexItem,
  Avatar,
  Title,
  Text,
  Icon,
  SplitPanel,
  notification,
  Button,
  Spacer,
  Popover,
  ContextMenuPanel,
  ContextMenuItem,
} from '@antoree/ant-ui';
import { FormattedDate, FormattedMessage } from 'react-intl';
import moment from 'moment';
import { useMemo } from 'react';

import { TRIAL_TYPE, TESTING_TYPE } from 'constants/courses';
import { useToggle } from 'hooks';
import { Session } from 'services/session';
import { useRetrieveRoomUrlBySessionId } from 'services/videoCall';

import Feedback from '../FeedbackModal';
import SessionStatus from './SessionStatus';
import { UPCOMING, UNHAPPENED, HAPPENED, ERROR_STATUS } from './constants';
import styles from './SessionCard.module.scss';
import JoinConfirmation from '../JoinConfirmation';

export type SessionCardProps = {
  courseId: string;
  test?: {
    id: number;
    url: string;
  };
  courseType: number;
} & Session;

const SessionCard: React.FC<SessionCardProps> = ({
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

  const openLink = (url: string) => () => {
    window.open(url, '_blank');
  };

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
    <SplitPanel.Outer className={styles.panelWraper}>
      <SplitPanel.Inner>
        <FlexGroup gutterSize="m" responsive={false}>
          <FlexItem grow={false}>
            <Avatar
              name={teacher.name}
              size="xl"
              imageUrl={teacher.avatarUrl}
            />
          </FlexItem>
          <FlexItem>
            <Text color="text">
              <p>
                <FormattedMessage defaultMessage="Teacher" />
              </p>
            </Text>
            <Title size="s">
              <h1>{teacher.name}</h1>
            </Title>
          </FlexItem>
        </FlexGroup>
      </SplitPanel.Inner>
      <SplitPanel.Inner className={styles.contentSection} grow={false}>
        <FlexGroup direction="column" gutterSize="m">
          <FlexItem>
            <FlexGroup direction="column" gutterSize="none">
              <FlexItem>
                <Text size="m" color="text">
                  <p>
                    <Icon type="clock" />
                    &nbsp;
                    <FormattedMessage defaultMessage="Time" />
                  </p>
                </Text>
              </FlexItem>
              <FlexItem>
                <Text size="m">
                  <p>
                    <FormattedDate
                      value={moment(occurredAt, 'YYYY-MM-DD HH:mm:ss').toDate()}
                      dateStyle="medium"
                    />
                  </p>
                </Text>
              </FlexItem>
              <Text size="s">
                <p>{`${shortTimeStartedAt} - ${shortTimeEndedAt} ( ${shortRepresentingDuration} )`}</p>
              </Text>
            </FlexGroup>
          </FlexItem>
          <FlexItem grow={false}>
            <FlexGroup alignItems="flexStart" gutterSize="s" responsive={false}>
              <FlexItem>
                <FlexGroup
                  direction="column"
                  justifyContent="center"
                  gutterSize="xs"
                >
                  <FlexItem>
                    <Text size="xs" color="text">
                      <p>
                        <Icon type="questionInCircle" />
                        &nbsp;
                        <FormattedMessage defaultMessage="Status" />
                      </p>
                    </Text>
                  </FlexItem>
                  <FlexItem>
                    <div>
                      <SessionStatus status={happenedStatus} />
                    </div>
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
              <FlexItem>
                <FlexGroup
                  justifyContent="center"
                  gutterSize="xs"
                  direction="column"
                >
                  <FlexItem>
                    <Text size="xs" color="text">
                      <p>
                        <Icon type="indexSettings" />
                        &nbsp;
                        <FormattedMessage defaultMessage="Session ID" />
                      </p>
                    </Text>
                  </FlexItem>
                  <FlexItem>
                    <Text size="xs" style={{ color: '#00C081' }}>
                      <p>
                        #<span>{id}</span>
                      </p>
                    </Text>
                  </FlexItem>
                </FlexGroup>
              </FlexItem>
            </FlexGroup>
          </FlexItem>
        </FlexGroup>
      </SplitPanel.Inner>
      <SplitPanel.Inner className="w-full" grow={false}>
        <Button
          size="m"
          className="w-full "
          color="primary"
          iconType="play"
          isLoading={isLoading}
          onClick={toggleModal}
          fill
          style={{ color: '#fff' }}
        >
          <FormattedMessage defaultMessage="Start session" />
        </Button>
        {showTestResult && test && test?.url && (
          <>
            <Spacer size="s" />
            <Button
              size="m"
              className="w-full"
              color="warning"
              iconType="indexEdit"
              fill
              isLoading={isLoading}
              onClick={() => window.open(test?.url, '_blank')}
              style={{ color: '#fff' }}
            >
              <FormattedMessage defaultMessage="Review Test Result" />
            </Button>
          </>
        )}
        <Spacer size="s" />
        <Popover
          display="block"
          button={
            <Button
              size="m"
              className="w-full"
              color="primary"
              iconSide="right"
              iconType="arrowDown"
              style={{ color: '#fff' }}
              disabled={!(videoUrl?.length > 0)}
              onClick={toggle}
              fill
            >
              <FormattedMessage defaultMessage="Watch records" />
            </Button>
          }
          panelPaddingSize="none"
          isOpen={isVisiable}
          closePopover={close}
        >
          <ContextMenuPanel
            className="w-40"
            items={
              videoUrl?.map?.((url, index) => (
                <ContextMenuItem
                  key={url}
                  icon="videoPlayer"
                  onClick={openLink(url)}
                >
                  <FormattedMessage
                    defaultMessage="Record {order}"
                    values={{ order: index + 1 }}
                  />
                </ContextMenuItem>
              )) ?? []
            }
          />
        </Popover>
        <Spacer size="s" />
        <Feedback id={id} courseId={courseId} disabled={isFeedbackDisabled} />
        <JoinConfirmation
          // eslint-disable-next-line radix
          id={parseInt(courseId)}
          isVisiable={isVisiableModal}
          onConfirm={handleCalling}
          onClose={closeModal}
          isInputHandle={[TESTING_TYPE, TRIAL_TYPE].includes(courseType)}
        />
      </SplitPanel.Inner>
    </SplitPanel.Outer>
  );
};

export default SessionCard;
