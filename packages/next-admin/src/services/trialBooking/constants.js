export const GET_TRIAL_BOOKINGS = '/admin/v2/bookings';

export const CREATE_TRIAL_BOOKING = '/admin/v2/bookings';

export const GET_TRIAL_BOOKING_BY_ID = id => `/admin/v2/bookings/${id}`;

export const GET_RECOMMENDED_TEACHERS_BY_BOOKING_ID = bookingId =>
  `/admin/v2/bookings/${bookingId}/teachers`;

export const NOTIFY_SELECTED_TEACHERS = bookingId =>
  `/admin/v2/bookings/${bookingId}/send-mail-teachers`;

export const CANCEL_TRIAL_BOOKING = bookingId =>
  `/admin/v2/bookings/${bookingId}/cancellation`;
