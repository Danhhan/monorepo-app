export const GET_STUDENTS = '/admin/v2/student-user';
export const GET_STUDENT_BY_ID = id => `/admin/v2/student-user/${id}`;
export const UPDATE_SALEMAN = studentId =>
  `/admin/v2/student-user/${studentId}/sale-care-student`;
export const CREATE_STUDENT = '/admin/v2/student-user';
export const SEARH_STUDENTS = '/admin/v2/team/get-student-member';
export const CREATE_STUDENT_WITH_SUB_USERS = '/admin/v2/users/subuser';
export const GET_OR_UPDATE_SUB_USERS = id => `/admin/v2/users/${id}/subuser`;
export const DELETE_SUB_USER = id => `/admin/v2/users/subuser/${id}`;
export const REFRESH_CONTACT_DATA = `/admin/v2/contacts`;
export const UPDATE_NOTE_STUDENT = lrId => `admin/v2/student-lr/${lrId}`;
export const GET_STUDY_GOALS = id => `admin/v2/student-user/${id}`;
export const GET_COURSES_STUDENT = `admin/v2/courses`;
