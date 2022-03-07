/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';
import { schedule } from './type';

export const TEACHING_SCHEDULE = `/v2/teacher/teaching-schedule`;

export type TeachingScheduleResponse = {
  schedules: schedule[];
};

export type RetrieveTeachingScheduleParams = {
  start_calendar_day_time: string;
  end_calendar_day_time: string;
};

export const retrieveTeachingSchedule = ({
  start_calendar_day_time,
  end_calendar_day_time,
}: RetrieveTeachingScheduleParams) => {
  return httpClient.get<TeachingScheduleResponse>(TEACHING_SCHEDULE, {
    params: {
      start_calendar_day_time,
      end_calendar_day_time,
    },
  });
};

export const useRetrieveTeachingSchedule = (
  params: RetrieveTeachingScheduleParams,
  opts?: UseQueryOptions<
    AxiosResponse<TeachingScheduleResponse>,
    AxiosError<any>
  >,
) => {
  return useQuery<AxiosResponse<TeachingScheduleResponse>, AxiosError<any>>(
    [
      TEACHING_SCHEDULE,
      params.start_calendar_day_time,
      params.end_calendar_day_time,
    ],
    () => retrieveTeachingSchedule(params),
    { retry: true, ...opts },
  );
};
