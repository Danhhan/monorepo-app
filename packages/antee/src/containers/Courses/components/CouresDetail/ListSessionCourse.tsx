/* eslint-disable no-nested-ternary */
import {
  Button,
  ButtonEmpty,
  FlexItem,
  Icon,
  Outline,
  Text,
  Title,
} from '@antoree/ant-ui';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import Skeleton from '@mui/material/Skeleton';

import { isEmpty } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import React, { useState } from 'react';
import CountimeDown from '../../../../components/CountTimeDown';
import ButtonJoin from './ButtonJoin';
import CouresSessionOption from './CouresSessionOption';
import stys from './CourseDetail.module.scss';
import {
  CHANGE_TOPIC_TYPE,
  CHANGE_TEACHER_TYPE,
  CHANGE_TRANSFER_TYPE,
  NEW_TYPE,
} from '../../../../constants/courses';
import { HAPPENED, UNHAPPENED } from '../../../../constants/session';
import AbsenceReasonModal from '../AbsenceReasonModal/AbsenceReasonModal';

interface ListSessionCoureProps {
  dataSesssion: any;
  joinbyCourceId: any;
  joinbySessionId: any;

  setSessionid: (id: number) => void;
  setShowVideoSession: () => void;
  setShowResultSession: () => void;
  hanlegetVideo: (datavideo: {}) => void;
  hanldegetResult: (idSession: number) => void;
  refetch: () => void;
  isFetching: boolean;
}

const ListSessionCourse = ({
  dataSesssion,
  joinbyCourceId,
  joinbySessionId,
  hanlegetVideo,
  setShowVideoSession,
  setSessionid,

  hanldegetResult,
  setShowResultSession,
  refetch,
  isFetching,
}: ListSessionCoureProps) => {
  const [idHover, setIdHover] = useState(0);
  const [isShowModal, setShowModal] = useState(false);
  const [idsession, setIdSession] = useState<number>(0);
  const [idSource, setIdSouce] = useState<number>(0);

  const hanldeOpenModal = (idSession: any, idsource: any) => {
    setIdSession(idSession);
    setIdSouce(idsource);

    setShowModal(!isShowModal);
  };
  const { VideoCameraIcon } = Outline;
  return (
    <div>
      {dataSesssion?.map((item: any) =>
        item?.data?.sessions?.map((it: any) => (
          // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
          <div
            key={it?.id}
            className="flex items-center justify-items-center"
            id={stys.infoboxdetail}
            onMouseOver={(e: any) => {
              setIdHover(it.id);
            }}
            onMouseLeave={(e: any) => {
              setIdHover(0);
            }}
          >
            <FlexItem grow={false} className="m-0">
              <div
                style={{
                  marginRight: '16px',
                  textAlign: 'center',
                  borderRadius: '8px',
                  lineHeight: '100vh',

                  borderRight: '1px solid #CECECE',
                }}
              >
                <Text
                  color="subdued"
                  size="xs"
                  style={{ marginTop: '8px', fontSize: '22px' }}
                >
                  <h3
                    style={{
                      fontSize: '22px',
                      fontWeight: 600,
                      color: '#343741',
                      marginTop: '10px',
                      textTransform: 'capitalize',
                    }}
                  >
                    {moment(it?.shortDateOccurred_at).format('dddd')}
                  </h3>

                  {/* <p>{item.type}</p> */}
                </Text>
                <Text color="subdued" size="xs">
                  {isFetching ? (
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#343741',
                        marginTop: '10px',
                        paddingLeft: '5px',
                      }}
                    >
                      <Skeleton width={100} variant="text" />
                    </p>
                  ) : (
                    <p
                      style={{
                        fontSize: '14px',
                        color: '#343741',
                        marginTop: '10px',
                      }}
                    >
                      {it?.shortDateOccurred_at}
                    </p>
                  )}
                </Text>

                <Text color="subdued" size="xs" style={{ marginTop: '20px' }}>
                  {isFetching ? (
                    <Button
                      type="button"
                      disabled
                      onClick={() => {}}
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
                      Loading..
                    </Button>
                  ) : (
                    <ButtonJoin
                      courseid={
                        it?.courseType === NEW_TYPE ||
                        it?.courseType === CHANGE_TEACHER_TYPE ||
                        it?.courseType === CHANGE_TRANSFER_TYPE ||
                        it?.courseType === CHANGE_TOPIC_TYPE
                          ? it?.id
                          : it?.course_id
                      }
                      item={it}
                      mutate={
                        it?.courseType === NEW_TYPE ||
                        it?.courseType === CHANGE_TEACHER_TYPE ||
                        it?.courseType === CHANGE_TRANSFER_TYPE ||
                        it?.courseType === CHANGE_TOPIC_TYPE
                          ? joinbySessionId
                          : joinbyCourceId
                      }
                    />
                  )}
                </Text>
              </div>
            </FlexItem>
            <FlexItem style={{ width: '250px' }}>
              <Text color="subdued" size="xs">
                {it?.happenedStatus === UNHAPPENED ? (
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'red',
                    }}
                  >
                    <ButtonEmpty
                      type="button"
                      onClick={(e: any) => {}}
                      style={{
                        fontSize: '14px',
                        cursor: 'text',
                        color: 'red',
                        textDecoration: 'none',
                      }}
                      iconType={() => (
                        <AccessTimeFilledIcon
                          style={{ fontSize: '16px' }}
                          className="h-6 w-6"
                        />
                      )}
                    >
                      {isFetching ? 'Loading...' : <div>Đã hủy</div>}
                    </ButtonEmpty>
                  </span>
                ) : it?.happenedStatus === HAPPENED ? (
                  <span
                    style={{
                      fontSize: '14px',
                      color: 'red',
                    }}
                  >
                    <ButtonEmpty
                      type="button"
                      onClick={(e: any) => {}}
                      style={{
                        fontSize: '14px',
                        cursor: 'text',
                        color: '#0AA263',
                        textDecoration: 'none',
                      }}
                      iconType={() => (
                        <AccessTimeFilledIcon
                          style={{ fontSize: '16px' }}
                          className="h-6 w-6"
                        />
                      )}
                    >
                      {isFetching ? 'Loading...' : <div>Hoàn thành</div>}
                    </ButtonEmpty>
                  </span>
                ) : (
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#00C081',
                    }}
                  >
                    <ButtonEmpty
                      type="button"
                      onClick={(e: any) => {}}
                      style={{
                        fontSize: '14px',
                        cursor: 'text',
                        color: '#00C081',
                        float: 'left',
                        textDecoration: 'none',
                      }}
                      iconType={() => (
                        <AccessTimeFilledIcon
                          style={{ fontSize: '16px' }}
                          className="h-6 w-6"
                        />
                      )}
                    >
                      {isFetching ? (
                        'Loading...'
                      ) : (
                        <CountimeDown
                          timeend={it?.shortTimeEndedAt}
                          time={it?.shortTimeStartedAt}
                          datestart={it?.shortDateOccurred_at}
                        />
                      )}
                    </ButtonEmpty>
                  </span>
                )}
                <span
                  style={{
                    color: '#69707D',
                    fontSize: '14px',
                    marginTop: '10px',
                    float: 'right',
                    cursor: 'pointer',
                  }}
                >
                  <CouresSessionOption
                    idHover={idHover}
                    refetch={refetch}
                    isFetching={isFetching}
                    item={it}
                    hanldeOpenModal={hanldeOpenModal}
                  />
                </span>
              </Text>
              <Title size="xxs">
                <h1
                  className="overflow-hidden overflow-ellipsis whitespace-nowrap"
                  style={{
                    // height: '4rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    WebkitLineClamp: 2,
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  <ButtonEmpty
                    size="s"
                    type="button"
                    onClick={(e: any) => {}}
                    style={{
                      fontSize: '16px',
                      cursor: 'text',
                      color: '#343741',
                      fontWeight: 600,
                    }}
                    iconType={() => (
                      <div className="flex justify-center items-center">
                        <AccessTimeOutlinedIcon
                          style={{ fontSize: '16px' }}
                          className="h-6 w-6"
                        />
                      </div>
                    )}
                  >
                    {`${it?.shortTimeStartedAt} - ${it?.shortTimeEndedAt}`}
                  </ButtonEmpty>
                </h1>
              </Title>
              <Text
                color="subdued"
                size="xs"
                style={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#343741',
                }}
              >
                {isEmpty(it.videoUrl) === true ? (
                  <ButtonEmpty
                    size="s"
                    onClick={(e: any) => {
                      setShowVideoSession();
                      setSessionid(it?.id);
                      hanlegetVideo(it);
                    }}
                    color="text"
                    style={{ padding: 0 }}
                    disabled={isEmpty(it.videoUrl) === true}
                  />
                ) : (
                  <ButtonEmpty
                    size="s"
                    onClick={(e: any) => {
                      setShowVideoSession();
                      setSessionid(it.id);
                      hanlegetVideo(it);
                    }}
                    color="text"
                    style={{ padding: 0 }}
                    disabled={isEmpty(it.videoUrl) === true}
                  >
                    <Icon
                      type="videoPlayer"
                      color="disabled"
                      className="mr-2"
                    />
                    Xem video buổi học
                  </ButtonEmpty>
                )}
              </Text>
              <Text
                color="subdued"
                size="xs"
                style={{
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#343741',
                }}
              >
                {!(it?.title || it?.content) ? (
                  <ButtonEmpty
                    size="s"
                    onClick={(e: any) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      it.content || it.title ? setShowResultSession() : null;
                      setSessionid(it.id);
                    }}
                    color="text"
                    style={{ padding: 0 }}
                    disabled={!(it.title || it.content)}
                  />
                ) : (
                  <ButtonEmpty
                    size="s"
                    onClick={(e: any) => {
                      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                      it?.content || it.title ? setShowResultSession() : null;
                      setSessionid(it?.id);
                      hanldegetResult(it?.id);
                    }}
                    color="text"
                    style={{ padding: 0 }}
                    disabled={!(it?.title || it?.content)}
                  >
                    <Icon type="document" color="disabled" className="mr-2" />
                    Xem nội dung
                  </ButtonEmpty>
                )}
              </Text>
              <Text color="subdued" size="xs" />
            </FlexItem>
          </div>
        )),
      )}
      <AbsenceReasonModal
        refetch={refetch}
        isShowModal={isShowModal}
        idSession={idsession}
        idSource={idSource}
        hanldeOpenModal={hanldeOpenModal}
      />
    </div>
  );
};

export default ListSessionCourse;
