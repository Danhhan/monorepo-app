/* eslint-disable no-nested-ternary */
import { FlexItem, notification, Spacer, Text } from '@antoree/ant-ui';
import CircularProgress from '@mui/material/CircularProgress';
import { isEmpty } from 'lodash';
import moment from 'moment';
import 'moment/locale/vi';
import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import {
  useRetrieveRoomUrlByCourseId,
  useRetrieveRoomUrlBySessionId,
} from 'services/videoCall';
import { ERROR_STATUS } from '../../../Sessions/components/SessionCard/constants';
import CouresSekton from './CouresSekton';
import stys from './CourseDetail.module.scss';
import ImageTeacher from './ImageTeacher';
import ListSessionCourse from './ListSessionCourse';

moment.locale('vi');

export type CoursesDetailItemProps = {
  datateacher?: any;

  teactherInfo?: any;
  // eslint-disable-next-line react/no-unused-prop-types
  idcource: number;
  setShowVideoSession: () => void;
  hanlegetVideo: (datavideo: {}) => void;
  hanldegetResult: (idSession: number) => void;
  setSessionid: any;
  fetchNextPage: () => void;
  hasNextPage: any;
  dataCourcebySession: any;
  isFetching: boolean;
  // teacherInfo: any[];
  isLoadingSession: boolean;

  setShowResultSession: () => void;
  refetch: () => void;
};

const CoursesDetailItem = ({
  setShowVideoSession,
  datateacher,
  setSessionid,
  fetchNextPage,
  hasNextPage,
  teactherInfo,
  hanlegetVideo,
  setShowResultSession,
  dataCourcebySession,
  hanldegetResult,
  refetch,
  isFetching,
  isLoadingSession,
}: CoursesDetailItemProps) => {
  const { mutate: joinbySessionId } = useRetrieveRoomUrlBySessionId({
    onSuccess: res => {
      const typeRes = typeof res.data.vcUrl;
      if (typeRes === 'object') {
        notification.error({
          title: 'Lỗi',
        });
      } else {
        res.data.vcUrl
          ? window.open(res?.data?.vcUrl, '_blank')
          : window.open(res?.data?.studentUrl, '_blank');
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
          title: 'Không thể tham gia',
        });
      }
    },
  });

  const { mutate: joinbyCourceId } = useRetrieveRoomUrlByCourseId({
    // eslint-disable-next-line no-shadow
    onSuccess: (data: any) => {
      window.open(data?.data?.vcUrl, '_blank');
    },
    onError: (error: any) => {
      notification.error({
        title: <Text>Không tìm thấy khóa học</Text>,
      });
    },
  });
  const teacherHour = (time: number) => {
    const mintures = time * 60;
    const times = mintures < 60 ? `${mintures.toFixed()}` : `${time} `;
    const text = mintures < 60 ? `phút` : `giờ `;
    return times + text;
  };
  return (
    <div className={stys.DetailItem}>
      <InfiniteScroll
        height={1000}
        dataLength={
          isEmpty(dataCourcebySession) === false
            ? dataCourcebySession.map((it: any) => it?.data?.sessions?.length)
            : 0
        }
        next={fetchNextPage}
        hasMore={hasNextPage ?? true}
        loader={
          hasNextPage ? (
            <h3 style={{ textAlign: 'center' }}>
              <CircularProgress />
            </h3>
          ) : null
        }
      >
        {isEmpty(datateacher) === false ? (
          <div>
            <h2 id={stys.title}>
              <span>Buổi học trong khóa</span> <Spacer />
            </h2>
            <div key={datateacher?.id}>
              <div
                className="flex items-center justify-items-center"
                id={stys.infobox}
              >
                <FlexItem grow={false} className="m-0">
                  <ImageTeacher item={datateacher} />
                </FlexItem>
                <FlexItem style={{ width: '200px' }}>
                  <Text color="subdued" size="m">
                    <p>
                      {datateacher?.teacher?.nationality
                        ? datateacher?.teacher?.nationality
                        : ''}
                    </p>
                  </Text>
                  <p
                    style={{
                      // height: '4rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      WebkitLineClamp: 2,
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      marginTop: '10px',
                      fontSize: '16px',
                      fontWeight: 600,
                    }}
                  >
                    {datateacher?.teacher?.name}
                  </p>
                  <Text color="subdued" size="xs">
                    <p style={{ marginTop: '10px', fontSize: '14px' }}>
                      Đã học :{' '}
                      {teactherInfo?.total_passed_duration
                        ? teacherHour(teactherInfo?.total_passed_duration)
                        : 0}
                      /{' '}
                      {teactherInfo?.totalDuration
                        ? teacherHour(teactherInfo?.totalDuration)
                        : 0}{' '}
                    </p>
                  </Text>
                </FlexItem>
              </div>
            </div>
          </div>
        ) : (
          <>
            <CouresSekton isLoadingSession={isLoadingSession} />
          </>
        )}
        <div>
          {isEmpty(dataCourcebySession) === false ? (
            <div>
              <ListSessionCourse
                isFetching={isFetching}
                hanldegetResult={hanldegetResult}
                hanlegetVideo={hanlegetVideo}
                setShowResultSession={setShowResultSession}
                refetch={refetch}
                setSessionid={setSessionid}
                dataSesssion={dataCourcebySession}
                joinbySessionId={joinbySessionId}
                joinbyCourceId={joinbyCourceId}
                setShowVideoSession={setShowVideoSession}
              />
            </div>
          ) : (
            <>
              <CouresSekton isLoadingSession={isLoadingSession} />
            </>
          )}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default CoursesDetailItem;
