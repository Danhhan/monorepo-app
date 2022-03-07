import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

const RETRIEVE_ROOM_URL_BY_COURSE_ID = 'admin/v2/init-vc-course';

export type RetrieveRoomUrlByCourseIdBody = {
  courseId: number;
  whoami: string;
  source: string;
};

export type RetrieveRoomUrlByCourseIdResponse = {
  vcUrl: string;
};

export const retrieveRoomUrlByCourseId = ({
  courseId,
}: RetrieveRoomUrlByCourseIdBody) =>
  httpClient.post<RetrieveRoomUrlByCourseIdResponse>(
    RETRIEVE_ROOM_URL_BY_COURSE_ID,
    { 'course-id': courseId, whoami: 'student', source: 'web' },
  );

export const useRetrieveRoomUrlByCourseId = (
  opts?: UseMutationOptions<
    AxiosResponse<RetrieveRoomUrlByCourseIdResponse>,
    AxiosError<any>,
    RetrieveRoomUrlByCourseIdBody
  >,
) =>
  useMutation<
    AxiosResponse<RetrieveRoomUrlByCourseIdResponse>,
    AxiosError<any>,
    RetrieveRoomUrlByCourseIdBody
  >(retrieveRoomUrlByCourseId, opts);
