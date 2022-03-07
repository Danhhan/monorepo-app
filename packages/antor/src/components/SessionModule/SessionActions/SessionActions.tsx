/* eslint-disable no-nested-ternary */
/* eslint-disable camelcase */
import {
  ButtonEmpty,
  ContextMenu,
  htmlIdGenerator,
  Icon,
  notification,
  Outline,
  Popover,
} from '@antoree/ant-ui';
import {
  ABSENT_BY_STUDENT,
  ABSENT_BY_TEACHER,
  UPCOMING,
} from 'constants/session';
import { useEffect, useState, memo } from 'react';
import { FormattedMessage } from 'react-intl';
import { SessionAbsent } from 'services/session';
import { CANNOT_JOIN, CAN_JOIN, VIDEO_RECORD } from '../constants';

export type SessionActionsProps = {
  openAbsenceReason: () => void;
  onUndoAbsentSession: (issueId: number) => void;
  isMainCourse: boolean;
  isVisiableAbsenceReason?: boolean;
  courseId: number;
  sessionId: number;
  issues: {
    sessionAbsent: SessionAbsent;
  };
  isLoading: boolean;
  happenedStatus: number;
};

const SessionActions: React.FC<SessionActionsProps> = props => {
  const {
    sessionId,
    openAbsenceReason,
    onUndoAbsentSession,
    isMainCourse,
    issues,
    isVisiableAbsenceReason,
    isLoading,
    happenedStatus,
  } = props;
  const [isPopoverOpen, setPopover] = useState(false);
  const { DotsVerticalIcon } = Outline;
  const CANCEL_SESSION = 0;

  const [panels, setPanels] = useState<any>([
    {
      id: CANCEL_SESSION,
      title: `Session ID ${sessionId}`,
      items: [
        {
          id: VIDEO_RECORD,
          name: 'View recordings',
          icon: 'videoPlayer',
          // panel: 1,
          onClick: () => {
            notification.error({
              title: <FormattedMessage defaultMessage="Not Implemented" />,
            });
          },
        },
        {
          id: CANNOT_JOIN,
          name: (
            <span style={{ color: '#ED0000' }}>I can’t join this session</span>
          ),
          icon: <Icon type="alert" color="#ED0000" />,
          onClick: () => {
            openAbsenceReason();
          },
        },
        {
          id: CAN_JOIN,
          name: (
            <span style={{ color: '#0AA263' }}>I can join this session</span>
          ),
          icon: !isLoading && <Icon type="check" color="#0AA263" />,
          onClick: () => {
            onUndoAbsentSession(issues?.sessionAbsent?.id);
          },
        },
      ],
    },
  ]);
  const addVideoRecordToPanelList = () => {
    const localPanels = [...panels];
    const index = localPanels.findIndex(item => item.id === CANCEL_SESSION);
    localPanels[index].items = [];
    localPanels[index].items.push({
      id: VIDEO_RECORD,
      name: 'View recordings',
      icon: 'videoPlayer',
      panel: 1,
    });
    setPanels(localPanels);
  };
  const findSubPanelList = () => {
    const localPanels = [...panels];
    const index = localPanels.findIndex(item => item.id === CANCEL_SESSION);
    return localPanels[index].items;
  };
  const addICanJoin = (subPanels: Array<any>) => {
    subPanels?.push({
      id: CAN_JOIN,
      name: <span style={{ color: '#0AA263' }}>I can join this session</span>,
      icon: <Icon type="check" color="#0AA263" />,
      onClick: (event: Event) => {
        onUndoAbsentSession(issues?.sessionAbsent?.id);
      },
    });
  };

  useEffect(() => {
    if (isVisiableAbsenceReason) {
      setPopover(false);
    }
  }, [isVisiableAbsenceReason]);
  useEffect(() => {
    if (issues) {
      if (issues?.sessionAbsent) {
        if (issues?.sessionAbsent?.absentBy === ABSENT_BY_TEACHER) {
          const subPanels = findSubPanelList();
          const indexCannotJoin = subPanels?.findIndex(
            (el: any) => el.id === CANNOT_JOIN,
          );
          if (indexCannotJoin !== -1) {
            subPanels.splice(indexCannotJoin, 1);
            const indexCanJoin = subPanels?.findIndex(
              (el: any) => el.id === CAN_JOIN,
            );
            if (indexCanJoin === -1) {
              addICanJoin(subPanels);
            }
          }
        }
        if (issues?.sessionAbsent?.absentBy === ABSENT_BY_STUDENT) {
          addVideoRecordToPanelList();
        }
      }
    }
    if (happenedStatus === UPCOMING) {
      const subPanels = findSubPanelList();
      const indexCanJoin = subPanels.findIndex((el: any) => el.id === CAN_JOIN);
      if (indexCanJoin !== -1) {
        subPanels.splice(indexCanJoin, 1);
      }
      const indexCanNotJoin = subPanels.findIndex(
        (el: any) => el.id === CANNOT_JOIN,
      );
      if (indexCanNotJoin === -1) {
        subPanels.push({
          id: CANNOT_JOIN,
          name: (
            <span style={{ color: '#ED0000' }}>I can’t join this session</span>
          ),
          icon: <Icon type="alert" color="#ED0000" />,
          onClick: () => {
            openAbsenceReason();
          },
        });
      }
    }
    if (!isMainCourse || (happenedStatus !== UPCOMING && !issues)) {
      addVideoRecordToPanelList();
    }
    setPopover(false);
  }, [issues, isMainCourse, happenedStatus]);

  return (
    <Popover
      id={htmlIdGenerator()()}
      button={
        <ButtonEmpty onClick={() => setPopover(!isPopoverOpen)}>
          <DotsVerticalIcon style={{ color: '#69707D' }} className="h-5 w-5" />
        </ButtonEmpty>
      }
      isOpen={isPopoverOpen}
      closePopover={() => setPopover(false)}
      panelPaddingSize="none"
      anchorPosition="downLeft"
    >
      <ContextMenu initialPanelId={0} panels={panels || []} />
    </Popover>
  );
};

export default memo(SessionActions);
