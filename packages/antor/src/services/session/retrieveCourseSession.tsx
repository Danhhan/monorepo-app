/* eslint-disable camelcase */
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { notification } from '@antoree/ant-ui';
import { FormattedMessage } from 'react-intl';
import { Session } from './type';

export const RETRIEVE_COURSE_SESSION = (id: string | number) =>
  `/v2/course/${id}/sessions`;

export type RetrieveCourseSessionParams = {
  id: string | number;
  pageIndex?: string | number;
  pageSize?: string | number;
  status?: number | undefined;
};

type Pagination = {
  currentPage: number;
  totalItems: number;
  totalPage: number;
  itemsPerPage: number;
  hasMore: boolean;
};

export type RetrieveCourseSessionResponse = {
  sessions: Session[];
  pagination: Pagination;
};

export const retrieveCourseSession = (params: RetrieveCourseSessionParams) => {
  return httpClient.get<RetrieveCourseSessionResponse>(
    RETRIEVE_COURSE_SESSION(params.id),
    {
      params: {
        'page-size': params.pageSize ?? 1000,
        page: params.pageIndex ?? 1,
        status: params?.status,
      },
    },
  );
};

export const useCourseSessions = (
  params: RetrieveCourseSessionParams,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<RetrieveCourseSessionResponse>,
    AxiosError<any>
  >,
) => {
  return useInfiniteQuery<
    AxiosResponse<RetrieveCourseSessionResponse>,
    AxiosError<any>
  >(
    [RETRIEVE_COURSE_SESSION(params.id), params],
    ({ pageParam = { pageIndex: 1, hasMore: true } }) =>
      retrieveCourseSession({ pageIndex: pageParam.pageIndex, ...params }),
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
