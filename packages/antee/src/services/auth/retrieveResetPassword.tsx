/* eslint-disable camelcase */
import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';

export const RETRIEVE_OTP_RESET_PASSWORD = '/v2/password/request';
export const RETRIEVE_RESET_PASSWORD = '/v2/reset-password';

export type retrieveResetPasswordOTPBody = {
  phone: string;
};

export type retrieveResetPasswordOTPResponse = {
  data: {
    code: number;
    token: string;
    type: number;
    validTo: number;
  };
};

export const retrieveResetPasswordOTP = ({
  phone,
}: retrieveResetPasswordOTPBody) =>
  httpClient.post<retrieveResetPasswordOTPResponse>(
    RETRIEVE_OTP_RESET_PASSWORD,
    {
      'phone-number': phone,
    },
  );

export const useRetrieveResetPasswordOTP = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveResetPasswordOTPResponse>,
    AxiosError<any>,
    retrieveResetPasswordOTPBody
  >,
) =>
  useMutation<
    AxiosResponse<retrieveResetPasswordOTPResponse>,
    AxiosError<any>,
    retrieveResetPasswordOTPBody
  >(retrieveResetPasswordOTP, opts);

export type retrieveResetPasswordBody = {
  token: string;
  password: string;
};

export type retrieveResetPasswordResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
};

export const retrieveResetPassword = ({
  token,
  password,
}: retrieveResetPasswordBody) =>
  httpClient.put<retrieveResetPasswordResponse>(RETRIEVE_RESET_PASSWORD, {
    token,
    password,
  });

export const useRetrieveResetPassword = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveResetPasswordResponse>,
    AxiosError<any>,
    retrieveResetPasswordBody
  >,
) =>
  useMutation<
    AxiosResponse<retrieveResetPasswordResponse>,
    AxiosError<any>,
    retrieveResetPasswordBody
  >(retrieveResetPassword, opts);
