import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';
import { Course } from '.';

const GET_CURRENT_COURSE = '/v2/student/course-recently/';

type RetrieveRecentCoursesResponse = { courses: Course[] };

export const retrieveCurrentCourse = () =>
  httpClient.get<RetrieveRecentCoursesResponse>(GET_CURRENT_COURSE, {
    params: {
      // get only test course
      type: 7,
    },
  });

export const useRetrieveCurrentCourse = (
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveRecentCoursesResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveRecentCoursesResponse>, AxiosError<any>>(
    [GET_CURRENT_COURSE],
    () => retrieveCurrentCourse(),
    opts,
  );
