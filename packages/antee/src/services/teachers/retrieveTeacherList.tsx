import { notification } from '@antoree/ant-ui';
import { AxiosError, AxiosResponse } from 'axios';
import { FormattedMessage } from 'react-intl';
import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import httpClient from 'utils/httpClient';

export const TEACHERS_LIST = '/public/teacher/list';

export const TEACHER_TEST_ROLE = 2;
export const TEACHER_TRIAL_ROLE = 3;

export const ORIGINAL_REGION = [1];
export const NON_ORIGINAL_REGION = [2, 3, 4];

export type Teacher = {
  id: number;
  rating: number;
  avatarUrl: string;
  nationality: string;
  name: string;
  description: string;
  video: string;
  descriptionExperience: string;
  isExcellent: string;
};
type Pagination = {
  currentPage: number;
  totalItems: number;
  totalPage: number;
  itemsPerPage: number;
  hasMore: boolean;
};

export type RetriveTeacherTopParam = {
  role: string | number;
  dayTo?: string;
  dayFrom?: string;
};

export type retriveTeacherListResponse = {
  data: Teacher[];
  pagination: Pagination;
};

export type retriveTeacherListParams = {
  timeFrom: string;
  timeTo: string;
  dateRange: string;
  page?: string | number;
  isOriginalRegion?: boolean;
  role: number;
  certificate: string[] | number[];
  voiceType: string[] | number[];
  topicType: string[] | number[];
  gender: string[] | number[];
  nation: string[] | number[];
};

export const retriveTeacherList = ({
  dateRange,
  timeFrom,
  timeTo,
  page,
  isOriginalRegion,
  role,
  certificate,
  voiceType,
  topicType,
  gender,
  nation,
}: retriveTeacherListParams) => {
  return httpClient.get<retriveTeacherListResponse>(TEACHERS_LIST, {
    params: {
      'teacher-group': nation,
      'day-of-year-from': `${dateRange} ${timeFrom}`,
      'day-of-year-to': `${dateRange} ${timeTo}`,
      role,
      page,
      'is-booked': 0,
      certificate,
      'teacher-type': voiceType,
      'topic-type': topicType,
      gender,
    },
  });
};

export const useInfinityTeacherList = (
  query: retriveTeacherListParams,
  opts?: UseInfiniteQueryOptions<
    AxiosResponse<retriveTeacherListResponse>,
    AxiosError<any>
  >,
) => {
  return useInfiniteQuery<
    AxiosResponse<retriveTeacherListResponse>,
    AxiosError<any>
  >(
    [TEACHERS_LIST, query],
    ({ pageParam = { pageIndex: 1, hasMore: true } }) =>
      retriveTeacherList({ page: pageParam.pageIndex, ...query }),
    {
      onError: () => {
        notification.error({
          title: <FormattedMessage defaultMessage="Internal server error" />,
        });
      },
      ...opts,
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.data.pagination.hasMore) {
          return false;
        }
        return {
          pageIndex: lastPage.data.pagination.currentPage + 1,
        };
      },
    },
  );
};

export const retriveTeacherTop = ({
  role,
  dayTo,
  dayFrom,
}: RetriveTeacherTopParam) => {
  return httpClient.get<retriveTeacherListResponse>(TEACHERS_LIST, {
    params: {
      role,
      'day-of-year-from': role === TEACHER_TEST_ROLE ? dayFrom : undefined,
      'day-of-year-to': role === TEACHER_TEST_ROLE ? dayTo : undefined,
      'is-top': 1,
    },
  });
};

export const useTeacherTop = (
  params: RetriveTeacherTopParam,
  opts?: UseQueryOptions<
    AxiosResponse<retriveTeacherListResponse>,
    AxiosError<any>
  >,
) => {
  return useQuery<AxiosResponse<retriveTeacherListResponse>, AxiosError<any>>(
    [TEACHERS_LIST],
    () => retriveTeacherTop(params),
    {
      //   onError: () => {
      //     notification.error({
      //       title: <FormattedMessage defaultMessage="Internal server error" />,
      //     });
      //   },
      ...opts,
    },
  );
};
