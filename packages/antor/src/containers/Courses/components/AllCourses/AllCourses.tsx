import {
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  PageContent,
  PageContentBody,
  PageContentHeader,
  Spacer,
  Title,
} from '@antoree/ant-ui';
import { CourseCard, CourseLoading } from 'components';
import { STATUS_OPEN } from 'constants/courses';
import { usePagination } from 'hooks';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { FormattedMessage } from 'react-intl';
import { useCourses } from 'services/course';
import { NumberParam, StringParam, withDefault } from 'use-query-params';
import FilterBar from '../FilterBar';

const AllCourses: React.FC<{}> = ({}) => {
  const {
    query: { status, term },
    onSelect,
    onInputChange,
  } = usePagination({
    term: withDefault(StringParam, ''),
    status: withDefault(NumberParam, STATUS_OPEN),
  });
  const { data, hasNextPage, fetchNextPage, isFetching } = useCourses(
    {
      term,
      status,
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  );

  const dataLength = useMemo(
    () =>
      data?.pages.reduce((acc, page) => {
        return acc + page.data.courses.length ?? 0;
      }, 0) ?? 0,
    [data],
  );

  return (
    <PageContent
      borderRadius="none"
      hasShadow={false}
      style={{ border: 'none' }}
    >
      <PageContentHeader>
        <FlexGroup>
          <FlexItem>
            <Title size="m">
              <h2 className="font-bold">
                <FormattedMessage defaultMessage="All course" />
              </h2>
            </Title>
          </FlexItem>
        </FlexGroup>
      </PageContentHeader>
      <PageContentHeader>
        <FlexGroup>
          <FlexItem grow={false}>
            <FilterBar
              status={status}
              onSelect={onSelect}
              onInputChange={onInputChange}
            />
          </FlexItem>
        </FlexGroup>
      </PageContentHeader>
      <Spacer />
      <PageContentBody>
        <InfiniteScroll
          next={fetchNextPage}
          hasMore={hasNextPage ?? true}
          loader={
            <FlexGroup direction="column">
              {Array.from(Array(1).keys()).map(index => (
                <FlexItem key={index} grow={false}>
                  <CourseLoading renderSessions />
                </FlexItem>
              ))}
            </FlexGroup>
          }
          style={{ overflow: 'inherit' }}
          dataLength={dataLength}
        >
          <FlexGroup direction="column">
            {data?.pages
              .map(page => page?.data?.courses)
              .reduce((a, b) => [...a, ...b], [])
              ?.map(course => (
                <FlexItem key={course?.id} grow={false}>
                  <CourseCard {...course} renderSessions />
                </FlexItem>
              ))}
          </FlexGroup>
        </InfiniteScroll>
        {isFetching && (
          <FlexItem grow={false}>
            <div className="flex flex-col items-center justify-center justify-items-center py-10">
              <LoadingSpinner size="xl" />
            </div>
          </FlexItem>
        )}
        {dataLength <= 0 && <span>Not found any course</span>}
      </PageContentBody>
    </PageContent>
  );
};

export default AllCourses;
