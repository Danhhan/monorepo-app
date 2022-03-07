/* eslint-disable camelcase */
import { notification } from '@antoree/ant-ui';
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';
import { AxiosResponse, AxiosError } from 'axios';
import { FormattedMessage } from 'react-intl';
import { Course } from './type';

export const COURSE_LIST_URL = '/v2/courses';

type Pagination = {
  currentPage: number;
  totalItems: number;
  totalPage: number;
  itemsPerPage: number;
  hasMore: boolean;
};

export type RetrieveCourseQuery = {
  term?: string;
  status?: number;
  pageIndex?: string | number;
  courseId?: string | number;
};

export type RetrieveCourseResponse = {
  courses: Course[];
  pagination: Pagination;
};

export const retrieveTotalCourse = () => {
  return httpClient.get<RetrieveCourseResponse>(COURSE_LIST_URL);
};

export const retrieveCourse = ({
  term,
  status,
  pageIndex,
  courseId,
}: RetrieveCourseQuery) => {
  const parsedQuery = {
    term,
    status,
    teaching: 1,
    page: pageIndex,
    'page-size': 12,
    'course-id': courseId,
  };

  return httpClient.get<RetrieveCourseResponse>(COURSE_LIST_URL, {
    params: parsedQuery,
  });
};

export const useCourses = (
  query: RetrieveCourseQuery,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<RetrieveCourseResponse>,
    AxiosError<any>
  >,
) => {
  return useInfiniteQuery<
    AxiosResponse<RetrieveCourseResponse>,
    AxiosError<any>
  >(
    [COURSE_LIST_URL, query],
    ({ pageParam = { pageIndex: 1, hasMore: true } }) =>
      retrieveCourse({ pageIndex: pageParam.pageIndex, ...query }),
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
