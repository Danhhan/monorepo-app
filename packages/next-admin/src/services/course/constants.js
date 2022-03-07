export const CREATE_COURSE = '/admin/v2/create-course';
export const CREATE_REVIEW = id => `/admin/v2/courses/${id}/review`;
export const CANCEL_COURSE = courseId => `/admin/v2/cancel-course/${courseId}`;
