import { useMutation } from 'react-query';
import makeRequest, { HTTP_METHOD } from '../core';
import { RETRIEVE_ROOM_URL_BY_SESSION_ID } from './constants';

export const retrieveRoomUrlBySessionId = sessionId =>
  makeRequest(RETRIEVE_ROOM_URL_BY_SESSION_ID, HTTP_METHOD.POST, {
    'session-id': sessionId,
    whoami: 'teacher',
  });

export const useRetrieveRoomUrlBySessionId = opts =>
  useMutation(sessionId => retrieveRoomUrlBySessionId(sessionId), opts);
