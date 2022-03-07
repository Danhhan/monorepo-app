import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';
import httpClient from 'utils/httpClient';
import { Session } from 'services/session';

const SESSION_ISSUE_ABSENT_UNDO = (
  courseId: number | undefined,
  sessionId: number | undefined,
  issueId: number | undefined,
) => `/v2/course/${courseId}/session/${sessionId}/issue/${issueId}`;

export type SessionAbSentUndoBody = {
  courseId: number | undefined;
  sessionId: number | undefined;
  issueId: number | undefined;
  // eslint-disable-next-line camelcase
  // _absent_undo?: number;
};

export type SessionAbSentUndoResponse = {
  sessions: Session;
};

export const undoAbsentSession = ({
  courseId,
  sessionId,
  issueId,
}: SessionAbSentUndoBody) => {
  return httpClient.post<SessionAbSentUndoResponse>(
    SESSION_ISSUE_ABSENT_UNDO(courseId, sessionId, issueId),
    {
      _absent_undo: 1,
    },
  );
};

export const useUndoAbsentSession = (
  opts?: UseMutationOptions<
    AxiosResponse<SessionAbSentUndoResponse>,
    AxiosError<any>,
    SessionAbSentUndoBody
  >,
) =>
  useMutation<
    AxiosResponse<SessionAbSentUndoResponse>,
    AxiosError<any>,
    SessionAbSentUndoBody
  >(undoAbsentSession, opts);
