/* eslint-disable no-nested-ternary */
import {
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  PageContentBody,
  Spacer,
  Text,
} from '@antoree/ant-ui';
import allCourseNotFound from 'assets/images/allCourseNotFound.svg';
import courseList from 'assets/images/course-list.svg';
import { TRIAL_TYPE } from 'constants/courses';
import { useEffect, useMemo, useState } from 'react';
import { isMobile } from 'react-device-detect';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FormattedMessage } from 'react-intl';
import { useInfinityCourses } from 'services/course';
import { CoursesGrid, SessionsList } from './components';
import { COURSE_STATUS_ALL, COURSE_STATUS_OPEN } from './constants';

export type CourseListProps = {
  idSelected: number;
  onSelectCourse: (id: number, type: number) => void;
  height: number;
  onCancelCourse: Function;
  onFirstPageEmpty: () => void;
};

const CourseList: React.FC<CourseListProps> = ({
  idSelected,
  onSelectCourse,
  onCancelCourse,
  onFirstPageEmpty,
  height,
}) => {
  const [status, setStatus] = useState<number>(COURSE_STATUS_ALL);
  const [term, setTerm] = useState<string>('');
  const [courseId, setCourseId] = useState<number | null>(null);

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
    remove,
    isFetching,
  } = useInfinityCourses({
    term,
    status,
  });
  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => {
        return acc + page.data.courses.length ?? 0;
      }, 0) ?? 0,
    [data],
  );
  const numberRecent =
    data?.pages
      .map(page => page?.data?.courses)
      .reduce((a, b) => [...a, ...b], [])
      .filter(course => course.type === TRIAL_TYPE)?.length || 0;

  useEffect(() => {
    if (numberRecent < 12 && (hasNextPage || hasNextPage === undefined)) {
      fetchNextPage();
    }
  }, [data]);

  useEffect(() => {
    const firstCourseNew = data?.pages?.[0].data?.courses.find(
      course => course.status === COURSE_STATUS_OPEN,
    );
    // console.log(firstCourseNew);
    if (!firstCourseNew) {
      onFirstPageEmpty();
    }
    data?.pages.forEach(courseArr => {
      const courseNew = courseArr.data.courses.find(
        course => course.status === COURSE_STATUS_OPEN,
      );
      setCourseId(courseNew?.id || 0);
    });
  }, [data]);

  return (
    <>
      {/* <PageContent color="transparent" borderRadius="none" hasShadow={false}> */}
      <PageContentBody>
        {!isMobile && (
          <>
            <FlexGroup>
              <FlexItem>
                <div>
                  <img
                    style={{
                      height: '100%',
                      width: '100%',
                      maxWidth: '180px',
                      objectFit: 'contain',
                      objectPosition: 'left',
                    }}
                    src={courseList}
                    alt="course-list"
                  />
                </div>
              </FlexItem>
              <FlexItem style={{ maxWidth: '25vw' }}>
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: '180px',
                    objectFit: 'contain',
                    objectPosition: 'left',
                  }}
                  src={allCourseNotFound}
                  alt="session-list"
                />
              </FlexItem>
            </FlexGroup>
            <Spacer />
            <Spacer />
          </>
        )}
        <Text size="s" style={{ paddingBottom: 16 }}>
          <h3>
            <FormattedMessage defaultMessage="Thông tin buổi học thử" />
          </h3>
        </Text>
        <FlexGroup className="flex-wrap-reverse">
          <FlexItem grow={2}>
            <InfiniteScroll
              height={400}
              next={fetchNextPage}
              hasMore={hasNextPage ?? true}
              loader={
                !isLoading && (
                  <div className="flex flex-col items-center justify-center justify-items-center py-10">
                    <LoadingSpinner size="xl" />
                    <Text>
                      <p>
                        <FormattedMessage defaultMessage="Loading courses..." />
                      </p>
                    </Text>
                  </div>
                )
              }
              style={{ overflowX: 'visible', overflowY: 'scroll' }}
              dataLength={dataLength}
            >
              {data?.pages[0]?.data?.courses.length !== 0 ? (
                <CoursesGrid
                  onReset={() => {
                    remove();
                    onCancelCourse();
                  }}
                  isLoading={isLoading}
                  courses={
                    data?.pages
                      .map(page => page?.data?.courses)
                      .reduce((a, b) => [...a, ...b], [])
                      .filter(course => course.type === TRIAL_TYPE) || []
                  }
                  isFetching={isFetching}
                  idSelected={idSelected}
                  onSelectCourse={(id, type) => setCourseId(id)}
                />
              ) : (
                <FlexGroup>
                  <FlexItem>
                    <Text size="m" color="text" className="m-auto">
                      <p>
                        <FormattedMessage defaultMessage="There is no course yet." />
                      </p>
                    </Text>
                  </FlexItem>
                </FlexGroup>
              )}
            </InfiniteScroll>
          </FlexItem>
          <FlexItem grow={1}>
            <SessionsList
              isLoading={isLoading}
              courseId={courseId || 0}
              height={height}
              courseType={TRIAL_TYPE}
            />
          </FlexItem>
        </FlexGroup>
      </PageContentBody>
      {/* </PageContent> */}
    </>
  );
};

export default CourseList;
