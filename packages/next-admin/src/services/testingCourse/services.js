import makeRequest, { HTTP_METHOD } from '../core';
import {
  CANCEL_TESTING_COURSE,
  CREATE_TESTING_COURSE,
  GET_TEACHERS_TEST_COURSE,
  GET_TEACHER_AVAILABLE_TIME,
  GET_TESTING_COURSES,
  GET_TESTING_COURSE_BY_ID,
  GET_TESTING_RESULT_BY_COURSE_ID,
  SEND_EMAIL_TO_STUDENT,
  UPDATE_COURSE,
  UPDATE_SALE_MAN_TESTING_COURSE,
  UPDATE_TESTING_RESULT,
} from './constants';

export const getTestingCourses = async ({
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

  const result = await makeRequest(
    GET_TESTING_COURSES,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};
export const getTestingCoursesV2 = async ({
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

  const result = await makeRequest(
    GET_TESTING_COURSES,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const getTestingCourseById = async id => {
  const result = await makeRequest(
    GET_TESTING_COURSE_BY_ID(id),
    HTTP_METHOD.GET,
  );

  return result;
};

export const getTestingResultByCourseId = async courseId => {
  const result = await makeRequest(
    GET_TESTING_RESULT_BY_COURSE_ID(courseId),
    HTTP_METHOD.GET,
  );

  return result;
};

export const sendEmailToStudent = async courseId => {
  const result = await makeRequest(
    SEND_EMAIL_TO_STUDENT(courseId),
    HTTP_METHOD.GET,
  );

  return result;
};

export const updateTestingResult = async (courseId, data) => {
  const body = {
    'test-fluency-1': data.testFluency1,
    'test-fluency-1-score': data.testFluency1Score,
    'test-fluency-2': data.testFluency2,
    'test-fluency-2-score': data.testFluency2Score,
    'test-fluency-3': data.testFluency3,
    'test-fluency-3-score': data.testFluency3Score,
    'test-lexical-1': data.testLexical1,
    'test-lexical-1-score': data.testLexical1Score,
    'test-lexical-2': data.testLexical2,
    'test-lexical-2-score': data.testLexical2Score,
    'test-lexical-3': data.testLexical3,
    'test-lexical-3-score': data.testLexical3Score,
    'test-grammatical-1': data.testGrammatical1,
    'test-grammatical-1-score': data.testGrammatical1Score,
    'test-grammatical-2': data.testGrammatical2,
    'test-grammatical-2-score': data.testGrammatical2Score,
    'test-grammatical-3': data.testGrammatical3,
    'test-grammatical-3-score': data.testGrammatical3Score,
    'test-pronunciation-1': data.testPronunciation1,
    'test-pronunciation-1-score': data.testPronunciation1Score,
    'test-pronunciation-2': data.testPronunciation2,
    'test-pronunciation-2-score': data.testPronunciation2Score,
    'test-pronunciation-3': data.testPronunciation3,
    'test-pronunciation-3-score': data.testPronunciation3Score,
    'test-personal-criteria-1': data.testPersonalCriteria1,
    'test-personal-criteria-2': data.testPersonalCriteria2,
    'test-comment-1': data.testComment1,
    'test-comment-2': data.testComment2,
    'test-comment-3': data.testComment3,
    'sum-score': data.sumScore,
  };

  const result = await makeRequest(
    UPDATE_TESTING_RESULT(courseId),
    HTTP_METHOD.POST,
    body,
  );

  return result;
};

export const updateSalemanTesingCourse = async (courseId, salemanId) => {
  const body = {
    'sale-id': salemanId,
  };

  const result = await makeRequest(
    UPDATE_SALE_MAN_TESTING_COURSE(courseId),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};

export const getTeacherAvailableTime = async (teacherId, date) => {
  const params = {
    'teacher-id': teacherId,
    'day-of-year-from': `${date} 00:00:00`,
    'day-of-year-to': `${date} 23:59:59`,
    'role[]': 2,
  };
  const result = await makeRequest(
    GET_TEACHER_AVAILABLE_TIME,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const createTestCourse = async ({
  testerId,
  testingStart,
  duration,
  studentId,
  studentType,
  learningRequestId,
  courseId,
  note,
}) => {
  const body = {
    duration,
    'tester-id': testerId,
    'student-id': studentId,
    'testing-start': testingStart,
    'student-type': studentType,
    'learning-request-id': learningRequestId,
    // eslint-disable-next-line radix
    'course-id': parseInt(courseId) || undefined,
    type: 7,
    note,
  };

  const result = await makeRequest(
    CREATE_TESTING_COURSE,
    HTTP_METHOD.POST,
    body,
  );

  return result;
};

export const getTeachersListTestForm = async ({
  testingStart,
  topicId,
  page,
  pageSize,
  startTime,
  endTime,
  groupTeacher,
  search,
}) => {
  const params = {
    'topic-id': topicId,
    'study-time': testingStart,
    'optional-time-from': startTime,
    'optional-time-to': endTime,
    'group-teacher': groupTeacher,
    role: 2,
    page,
    term: search,
    'page-size': pageSize,
  };

  const result = await makeRequest(
    GET_TEACHERS_TEST_COURSE,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const cancelTestingCourse = async ({ courseId }) => {
  const body = {
    type: 7,
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
