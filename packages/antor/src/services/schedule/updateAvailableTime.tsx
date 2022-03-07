import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';
import { scheduleObj } from './type';

const UPDATE_AVAILABLE_TIME = `/v2/teacher/available-time`;

export type UpdateAvailableTimeBody = {
  schedule: scheduleObj[];
  role: number | undefined;
  dayOfYearFrom: string;
  dayOfYearTo: string;
};

export type UpdateAvailableTimeResponse = {
  _status: Number;
  _messages: string;
  _success: boolean;
  url: string;
};

export const updateAvailableTime = ({
  schedule,
  role,
  dayOfYearFrom,
  dayOfYearTo,
}: UpdateAvailableTimeBody) => {
  return httpClient.put<UpdateAvailableTimeResponse>(UPDATE_AVAILABLE_TIME, {
    schedule,
    role,
    'day-of-year-from': dayOfYearFrom,
    'day-of-year-to': dayOfYearTo,
  });
};

export const useUpdateAvailableTime = (
  opts?: UseMutationOptions<
    AxiosResponse<UpdateAvailableTimeResponse>,
    AxiosError<any>,
    UpdateAvailableTimeBody
  >,
) =>
  useMutation<
    AxiosResponse<UpdateAvailableTimeResponse>,
    AxiosError<any>,
    UpdateAvailableTimeBody
  >(updateAvailableTime, opts);
