/* eslint-disable camelcase */
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';

export const RETRIEVE_USER_STATUS = '/v2/student-status';

export const RegistCode = 1;
export const BookedTestCode = 2;
export const CompleteTestCode = 3;
export const CompleteTrialCode = 4;
export const OfficialCode = 5;

export const StatusUserExplain = [
  {
    value: 1,
    level: 'Registed User',
    tab: 0,
  },
  {
    value: 2,
    level: 'Booked Test',
    tab: 3,
  },
  {
    value: 3,
    level: 'Complete Test',
    tab: 3,
  },
  {
    value: 4,
    level: 'Complete Trial',
    tab: 3,
  },
  {
    value: 5,
    level: 'Offical course',
    tab: 3,
  },
];

export type RetrieveUserStatusResponse = {
  status: number;
};

export const retrieveStatusUser = () =>
  httpClient.get<RetrieveUserStatusResponse>(RETRIEVE_USER_STATUS);

export const useRetrieveStatusUser = (
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveUserStatusResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveUserStatusResponse>, AxiosError<any>>(
    [RETRIEVE_USER_STATUS],
    () => retrieveStatusUser(),
    opts,
  );
