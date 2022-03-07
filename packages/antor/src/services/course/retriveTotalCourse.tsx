import { notification } from '@antoree/ant-ui';
import { UseQueryOptions, useQuery } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import { FormattedMessage } from 'react-intl';
import httpClient from 'utils/httpClient';

export const TOTAL_COURSE_URL = 'web/v2/total-course';

export type retriveTotalCourseResponse = {
  courseClose: number;
  courseOpen: number;
  coursePause: number;
  courseTotal: number;
};

export const retriveTotalCourse = () => {
  return httpClient.get<retriveTotalCourseResponse>(TOTAL_COURSE_URL, {
    params: {
      teaching: 1,
    },
  });
};

export const useTotalCourse = (
  opts?: UseQueryOptions<
    AxiosResponse<retriveTotalCourseResponse>,
    AxiosError<any>
  >,
) => {
  return useQuery<AxiosResponse<retriveTotalCourseResponse>, AxiosError<any>>(
    [TOTAL_COURSE_URL],
    () => retriveTotalCourse(),
    {
      onError: () => {
        notification.error({
          title: <FormattedMessage defaultMessage="Internal server error" />,
        });
      },
      ...opts,
    },
  );
};
