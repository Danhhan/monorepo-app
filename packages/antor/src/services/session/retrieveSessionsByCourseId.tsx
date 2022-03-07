/* eslint-disable camelcase */
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { Session } from './type';

export const RETRIEVE_SESSIONS_BY_COURSE_ID = (id: string | number) =>
  `/v2/courses/${id}/sessions`;

export type RetrieveSessionsByCourseIdResponse = {
  sessions: Session[];
  course: {
    title: string;
    student: {
      name: string;
      avatarUrl: string;
    };
  };
};

export type RetrieveSessionsByCourseIdParams = {
  id: string | number;
  pageIndex?: string | number;
  pageSize?: string | number;
};

export const retrieveSessionsByCourseId = (
  params: RetrieveSessionsByCourseIdParams,
) =>
  httpClient.get<RetrieveSessionsByCourseIdResponse>(
    RETRIEVE_SESSIONS_BY_COURSE_ID(params.id),
    {
      params: {
        'page-size': params.pageSize ?? 1000,
        'page-index': params.pageIndex ?? 1,
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
    [RETRIEVE_SESSIONS_BY_COURSE_ID(params.id)],
    () => retrieveSessionsByCourseId(params),
    opts,
  );

export const useRetrieveSessionsByCourseIdInfinityScroll = (
  params: RetrieveSessionsByCourseIdParams,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<RetrieveSessionsByCourseIdResponse>,
    AxiosError<any>
  >,
) =>
  useInfiniteQuery<
    AxiosResponse<RetrieveSessionsByCourseIdResponse>,
    AxiosError<any>
  >(
    [RETRIEVE_SESSIONS_BY_COURSE_ID(params.id)],
    ({ pageParam = 0 }) =>
      retrieveSessionsByCourseId({ ...params, pageIndex: pageParam }),
    {
      ...opts,
      cacheTime: 0,
      getNextPageParam: (lastPage, allPages) =>
        allPages.length > 5 ? false : allPages.length,
    },
  );
