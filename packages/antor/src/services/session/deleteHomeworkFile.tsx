import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { RETRIEVE_SESSION_URL } from './retrieveSessionContent';

const DELETE_HOMEWORK_FILE = (id: Number, courseId: number) =>
  `/v2/teacher/course/${courseId}/session/${id}/teacher-attachment-home-work`;

export type DeleteHomeworkFileBody = {
  id: number;
  courseId: number;
  indices: number[];
};

export type DeleteHomeworkFileResponse = {
  _data: {
    homeWork: {
      // eslint-disable-next-line camelcase
      section_id: number;
    };
  };
};

export const deleteHomeworkFile = ({
  id,
  courseId,
  indices,
}: DeleteHomeworkFileBody) =>
  httpClient.delete<DeleteHomeworkFileResponse>(
    DELETE_HOMEWORK_FILE(id, courseId),
    {
      params: { indices },
    },
  );

export const useDeleteHomeworkFile = (
  opts?: UseMutationOptions<
    AxiosResponse<DeleteHomeworkFileResponse>,
    AxiosError<any>,
    DeleteHomeworkFileBody
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<DeleteHomeworkFileResponse>,
    AxiosError<any>,
    DeleteHomeworkFileBody
  >(deleteHomeworkFile, {
    ...opts,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries(RETRIEVE_SESSION_URL(id));
    },
  });
};
