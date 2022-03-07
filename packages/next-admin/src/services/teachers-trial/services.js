import makeRequest, { HTTP_METHOD } from '../core';
import {
  GET_TRIAL_TEACHERS,
  ROLE_ID_TRIAL,
  UPDATE_TOP_TEACHER_TRIAL,
} from './constants';

export const getTeachersTrial = async ({
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
    'role-id': ROLE_ID_TRIAL,
    term: search,
    'is-excellent': isExcellent,
    'is-top': isTop,
  };

  const result = await makeRequest(GET_TRIAL_TEACHERS, HTTP_METHOD.GET, params);

  return result;
};

export const updateTopTeacherTrial = async ({ idTeacher, status }) => {
  const result = await makeRequest(
    UPDATE_TOP_TEACHER_TRIAL(idTeacher, status),
    HTTP_METHOD.PUT,
  );

  return result;
};
