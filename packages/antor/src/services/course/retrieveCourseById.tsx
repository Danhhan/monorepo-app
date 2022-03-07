import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';
import { Course } from './type';

export const RETRIEVE_COURSE_BY_ID = (courseId: number) =>
  `/v2/courses/${courseId}`;

export type RetrieveCourseByIdQuery = {
  courseId: number;
};
export type CourseByIdResponse = {
  course: Course;
};

export const retrieveCourseById = ({ courseId }: RetrieveCourseByIdQuery) => {
  return httpClient.get<CourseByIdResponse>(RETRIEVE_COURSE_BY_ID(courseId), {
    params: {},
  });
};

export const useRetrieveCourseById = (
  { courseId }: RetrieveCourseByIdQuery,
  opts?: UseQueryOptions<AxiosResponse<CourseByIdResponse>, AxiosError<any>>,
) =>
  useQuery<AxiosResponse<CourseByIdResponse>, AxiosError<any>>(
    [RETRIEVE_COURSE_BY_ID(courseId)],
    () => retrieveCourseById({ courseId }),
    { ...opts, cacheTime: 0 },
  );
