/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';
import { Session } from './type';

export const RETRIEVE_LATEST_SESSION = (courseId: number) =>
  `/v2/course/${courseId}/latest-session`;

export type RetrieveLatestSessionQuery = {
  courseId: number;
};
export type LatestSessionResponse = {
  sessions: Session;
};

export const retrieveLatestSession = ({
  courseId,
}: RetrieveLatestSessionQuery) => {
  return httpClient.get<LatestSessionResponse>(
    RETRIEVE_LATEST_SESSION(courseId),
    {},
  );
};

export const useRetrieveLatestSession = (
  { courseId }: RetrieveLatestSessionQuery,
  opts?: UseQueryOptions<AxiosResponse<LatestSessionResponse>, AxiosError<any>>,
) =>
  useQuery<AxiosResponse<LatestSessionResponse>, AxiosError<any>>(
    [RETRIEVE_LATEST_SESSION(courseId)],
    () => retrieveLatestSession({ courseId }),
    { ...opts, cacheTime: 0 },
  );
