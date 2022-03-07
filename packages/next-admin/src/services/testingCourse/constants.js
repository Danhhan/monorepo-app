export const GET_TESTING_COURSES = '/admin/v2/test-course';

export const GET_TESTING_COURSE_BY_ID = id => `/admin/v2/test-course/${id}`;

export const GET_TESTING_RESULT_BY_COURSE_ID = courseId =>
  `/admin/v2/test-result/${courseId}`;

export const SEND_EMAIL_TO_STUDENT = courseId =>
  `/admin/v2/test-result/send-mail-customer/${courseId}`;

export const UPDATE_TESTING_RESULT = courseId =>
  `/admin/v2/test-result/${courseId}`;

export const GET_TEACHERS_TEST_COURSE = '/admin/v2/find-teacher';

export const UPDATE_SALE_MAN_TESTING_COURSE = courseId =>
  `/admin/v2/test-result/${courseId}/sale-care-test-course`;

export const GET_TEACHER_AVAILABLE_TIME = `/v2/student/available-time`;

export const CREATE_TESTING_COURSE = '/admin/v2/create-course?=';

export const CANCEL_TESTING_COURSE = courseId =>
  `/admin/v2/cancel-course/${courseId}`;

export const UPDATE_COURSE = idCourse => `/admin/v2/courses/${idCourse}`;
