/* eslint-disable no-nested-ternary */
import {
  FlexItem,
  PageContentBody,
  FlexGrid,
  PageContentHeader,
  PageContentHeaderSection,
  LoadingSpinner,
  Text,
  Spacer,
  FilterButton,
  FilterGroup,
} from '@antoree/ant-ui';
// import { EuiNotificationBadge } from '@elastic/eui';
import sessionNotFound from 'assets/images/sessionNotFound.svg';

import { FormattedMessage } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useMemo, useState } from 'react';

import {
  useRetrieveTodayCoursSessionsByCourseId,
  useInfiniteRetrieveSessionsByCourseId,
} from 'services/session';
import styles from './SessionList.module.scss';

import SessionListCard from '../SessionListCard';

type AllSessionsProps = {
  courseId: number;
  height: number;
  courseType: number;
};

const SessionsList: React.FC<AllSessionsProps> = ({
  courseId,
  height,
  courseType,
}) => {
  const [toggleIdSelected, setToggleIdSelected] = useState<string>('All');

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useInfiniteRetrieveSessionsByCourseId({
    courseId,
  });

  const {
    data: dataToday,
    isLoading: isLoadingToday,
  } = useRetrieveTodayCoursSessionsByCourseId({
    courseId,
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
      <PageContentHeader style={{ marginBottom: '0px' }}>
        <PageContentHeaderSection>
          <Text size="m">
            <p>
              <FormattedMessage
                defaultMessage="Sessions in course ID: {courseId}"
                values={{ courseId }}
              />
            </p>
          </Text>
        </PageContentHeaderSection>
      </PageContentHeader>
      <PageContentBody>
        <FilterGroup className="rounded-lg my-4">
          <FilterButton
            className={styles.btnFilter}
            color={toggleIdSelected === 'Today' ? 'ghost' : 'text'}
            onClick={() => setToggleIdSelected('Today')}
            style={{
              backgroundColor:
                toggleIdSelected === 'Today' ? '#00C081' : '#FBFCFD',
            }}
          >
            <FormattedMessage defaultMessage="Today" />
          </FilterButton>
          <FilterButton
            className={styles.btnFilter}
            onClick={() => setToggleIdSelected('All')}
            color={toggleIdSelected === 'All' ? 'ghost' : 'text'}
            style={{
              backgroundColor:
                toggleIdSelected === 'All' ? '#00C081' : '#FBFCFD',
            }}
          >
            <div className="flex flex-row justify-center items-center">
              <div className="h-5 mr-2 flex flex-row justify-center items-center">
                <FormattedMessage defaultMessage="All" />
              </div>
              <span
                style={{
                  lineHeight: '20px',
                  height: '20px',
                  minWidth: '20px',
                  backgroundColor:
                    toggleIdSelected === 'All' ? '#FBFCFD' : '#E0E5EE',
                  color: toggleIdSelected === 'All' ? '#00C081' : '#000000',
                  borderRadius: '3px',
                }}
              >
                {data?.pages[0]?.data?.sessions.length ?? 0}
              </span>
            </div>
          </FilterButton>
        </FilterGroup>
        <Spacer size="s" />
        {/* {toggleIdSelected === 'All' ? (
          isLoading ? (
            loadingSpinner
          ) : data?.pages[0]?.data?.sessions.length !== 0 && courseId !== 0 ? (
            <InfiniteScroll
              className={styles.scroll}
              style={{
                maxHeight: `${height - 250}px`,
                overflowY: 'scroll',
                overflowX: 'visible',
              }}
              height={height - 250}
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              dataLength={dataLength}
              loader={loadingSpinner}
            >
              <FlexGrid
                columns={1}
                gutterSize="m"
                style={{ backgroundColor: '#FFFFFF' }}
              >
                {data?.pages?.map?.(page =>
                  page.data.sessions.map(session => (
                    <FlexItem
                      key={session.id}
                      style={{ backgroundColor: '#FAFBFD' }}
                    >
                      <SessionListCard
                        {...session}
                        courseId={courseId}
                        courseType={courseType}
                      />
                    </FlexItem>
                  )),
                )}
              </FlexGrid>
              <Spacer style={{ backgroundColor: '#FAFBFD' }} />
            </InfiniteScroll>
          ) : (
            <>
              <FlexGrid columns={1}>
                <FlexItem style={{ marginTop: '50%' }}>
                  <div style={{ textAlign: 'center' }}>
                    <img src={sessionNotFound} alt="" />
                    <Text>
                      {' '}
                      <FormattedMessage defaultMessage="Select a course to view lesson details." />
                    </Text>
                  </div>
                </FlexItem>
              </FlexGrid>
            </>
          )
        ) : isLoadingToday ? (
          loadingSpinner
        ) : (
          <FlexGrid columns={1}>
            {dataToday?.data.sessions.length !== 0 && courseId !== 0 ? (
              dataToday?.data.sessions.map(session => (
                <FlexItem key={session.id}>
                  <SessionListCard
                    {...session}
                    courseId={courseId}
                    courseType={courseType}
                  />
                </FlexItem>
              ))
            ) : (
              <FlexItem style={{ marginTop: '50%' }}>
                <div style={{ textAlign: 'center' }}>
                  <img src={sessionNotFound} alt="" />
                  <Text>
                    {' '}
                    <FormattedMessage defaultMessage="Select a course to view lesson details." />
                  </Text>
                </div>
              </FlexItem>
            )}
          </FlexGrid>
        )} */}
      </PageContentBody>
    </>
  );
};

export default SessionsList;
