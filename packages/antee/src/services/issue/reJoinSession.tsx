/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import { notification } from '@antoree/ant-ui';

import httpClient from 'utils/httpClient';

export const RETRIEVE_REJOIN = (
  idCource: string | number,
  idSession: string | number,
  idIssue: string | number,
) => `/v2/course/${idCource}/session/${idSession}/issue/${idIssue}`;

export type retrieveRejoinBody = {
  content?: string;
  _absent?: string | number;
  idCource: string | number;
  idSession: string | number;
  idIssue: string | number;
  _absent_undo: string | number;
  refesh: () => void;
};

export type retrieveRejoinResponse = {
  data: {};
};
export type RetrieveIssueParams = {
  idCource: string | number;
  idSession: string | number;
  idIssue: string | number;
};
export const retrieveRejoin = ({
  idSession,
  idCource,
  idIssue,
  _absent_undo,
  refesh,
}: retrieveRejoinBody) =>
  httpClient
    .put(RETRIEVE_REJOIN(idCource, idSession, idIssue), {
      _absent_undo,
    })
    .then(res => {
      notification.success({
        title: 'Thông báo:',
        text: 'Tham gia lại buổi học thành công',
      });
      refesh();
      // window.location.reload();
    })
    .catch(error => {
      const myArrayError = error?.response?.data?.errors[0]?.message.toString();
      const msgErr =
        myArrayError === 'Session has expired' ? 'buổi học đã quá giờ' : '';

      notification.error({
        title: 'Có lỗi sảy ra:',
        text: `Tham gia lại  buổi học không thành công, ${msgErr}`,
      });
    });

export const hanldeRejoin = async (
  idSession: number,
  idCource: number,
  idIssue: number,
  _absent_undo: number,
  refesh: () => void,
) => {
  try {
    await retrieveRejoin({
      idCource,
      idSession,
      idIssue,
      _absent_undo,
      refesh,
    });
  } catch (e: any) {
    console.log(e);
  }
};
export const useRetrieveIssue = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveRejoinResponse>,
    AxiosError<any>,
    retrieveRejoinResponse
  >,
) => useMutation(retrieveRejoin);
