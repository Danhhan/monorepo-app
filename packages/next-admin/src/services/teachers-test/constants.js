export const ROLE_ID_TEST = 124;

export const GET_TEST_TEACHERS = '/admin/v2/teachers';

export const UPDATE_TOP_TEACHER = (id, status) =>
  `/admin/v2/teachers-top/${id}?is-top=${status ? 1 : 0}`;
