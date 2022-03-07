import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_COURSE_BY_ID = (courseId: number) =>
  `/web/v2/course-detail/${courseId}`;

export type RetrieveCourseByIdParams = {
  courseId: number;
};

type UserInfo = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
};

export type RetrieveCourseByIdResponse = {
  course: {
    title: string;
    type: number;
    status: number;
    teacher: UserInfo;
    student: UserInfo;
  };
};

export const retrieveCourseById = (params: RetrieveCourseByIdParams) =>
  httpClient.get<RetrieveCourseByIdResponse>(
    RETRIEVE_COURSE_BY_ID(params.courseId),
  );

export const useRetrieveCourseById = (
  params: RetrieveCourseByIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveCourseByIdResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveCourseByIdResponse>, AxiosError<any>>(
    [RETRIEVE_COURSE_BY_ID(params.courseId)],
    () => retrieveCourseById(params),
    opts,
  );
