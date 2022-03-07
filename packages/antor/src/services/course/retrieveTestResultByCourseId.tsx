import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_TEST_RESULT_BY_COURSE_ID = (courseId: number) =>
  `/v2/courses/${courseId}/test-results`;

export type RetrieveTestResultByCourseIdParams = {
  courseId: number;
};

export type testResult = {
  id: number;
  url: string;
  createdAt: string;
};

export type RetrieveTestReusltByCourseIdResponse = {
  testCourses: testResult[];
};

export const retrieveTestSultByCourseId = (
  params: RetrieveTestResultByCourseIdParams,
) =>
  httpClient.get<RetrieveTestReusltByCourseIdResponse>(
    RETRIEVE_TEST_RESULT_BY_COURSE_ID(params.courseId),
  );

export const useRetrieveTestResultByCourseId = (
  params: RetrieveTestResultByCourseIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTestReusltByCourseIdResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<
    AxiosResponse<RetrieveTestReusltByCourseIdResponse>,
    AxiosError<any>
  >(
    [RETRIEVE_TEST_RESULT_BY_COURSE_ID(params.courseId)],
    () => retrieveTestSultByCourseId(params),
    opts,
  );
