import makeRequest, { HTTP_METHOD } from '../core';
import {
  CANCEL_TESTING_COURSE,
  CREATE_TRIAL_COURSE,
  GET_TEACHERS_TRIAL_COURSE,
  GET_TEACHER_AVAILABLE_TIME,
  GET_TRIAL_COURSES,
  GET_TRIAL_COURSE_BY_ID,
  UPDATE_COURSE,
} from './constants';

export const getTrialCourses = async ({
  dateRange,
  startTimeRange,
  endTimeRange,
  pageIndex,
  pageSize,
  term,
  requestId,
  saleName,
}) => {
  const params = {
    'to-day': dateRange,
    'to-time': dateRange ? endTimeRange : undefined,
    'from-day': dateRange,
    'from-time': dateRange ? startTimeRange : undefined,
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    term,
    'sale-name': saleName,
    'request-id': requestId,
  };

  const result = await makeRequest(GET_TRIAL_COURSES, HTTP_METHOD.GET, params);

  return result;
};

export const getTrialCoursesV2 = async ({
  startedAtFrom,
  startedAtTo,
  pageIndex,
  pageSize,
  term,
  requestId,
  saleName,
  status,
}) => {
  const params = {
    page: parseInt(pageIndex + 1, 10),
    'page-size': pageSize,
    term,
    'sale-name': saleName,
    'request-id': requestId,
    status,
    'started-at-from': startedAtFrom,
    'started-at-to': startedAtTo,
  };

  const result = await makeRequest(GET_TRIAL_COURSES, HTTP_METHOD.GET, params);

  return result;
};

export const getTrialCourseById = async id => {
  const result = await makeRequest(GET_TRIAL_COURSE_BY_ID(id), HTTP_METHOD.GET);

  return result;
};

export const getTeachersListTrialForm = async ({
  testingStart,
  topic,
  certificate,
  gender,
  region,
  nation,
  page,
  pageSize,
  startTime,
  endTime,
  search,
}) => {
  const params = {
    'topic-id': topic,
    'study-time': testingStart,
    'optional-time-from': startTime,
    'optional-time-to': endTime,
    'voice-type[]': region,
    'teacher-group[]': nation,
    'page-size': pageSize,
    'certificate[]': certificate,
    'gender[]': gender,
    role: 3,
    page,
    term: search,
  };

  const result = await makeRequest(
    GET_TEACHERS_TRIAL_COURSE,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const createTrialCourse = async ({
  testerId,
  testingStart,
  topicId,
  duration,
  price,
  level,
  studentId,
  studentType,
  learningRequestId,
  note,
  courseId,
}) => {
  const body = {
    'topic-id': topicId,
    duration,
    price,
    level,
    'tester-id': testerId,
    'student-id': studentId,
    'testing-start': testingStart,
    'student-type': studentType,
    'learning-request-id': learningRequestId,
    'course-id': parseInt(courseId, 10) || undefined,
    note,
    type: 5,
  };

  const result = await makeRequest(CREATE_TRIAL_COURSE, HTTP_METHOD.POST, body);

  return result;
};

export const getTeacherAvailableTime = async (teacherId, date) => {
  const params = {
    'teacher-id': teacherId,
    'day-of-year-from': `${date} 00:00:00`,
    'day-of-year-to': `${date} 23:59:59`,
    'role[]': 3,
  };
  const result = await makeRequest(
    GET_TEACHER_AVAILABLE_TIME,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const cancelTestingCourse = async ({ courseId }) => {
  const body = {
    type: 5,
  };

  const result = await makeRequest(
    CANCEL_TESTING_COURSE(courseId),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};

export const updateCourseNote = async ({ courseId, noteId, noteText }) => {
  const body = {
    note: {
      id: noteId,
      content: noteText,
    },
  };

  const result = await makeRequest(
    UPDATE_COURSE(courseId),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};
