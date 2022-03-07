/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, UseMutationOptions } from 'react-query';
import httpClient from 'utils/httpClient';

const LERANING_REQUEST = '/public/learning-requests';

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

export type retrieveSignUpLearningBody = {
  email?: string;
  name?: string;
  first_name: string;
  last_name: string;
  campaign_id?: string;
  campaignLinkid?: string;
  partner_id?: number;
  campaign_link_id?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_source?: string;
  phone?: string;
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
export const retrieveSignUpLearning = ({
  email,
  name,
  phone,
  partner_id,
  campaign_id,
  campaign_link_id,
  utm_campaign,
  utm_medium,
  utm_source,
  first_name,
  last_name,
}: retrieveSignUpLearningBody) =>
  httpClient
    .post(LERANING_REQUEST, {
      first_name,
      last_name,
      phone,
      campaign_id,
      campaign_link_id,
      utm_campaign,
      utm_medium,
      utm_source,
      partner_id,
      email,
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(error => {
      console.log(error);
    });

export const useRetrieveSignUpLearning = (
  opts?: UseMutationOptions<
    AxiosResponse<retrieveSignUpTrialResponse>,
    AxiosError<any>,
    retrieveSignUpTrialResponse
  >,
) => useMutation(retrieveSignUpLearning);

export type RetrieveOTPBody = {
  token: string;
  code?: number | string;
};
