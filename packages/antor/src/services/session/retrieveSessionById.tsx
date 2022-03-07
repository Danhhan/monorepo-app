/* eslint-disable camelcase */
import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { Session } from 'services';

export const RETRIEVE_SESSION = (id: string | number | undefined) =>
  `/v2/sessions/${id}`;

export type SessionDetailResponse = {
  session: Session;
};

export type RetrieveSessionByIdQuery = {
  id: string | number;
};

export const retrieveSessionById = ({ id }: RetrieveSessionByIdQuery) => {
  return httpClient.get<SessionDetailResponse>(RETRIEVE_SESSION(id));
};

export const useRetrieveSessionById = (
  { id }: RetrieveSessionByIdQuery,
  opts?: UseQueryOptions<AxiosResponse<SessionDetailResponse>, AxiosError<any>>,
) =>
  useQuery<AxiosResponse<SessionDetailResponse>, AxiosError<any>>(
    [RETRIEVE_SESSION(id)],
    () => retrieveSessionById({ id }),
    { ...opts, cacheTime: 1 },
  );
