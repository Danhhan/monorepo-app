import { FlexGroup, FlexItem, Spacer, Title } from '@antoree/ant-ui';
import { SessionCard } from 'components';
import { CourseType } from 'constants/courses';
import { useParams } from 'react-router-dom';
import { useRetrieveTodayCoursSessionsByCourseId } from 'services';

export type AllSessionsProps = {
  courseType: CourseType | undefined;
};

const TodaySessions: React.FC<AllSessionsProps> = ({ courseType }) => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useRetrieveTodayCoursSessionsByCourseId(
    {
      courseId: id,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  );

  return (
    <>
      <Spacer size="xxl" />
      <FlexGroup>
        <FlexItem>
          <Title size="m" className="font-bold">
            <p>Today Sessions</p>
          </Title>
        </FlexItem>
      </FlexGroup>
      <FlexGroup direction="column">
        {data?.data?.sessions?.length !== 0 ? (
          data?.data?.sessions?.map(session => (
            <FlexItem key={session.id} grow={false}>
              <SessionCard
                key={session.id}
                session={session}
                courseType={courseType}
              />
            </FlexItem>
          ))
        ) : (
          <FlexItem>Not found any session today</FlexItem>
        )}
      </FlexGroup>
    </>
  );
};

export default TodaySessions;
