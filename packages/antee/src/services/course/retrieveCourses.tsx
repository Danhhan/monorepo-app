/* eslint-disable camelcase */
import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query';
import { notification } from '@antoree/ant-ui';
import { AxiosResponse, AxiosError } from 'axios';
import { FormattedMessage } from 'react-intl';
import httpClient from 'utils/httpClient';

export const RETRIEVE_COURSES = '/v2/courses';

export type RetrieveCoursesParams = {
  term: string;
  status: number;
  filterType?: any;
  pageIndex?: number;
  totalItem?: number;
};

export type Course = {
  id: number;
  teacher: {
    name: string;
    avatarUrl: string;
    nationality: string;
  };
  totalDuration: number;
  totalPassedDuration: number;
  type: number;
  status: number;
  scheduleGroupTexts: [];
  title: string;
  averageRating: number;
  totalSession: number;
  refId: string;
  requestId: number;
  idSelected: number;
  courseType: number;
  formattedStartedAt: string;
  formattedEndedAt: string;
  shortTimeEndedAt: string;
  shortTimeStartedAt: string;
  onSelectCourse: (id: number, type: number) => void;
  onReset: () => void;
};
export type Pagination = {
  currentPage: number;
  totalItems: number;
  totalPage: number;
  itemsPerPage: number;
  hasMore: boolean;
};

export type RetrieveCoursesResponse = {
  courses: Course[];
  pagination: Pagination;
};
let pagen: number;
export const goToPage = (pageNumber: number) => {};

export const retrieveInfinityCourses = ({
  term,
  status,
  pageIndex,
  totalItem,
  filterType,
}: RetrieveCoursesParams) => {
  return httpClient.get<RetrieveCoursesResponse>(RETRIEVE_COURSES, {
    params: {
      term,
      status,
      'filter-type': filterType > 0 ? filterType : '',
      learning: 1,
      page: pageIndex,
      'page-size': totalItem,
    },
  });
};

export const useInfinityCourses = (
  query: RetrieveCoursesParams,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<RetrieveCoursesResponse>,
    AxiosError<any>
  >,
) => {
  return useInfiniteQuery<
    AxiosResponse<RetrieveCoursesResponse>,
    AxiosError<any>
  >(
    [RETRIEVE_COURSES, query],
    ({ pageParam = { hasMore: true } }) =>
      retrieveInfinityCourses({ pageIndex: pageParam.pageIndex, ...query }),
    {
      onError: () => {
        window.location.reload();

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
