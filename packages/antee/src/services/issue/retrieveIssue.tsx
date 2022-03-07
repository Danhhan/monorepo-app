/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { notification } from '@antoree/ant-ui';
import { useMutation, UseMutationOptions } from 'react-query';
import httpClient from 'utils/httpClient';

export const RETRIEVE_ISSUE = (
  idCource: string | number,
  idSession: string | number,
) => `/v2/course/${idCource}/session/${idSession}/issue`;

export type retrieveIssueBody = {
  content?: string;
  _absent?: string | number;
  idCource: string | number;
  idSession: string | number;
  refech: () => void;
};

export type retrieveIssueResponse = {
  data: {};
};
export type RetrieveIssueParams = {
  idCource: string | number;
  idSession: string | number;
};
export const retrieveIssue = async ({
  content,
  _absent,
  idSession,
  idCource,
  refech,
}: retrieveIssueBody) => {
  return httpClient.post(RETRIEVE_ISSUE(idCource, idSession), {
    content,
    _absent,
  });
};

export const useRetrieveIssue = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveIssueResponse>,
    AxiosError<any>,
    retrieveIssueResponse
  >,
) => useMutation(retrieveIssue);
