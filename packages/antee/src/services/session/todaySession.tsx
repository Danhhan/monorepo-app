import { useQuery } from 'react-query';
import httpClient from 'utils/httpClient';

// const TEACHER_AVAILABLE_TIME = '/v2/student/available-time';
const TODAYSESSION = '/v2/today-sessions';

// export type RetrieveTeacherAvailableTimeParams = {
//   teacherId: number | null;

//   timeFrom: string;
//   timeTo: string;
//   dateRange: string;
//   role: number;
// };

export type RetrieveTodaySessionResponse = {
  data: [];
};

export const retrieveTeacherAvailableTime = () => httpClient.get(TODAYSESSION);

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

export const useRetrieveToDaySession = () =>
  useQuery([TODAYSESSION], () => retrieveTeacherAvailableTime());
