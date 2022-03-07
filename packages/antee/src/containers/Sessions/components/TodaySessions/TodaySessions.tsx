import {
  FlexItem,
  PageContentBody,
  FlexGrid,
  PageContentHeader,
  PageContentHeaderSection,
  Title,
  LoadingSpinner,
  Text,
  EmptyPrompt,
} from '@antoree/ant-ui';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useRetrieveTodayCoursSessionsByCourseId } from 'services/session';

import SessionCard from '../SessionCard';

type TodaySessionsProps = {
  courseType: number;
};

const TodaySessions: React.FC<TodaySessionsProps> = ({ courseType }) => {
  const { id: courseId } = useParams<{ id: string }>();

  const { data, isLoading } = useRetrieveTodayCoursSessionsByCourseId({
    courseId: parseInt(courseId, 10),
  });

  return (
    <>
      <PageContentHeader>
        <PageContentHeaderSection>
          <Title>
            <h2>
              <FormattedMessage defaultMessage="Today Course Sessions" />
            </h2>
          </Title>
        </PageContentHeaderSection>
      </PageContentHeader>
      <PageContentBody>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center justify-items-center py-10">
            <LoadingSpinner size="xl" />
            <Text>
              <p>
                <FormattedMessage defaultMessage="Loading sessions..." />
              </p>
            </Text>
          </div>
        ) : (
          <FlexGrid columns={4}>
            {data?.data.sessions.length !== 0 ? (
              data?.data.sessions.map(session => (
                <FlexItem key={session.id}>
                  <SessionCard
                    {...session}
                    courseId={courseId}
                    courseType={courseType}
                  />
                </FlexItem>
              ))
            ) : (
              <EmptyPrompt
                iconType="editorStrike"
                title={
                  <h2>
                    <FormattedMessage defaultMessage="There's no session available on today" />
                  </h2>
                }
              />
            )}
          </FlexGrid>
        )}
      </PageContentBody>
    </>
  );
};

export default TodaySessions;
