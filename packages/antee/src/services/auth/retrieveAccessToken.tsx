/* eslint-disable camelcase */
import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';

export const RETRIEVE_ACCESS_TOKEN_URL = '/v2/authentication';

export const RETRIEVE_ACCESS_TOKEN_SUB_USER = (id?: number | string) =>
  `/v2/sub-user/${id}`;

export type retrieveSubUserTokenResponse = {
  accessToken: string;
};
export type retrieveSubUserTokenParams = {
  idSub?: string | number;
};
export const retrieveSubUserToken = (params: retrieveSubUserTokenParams) =>
  httpClient.get<retrieveSubUserTokenResponse>(
    RETRIEVE_ACCESS_TOKEN_SUB_USER(params.idSub),
  );

export const useRetrieveSubUserToken = (
  params: retrieveSubUserTokenParams,
  opts?: UseQueryOptions<
    AxiosResponse<retrieveSubUserTokenResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<retrieveSubUserTokenResponse>, AxiosError<any>>(
    [RETRIEVE_ACCESS_TOKEN_SUB_USER(params.idSub)],
    () => retrieveSubUserToken(params),
    opts,
  );
export type retrieveAccessTokenBody = {
  userName: string;
  password: string;
  grantType?: string;
  clientId?: number;
  clientSecret?: string;
};

export type retrieveAccessTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export const retrieveAccessToken = ({
  userName,
  password,
  grantType = 'password',
  clientId = 2,
  clientSecret = '2scEIzVQFUFMuBBAaiZOEbOdglZ9utwPIwNQy0GI',
}: retrieveAccessTokenBody) =>
  httpClient.post<retrieveAccessTokenResponse>(RETRIEVE_ACCESS_TOKEN_URL, {
    username: userName,
    password,
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
  });

export const useRetrieveAccessToken = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveAccessTokenResponse>,
    AxiosError<any>,
    retrieveAccessTokenBody
  >,
) =>
  useMutation<
    AxiosResponse<retrieveAccessTokenResponse>,
    AxiosError<any>,
    retrieveAccessTokenBody
  >(retrieveAccessToken, opts);
