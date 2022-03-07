import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

import { RETRIEVE_SESSION_BY_ID } from './retrieveSessionById';

const DELETE_HOMEWORK_FILE = (id: Number, courseId: string | number) =>
  `/v1/members2/account/course/${courseId}/session/${id}/student-attachment-home-work`;

export type DeleteHomeworkFileBody = {
  id: number;
  courseId: string | number;
  urls: string[];
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
  urls,
}: DeleteHomeworkFileBody) =>
  httpClient.delete<DeleteHomeworkFileResponse>(
    DELETE_HOMEWORK_FILE(id, courseId),
    {
      params: { indices: urls.length > 0 ? urls : [''] },
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
      queryClient.invalidateQueries(RETRIEVE_SESSION_BY_ID(id));
    },
  });
};
