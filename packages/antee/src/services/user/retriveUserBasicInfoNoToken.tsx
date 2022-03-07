/* eslint-disable camelcase */
import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';

export const RETRIEVE_GOAL = '/public/demand/list';
export const RETRIEVE_PRICE = '/public/price-referral/list';

export type RetrieveGoalResponse = {
  userInfo: {
    data: { id: number; name: string; description: string; locale: string }[];
    type: number;
  }[];
};

export const retrieveStudyGoal = ({
  localePara,
  type,
}: {
  localePara: string;
  type: number;
}) =>
  httpClient.get<RetrieveGoalResponse>(RETRIEVE_GOAL, {
    params: { locale: localePara || 'en', type },
  });

export const useRetrieveStudyGoal = (
  { localePara, type }: { localePara: string; type: number },
  opts?: UseQueryOptions<AxiosResponse<RetrieveGoalResponse>, AxiosError<any>>,
) =>
  useQuery<AxiosResponse<RetrieveGoalResponse>, AxiosError<any>>(
    [RETRIEVE_GOAL],
    () => retrieveStudyGoal({ localePara, type }),
    opts,
  );

export type RetrievePriceResponse = {
  data: {
    referencePrice: {
      id: number;
      from: string;
      to: string;
      checked?: boolean;
    }[];
  };
};

export const retrievePrice = (type: number) =>
  httpClient.get<RetrievePriceResponse>(RETRIEVE_PRICE, {
    params: { rule: type },
  });

export const useRetrievePrice = (
  { type }: { type: number },
  opts?: UseQueryOptions<AxiosResponse<RetrievePriceResponse>, AxiosError<any>>,
) =>
  useQuery<AxiosResponse<RetrievePriceResponse>, AxiosError<any>>(
    [RETRIEVE_PRICE],
    () => retrievePrice(type),
    opts,
  );

export type RetrieveStudentInfoResponse = {
  data: {
    userProfile: {
      id: number;
      firstName: string;
      lastName: string;
      phone: string;
      birthday: string;
      gender: number;
      displayName: string;
    };
    userType: number;
    priceFrom: number;
    priceTo: number;
    learningRequestId: number;
    userInfo: {
      type: number;
      description: string;
      textNote: string | null;
      data: {
        id: number;
        name: string;
        selected: boolean;
        locale: string;
      }[];
    }[];
    specificPrice?: string;
    referencePrice: {
      id: number;
      from: string;
      to: string;
      checked?: boolean;
    }[];
  };
};
