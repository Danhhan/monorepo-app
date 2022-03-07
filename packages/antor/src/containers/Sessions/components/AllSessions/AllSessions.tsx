import {
  FlexGroup,
  FlexItem,
  Health,
  LoadingSpinner,
  Spacer,
  Stat,
  SuperSelect,
  Title,
} from '@antoree/ant-ui';
import { SessionCard } from 'components';
import { CourseType } from 'constants/courses';
import { SESSION_STATUS, UNDEFINED } from 'constants/session';
import { usePagination } from 'hooks';
import { Fragment, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router';
import { Session, useCourseSessions, useRetrieveTotalSession } from 'services';
import { NumberParam, withDefault } from 'use-query-params';

export type AllSessionsProps = {
  courseType: CourseType | undefined;
};
const AllSessions: React.FC<AllSessionsProps> = ({ courseType }) => {
  const { id: courseId } = useParams<{ id: string }>();
  const {
    query: { status },
    onSelect,
  } = usePagination({
    status: withDefault(NumberParam, UNDEFINED),
  });

  const { data, hasNextPage, fetchNextPage } = useCourseSessions(
    {
      id: courseId,
      pageSize: 10,
      status,
    },
    {
      cacheTime: 0,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  );

  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => {
        return acc + page.data.sessions.length ?? 0;
      }, 0) ?? 0,
    [data],
  );

  const { data: dataTotal, isLoading } = useRetrieveTotalSession(
    {
      courseId: Number(courseId),
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
            <Stat
              title={
                <Title size="m" className="font-bold">
                  <p>{dataTotal?.data?.totalSession} Sessions</p>
                </Title>
              }
              description={<></>}
              isLoading={isLoading}
            />
          </Title>
        </FlexItem>
      </FlexGroup>
      <FlexGroup>
        <FlexItem grow={false}>
          <SuperSelect
            className="w-full md:w-72 rounded-lg"
            fullWidth
            options={SESSION_STATUS.map((stt, index) => ({
              value: `${stt.value}`,
              inputDisplay: (
                <Fragment key={index}>
                  {stt.value !== UNDEFINED ? (
                    <Health color={stt.color} style={{ lineHeight: 'inherit' }}>
                      <FormattedMessage {...stt.label} />
                    </Health>
                  ) : (
                    <FormattedMessage {...stt.label} />
                  )}
                </Fragment>
              ),
            }))}
            valueOfSelected={`${status}`}
            onChange={value => onSelect('status')(value)}
          />
        </FlexItem>
      </FlexGroup>
      <Spacer size="xl" />

      <InfiniteScroll
        next={fetchNextPage}
        hasMore={hasNextPage ?? true}
        loader={
          <div className="flex flex-col items-center justify-center justify-items-center py-10">
            <LoadingSpinner size="xl" />
          </div>
        }
        style={{ overflow: 'inherit' }}
        dataLength={dataLength}
      >
        <FlexGroup direction="column">
          {data?.pages
            .map(page => page?.data?.sessions)
            .reduce((a, b) => [...a, ...b], [])
            ?.map((session: Session, index) => {
              return (
                <FlexItem grow={false} key={index} style={{ marginTop: 0 }}>
                  <SessionCard
                    courseType={courseType}
                    key={session.id}
                    session={session}
                  />
                </FlexItem>
              );
            })}
        </FlexGroup>
      </InfiniteScroll>
    </>
  );
};

export default AllSessions;
