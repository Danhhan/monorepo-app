import {
  FlexGroup,
  FlexItem,
  PageContentHeader,
  Text,
  PageContentBody,
  Button,
} from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import todayCourseNotFound from 'assets/images/todayCourseNotFound.svg';
import { useRetrieveTodayCourses } from 'services/course';
import { Helmet } from 'react-helmet';

import { CoursesGrid } from './components';

export type AllCourseProps = {
  idSelected: number;
  courseType: number;
  onSelectCourse: (id: number, type: number) => void;
};

const TodayCourses: React.FC<AllCourseProps> = ({
  idSelected,
  courseType,
  onSelectCourse,
}) => {
  const {
    data: todayCourses,
    isLoading: isTodayCoursesLoading,
  } = useRetrieveTodayCourses();

  return (
    <>
      <PageContentHeader>
        <FlexGroup>
          <FlexItem>
            <Text size="m">
              <h2>
                <FormattedMessage defaultMessage="Today Courses" />
              </h2>
            </Text>
            {todayCourses?.data.courses.length !== 0 ? (
              <Text size="s" color="text">
                <p>
                  <FormattedMessage defaultMessage="Select the course to see it sessions in details." />
                </p>
              </Text>
            ) : (
              <Text size="s" color="text">
                <p>
                  <FormattedMessage defaultMessage="There is no course today. Let’s book your favorite teacher and start to learn." />
                </p>
              </Text>
            )}
            <div
              style={
                todayCourses?.data.courses.length === 0
                  ? { textAlign: 'center' }
                  : { textAlign: 'left' }
              }
            >
              <img src={todayCourseNotFound} alt="" />
            </div>
          </FlexItem>
        </FlexGroup>
      </PageContentHeader>
      <PageContentBody>
        <CoursesGrid
          isLoading={isTodayCoursesLoading}
          courses={todayCourses?.data.courses}
          idSelected={idSelected}
          courseType={courseType}
          onSelectCourse={onSelectCourse}
        />
      </PageContentBody>
    </>
  );
};
export default TodayCourses;
