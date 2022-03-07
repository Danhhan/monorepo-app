import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_TESTERS,
  CREATE_TESTER,
  GET_TESTER_BY_ID,
  GET_SESSIONS_BY_TESTER_ID,
  GET_AVAILABLE_TIME_BY_TESTER_ID,
  SEARCH_TESTERS,
  UPDATE_TESTER,
} from './constants';

export const getTesters = async ({
  pageIndex,
  pageSize,
  search,
  isExcellent,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    term: search,
    'is-excellent': isExcellent,
  };

  const result = await makeRequest(GET_TESTERS, HTTP_METHOD.GET, params);

  return result;
};

export const createTester = async ({
  firstName,
  lastName,
  email,
  phone,
  gender,
  password,
}) => {
  const body = {
    'first-name': firstName,
    'last-name': lastName,
    email,
    phone,
    gender,
    password,
  };
  const result = await makeRequest(CREATE_TESTER, HTTP_METHOD.POST, body);

  return result;
};

export const getTesterById = async id => {
  const result = await makeRequest(GET_TESTER_BY_ID(id), HTTP_METHOD.GET);

  return result;
};

export const getSessionsByTesterId = async testerId => {
  const result = await makeRequest(
    GET_SESSIONS_BY_TESTER_ID(testerId),
    HTTP_METHOD.GET,
  );

  return result;
};

export const getAvailableTimeByTesterId = async ({ dayOfWeeks, testerId }) => {
  const params = {
    'day-of-weeks': dayOfWeeks,
  };

  const result = await makeRequest(
    GET_AVAILABLE_TIME_BY_TESTER_ID(testerId),
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const searchTesters = async ({ pageIndex, search }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    term: search,
  };

  const result = await makeRequest(SEARCH_TESTERS, HTTP_METHOD.GET, params);

  return result;
};

export const updateTesterId = async ({ testerId, isExcellented }) => {
  const body = {
    is_excellented: isExcellented,
  };

  const result = await makeRequest(
    UPDATE_TESTER(testerId),
    HTTP_METHOD.PUT,
    body,
  );
  return result;
};
