/* eslint-disable camelcase */
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';

export const GET_ALL_CERTIFICATES = 'public/certifications/all';
export const GET_ALL_TOPICS = 'public/learning-topics/all';
export const GET_NATION = 'admin/v2/teacher-groups';

export type RetrieveCertificatesListResponse = {
  status: number;
  statusText: string;
  data: {
    // certificates: {
    //   description: string;
    //   id: number;
    //   name: string;
    //   order: number;
    // }[];
    description: string;
    id: number;
    name: string;
  }[];
};

export const retriveCertificatesList = ({
  localePara,
}: {
  localePara?: string;
}) => {
  return httpClient.get<RetrieveCertificatesListResponse>(
    GET_ALL_CERTIFICATES,
    {
      params: { locale: localePara || 'en' },
    },
  );
};

export const useRetriveCertificatesList = (
  localePara: { localePara?: string },
  //   params: RetrieveCourseByIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveCertificatesListResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveCertificatesListResponse>, AxiosError<any>>(
    [GET_ALL_CERTIFICATES],
    () => retriveCertificatesList(localePara),
    opts,
  );

export type RetrieveTopicsListResponse = {
  status: number;
  statusText: string;
  // _success: boolean;
  // _message?: any;
  data: {
    // learning_topics: {
    //   description: string;
    //   id: number;
    //   name: string;
    //   translations: {
    //     description: string;
    //     id: number;
    //     name: string;
    //     locale: string;
    //     topic_id: number;
    //   }[];
    // }[];
    description: string;
    id: number;
    name: string;
  }[];
};

export const retriveTopicsList = ({ localePara }: { localePara?: string }) => {
  return httpClient.get(GET_ALL_TOPICS, {
    params: { locale: localePara || 'en' },
  });
};

export const useRetriveTopicsList = (
  localePara: { localePara?: string },
  // params: RetrieveCourseByIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTopicsListResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveTopicsListResponse>, AxiosError<any>>(
    [GET_ALL_TOPICS],
    () => retriveTopicsList(localePara),
    opts,
  );

export type RetrieveNationsListResponse = {
  _status: number;
  _success: boolean;
  _message?: any;
  data: {
    // teacher_groups: {
    //   description: string;
    //   id: number;
    //   name: string;
    //   translations: {
    //     description: string;
    //     id: number;
    //     name: string;
    //     locale: string;
    //     topic_id: number;
    //   }[];
    // }[];
    id: number;
    name: string;
  }[];
};

export const retriveNationsList = ({ localePara }: { localePara?: string }) => {
  return httpClient.get(GET_NATION);
};

export const useRetriveNationsList = (
  localePara: { localePara?: string },
  // params: RetrieveCourseByIdParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveNationsListResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveNationsListResponse>, AxiosError<any>>(
    [GET_NATION],
    () => retriveNationsList(localePara),
    opts,
  );
