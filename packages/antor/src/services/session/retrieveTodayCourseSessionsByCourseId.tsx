import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { Session } from './type';

export const RETRIEVE_TODAY_COURSE_SESSIONS_BY_COURSE_ID = (
  courseId: number | string,
) => `/v2/today-course/${courseId}/sessions`;

export type RetrieveTodayCoursSessionsByCourseIdResponse = {
  sessions: Session[];
};

export type RetrieveTodayCourseSessionsByCourseIdParams = {
  courseId: number | string;
};

export const retrieveTodayCoursSessionsByCourseId = (
  params: RetrieveTodayCourseSessionsByCourseIdParams,
) =>
  httpClient.get<RetrieveTodayCoursSessionsByCourseIdResponse>(
    RETRIEVE_TODAY_COURSE_SESSIONS_BY_COURSE_ID(params.courseId),
  );

export const useRetrieveTodayCoursSessionsByCourseId = (
  params: RetrieveTodayCourseSessionsByCourseIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTodayCoursSessionsByCourseIdResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<
    AxiosResponse<RetrieveTodayCoursSessionsByCourseIdResponse>,
    AxiosError<any>
  >(
    [RETRIEVE_TODAY_COURSE_SESSIONS_BY_COURSE_ID(params.courseId)],
    () => retrieveTodayCoursSessionsByCourseId(params),
    opts,
  );
