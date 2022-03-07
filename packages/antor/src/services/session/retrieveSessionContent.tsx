/* eslint-disable camelcase */
import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_SESSION_URL = (id: string | number | undefined) =>
  `/v2/session/${id}/detail`;

export type HomeworkFile = {
  name: string;
  path: string;
  size: number;
  type: string;
  url: string;
};

export type SessionContentResponse = {
  title: string;
  vocabulary: string;
  grammar: string;
  studentAttitude: string;
  homework: string;
  student?: {
    name: string;
    avatarUrl: string;
  };
  homeworkUrl: Array<HomeworkFile>;
  homeworkResultUrl: Array<any>;
};

export type RetrieveSessionContentQuery = {
  id: string | number;
};

export const retrieveSessionContent = ({ id }: RetrieveSessionContentQuery) => {
  return httpClient.get<SessionContentResponse>(RETRIEVE_SESSION_URL(id));
};

export const useRetrieveSessionContent = (
  { id }: RetrieveSessionContentQuery,
  opts?: UseQueryOptions<
    AxiosResponse<SessionContentResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<SessionContentResponse>, AxiosError<any>>(
    [RETRIEVE_SESSION_URL(id)],
    () => retrieveSessionContent({ id }),
    { ...opts, cacheTime: 1 },
  );
