/* eslint-disable react/self-closing-comp */
import {
  Avatar,
  Button,
  FlexGroup,
  FlexItem,
  LoadingSpinner,
  Text,
} from '@antoree/ant-ui';
import { NOTIFICATION_TYPE_TEXTS } from 'containers/Schedule/constants';
import { useRedirect } from 'hooks';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Notification, useRetrieveCourseNotification } from 'services';

const RightAside: React.FC<{}> = () => {
  const { data, hasNextPage, fetchNextPage } = useRetrieveCourseNotification(
    {
      pageSize: 10,
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
        return acc + page.data.notifications.length ?? 0;
      }, 0) ?? 0,
    [data],
  );
  const renderTitle = (notification: Notification) => {
    const notificationTypeText = NOTIFICATION_TYPE_TEXTS.find(
      item => item.value === notification.type,
    );
    if (notificationTypeText) {
      return (
        <>
          <strong>{notification.studentName}</strong>{' '}
          <span>{notificationTypeText?.text}</span>
          <div style={{ marginTop: 8 }}>
            <Button
              fill
              onClick={() =>
                redirectTo(`/courses/${notification?.courseId}/sessions`)
              }
            >
              {notificationTypeText?.buttonText}
            </Button>
          </div>
        </>
      );
    }
    return (
      <>
        <strong>{notification.studentName}</strong> <span>Unknow</span>
      </>
    );
  };
  const { redirectTo } = useRedirect();
  return (
    <>
      <InfiniteScroll
        className="visible-scroll custom-scrollbar"
        dataLength={dataLength}
        next={fetchNextPage}
        hasMore={hasNextPage ?? false}
        loader={
          <div className="flex flex-col items-center justify-center justify-items-center py-2">
            <LoadingSpinner size="l" />
            <Text size="s" color="subdued">
              <p>Loading...</p>
            </Text>
          </div>
        }
        height={900}
      >
        <FlexGroup direction="column">
          {data?.pages
            .map(page => page?.data?.notifications)
            .reduce((a, b) => [...a, ...b], [])
            ?.map((notification: Notification, index) => {
              return (
                <FlexGroup
                  gutterSize="s"
                  style={{ margin: '16px 0px 16px 24px' }}
                >
                  <FlexItem grow={false}>
                    <Avatar
                      size="xl"
                      name="Cat"
                      imageUrl="https://i.pinimg.com/236x/38/aa/95/38aa95f88d5f0fc3fc0f691abfaeaf0c.jpg"
                    />
                  </FlexItem>
                  <FlexItem className="text-left">
                    <div>
                      <p className="text-base">{renderTitle(notification)}</p>
                    </div>
                  </FlexItem>
                </FlexGroup>
              );
            })}
        </FlexGroup>
      </InfiniteScroll>
    </>
  );
};

export default RightAside;
