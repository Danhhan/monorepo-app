/* eslint-disable no-shadow */
import {
  ButtonEmpty,
  FlexGroup,
  FlexItem,
  Page,
  PageBody,
  PageContent,
  PageContentBody,
  PageSideBar,
  Spacer,
} from '@antoree/ant-ui';
import { CourseCard, CourseLoading } from 'components';
import { COURSE_TYPES } from 'constants/courses';
import { useRedirect } from 'hooks';
import { useLocation, useParams } from 'react-router-dom';
import { useRetrieveCourseById } from 'services/course';
import { AllSessions, RightAside } from './components';
/**
 * rework session page
 */
const Sessions: React.FC<{}> = () => {
  const { id: courseId } = useParams<{ id: string }>();

  const { data, isLoading } = useRetrieveCourseById(
    {
      courseId: Number(courseId),
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  );
  const course = data?.data?.course;
  const { redirectTo } = useRedirect();
  const courseType = COURSE_TYPES.find(item => item.value === course?.type);
  return (
    <Page
      style={{ backgroundColor: '#fff', minHeight: 'calc(100vh - 64px)' }}
      className="pt-0"
    >
      <PageBody>
        <PageContent
          borderRadius="none"
          hasShadow={false}
          style={{ border: 'none' }}
        >
          <FlexGroup justifyContent="flexStart">
            <FlexItem grow={false}>
              <ButtonEmpty
                onClick={() => redirectTo('/courses')}
                iconType="arrowLeft"
                color="text"
              >
                My Courses
              </ButtonEmpty>
            </FlexItem>
          </FlexGroup>
          <Spacer size="xxl" />
          <PageContentBody>
            {isLoading ? (
              <CourseLoading renderSessions={false} />
            ) : (
              <>
                {course?.id && (
                  <CourseCard {...course} renderSessions={false} />
                )}
              </>
            )}
            {/* <TodaySessions courseType={courseType} /> */}
            <AllSessions courseType={courseType} />
          </PageContentBody>
        </PageContent>
      </PageBody>
      <PageSideBar
        paddingSize="l"
        style={{
          minWidth: 346,
          backgroundColor: 'white',
          boxShadow: 'inset 1px 0px 0px #EAEAEA',
        }}
      >
        {course?.id && <RightAside {...course} />}
      </PageSideBar>
    </Page>
  );
};

export default Sessions;
