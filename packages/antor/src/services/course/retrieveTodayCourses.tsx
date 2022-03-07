/* eslint-disable camelcase */
import { notification } from '@antoree/ant-ui';
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { FormattedMessage } from 'react-intl';
import httpClient from 'utils/httpClient';
import { Course } from './type';

export const TODAY_COURSE_LIST_URL = '/v2/today-courses';

export type RetrieveTodayCourseResponse = {
  courses: Course[];
};

export const retrieveTodayCourse = () => {
  const parseQuery = {
    teaching: 1,
  };

  return httpClient.get<RetrieveTodayCourseResponse>(TODAY_COURSE_LIST_URL, {
    params: parseQuery,
  });
};

export const useTodayCourses = (
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTodayCourseResponse>,
    AxiosError<any>
  >,
) => {
  return useQuery<AxiosResponse<RetrieveTodayCourseResponse>, AxiosError<any>>(
    [TODAY_COURSE_LIST_URL],
    () => retrieveTodayCourse(),
    {
      onError: () => {
        notification.error({
          title: <FormattedMessage defaultMessage="Internal server error" />,
        });
      },
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      ...opts,
    },
  );
};
