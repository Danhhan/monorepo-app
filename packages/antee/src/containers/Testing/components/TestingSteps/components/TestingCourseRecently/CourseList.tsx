/* eslint-disable no-nested-ternary */
import {
  FlexGroup,
  FlexItem,
  Title,
  Spacer,
  Text,
  PageContentBody,
  LoadingSpinner,
} from '@antoree/ant-ui';
import allCourseNotFound from 'assets/images/allCourseNotFound.svg';
import courseList from 'assets/images/course-list.svg';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import { useRetrieveCurrentCourse } from 'services/course';
import { TESTING_TYPE } from 'constants/courses';

import { CoursesGrid, SessionsList } from './components';

export type CourseListProps = {
  onCancleCourse: Function;
  idSelected: number;
  onSelectCourse: (id: number) => void;
  height: number;
};

const CourseList: React.FC<CourseListProps> = ({
  idSelected,
  onSelectCourse,
  onCancleCourse,
  height,
}) => {
  const [courseId, setCourseId] = useState<number | null>(null);

  const {
    data: recentCourseData,
    isLoading,
    remove,
  } = useRetrieveCurrentCourse({
    onSuccess: dataSuc => {
      const courseArr = dataSuc?.data?.courses;
      setCourseId(courseArr ? courseArr[0]?.id : null);
    },
  });

  return (
    <>
      {/* <PageContent color="transparent" borderRadius="none" hasShadow={false}> */}
      <PageContentBody>
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
        <FlexGroup className="flex-wrap-reverse">
          <FlexItem grow={2}>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center justify-items-center py-10">
                <LoadingSpinner size="xl" />
                <Text>
                  <p>
                    <FormattedMessage defaultMessage="Loading Courses..." />
                  </p>
                </Text>
              </div>
            ) : recentCourseData?.data?.courses &&
              recentCourseData?.data?.courses?.length !== 0 ? (
              <>
                <Title size="s">
                  <p>
                    <FormattedMessage defaultMessage="Thông tin buổi học thử" />
                  </p>
                </Title>
                <Spacer />
                <CoursesGrid
                  onReset={() => {
                    remove();
                    onCancleCourse();
                  }}
                  courses={recentCourseData?.data?.courses}
                  idSelected={idSelected}
                  onSelectCourse={() => {}}
                />
              </>
            ) : (
              <FlexGroup>
                <FlexItem>
                  <Text size="m" color="text" className="m-auto">
                    <p>
                      <FormattedMessage defaultMessage="There is no course yet." />
                    </p>
                  </Text>
                  <div style={{ textAlign: 'center' }}>
                    <img src={allCourseNotFound} alt="" />
                  </div>
                </FlexItem>
              </FlexGroup>
            )}
          </FlexItem>
          <FlexItem grow={1}>
            <SessionsList
              isLoading={isLoading}
              courseId={courseId || null}
              height={height}
              courseType={TESTING_TYPE}
            />
          </FlexItem>
        </FlexGroup>
      </PageContentBody>
      {/* </PageContent> */}
    </>
  );
};

export default CourseList;
