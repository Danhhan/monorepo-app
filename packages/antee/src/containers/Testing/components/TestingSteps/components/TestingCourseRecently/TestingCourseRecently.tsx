/* eslint-disable jsx-a11y/click-events-have-key-events */
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
import { isMobile } from 'react-device-detect';

import { CoursesGrid, SessionsList } from './components';

export type TestingCourseRecentlyProps = {
  onCancelCourse: Function;
  idSelected: number;
  onSelectCourse: (id: number) => void;
  height: number;
};

const TestingCourseRecently: React.FC<TestingCourseRecentlyProps> = ({
  idSelected,
  onSelectCourse,
  onCancelCourse,
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
      {!isMobile && (
        <>
          <FlexGroup>
            <FlexItem>
              <div>
                <img
                  style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: '240px',
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
                  maxWidth: '240px',
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
      <Title size="s">
        <p>
          <FormattedMessage defaultMessage="Thông tin buổi học thử" />
        </p>
      </Title>
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
              <CoursesGrid
                onReset={() => {
                  remove();
                  onCancelCourse();
                }}
                courses={recentCourseData?.data?.courses}
                idSelected={idSelected}
                onSelectCourse={() => {}}
              />
            </>
          ) : (
            <FlexGroup>
              <FlexItem>
                <Text size="m" color="text">
                  <p>
                    <FormattedMessage
                      defaultMessage="Bạn chưa đặt lịch test. Chọn {link} để hoàn tất đăng ký tham gia."
                      values={{
                        link: (
                          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
                          <span
                            style={{
                              color: '#00C081',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                            }}
                            onClick={() => onCancelCourse()}
                          >
                            <FormattedMessage defaultMessage="Đặt lịch" />
                          </span>
                        ),
                      }}
                    />
                  </p>
                </Text>
                <Spacer />
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
      {/* </PageContent> */}
    </>
  );
};

export default TestingCourseRecently;
