import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

import { RETRIEVE_SESSION_BY_ID } from './retrieveSessionById';

const SEND_HOMEWORK_RESULT_FILE = (id: Number, courseId: string | number) =>
  `/v1/members2/account/course/${courseId}/session/${id}/student-attachment-home-work`;

export type SendHomeworkResultFileBody = {
  id: number;
  formData: FormData;
  courseId: string | number;
};

export const sendHomeworkResultFile = ({
  id,
  courseId,
  formData,
}: SendHomeworkResultFileBody) =>
  httpClient.post<any>(SEND_HOMEWORK_RESULT_FILE(id, courseId), formData, {
    headers: {
      ContentType: 'multipart/form-data;',
    },
  });

export const useSendHomeworkResultFile = (
  opts?: UseMutationOptions<
    AxiosResponse<any>,
    AxiosError<any>,
    SendHomeworkResultFileBody
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<any>,
    AxiosError<any>,
    SendHomeworkResultFileBody
  >(sendHomeworkResultFile, {
    ...opts,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(RETRIEVE_SESSION_BY_ID(id));
    },
  });
};
