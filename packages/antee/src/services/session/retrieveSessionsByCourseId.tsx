import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_SESSIONS_BY_COURSE_ID = (courseId: number | null) =>
  `/v2/course/${courseId}/sessions`;

export type Session = {
  id: number;
  title: string;
  teacher: {
    name: string;
    avatarUrl: string;
    nationality: string;
  };
  occurredAt: number | string;
  happenedStatus: number;
  videoUrl: string[];
  shortTimeEndedAt: string;
  shortTimeStartedAt: string;
  shortRepresentingDuration: string;
  // eslint-disable-next-line camelcase
  shortDateOccurred_at: string;
  test?: {
    id: number;
    url: string;
  };
};

type Pagination = {
  currentPage: number;
  totalItems: number;
  totalPage: number;
  itemsPerPage: number;
  hasMore: boolean;
};

export type RetrieveSessionsByCourseIdResponse = {
  sessions: Session[];
  pagination: Pagination;
};

export type RetrieveSessionsByCourseIdParams = {
  courseId: number | null;
  page?: number;
  pageSize?: number;
};

export const retrieveSessionsByCourseId = (
  params: RetrieveSessionsByCourseIdParams,
) =>
  httpClient.get<RetrieveSessionsByCourseIdResponse>(
    RETRIEVE_SESSIONS_BY_COURSE_ID(params.courseId),
    {
      params: {
        'page-size': params.pageSize ?? 20,
        page: params.page ?? 1,
      },
    },
  );

export const useRetrieveSessionsByCourseId = (
  params: RetrieveSessionsByCourseIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveSessionsByCourseIdResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveSessionsByCourseIdResponse>, AxiosError<any>>(
    [RETRIEVE_SESSIONS_BY_COURSE_ID(params.courseId), params],
    () => retrieveSessionsByCourseId(params),
    opts,
  );

export const useInfiniteRetrieveSessionsByCourseId = (
  params: Pick<RetrieveSessionsByCourseIdParams, 'courseId'>,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<RetrieveSessionsByCourseIdResponse>,
    AxiosError<any>
  >,
) =>
  useInfiniteQuery<
    AxiosResponse<RetrieveSessionsByCourseIdResponse>,
    AxiosError<any>
  >(
    [RETRIEVE_SESSIONS_BY_COURSE_ID(params.courseId)],
    context =>
      retrieveSessionsByCourseId({
        courseId: params.courseId,
        page: context.pageParam?.page ?? 1,
        pageSize: 6,
      }),
    {
      ...opts,
      getNextPageParam: lastPage =>
        lastPage.data.pagination.hasMore && {
          hasMore: lastPage.data.pagination.hasMore,
          page: lastPage.data.pagination.currentPage + 1,
        },
    },
  );
