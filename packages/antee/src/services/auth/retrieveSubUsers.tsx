import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_SUB_USER_URL = '/v2/users/sub-user';

// export type retrieveAccessTokenBody = {
//   userName: string;
//   password: string;
//   grantType?: string;
//   clientId?: number;
//   clientSecret?: string;
// };

export type retrieveSubUserResponse = {
  data: {
    contact: {
      id: number;
      user: {
        id?: number;
        name?: string;
        email?: string;
        phone?: string;
        avatarUrl?: string;
      };
    };
    learningRequest: [
      {
        id: number;
        user: {
          id?: number;
          name?: string;
          email?: string;
          phone?: string;
          avatarUrl?: string;
        };
      },
    ];
  };
};

export const retrieveCurrentUser = () =>
  httpClient.get<retrieveSubUserResponse>(RETRIEVE_SUB_USER_URL);

export const useRetrieveSubUsers = (
  opts?: UseQueryOptions<
    AxiosResponse<retrieveSubUserResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<retrieveSubUserResponse>, AxiosError<any>>(
    [RETRIEVE_SUB_USER_URL],
    () => retrieveCurrentUser(),
    opts,
  );
