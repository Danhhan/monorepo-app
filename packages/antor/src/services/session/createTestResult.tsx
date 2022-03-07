import { useMutation, UseMutationOptions } from 'react-query';
import { AxiosResponse, AxiosError } from 'axios';

import httpClient from 'utils/httpClient';

const SEND_TEST_RESULT_URL = (id: string | number) => `/v2/test/${id}`;

export type SendTestResultBody = {
  id: string;
  fluency1: string;
  fluency1Score: string;
  fluency2: string;
  fluency2Score: string;
  fluency3: string;
  fluency3Score: string;
  lexical1: string;
  lexical1Score: string;
  lexical2: string;
  lexical2Score: string;
  lexical3: string;
  lexical3Score: string;
  grammatical1: string;
  grammatical1Score: string;
  grammatical2: string;
  grammatical2Score: string;
  grammatical3: string;
  grammatical3Score: string;
  pronunciation1: string;
  pronunciation1Score: string;
  pronunciation2: string;
  pronunciation2Score: string;
  pronunciation3: string;
  pronunciation3Score: string;
  personalCriteria1: string;
  personalCriteria2: string;
  comment1: string;
  comment2: string;
  comment3: string;
  sumScore: string;
  testType: string;
};

export type SendTestResultResponse = {
  _status: Number;
  _messages: string;
  _success: boolean;
  url: string;
};

export const sendTestResult = ({
  id,
  fluency1,
  fluency1Score,
  fluency2,
  fluency2Score,
  fluency3,
  fluency3Score,
  lexical1,
  lexical1Score,
  lexical2,
  lexical2Score,
  lexical3,
  lexical3Score,
  grammatical1,
  grammatical1Score,
  grammatical2,
  grammatical2Score,
  grammatical3,
  grammatical3Score,
  pronunciation1,
  pronunciation1Score,
  pronunciation2,
  pronunciation2Score,
  pronunciation3,
  pronunciation3Score,
  personalCriteria1,
  personalCriteria2,
  comment1,
  comment2,
  comment3,
  sumScore,
  testType,
}: SendTestResultBody) =>
  httpClient.post<SendTestResultResponse>(SEND_TEST_RESULT_URL(id), {
    'test-fluency-1': fluency1,
    'test-fluency-1-score': fluency1Score,
    'test-fluency-2': fluency2,
    'test-fluency-2-score': fluency2Score,
    'test-fluency-3': fluency3,
    'test-fluency-3-score': fluency3Score,
    'test-lexical-1': lexical1,
    'test-lexical-1-score': lexical1Score,
    'test-lexical-2': lexical2,
    'test-lexical-2-score': lexical2Score,
    'test-lexical-3': lexical3,
    'test-lexical-3-score': lexical3Score,
    'test-grammatical-1': grammatical1,
    'test-grammatical-1-score': grammatical1Score,
    'test-grammatical-2': grammatical2,
    'test-grammatical-2-score': grammatical2Score,
    'test-grammatical-3': grammatical3,
    'test-grammatical-3-score': grammatical3Score,
    'test-pronunciation-1': pronunciation1,
    'test-pronunciation-1-score': pronunciation1Score,
    'test-pronunciation-2': pronunciation2,
    'test-pronunciation-2-score': pronunciation2Score,
    'test-pronunciation-3': pronunciation3,
    'test-pronunciation-3-score': pronunciation3Score,
    'test-personal-criteria-1': personalCriteria1,
    'test-personal-criteria-2': personalCriteria2,
    'test-comment-1': comment1,
    'test-comment-2': comment2,
    'test-comment-3': comment3,
    'sum-score': sumScore,
    'test-type': testType,
  });

export const useSendTestResult = (
  opts?: UseMutationOptions<
    AxiosResponse<SendTestResultResponse>,
    AxiosError<any>,
    SendTestResultBody
  >,
) =>
  useMutation<
    AxiosResponse<SendTestResultResponse>,
    AxiosError<any>,
    SendTestResultBody
  >(sendTestResult, opts);
