/* eslint-disable camelcase */
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

import { Course } from './retrieveCourses';

export const RETRIEVE_TODAY_COURSES = '/v2/today-courses';

export type RetrieveTodayCoursesResponse = {
  courses: Course[];
};

export const retrieveTodayCourses = () =>
  httpClient.get<RetrieveTodayCoursesResponse>(RETRIEVE_TODAY_COURSES, {
    params: {
      learning: 1,
    },
  });

export const useRetrieveTodayCourses = (
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTodayCoursesResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveTodayCoursesResponse>, AxiosError<any>>(
    [RETRIEVE_TODAY_COURSES],
    () => retrieveTodayCourses(),
    opts,
  );
