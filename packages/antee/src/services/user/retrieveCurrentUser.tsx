/* eslint-disable camelcase */
/* const preToken = localStorage.getItem('token') */

import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';

const preToken = localStorage.getItem('token');

export const RETRIEVE_CURRENT_USER =
  preToken === '' || preToken === null || preToken === undefined
    ? 'https://api.google.com'
    : '/v2/users/personal';

export type RetrieveCurrentUserResponse = {
  id: number;
  displayName: string;
  firstName: string;
  avatar: string;
  email: string;
};

export const retrieveCurrentUser = () =>
  httpClient.get<RetrieveCurrentUserResponse>(RETRIEVE_CURRENT_USER);

export const useRetrieveCurrentUser = (
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveCurrentUserResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveCurrentUserResponse>, AxiosError<any>>(
    [RETRIEVE_CURRENT_USER],
    () => retrieveCurrentUser(),
    opts,
  );
