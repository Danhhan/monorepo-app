/* eslint-disable camelcase */
import {
  UseQueryOptions,
  useQuery,
  UseMutationOptions,
  useMutation,
} from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';

const preToken = localStorage.getItem('token');

// export const RETRIEVE_STUDENT_INFO = '/v2/student-info';

export const RETRIEVE_STUDENT_INFO =
  preToken === '' || preToken === null || preToken === undefined
    ? ''
    : '/v2/student-info';

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

export const retrieveStudentInfo = ({ localePara }: { localePara: string }) =>
  httpClient.get<RetrieveStudentInfoResponse>(RETRIEVE_STUDENT_INFO, {
    params: { locale: localePara || 'en' },
  });

export const useRetrieveStudentInfo = (
  localePara: { localePara: string },
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveStudentInfoResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveStudentInfoResponse>, AxiosError<any>>(
    [RETRIEVE_STUDENT_INFO],
    () => retrieveStudentInfo(localePara),
    opts,
  );

export type RetrieveStudentInfoBody = {
  userInfo?: {
    '2'?: {
      id: number[];
      text?: string | null;
    };
    '3'?: {
      id: number[];
      text?: string | null;
    };
  };
  userType?: string | null;
  idPrice?: string | number;
  specificPrice?: string;
};

export const retrieveUpdateStudentInfo = ({
  userInfo,
  userType,
  idPrice,
  specificPrice,
}: RetrieveStudentInfoBody) =>
  httpClient.put<RetrieveStudentInfoResponse>(RETRIEVE_STUDENT_INFO, {
    'reference-price': {
      id: idPrice,
      'specific-price': specificPrice || undefined,
    },
    'user-info': userInfo,
    'user-type': userType,
  });

export const useRetrieveUpdateStudentInfo = (
  opts?: UseMutationOptions<
    AxiosResponse<RetrieveStudentInfoResponse>,
    AxiosError<any>,
    RetrieveStudentInfoBody
  >,
) =>
  useMutation<
    AxiosResponse<RetrieveStudentInfoResponse>,
    AxiosError<any>,
    RetrieveStudentInfoBody
  >(retrieveUpdateStudentInfo, opts);
