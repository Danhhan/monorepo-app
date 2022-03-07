import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

const CANCEL_COURSE = (courseId?: string | number | null) =>
  `v2/student/course/${courseId}`;

export type RetrieveCancelCourseBody = {
  courseId?: string | number | null;
};

export type RetrieveCancelCourseResponse = any;

export const retrieveCancelCourse = ({ courseId }: RetrieveCancelCourseBody) =>
  httpClient.put<RetrieveCancelCourseResponse>(CANCEL_COURSE(courseId));

export const useRetrieveCancelCourse = (
  opts?: UseMutationOptions<
    AxiosResponse<RetrieveCancelCourseResponse>,
    AxiosError<any>,
    RetrieveCancelCourseBody
  >,
) =>
  useMutation<
    AxiosResponse<RetrieveCancelCourseResponse>,
    AxiosError<any>,
    RetrieveCancelCourseBody
  >(retrieveCancelCourse, opts);
