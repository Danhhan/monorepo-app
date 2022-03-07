import makeRequest, { HTTP_METHOD } from '../core';
import { CREATE_COURSE, CREATE_REVIEW, CANCEL_COURSE } from './constants';

export const createCourse = async ({ teacherId, studentId, time, type }) => {
  const body = {
    'tester-id': teacherId,
    'student-id': studentId,
    'testing-start': time,
    type,
  };

  const result = await makeRequest(CREATE_COURSE, HTTP_METHOD.POST, body);

  return result;
};

export const createReview = async ({ params }) => {
  const body = {
    review: params.contentReview,
    'teacher-id': params.teacherId,
    'course-type': params.courseType,
    'rate-number': params.currentNumberRate,
  };
  const result = await makeRequest(
    CREATE_REVIEW(params.courseId),
    HTTP_METHOD.POST,
    body,
  );

  return result;
};
export const cancelCourse = async ({ courseId, type }) => {
  const body = {
    type,
  };

  const result = await makeRequest(
    CANCEL_COURSE(courseId),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};
