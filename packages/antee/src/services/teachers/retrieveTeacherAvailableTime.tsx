import { AxiosError, AxiosResponse } from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import httpClient from 'utils/httpClient';

// const TEACHER_AVAILABLE_TIME = '/v2/student/available-time';
const TEACHER_AVAILABLE_TIME = '/public/teacher/available-times';

export type RetrieveTeacherAvailableTimeParams = {
  teacherId: number | null;
  timeFrom: string;
  timeTo: string;
  role: number;
};

export type RetrieveTeacherAvailableTimeResponse = {
  data: any;
};

export const retrieveTeacherAvailableTime = ({
  teacherId,
  timeFrom,
  timeTo,
  role,
}: RetrieveTeacherAvailableTimeParams) =>
  httpClient.get<RetrieveTeacherAvailableTimeResponse>(TEACHER_AVAILABLE_TIME, {
    params: {
      teacher_id: teacherId,
      role,
      // role:[role],
      'is-booked': 0,
      'day-of-year-from': `${timeFrom}`,
      'day-of-year-to': `${timeTo}`,
    },
  });

// export const useRetrieveTeacherAvailableTime = (
//   opts?: UseMutationOptions<
//     AxiosResponse<RetrieveRoomUrlByCourseIdResponse>,
//     AxiosError<any>,
//     RetrieveRoomUrlByCourseIdBody
//   >,
// ) =>
//   useMutation<
//     AxiosResponse<RetrieveRoomUrlByCourseIdResponse>,
//     AxiosError<any>,
//     RetrieveRoomUrlByCourseIdBody
//   >(retrieveTeacherAvailableTime, opts);

export const useRetrieveTeacherAvailableTime = (
  params: RetrieveTeacherAvailableTimeParams,
  opts?: UseQueryOptions<
    AxiosResponse<RetrieveTeacherAvailableTimeResponse>,
    AxiosError<any>
  >,
) =>
  useQuery<
    AxiosResponse<RetrieveTeacherAvailableTimeResponse>,
    AxiosError<any>
  >(
    [TEACHER_AVAILABLE_TIME, params.teacherId, params.timeFrom, params.timeTo],
    () => retrieveTeacherAvailableTime(params),
    opts,
  );
