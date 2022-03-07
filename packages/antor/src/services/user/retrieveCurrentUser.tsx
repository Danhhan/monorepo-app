/* eslint-disable camelcase */
import httpClient from 'utils/httpClient';
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

export const RETRIEVE_CURRENT_USER = '/v2/users/personal';

export type role = {
  id: number;
  name: string;
};
export type RetrieveCurrentUserResponse = {
  id: number;
  displayName: string;
  firstName: string;
  avatar: string;
  roles: role[];
  permissions: string[];
};

export const retrieveCurrentUser = () =>
  httpClient.get<RetrieveCurrentUserResponse>(RETRIEVE_CURRENT_USER);

export const useRetrieveCurrentUser = (
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveCurrentUserResponse>,
    AxiosError<any>
  >,
) => {
  return useQuery<AxiosResponse<RetrieveCurrentUserResponse>, AxiosError<any>>(
    [RETRIEVE_CURRENT_USER],
    () => retrieveCurrentUser(),
    {
      retry: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      ...opts,
    },
  );
};
