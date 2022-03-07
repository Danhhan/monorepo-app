/* eslint-disable camelcase */
import {
  useQuery,
  UseQueryOptions,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
} from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_TEACHERS_LIST_MARKET = `/public/teacher/list`;
export const RETRIEVE_TEACHERS_DETAIL = `/public/teacher/detail`;

export type RetrieveTeacherListMarketParams = {
  topicType?: (string | null)[] | string[] | number[] | null;
  isTop?: number | string;
  pageSize?: number | string;
  pageIndex?: number | string;
  teacherType?: (string | null)[] | string[] | number[] | null;
  national?: (string | null)[] | string[] | number[] | null;
  gender?: (string | null)[] | string[] | number[] | null;
  certificate?: (string | null)[] | string[] | number[] | null;
  dayFrom?: string;
  dayTo?: string;
};

type HomeworkUrl = {
  name: string;
  url: string;
};

export type RetrieveTeacherListMarketResponse = {
  data: {
    avatarUrl: string;
    avatarUrlThumb: string;
    nationality: string;
    name: string;
    id: number;
    rating: number;
    students_count: number;
    teaching_hours: string;
    isTop?: number;
    topics: {
      name: string;
      topic_id: number;
    }[];
  }[];
  pagination: {
    currentPage: number;
    hasMore: boolean;
    itemsPerPage: number;
    totalItems: number;
    totalPage: number;
  };
};

export const retrieveTeacherListMarket = ({
  topicType,
  certificate,
  pageSize,
  isTop,
}: RetrieveTeacherListMarketParams) =>
  httpClient.get<RetrieveTeacherListMarketResponse>(
    RETRIEVE_TEACHERS_LIST_MARKET,
    {
      params: {
        'is-top': isTop,
        'topic-type': topicType,
        certificate,
        'page-size': pageSize,
      },
    },
  );

export const useRetrieveTeacherListMarket = (
  params: RetrieveTeacherListMarketParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTeacherListMarketResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveTeacherListMarketResponse>, AxiosError<any>>(
    [RETRIEVE_TEACHERS_LIST_MARKET, params],
    () => retrieveTeacherListMarket(params),
    opts,
  );

export const retrieveInfinityTeacherListMarket = ({
  topicType,
  pageSize,
  national,
  teacherType,
  certificate,
  dayFrom,
  dayTo,
  gender,
  pageIndex,
  isTop,
}: RetrieveTeacherListMarketParams) => {
  return httpClient.get<RetrieveTeacherListMarketResponse>(
    RETRIEVE_TEACHERS_LIST_MARKET,
    {
      params: {
        'is-top': isTop,
        'topic-type': topicType,
        'page-size': pageSize,
        page: pageIndex,
        national,
        'teacher-type': teacherType,
        certificate,
        'day-of-year-from': dayFrom,
        'day-of-year-to': dayTo,
      },
    },
  );
};

export const useInfinityTeacherListMarket = (
  query: RetrieveTeacherListMarketParams,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<RetrieveTeacherListMarketResponse>,
    AxiosError<any>
  >,
) => {
  return useInfiniteQuery<
    AxiosResponse<RetrieveTeacherListMarketResponse>,
    AxiosError<any>
  >(
    [RETRIEVE_TEACHERS_LIST_MARKET, query],
    ({ pageParam = { pageIndex: 1, hasMore: true } }) =>
      retrieveInfinityTeacherListMarket({
        pageIndex: pageParam.pageIndex,
        ...query,
      }),
    {
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

export type RetrieveTeacherDetailParams = {
  teacherID: string | number;
  locale?: string;
};

export type RetrieveTeacherDetailResponse = {
  data: {
    avatarUrl: string;
    avatarUrlThumb: string;
    nationality: string;
    description: string;
    name: string;
    id: number;
    rating: number;
    students_count: number;
    teaching_hours: string;
    topics: {
      description?: string;
      name: string;
      topic_id: number;
    }[];
    certifications: {
      description: string;
      files: {
        name: string;
        size: number;
        type: string;
        url: string;
      };
      name: number;
    }[];
    video: string;
    work_experiences: {
      current: number;
      description?: string;
      end: string;
      field?: string;
      position?: string;
      school?: string;
      company?: string;
      start: string;
      type: any;
    }[];
    videoDemo: {
      avg_rate?: string;
      meta: {
        files: {
          name?: string;
          size?: number;
          type?: string;
          url?: string;
        }[];
      };
      create_at?: string;
      create_by?: string;
      id?: string | number;
      review?: string;
      reviewer_id?: number;
      status?: number;
      update_at?: string;
    };
    'teacher-type': {
      description?: string;
      name: string;
      tag_id: number;
    }[];
  };
};

export const retrieveTeacherDetail = ({
  teacherID,
  locale,
}: RetrieveTeacherDetailParams) =>
  httpClient.get<RetrieveTeacherDetailResponse>(RETRIEVE_TEACHERS_DETAIL, {
    params: {
      'teacher-id': teacherID,
      locale: locale ?? 'vi',
    },
  });

export const useRetrieveTeacherDetail = (
  params: RetrieveTeacherDetailParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTeacherDetailResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveTeacherDetailResponse>, AxiosError<any>>(
    [RETRIEVE_TEACHERS_DETAIL, params?.teacherID],
    () => retrieveTeacherDetail(params),
    opts,
  );

// http://api-v2.stg.antoree.tech/public/teacher/list?role=3&is-booked=0&page=1&topic-type[0]=6&topic-type[1]=5'
