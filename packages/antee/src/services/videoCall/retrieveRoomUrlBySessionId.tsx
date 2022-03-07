import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

const RETRIEVE_ROOM_URL_BY_SESSION_ID = (courseId: boolean) =>
  courseId ? `/v2/init-vc-course` : `/web/v2/init-vc`;

export type RetrieveRoomUrlBySessionIdBody = {
  sessionId?: number;
  courseId?: number | string;
  whoami?: 'student' | 'teacher';
  source: string;
};

export type RetrieveRoomUrlBySessionIdResponse = {
  vcUrl?: string;
  studentUrl?: string;
};

export const retrieveRoomUrlBySessionId = ({
  sessionId,
  courseId,
  whoami = 'student',
  source = 'web',
}: RetrieveRoomUrlBySessionIdBody) =>
  httpClient.post<RetrieveRoomUrlBySessionIdResponse>(
    RETRIEVE_ROOM_URL_BY_SESSION_ID(!!courseId),
    {
      'session-id': sessionId,
      'course-id': courseId,
      whoami,
      source,
    },
  );

export const useRetrieveRoomUrlBySessionId = (
  opts?: UseMutationOptions<
    AxiosResponse<RetrieveRoomUrlBySessionIdResponse>,
    AxiosError<any>,
    RetrieveRoomUrlBySessionIdBody
  >,
) =>
  useMutation<
    AxiosResponse<RetrieveRoomUrlBySessionIdResponse>,
    AxiosError<any>,
    RetrieveRoomUrlBySessionIdBody
  >(retrieveRoomUrlBySessionId, opts);
