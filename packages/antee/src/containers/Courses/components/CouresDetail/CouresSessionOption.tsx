import {
  ButtonEmpty,
  ContextMenuItem,
  ContextMenuPanel,
  Popover,
} from '@antoree/ant-ui';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useState } from 'react';
import moment from 'moment';
import {
  ABSENT_BY_STUDENT,
  UNHAPPENED,
  UPCOMING,
  ABSENT_BY_TEACHER,
} from '../../../../constants/session';
import {
  CHANGE_TEACHER_TYPE,
  CHANGE_TRANSFER_TYPE,
  NEW_TYPE,
  CHANGE_TOPIC_TYPE,
} from '../../../../constants/courses';
import {
  retrieveRejoin,
  useRetrieveIssue,
  hanldeRejoin,
} from '../../../../services/issue/reJoinSession';

import useTimer from '../../../../hooks/useTimer';

export type CouresSessionOptionProps = {
  item: {
    id: number;
    happenedStatus: number;
    // eslint-disable-next-line camelcase
    course_id: number;
    issues: any;
    formattedStartedAt: string;
    formattedEndedAt: string;
    shortTimeEndedAt: string;
    shortTimeStartedAt: string;
    // eslint-disable-next-line camelcase
    shortDateOccurred_at: string;
    type: number;
    courseType: number;
    // eslint-disable-next-line camelcase
    occurredAt: string;
    issueTexts: [];
  };
  refetch: () => void;
  hanldeOpenModal: (idsession: number, idSource: number) => void;
  isFetching: boolean;
  idHover: number;
};

const CouresSessionOption = ({
  item,
  hanldeOpenModal,
  refetch,
  isFetching,
  idHover,
}: CouresSessionOptionProps) => {
  const [isPopoverOpen, setPopover] = useState(false);
  const [isShowIssue, setShowIssue] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };
  const onShowIssue = () => {
    setShowIssue(!isShowIssue);
  };
  const timer = useTimer(
    item?.shortTimeStartedAt,
    item?.shortDateOccurred_at,
    item?.shortTimeEndedAt,
  );
  const closePopover = () => {
    setPopover(false);
  };

  const items = [
    <ContextMenuItem key="copy" onClick={closePopover}>
      <div style={{ width: '250px' }}>
        <p
          style={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginLeft: '14px',
          }}
        >
          Buổi học {item?.id}
        </p>
      </div>
    </ContextMenuItem>,
    <ContextMenuItem key="copy" onClick={closePopover}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {item?.happenedStatus === UPCOMING ? (
        <ButtonEmpty
          iconType="alert"
          onClick={(e: any) => {
            hanldeOpenModal(item?.id, item?.course_id);
          }}
          style={{ width: '250px', color: 'red' }}
        >
          {isFetching && timer === '' ? (
            'Loading...'
          ) : (
            <p> Báo nghỉ vào buổi học này </p>
          )}
        </ButtonEmpty>
      ) : item?.happenedStatus === UNHAPPENED &&
        item?.issues?.sessionAbsent?.absentBy === ABSENT_BY_STUDENT ? (
        <ButtonEmpty
          iconType="check"
          onClick={(e: any) => {
            hanldeRejoin(
              item?.id,
              item?.course_id,
              item?.issues?.sessionAbsent?.id,
              1,
              refetch,
            );
          }}
          style={{ width: '250px', color: 'green' }}
        >
          {isFetching && timer === '' ? (
            'Loading...'
          ) : (
            <p> Có thể tham gia buổi học này</p>
          )}
        </ButtonEmpty>
      ) : null}
    </ContextMenuItem>,
  ];
  const itemIssue = [
    <ContextMenuItem key="copy" onClick={closePopover}>
      <div style={{ width: '250px', marginLeft: '12px' }}>
        <p style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {/* eslint-disable-next-line no-nested-ternary */}
          {item?.issues?.sessionAbsent?.absentBy === ABSENT_BY_STUDENT
            ? 'Học sinh báo nghỉ'
            : item?.issues?.sessionAbsent?.absentBy === ABSENT_BY_TEACHER
            ? 'Giáo viên báo nghỉ'
            : ''}
        </p>
        <p style={{ fontSize: '16px' }}>
          {item?.issues?.sessionAbsent?.absentReason}
        </p>
      </div>
    </ContextMenuItem>,
  ];

  return (
    <>
      {item?.issues ? (
        <Popover
          id=""
          button={
            <ButtonEmpty
              iconType="alert"
              style={{ color: 'red' }}
              onMouseOver={onShowIssue}
              onMouseLeave={() => {
                setShowIssue(false);
              }}
              onClick={onShowIssue}
            />
          }
          isOpen={isShowIssue}
          closePopover={closePopover}
          panelPaddingSize="none"
          anchorPosition="downCenter"
        >
          <ContextMenuPanel size="s" items={itemIssue} />
        </Popover>
      ) : null}
      {item?.courseType === NEW_TYPE ||
      item?.courseType === CHANGE_TEACHER_TYPE ||
      item?.courseType === CHANGE_TRANSFER_TYPE ||
      item?.courseType === CHANGE_TOPIC_TYPE ? (
        <Popover
          id=""
          button={<MoreVertIcon onClick={onButtonClick} />}
          isOpen={isPopoverOpen}
          closePopover={closePopover}
          panelPaddingSize="none"
          anchorPosition="downCenter"
        >
          <ContextMenuPanel size="s" items={items} />
        </Popover>
      ) : (
        <div style={{ marginRight: '5px' }}>{item?.id}</div>
      )}
    </>
  );
};

export default CouresSessionOption;
