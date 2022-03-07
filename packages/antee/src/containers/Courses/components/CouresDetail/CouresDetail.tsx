/* eslint-disable no-nested-ternary */
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import React, { useState } from 'react';
import { isMobile } from 'react-device-detect';
import { retriveHomeworkbySessionId } from 'services/homework/retriveHomeworkbySessionId';
import { useInfiniteRetrieveSessionsByCourseId } from 'services/session';
import ResultSessionDetail from '../../../Sessions/components/SessionDetail/ResultSessionDetail';
import VideoSessionDetail from '../../../Sessions/components/SessionDetail/VideoSessionDetail';
import './CourseDetail.module.scss';
import CoursesDetailItem from './CoursesDetailItem';

export type CouresDetailProps = {
  id: number;
  idDefault: number;
  showMobileModal: () => void;
  isShowDetail: boolean;
  showSessionDetail: boolean;
  showSessionResultDetail: boolean;
  setShowVideoSession: () => void;
  setShowResultSession: () => void;
  teactherInfo: any;
};

const CouresDetail = ({
  id,
  idDefault,
  showMobileModal,
  showSessionDetail,
  showSessionResultDetail,
  setShowResultSession,
  isShowDetail,
  teactherInfo,
  setShowVideoSession,
}: CouresDetailProps) => {
  const courseId = id || idDefault;

  // const { status } = useRetrieveIssue();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    refetch,
    isFetching,
    isLoading: isLoadingSession,
  } = useInfiniteRetrieveSessionsByCourseId(
    {
      courseId,
    },
    {
      enabled: !!courseId,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );
  const datateacher = data?.pages[0]?.data?.sessions[0];
  const dataSesssion = data?.pages;
  const [sessionid, setSessionid] = useState(0);
  const [videoItem, setVideoItem] = useState({});
  const [homeworkData, setResultHomeData] = useState({});
  const hanlegetVideo = (dataSession: {}) => {
    setVideoItem(dataSession);
  };
  const hanldegetResult = async (idSession: number) => {
    try {
      const dataresultHomework = await retriveHomeworkbySessionId({
        idSession,
      });
      setResultHomeData(dataresultHomework?.data);
    } catch (e: any) {
      console.log(e);
    }
  };
  return (
    <div>
      {!isMobile ? (
        <div style={{ marginTop: '26%' }}>
          <>
            <CoursesDetailItem
              isFetching={isFetching}
              refetch={refetch}
              isLoadingSession={isLoadingSession}
              teactherInfo={teactherInfo}
              hanlegetVideo={hanlegetVideo}
              hanldegetResult={hanldegetResult}
              setShowResultSession={setShowResultSession}
              dataCourcebySession={dataSesssion}
              hasNextPage={hasNextPage}
              idcource={courseId}
              setSessionid={setSessionid}
              fetchNextPage={fetchNextPage}
              setShowVideoSession={setShowVideoSession}
              datateacher={datateacher || []}
            />
          </>
          <SwipeableDrawer
            anchor="right"
            open={showSessionDetail}
            onClose={setShowVideoSession}
            onOpen={setShowVideoSession}
          >
            <VideoSessionDetail
              sessionid={sessionid}
              sessionVideoData={videoItem}
              setShowSession={setShowVideoSession}
            />
          </SwipeableDrawer>

          <SwipeableDrawer
            anchor="right"
            open={showSessionResultDetail}
            onClose={setShowResultSession}
            onOpen={setShowResultSession}
          >
            <ResultSessionDetail
              homeworkData={homeworkData}
              setShowResultSession={setShowResultSession}
            />
          </SwipeableDrawer>
        </div>
      ) : (
        <div>
          <SwipeableDrawer
            anchor="bottom"
            open={isShowDetail}
            onClose={showMobileModal}
            onOpen={showMobileModal}
          >
            <CoursesDetailItem
              isLoadingSession={isLoadingSession}
              hanldegetResult={hanldegetResult}
              isFetching={isFetching}
              refetch={refetch}
              teactherInfo={teactherInfo}
              hanlegetVideo={hanlegetVideo}
              setShowResultSession={setShowResultSession}
              dataCourcebySession={dataSesssion}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              setSessionid={setSessionid}
              idcource={courseId}
              setShowVideoSession={setShowVideoSession}
              datateacher={datateacher || {}}
            />
          </SwipeableDrawer>
          <SwipeableDrawer
            anchor="bottom"
            open={showSessionDetail}
            onClose={setShowVideoSession}
            onOpen={setShowVideoSession}
          >
            <VideoSessionDetail
              sessionid={sessionid}
              sessionVideoData={videoItem}
              setShowSession={setShowVideoSession}
            />
          </SwipeableDrawer>
          <SwipeableDrawer
            anchor="bottom"
            open={showSessionResultDetail}
            onClose={setShowResultSession}
            onOpen={setShowResultSession}
          >
            <ResultSessionDetail
              homeworkData={homeworkData}
              setShowResultSession={setShowResultSession}
            />
          </SwipeableDrawer>
        </div>
      )}
    </div>
  );
};

export default CouresDetail;
