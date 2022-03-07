import makeRequest, { HTTP_METHOD } from '../core';
import * as TRIAL_BOOKING_URL from './constants';

export const getTrialBookings = async ({
  pageIndex,
  pageSize,
  teacherName,
  studentName,
  teacherPhone,
  studentPhone,
  startDate,
  endDate,
  status,
}) => {
  const params = {
    page: pageIndex + 1,
    'page-size': pageSize,
    'teacher-name': teacherName,
    'student-name': studentName,
    'teacher-phone': teacherPhone,
    'student-phone': studentPhone,
    'created-from-date': startDate
      ?.startOf('date')
      ?.format?.('yyyy-MM-DD HH:mm:ss'),
    'created-to-date': endDate?.endOf('date')?.format?.('yyyy-MM-DD HH:mm:ss'),
    status,
  };

  const result = await makeRequest(
    TRIAL_BOOKING_URL.GET_TRIAL_BOOKINGS,
    HTTP_METHOD.GET,
    params,
  );

  return result;
};

export const createTrialBooking = async ({
  learningRequestId,
  date,
  startTime,
  endTime,
  duration,
  teacherGenders,
  teacherGroups,
  teacherVoices,
  learningTopics,
  teacherCertifications,
  note,
}) => {
  const body = {
    'lr-id': learningRequestId,
    'teacher-available-times': [
      {
        date,
        time: [startTime, endTime],
        duration,
      },
    ],
    'teacher-genders': teacherGenders,
    'teacher-groups': teacherGroups,
    'teacher-voices': teacherVoices,
    'teacher-topics': learningTopics,
    'teacher-certificates': teacherCertifications,
    note,
  };

  const result = await makeRequest(
    TRIAL_BOOKING_URL.CREATE_TRIAL_BOOKING,
    HTTP_METHOD.POST,
    body,
  );

  return result;
};

export const getTrialBookingById = async ({ id }) => {
  const result = await makeRequest(
    TRIAL_BOOKING_URL.GET_TRIAL_BOOKING_BY_ID(id),
    HTTP_METHOD.GET,
  );

  return result;
};

export const getRecommendedTeachersByBookingId = async ({ bookingId }) => {
  const result = await makeRequest(
    TRIAL_BOOKING_URL.GET_RECOMMENDED_TEACHERS_BY_BOOKING_ID(bookingId),
    HTTP_METHOD.GET,
  );

  return result;
};

export const notifySelectedTeachers = async ({
  bookingId,
  selectedTeachers,
}) => {
  const result = await makeRequest(
    TRIAL_BOOKING_URL.NOTIFY_SELECTED_TEACHERS(bookingId),
    HTTP_METHOD.POST,
    { 'teacher-ids': selectedTeachers },
  );

  return result;
};

export const cancelTrialBooking = async ({ bookingId, reason }) => {
  const body = {
    'reason-cancel': reason,
  };

  const result = await makeRequest(
    TRIAL_BOOKING_URL.CANCEL_TRIAL_BOOKING(bookingId),
    HTTP_METHOD.PUT,
    body,
  );

  return result;
};
