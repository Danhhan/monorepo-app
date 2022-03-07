/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import httpClient from 'utils/httpClient';

export const RETRIEVE_HOMEWORKBY_SESSION_ID = (idSession: string | number) =>
  `/v2/session/${idSession}/detail`;

export type retrieveHomeworkBody = {
  idSession: number | string;
};

export type retrieveHomeworkResponse = {
  data: {};
};
export type RetrieveIssueParams = {
  idCource: string | number;
  idSession: string | number;
};

export const retriveHomeworkbySessionId = (params: retrieveHomeworkBody) => {
  return httpClient.get(RETRIEVE_HOMEWORKBY_SESSION_ID(params.idSession));
};

export const useRetrieveHomework = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveHomeworkResponse>,
    AxiosError<any>,
    retrieveHomeworkResponse
  >,
) => useMutation(retriveHomeworkbySessionId);
