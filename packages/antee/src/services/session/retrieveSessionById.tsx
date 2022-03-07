import { useQuery, UseQueryOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_SESSION_BY_ID = (id: string | number) =>
  `/v2/session/${id}/detail`;

export type RetrieveSessionByIdParams = {
  id: string | number;
};

type HomeworkUrl = {
  name: string;
  url: string;
};

export type RetrieveSessionByIdResponse = {
  title: string;
  vocabulary: string;
  grammar: string;
  studentAttitude: string;
  homework: string;
  test?: {
    id: number;
    url: string;
  };
  student?: {
    name: string;
    avatarUrl: string;
  };
  homeworkUrl: HomeworkUrl[];
  homeworkResultUrl: HomeworkUrl[];
};

export const retrieveSessionById = (params: RetrieveSessionByIdParams) =>
  httpClient.get<RetrieveSessionByIdResponse>(
    RETRIEVE_SESSION_BY_ID(params.id),
  );

export const useRetrieveSessionById = (
  params: RetrieveSessionByIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveSessionByIdResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveSessionByIdResponse>, AxiosError<any>>(
    [RETRIEVE_SESSION_BY_ID(params.id)],
    () => retrieveSessionById(params),
    opts,
  );
