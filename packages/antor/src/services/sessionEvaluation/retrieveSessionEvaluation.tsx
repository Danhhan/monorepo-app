/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';

export const RETRIEVE_SESSION_EVALUATION = (id: number) => `/v2/sessions/${id}`;

export type RetrieveSessionEvaluationQuery = {
  id: number;
};
export type Evaluation = {
  ratings: {
    strong_points: string;
    suggestion: string;
    weak_points: string;
  };
};
export type SessionEvaluationResponse = {
  evaluation: Evaluation;
};

export const retrieveEvalutionSession = ({
  id,
}: RetrieveSessionEvaluationQuery) => {
  return httpClient.get<SessionEvaluationResponse>(
    RETRIEVE_SESSION_EVALUATION(id),
    {
      params: {
        _evaluation: 1,
      },
    },
  );
};

export const useRetrieveSessionEvaluation = (
  { id }: RetrieveSessionEvaluationQuery,
  opts?: UseQueryOptions<
    AxiosResponse<SessionEvaluationResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<SessionEvaluationResponse>, AxiosError<any>>(
    [RETRIEVE_SESSION_EVALUATION(id)],
    () => retrieveEvalutionSession({ id }),
    { ...opts, cacheTime: 0 },
  );
