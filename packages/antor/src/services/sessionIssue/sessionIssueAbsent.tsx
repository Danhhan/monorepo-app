import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';
import { Session } from 'services/session';

const SESSION_ISSUE_ABSENT = (
  courseId: number | undefined,
  sessionId: number | undefined,
) => `/v2/course/${courseId}/session/${sessionId}/issue`;

export type CancelSessionBody = {
  courseId: number | undefined;
  sessionId: number | undefined;
  _absent: number;
  content: string;
};

export type CancelSessionResponse = {
  sessions: Session;
};

export const cancelSession = ({
  courseId,
  sessionId,
  _absent,
  content,
}: CancelSessionBody) => {
  return httpClient.post<CancelSessionResponse>(
    SESSION_ISSUE_ABSENT(courseId, sessionId),
    {
      _absent,
      content,
    },
  );
};

export const useCancelSession = (
  opts?: UseMutationOptions<
    AxiosResponse<CancelSessionResponse>,
    AxiosError<any>,
    CancelSessionBody
  >,
) =>
  useMutation<
    AxiosResponse<CancelSessionResponse>,
    AxiosError<any>,
    CancelSessionBody
  >(cancelSession, opts);
