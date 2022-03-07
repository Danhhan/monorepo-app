import {
  FlexGroup,
  FlexItem,
  PageContent,
  PageContentHeader,
  Text,
  PageContentBody,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { CourseCard, CourseLoading } from 'components';
import { FormattedMessage } from 'react-intl';
import { Course, useTodayCourses } from 'services/course';

import QuickJoin from '../QuickJoin';

const TodayCourses: React.FC<{}> = () => {
  const {
    data: todayCourses,
    isLoading: todayCoursesLoading,
  } = useTodayCourses();
  return (
    <PageContent
      borderRadius="none"
      hasShadow={false}
      style={{ border: 'none' }}
    >
      <QuickJoin />
      <Spacer />
      <PageContentHeader>
        <FlexGroup>
          <FlexItem>
            <Title size="m">
              <h2 className="font-bold">
                <FormattedMessage defaultMessage="Today Courses" />
              </h2>
            </Title>
          </FlexItem>
        </FlexGroup>
      </PageContentHeader>
      <PageContentBody>
        {todayCoursesLoading && <CourseLoading renderSessions />}
        {todayCourses?.data.courses !== undefined &&
        todayCourses?.data.courses?.length > 0 ? (
          <FlexGroup direction="column">
            {todayCourses?.data.courses?.map((course: Course) => (
              <FlexItem key={course?.id} grow={false}>
                <CourseCard {...course} renderSessions />
              </FlexItem>
            ))}
          </FlexGroup>
        ) : (
          <Text>
            <span>Not found any course today</span>
          </Text>
        )}
      </PageContentBody>
    </PageContent>
  );
};
export default TodayCourses;
