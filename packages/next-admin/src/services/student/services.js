import makeRequest, { HTTP_METHOD } from '../core';
import {
  CREATE_STUDENT,
  CREATE_STUDENT_WITH_SUB_USERS,
  DELETE_SUB_USER,
  GET_COURSES_STUDENT,
  GET_OR_UPDATE_SUB_USERS,
  GET_STUDENTS,
  GET_STUDENT_BY_ID,
  GET_STUDY_GOALS,
  REFRESH_CONTACT_DATA,
  SEARH_STUDENTS,
  UPDATE_NOTE_STUDENT,
  UPDATE_SALEMAN,
} from './constants';

export const getStudents = async ({
  pageIndex,
  pageSize,
  search,
  sortField,
  sortDirection,
  type,
  term,
  requestId,
  saleName,
  source,
  campaign,
  dateFrom,
  dateTo,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    term,
    'request-id': requestId,
    'sale-name': saleName,
    type,
    'sort-field': sortField,
    'sort-direction': sortDirection,
    'from-date': dateFrom,
    'to-date': dateTo,
    source,
    campaign,
  };

  const result = await makeRequest(GET_STUDENTS, HTTP_METHOD.GET, params);
  // eslint-disable-next-line no-console

  return result;
};

export const getStudentById = async id => {
  const result = await makeRequest(GET_STUDENT_BY_ID(id), HTTP_METHOD.GET);

  return result;
};

export const updateSaleman = async (studentId, salemanId) => {
  const body = {
    'sale-id': salemanId,
  };
  const result = await makeRequest(
    UPDATE_SALEMAN(studentId),
    HTTP_METHOD.PUT,
    body,
  );
  return result;
};
export const createStudent = async ({
  firstName,
  lastName,
  email,
  phone,
  gender,
  password,
  studentType,
  isUpdate,
}) => {
  const body = {
    'first-name': firstName,
    'last-name': lastName,
    'student-type': studentType,
    'is-update': isUpdate || false,
    email,
    phone,
    gender,
    password,
  };
  const result = await makeRequest(CREATE_STUDENT, HTTP_METHOD.POST, body);

  return result;
};
//  find student
export const searchStudents = async ({ pageIndex, search }) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    term: search,
  };

  const result = await makeRequest(SEARH_STUDENTS, HTTP_METHOD.GET, params);

  return result;
};

export const createStudentWithSubUsers = async ({
  contactId,
  firstName,
  lastName,
  email,
  phone,
  gender,
  password,
  studentType,
  subusers,
}) => {
  const body = {
    'contact-id': contactId,
    user: {
      'first-name': firstName,
      'last-name': lastName,
      type: studentType,
      email,
      phone,
      gender,
      password,
    },
    subusers: subusers.map(item => ({
      'request-id': item.requestId,
      'first-name': item.firstName,
      'last-name': item.lastName,
      type: item.type,
      gender: item.gender,
    })),
  };
  const result = await makeRequest(
    CREATE_STUDENT_WITH_SUB_USERS,
    HTTP_METHOD.POST,
    body,
  );

  return result;
};

export const getSubUsers = async id => {
  const result = await makeRequest(
    GET_OR_UPDATE_SUB_USERS(id),
    HTTP_METHOD.GET,
  );

  return result;
};

export const refreshContact = async phone => {
  const params = {
    'page-size': 1,
    phone,
  };

  const result = await makeRequest(
    REFRESH_CONTACT_DATA,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const deleteSubUsers = async id => {
  const result = await makeRequest(DELETE_SUB_USER(id), HTTP_METHOD.DELETE);

  return result;
};

export const updateSubUsers = async ({
  id,
  firstName,
  lastName,
  type,
  gender,
  email,
  phone,
  subusers,
  contactId,
}) => {
  const body = {
    'contact-id': contactId,
    user: {
      'first-name': firstName,
      'last-name': lastName,
      type,
      gender,
      email,
      'phone-number': phone,
    },
    subusers: subusers.map(item => ({
      'request-id': item.requestId,
      id: item.id,
      'first-name': item.firstName,
      'last-name': item.lastName,
      type: item.type,
      gender: item.gender,
    })),
  };
  const result = await makeRequest(
    GET_OR_UPDATE_SUB_USERS(id),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};

export const updateNote = async ({ note, lrId }) => {
  const body = {
    note,
  };

  const result = await makeRequest(
    UPDATE_NOTE_STUDENT(lrId),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};

export const getStudyGoals = async id => {
  const params = {
    _study_goals: '',
  };
  const result = await makeRequest(
    `${GET_STUDY_GOALS(id)}`,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const getStudentCourses = async id => {
  const params = {
    _trial_and_test: 1,
    'student-id': id,
  };
  const result = await makeRequest(
    GET_COURSES_STUDENT,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};
