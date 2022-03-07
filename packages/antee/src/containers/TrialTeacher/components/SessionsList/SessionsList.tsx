/* eslint-disable no-nested-ternary */
import {
  FlexItem,
  PageContentBody,
  LoadingSpinner,
  Text,
  Spacer,
  FlexGroup,
} from '@antoree/ant-ui';

import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo } from 'react';

import { useInfiniteRetrieveSessionsByCourseId } from 'services/session';

import SessionListCard from '../SessionListCard';

type AllSessionsProps = {
  isLoading: boolean;
  courseId: number | null;
  height: number;
  courseType: number;
};

const SessionsList: React.FC<AllSessionsProps> = ({
  courseId,
  isLoading,
  height,
  courseType,
}) => {
  // console.log(courseId);
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading: isLoadingCourseAll,
  } = useInfiniteRetrieveSessionsByCourseId(
    {
      courseId,
    },
    {
      enabled: !!courseId,
    },
  );
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
      <PageContentBody className="bg-gray-100 py-4 rounded-lg">
        <Text className="pl-4" size="m">
          <p>
            <FormattedMessage
              defaultMessage="Sessions in course ID: {courseId}"
              values={{ courseId }}
            />
          </p>
        </Text>
        <Spacer size="m" />
        {isLoadingCourseAll ? (
          loadingSpinner
        ) : data?.pages[0]?.data?.sessions.length !== 0 && courseId ? (
          <InfiniteScroll
            next={fetchNextPage}
            hasMore={hasNextPage ?? false}
            dataLength={dataLength}
            loader={loadingSpinner}
          >
            <FlexGroup gutterSize="none">
              {data?.pages?.map?.(page =>
                page.data.sessions.map(session => (
                  <FlexItem key={session.id} className="px-4">
                    <SessionListCard
                      {...session}
                      courseId={courseId}
                      courseType={courseType}
                    />
                  </FlexItem>
                )),
              )}
            </FlexGroup>
            <Spacer />
          </InfiniteScroll>
        ) : (
          <FlexGroup>
            <FlexItem>
              <Text className="px-4">
                <p>
                  <FormattedMessage defaultMessage="Chưa có thông tin buổi test." />
                </p>
              </Text>
            </FlexItem>
          </FlexGroup>
        )}
      </PageContentBody>
    </>
  );
};

export default SessionsList;
