/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import httpClient from 'utils/httpClient';

const SIGN_UP_STUDENT = '/v2/student';

const LERANING_REQUEST = '/v1/commercial/learning-request';

export type retrieveSignUpStudentBody = {
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  referral?: string;
  birthDay?: string;
  gender?: string;
  type: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type retrieveSignUpTrialBody = {
  email?: string;
  name?: string;
  phone?: string;
  meta: {};
};

export type retrieveSignUpStudentResponse = {
  data: {
    token: string;
    type: string;
    validTo: number;
    code: number;
  };
};
export type retrieveSignUpTrialResponse = {
  data: {};
};
export const retrieveSignUpTrial = ({
  email,
  phone,
  name,
  meta,
}: retrieveSignUpTrialBody) =>
  httpClient.post(LERANING_REQUEST, {
    name,
    email,
    phone,
    meta,
  });

export const retrieveSignUpStudent = ({
  firstName,
  lastName,
  password,
  phoneNumber,
  referral,
  // birthDay,
  gender,
  type,
  source,
  utmSource,
  utmMedium,
  utmCampaign,
}: retrieveSignUpStudentBody) =>
  httpClient.post<retrieveSignUpStudentResponse>(SIGN_UP_STUDENT, {
    utm_source: utmSource,
    utm_medium: utmMedium,
    utm_campaign: utmCampaign,
    'first-name': firstName,
    'last-name': lastName,
    password,
    'source-from-web': !source ? '[MANUAL-WEB-AS]' : undefined,
    'phone-number': phoneNumber,
    'phone-code-id': 251,
    referral,
    // 'birth-day': birthDay,
    gender,
    type,
    source,
  });

export const useRetrieveSignUpStudent = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveSignUpStudentResponse>,
    AxiosError<any>,
    retrieveSignUpStudentBody
  >,
) =>
  useMutation<
    AxiosResponse<retrieveSignUpStudentResponse>,
    AxiosError<any>,
    retrieveSignUpStudentBody
  >(retrieveSignUpStudent, opts);

export const useRetrieveSignUpTrial = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveSignUpTrialResponse>,
    AxiosError<any>,
    retrieveSignUpTrialResponse
  >,
) => useMutation(retrieveSignUpTrial);

const OTP_STUDENT = '/v2/otp';

export type RetrieveOTPBody = {
  token: string;
  code?: number | string;
};

export type RetrieveOTPResponse = any;

export const retrieveOTP = ({ token, code }: RetrieveOTPBody) =>
  httpClient.post<RetrieveOTPResponse>(OTP_STUDENT, {
    token,
    code,
  });

export const useRetrieveOTP = (
  opts?: UseMutationOptions<
    AxiosResponse<RetrieveOTPResponse>,
    AxiosError<any>,
    RetrieveOTPBody
  >,
) =>
  useMutation<
    AxiosResponse<RetrieveOTPResponse>,
    AxiosError<any>,
    RetrieveOTPBody
  >(retrieveOTP, opts);

export type retrieveResendOTPBody = {
  token: string;
};

export type retrieveResendOTPResponse = any;

export const retrieveResendOTP = ({ token }: retrieveResendOTPBody) =>
  httpClient.put<retrieveResendOTPResponse>(OTP_STUDENT, {
    token,
  });

export const useRetrieveResendOTP = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveResendOTPResponse>,
    AxiosError<any>,
    retrieveResendOTPBody
  >,
) =>
  useMutation<
    AxiosResponse<retrieveResendOTPResponse>,
    AxiosError<any>,
    retrieveResendOTPBody
  >(retrieveResendOTP, opts);
