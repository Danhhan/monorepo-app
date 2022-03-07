/* eslint-disable camelcase */
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

export const RETRIEVE_ORIGINAL_LINK = '/v2/original-link';

export type RetrieveOriginalLinkResponse = {
  campaignLink: {
    campaignId: number | string;
    campaignName: string;
    id: number;
    pathName: string;
    sourceLink: string;
  };
};
export type RetrieveOriginalParams = {
  code: string;
};
export const retrieveOriginalLink = ({ code }: RetrieveOriginalParams) => {
  const parsedQuery = {
    code,
  };
  return httpClient.get<RetrieveOriginalLinkResponse>(RETRIEVE_ORIGINAL_LINK, {
    params: parsedQuery,
  });
};

export const useRetrieveOriginalLink = (
  params: RetrieveOriginalParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveOriginalLinkResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<AxiosResponse<RetrieveOriginalLinkResponse>, AxiosError<any>>(
    [RETRIEVE_ORIGINAL_LINK],
    () => retrieveOriginalLink(params),
    {
      ...opts,
    },
  );
