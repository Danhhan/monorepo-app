/* eslint-disable camelcase */
import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';
import { Session } from 'services';

const CREATE_EVALUATION = (id: Number, courseId: Number) =>
  `/v2/course/${courseId}/session/${id}`;

export type CreateEvaluationBody = {
  id: number;
  courseId: number;
  strong_points: string;
  weak_points: string;
  suggestion: string;
};

export type CreateEvaluationResponse = {
  session: Session;
};

export const createEvaluation = ({
  id,
  courseId,
  strong_points,
  weak_points,
  suggestion,
}: CreateEvaluationBody) =>
  httpClient.put<CreateEvaluationResponse>(CREATE_EVALUATION(id, courseId), {
    _evaluation: 1,
    ratings: {
      listen: {
        checked: true,
        detail: {
          understanding: {
            checked: true,
            score: 0,
          },
        },
      },
      speak: {
        checked: true,
        detail: {
          pronunciation: {
            checked: true,
            score: 0,
          },
          vocabulary: {
            checked: true,
            score: 0,
          },
          grammar: {
            checked: true,
            score: 0,
          },
          fluency_and_coherence: {
            checked: true,
            score: 0,
          },
        },
      },
      read: {
        checked: true,
        detail: {
          comprehension: {
            checked: true,
            score: 0,
          },
        },
      },
      write: {
        checked: true,
        detail: {
          vocabulary: {
            checked: true,
            score: 0,
          },
          task_response: {
            checked: true,
            score: 0,
          },
          grammar: {
            checked: true,
            score: 0,
          },
          coherence_and_cohesion: {
            checked: true,
            score: 0,
          },
        },
      },
      strong_points,
      weak_points,
      suggestion,
    },
  });

export const useCreateEValuation = (
  opts?: UseMutationOptions<
    AxiosResponse<CreateEvaluationResponse>,
    AxiosError<any>,
    CreateEvaluationBody
  >,
) =>
  useMutation<
    AxiosResponse<CreateEvaluationResponse>,
    AxiosError<any>,
    CreateEvaluationBody
  >(createEvaluation, opts);
