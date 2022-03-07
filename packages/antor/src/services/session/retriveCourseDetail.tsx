import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_COURSE_DETAIL = (id: string | number) =>
  `/web/v2/course-detail/${id}`;

export type RetrieveCourseDetailParams = {
  id: string | number;
};

export type RetrieveCourseDetailResponse = {
  course: {
    status: number;
    student: {
      id: number;
      name: string;
      email: string;
      avatarUrl: string;
    };
    title: string;
    type: number;
    note: [
      {
        // eslint-disable-next-line camelcase
        cared_by: number;
        note: string;
      },
    ];
  };
};

export const retrieveCourseDetail = (params: RetrieveCourseDetailParams) =>
  httpClient.get<RetrieveCourseDetailResponse>(
    RETRIEVE_COURSE_DETAIL(params.id),
  );

export const useRetrieveCourseDetail = (
  params: RetrieveCourseDetailParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveCourseDetailResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveCourseDetailResponse>, AxiosError<any>>(
    [RETRIEVE_COURSE_DETAIL(params.id)],
    () => retrieveCourseDetail(params),
    opts,
  );
