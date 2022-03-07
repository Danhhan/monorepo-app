import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { Session } from 'services';

const CONFIRM_SESSION = (id: Number, courseId: Number) =>
  `/v2/teacher/course/${courseId}/session/${id}/teacher-confirm`;

export type ConfirmSessionBody = {
  id: Number;
  courseId: Number;
};

export type ConfirmSessionResponse = {
  session: Session;
};

export const confirmSession = ({ id, courseId }: ConfirmSessionBody) =>
  httpClient.post<ConfirmSessionResponse>(CONFIRM_SESSION(id, courseId), {
    confirm: 1,
  });

export const useConfirmSession = (
  opts?: UseMutationOptions<
    AxiosResponse<ConfirmSessionResponse>,
    AxiosError<any>,
    ConfirmSessionBody
  >,
) =>
  useMutation<
    AxiosResponse<ConfirmSessionResponse>,
    AxiosError<any>,
    ConfirmSessionBody
  >(confirmSession, opts);
