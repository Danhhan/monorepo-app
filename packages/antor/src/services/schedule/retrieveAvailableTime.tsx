/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';
import { AvailableTime } from './type';

export const TEACHER_AVAILABLE_TIME = `v2/teacher/available-time`;

export type TeacherAvailableTimeResponse = {
  availableTimes: AvailableTime[];
};

export type RetrieveTeacherAvailableTimeParams = {
  role: number[];
  dayOfYearFrom: string | undefined;
  dayOfYearTo: string | undefined;
};

export const retrieveTeacherAvailableTime = ({
  role,
  dayOfYearFrom,
  dayOfYearTo,
}: RetrieveTeacherAvailableTimeParams) => {
  return httpClient.get<TeacherAvailableTimeResponse>(TEACHER_AVAILABLE_TIME, {
    params: {
      role,
      'day-of-year-from': dayOfYearFrom,
      'day-of-year-to': dayOfYearTo,
    },
  });
};

export const useRetrieveTeacherAvailableTime = (
  params: RetrieveTeacherAvailableTimeParams,
  opts?: UseQueryOptions<
    AxiosResponse<TeacherAvailableTimeResponse>,
    AxiosError<any>
  >,
) => {
  return useQuery<AxiosResponse<TeacherAvailableTimeResponse>, AxiosError<any>>(
    [
      TEACHER_AVAILABLE_TIME,
      params.role,
      params.dayOfYearFrom,
      params.dayOfYearTo,
    ],
    () => retrieveTeacherAvailableTime(params),
    { retry: true, ...opts },
  );
};
