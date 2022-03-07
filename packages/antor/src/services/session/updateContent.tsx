import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { Session } from 'services';

const UPDATE_CONTENT = (id: Number, courseId: Number) =>
  `/v2/course/${courseId}/session/${id}`;

export type UpdateContentBody = {
  id: Number;
  title: string;
  courseId: Number;
  vocabularyContent: string;
  studentAttitude: string;
  grammarContent: string;
  homeworkContent: string;
  homeworkFile: string;
  homeworkResult: string;
};

export type UpdateContentResponse = {
  session: Session;
};

export const updateContent = ({
  id,
  title,
  courseId,
  vocabularyContent,
  studentAttitude,
  grammarContent,
  homeworkContent,
  homeworkFile,
  homeworkResult,
}: UpdateContentBody) =>
  httpClient.put<UpdateContentResponse>(UPDATE_CONTENT(id, courseId), {
    title,
    vocabulary: vocabularyContent,
    grammar: grammarContent,
    student_note: studentAttitude,
    teacher_content: homeworkContent,
    _content: 1,
  });

export const useUpdateContent = (
  opts?: UseMutationOptions<
    AxiosResponse<UpdateContentResponse>,
    AxiosError<any>,
    UpdateContentBody
  >,
) =>
  useMutation<
    AxiosResponse<UpdateContentResponse>,
    AxiosError<any>,
    UpdateContentBody
  >(updateContent, opts);
