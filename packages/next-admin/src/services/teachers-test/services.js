import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_TEST_TEACHERS,
  ROLE_ID_TEST,
  UPDATE_TOP_TEACHER,
} from './constants';

export const getTeachersTest = async ({
  pageIndex,
  pageSize,
  type,
  search,
  isExcellent,
  isTop,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    'available-status': type,
    'role-id': ROLE_ID_TEST,
    term: search,
    'is-excellent': isExcellent,
    'is-top': isTop,
  };

  const result = await makeRequest(GET_TEST_TEACHERS, HTTP_METHOD.GET, params);

  return result;
};

export const updateTopTeacher = async ({ idTeacher, status }) => {
  const result = await makeRequest(
    UPDATE_TOP_TEACHER(idTeacher, status),
    HTTP_METHOD.PUT,
  );

  return result;
};
