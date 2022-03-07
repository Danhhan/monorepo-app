import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';

const CREATE_COURSE = (availableTimeId: string | number) =>
  `v2/student/course/${availableTimeId}`;

const TRIAL_COURSE_TYPE_CODE = 5;
const TEST_COURSE_TYPE_CODE = 7;

export type RetrieveCreateCourseBody = {
  availableTimeId: string | number;
  selectedTimeStart: string;
  isTesting: boolean;
};

export type RetrieveCreateCourseResponse = any;

export const retrieveCreateCourse = ({
  availableTimeId,
  selectedTimeStart,
  isTesting,
}: RetrieveCreateCourseBody) =>
  httpClient.post<RetrieveCreateCourseResponse>(
    CREATE_COURSE(availableTimeId),
    {
      'selected-time-start': selectedTimeStart,
      type: isTesting ? TEST_COURSE_TYPE_CODE : TRIAL_COURSE_TYPE_CODE,
    },
  );

export const useRetrieveCreateCourse = (
  opts?: UseMutationOptions<
    AxiosResponse<RetrieveCreateCourseResponse>,
    AxiosError<any>,
    RetrieveCreateCourseBody
  >,
) =>
  useMutation<
    AxiosResponse<RetrieveCreateCourseResponse>,
    AxiosError<any>,
    RetrieveCreateCourseBody
  >(retrieveCreateCourse, opts);
