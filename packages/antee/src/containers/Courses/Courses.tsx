/* eslint-disable no-nested-ternary */

import { FlexGroup, FlexItem, notification } from '@antoree/ant-ui';
import PreLoginModal from 'components/PreLoginModal';
import { useToggle } from 'hooks';
import useWindowDimensions from 'hooks/useWindowDimensions';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'services/auth/contexts';
import { useInfinityCourses, useRetrieveCancelCourse } from 'services/course';
import { isMobile } from 'react-device-detect';
import AllCourses from './AllCourse';
import ChangeCourse from './components/ChangeCourse';
import CouresDetail from './components/CouresDetail/CouresDetail';
import { COURSE_STATUS_ALL } from './constants';

const Courses: React.FC<{}> = () => {
  const { isAuthenticated } = useAuth();
  const history = useHistory();
  const [type, setType] = useState<number>(COURSE_STATUS_ALL);

  const { height } = useWindowDimensions();
  const [status, setStatus] = useState<number>(COURSE_STATUS_ALL);
  const [term, setTerm] = useState('');
  const [rowSize, setRowSize] = useState(6);
  const [idSelected, setIdSelected] = useState<number>(0);
  const [courseType, setCourseType] = useState<number>(0);
  // show modal mobile
  const [isShowDetailMobile, setShowdetail] = useState(false);
  const [showSessionDetail, setShowSession] = useState(false);
  const [showSessionResultDetail, setShowResultSession] = useState(false);
  const [teactherInfo, setTeacherinfo] = useState({});

  const [ids, setIdResource] = useState(0);
  const onSelectCourse = (id: number) => {
    setIdSelected(id);
    setCourseType(type);
  };

  const { data } = useInfinityCourses({
    term,
    status,
    filterType: type,
    pageIndex: 1,
    totalItem: rowSize,
  });

  const arr = new Array();

  data?.pages.map(item => {
    item.data.courses.map(i => {
      arr.push(i);
    });
  });
  const iddefault = isEmpty(arr) ? '' : arr[0].id;
  const {
    isVisiable: isVisiableChangeCourse,
    toggle: toggleChangeCourse,
    close: closeChangeCourse,
  } = useToggle();

  const showMobileModal = () => {
    setShowdetail(!isShowDetailMobile);
  };
  const hanleShowSessionDetail = () => {
    setShowSession(!showSessionDetail);
  };

  const hanleShowResultSessionDetail = () => {
    setShowResultSession(!showSessionResultDetail);
  };

  const onClose = () => {
    history.push('/overview');
  };
  const {
    mutate: mutateChangeCourse,
    isLoading: isLoadingCancel,
  } = useRetrieveCancelCourse({
    onSuccess: () => {
      window.location.reload();
    },
    onError: err => {
      notification.error({
        title: 'Lỗi',
        text: 'Thay đổi lịch không thành công hoặc lịch đã bị hủy trước đó',
      });
    },
  });
  const handlegetTeacherInfo = (datateacher: []) => {
    setTeacherinfo(datateacher);
  };

  return (
    <div>
      <>
        {isAuthenticated ? (
          <>
            <FlexGroup style={{ backgroundColor: '#fff' }}>
              <FlexItem grow={8}>
                <AllCourses
                  handlegetTeacherInfo={handlegetTeacherInfo}
                  toggleChangeCourse={toggleChangeCourse}
                  datatable={arr}
                  showSessionDetail={showSessionDetail}
                  setShowSession={hanleShowSessionDetail}
                  showMobileModal={showMobileModal}
                  idSelected={idSelected}
                  setIdResource={setIdResource}
                  courseType={courseType}
                  onSelectCourse={onSelectCourse}
                  height={height}
                />
              </FlexItem>
              <FlexItem>
                <InfiniteScroll
                  dataLength={50}
                  next={() => {}}
                  hasMore={false}
                  height={isMobile ? 0 : 1000}
                  loader
                >
                  <CouresDetail
                    showSessionResultDetail={showSessionResultDetail}
                    setShowResultSession={hanleShowResultSessionDetail}
                    idDefault={iddefault}
                    teactherInfo={teactherInfo}
                    setShowVideoSession={hanleShowSessionDetail}
                    showSessionDetail={showSessionDetail}
                    isShowDetail={isShowDetailMobile}
                    showMobileModal={showMobileModal}
                    id={ids}
                  />
                </InfiniteScroll>
              </FlexItem>
            </FlexGroup>
            <ChangeCourse
              isVisiable={isVisiableChangeCourse}
              onClose={closeChangeCourse}
              onChangeCourse={() => mutateChangeCourse({ courseId: ids })}
              isLoading={isLoadingCancel}
            />
          </>
        ) : (
          // <div>abc</div>
          <PreLoginModal isVisiable onClose={onClose} onConfirm={() => {}} />
        )}
      </>
    </div>
  );
};

export default Courses;
