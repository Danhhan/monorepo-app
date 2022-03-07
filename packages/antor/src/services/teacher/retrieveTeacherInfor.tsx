/* eslint-disable camelcase */
import httpClient from 'utils/httpClient';
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

export const RETRIEVE_TEACHER_INFO = '/v2/teacher-information';

export type RetrieveTeacherInfoResponse = {
  id: number;
  displayName: string;
  firstName: string;
  avatar: string;
  email: string;
  teachingHour: {
    totalHours: string;
  };
  studentCount: number;
  performance: {
    fromThisMonth: string;
    toThisMonth: string;
    attendanceRate: string;
    fromCurrentMonth: string;
    toCurrentMonth: string;
    attendanceRateCurrentMonth: string;
    fromPreviousCurrentMonth: string;
    toPreviousCurrentMonth: string;
    attendanceRatePreviousCurrentMonth: string;
  };
};

export const retrieveTeacherInfo = () =>
  httpClient.get<RetrieveTeacherInfoResponse>(RETRIEVE_TEACHER_INFO);

export const useRetrieveTeacherInfo = (
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTeacherInfoResponse>,
    AxiosError<any>
  >,
) => {
  return useQuery<AxiosResponse<RetrieveTeacherInfoResponse>, AxiosError<any>>(
    [RETRIEVE_TEACHER_INFO],
    () => retrieveTeacherInfo(),
    {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      ...opts,
    },
  );
};
