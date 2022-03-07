import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_COURSE_DETAIL = (courseId: number) =>
  `/web/v2/course-detail/${courseId}`;

export type RetrieveCourseDetailParams = {
  courseId: number;
};

type UserInfo = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};

export type RetrieveCourseDetailResponse = {
  course: {
    title: string;
    type: number;
    status: number;
    teacher: UserInfo;
    student: UserInfo;
  };
};

export const retrieveCourseDetail = (params: RetrieveCourseDetailParams) =>
  httpClient.get<RetrieveCourseDetailResponse>(
    RETRIEVE_COURSE_DETAIL(params.courseId),
  );

export const useRetrieveCourseDetail = (
  params: RetrieveCourseDetailParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveCourseDetailResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveCourseDetailResponse>, AxiosError<any>>(
    [RETRIEVE_COURSE_DETAIL(params.courseId)],
    () => retrieveCourseDetail(params),
    opts,
  );
