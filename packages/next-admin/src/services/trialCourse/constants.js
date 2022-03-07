export const GET_TRIAL_COURSES = '/admin/v2/trial-course';

export const GET_TRIAL_COURSE_BY_ID = id => `/admin/v2/trial-course/${id}`;

export const CREATE_TRIAL_COURSE = '/admin/v2/create-course?=';

export const GET_TEACHERS_TRIAL_COURSE = '/admin/v2/find-teacher';

export const GET_TEACHER_AVAILABLE_TIME = `/v2/student/available-time`;

export const CANCEL_TESTING_COURSE = courseId =>
  `/admin/v2/cancel-course/${courseId}`;

export const UPDATE_COURSE = idCourse => `/admin/v2/courses/${idCourse}`;
