/* eslint-disable camelcase */
import { notification } from '@antoree/ant-ui';
import { AxiosError, AxiosResponse } from 'axios';
import { FormattedMessage } from 'react-intl';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';

export const NOTIFICATIONS = '/v2/notifications';

export type Notification = {
  title: string;
  message: string;
  message_en: string;
  type: number;
  sessionId: number;
  studentId: number;
  courseId: number;
  studentName: string;
};
type Pagination = {
  currentPage: number;
  totalItems: number;
  totalPage: number;
  itemsPerPage: number;
  hasMore: boolean;
};

export type retrieveNotificationResponse = {
  notifications: Notification[];
  pagination: Pagination;
};

export type retrieveNotificationParams = {
  pageIndex?: string | number;
  pageSize?: string | number;
};

export const retrieveCourseNotification = (
  params: retrieveNotificationParams,
) => {
  return httpClient.get<retrieveNotificationResponse>(NOTIFICATIONS, {
    params: {
      _course_noti: 1,
      'page-size': params.pageSize ?? 1000,
      page: params.pageIndex ?? 1,
    },
  });
};

export const useRetrieveCourseNotification = (
  params: retrieveNotificationParams,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<retrieveNotificationResponse>,
    AxiosError<any>
  >,
) => {
  return useInfiniteQuery<
    AxiosResponse<retrieveNotificationResponse>,
    AxiosError<any>
  >(
    [NOTIFICATIONS],
    ({ pageParam = { pageIndex: 1, hasMore: true } }) =>
      retrieveCourseNotification({ pageIndex: pageParam.pageIndex, ...params }),
    {
      onError: () => {
        notification.error({
          title: <FormattedMessage defaultMessage="Internal server error" />,
        });
      },
      ...opts,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.data.pagination.hasMore) {
          return false;
        }
        return {
          pageIndex: lastPage.data.pagination.currentPage + 1,
        };
      },
    },
  );
};
