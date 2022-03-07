import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { RETRIEVE_SESSION_URL } from './retrieveSessionContent';

const SEND_HOMEWORK_FILE = (id: Number, courseId: number) =>
  `/v2/teacher/course/${courseId}/session/${id}/teacher-attachment-home-work`;

export type SendHomeworkFileBody = {
  id: number;
  formData: FormData;
  courseId: number;
};

export type SendHomeworkFileResponse = {
  _data: {
    homeWork: {
      // eslint-disable-next-line camelcase
      section_id: number;
    };
  };
};

export const sendHomeworkFile = ({
  id,
  courseId,
  formData,
}: SendHomeworkFileBody) =>
  httpClient.post<SendHomeworkFileResponse>(
    SEND_HOMEWORK_FILE(id, courseId),
    formData,
    {
      headers: {
        ContentType:
          'multipart/form-data; boundary=----WebKitFormBoundaryRrouvXOkU01wCDJt',
      },
    },
  );

export const useSendHomeworkFile = (
  opts?: UseMutationOptions<
    AxiosResponse<SendHomeworkFileResponse>,
    AxiosError<any>,
    SendHomeworkFileBody
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<SendHomeworkFileResponse>,
    AxiosError<any>,
    SendHomeworkFileBody
  >(sendHomeworkFile, {
    ...opts,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(
        // eslint-disable-next-line no-underscore-dangle
        RETRIEVE_SESSION_URL(id),
      );
    },
  });
};
