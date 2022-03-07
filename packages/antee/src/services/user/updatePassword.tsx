import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

const UPDATE_PASSWORD = `/v2/user/change-password`;

export type UpdatePasswordBody = {
  currentPassword: string;
  newPassword: string;
};

export type UpdatePasswordResponse = {
  _status: Number;
  _messages: string;
  _success: boolean;
  url: string;
};

export const updatePassword = ({
  currentPassword,
  newPassword,
}: UpdatePasswordBody) =>
  httpClient.put<UpdatePasswordResponse>(UPDATE_PASSWORD, {
    'current-password': currentPassword,
    'new-password': newPassword,
  });

export const useUpdatePassword = (
  opts?: UseMutationOptions<
    AxiosResponse<UpdatePasswordResponse>,
    AxiosError<any>,
    UpdatePasswordBody
  >,
) =>
  useMutation<
    AxiosResponse<UpdatePasswordResponse>,
    AxiosError<any>,
    UpdatePasswordBody
  >(updatePassword, opts);
