/* eslint-disable camelcase */
import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_TOTAL_SESSIONS = (courseId: string | number) =>
  `/v2/courses/${courseId}/total-sessions`;

export type TotalSessionResponse = {
  totalSession: number;
};

export type RetrieveTotalSessionQuery = {
  courseId: number;
};

export const retrieveTotalSession = ({
  courseId,
}: RetrieveTotalSessionQuery) => {
  return httpClient.get<TotalSessionResponse>(
    RETRIEVE_TOTAL_SESSIONS(courseId),
  );
};

export const useRetrieveTotalSession = (
  { courseId }: RetrieveTotalSessionQuery,
  opts?: UseQueryOptions<AxiosResponse<TotalSessionResponse>, AxiosError<any>>,
) =>
  useQuery<AxiosResponse<TotalSessionResponse>, AxiosError<any>>(
    [RETRIEVE_TOTAL_SESSIONS(courseId)],
    () => retrieveTotalSession({ courseId }),
    { ...opts },
  );
