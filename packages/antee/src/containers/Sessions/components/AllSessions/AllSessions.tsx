import {
  FlexItem,
  PageContentBody,
  FlexGrid,
  PageContentHeader,
  PageContentHeaderSection,
  Title,
  LoadingSpinner,
  Text,
  Spacer,
} from '@antoree/ant-ui';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';

import { useInfiniteRetrieveSessionsByCourseId } from 'services/session';

import SessionCard from '../SessionCard';

type AllSessionsProps = {
  courseType: number;
};

const AllSessions: React.FC<AllSessionsProps> = ({ courseType }) => {
  const { id: courseId } = useParams<{ id: string }>();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteRetrieveSessionsByCourseId({
    courseId: parseInt(courseId, 10),
  });

  const dataLength = useMemo(
    () =>
      data?.pages.reduce(
        (acc, page) => acc + page.data.sessions.length ?? 0,
        0,
      ) ?? 0,
    [data],
  );

  const loadingSpinner = (
    <div className="flex flex-col items-center justify-center justify-items-center py-10">
      <LoadingSpinner size="xl" />
      <Text>
        <p>
          <FormattedMessage defaultMessage="Loading sessions..." />
        </p>
      </Text>
    </div>
  );

  return (
    <>
      <PageContentHeader>
        <PageContentHeaderSection>
          <Title>
            <h2>
              <FormattedMessage defaultMessage="All Course Sessions" />
            </h2>
          </Title>
        </PageContentHeaderSection>
      </PageContentHeader>
      <PageContentBody>
        {isLoading ? (
          loadingSpinner
        ) : (
          <div>
            <InfiniteScroll
              style={{ overflow: 'inherit' }}
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              dataLength={dataLength}
              loader={loadingSpinner}
            >
              <FlexGrid columns={4} gutterSize="xl">
                {data?.pages?.map?.(page =>
                  page.data.sessions.map(session => (
                    <FlexItem key={session.id}>
                      <SessionCard
                        {...session}
                        courseId={courseId}
                        courseType={courseType}
                      />
                    </FlexItem>
                  )),
                )}
              </FlexGrid>
              <Spacer />
            </InfiniteScroll>
          </div>
        )}
      </PageContentBody>
    </>
  );
};

export default AllSessions;
