import { defineMessage } from 'react-intl';
import messages from './messages';

export const STATUS_CODE = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNAUTHORIZED: 401,
};
export const TRIAL_BOOKING_STATUS = {
  PROCESSING: 0,
  CANCELLED: 1,
  FAILURE: 2,
  SUCCESS: 3,
};

export const TRIAL_BOOKING_STATUS_OPTIONS = [
  {
    value: TRIAL_BOOKING_STATUS.PROCESSING,
    message: messages.label.processing,
    color: 'warning',
  },
  {
    value: TRIAL_BOOKING_STATUS.CANCELLED,
    message: messages.label.cancelled,
    color: 'danger',
  },
  {
    value: TRIAL_BOOKING_STATUS.FAILURE,
    message: messages.label.failure,
    color: 'danger',
  },
  {
    value: TRIAL_BOOKING_STATUS.SUCCESS,
    message: messages.label.success,
    color: 'secondary',
  },
];

export const TRIAL_DURATION = [
  {
    value: 30,
    message: messages.label['30minutes'],
  },
  {
    value: 45,
    message: messages.label['45minutes'],
  },
  {
    value: 60,
    message: messages.label['60minutes'],
  },
];

export const GENDER_MALE = 1;
export const GENDER_FEMALE = 2;
export const GENDER_OTHER = 3;

export const GENDER = [
  {
    value: GENDER_MALE,
    message: messages.label.male,
  },
  {
    value: GENDER_FEMALE,
    message: messages.label.female,
  },
  {
    value: GENDER_OTHER,
    message: messages.label.other,
  },
];

export const REQUEST_FORS = [
  {
    value: 1,
    message: messages.label.kid,
  },
  {
    value: 2,
    message: messages.label.work,
  },
];

export const STATUS_NEW = 0;
export const STATUS_IN_PROGRESS = 1;
export const STATUS_CANCELLED = 2;
export const STATUS_DELAY = 6;
export const STATUS_COMPLETED = 10;

export const STATUS = [
  {
    label: defineMessage({ defaultMessage: 'New' }),
    value: STATUS_NEW,
    color: '#828282',
  },
  {
    label: defineMessage({ defaultMessage: 'In progress' }),
    value: STATUS_IN_PROGRESS,
    color: '#F2C94C',
  },
  {
    label: defineMessage({ defaultMessage: 'Delay' }),
    value: STATUS_DELAY,
    color: '#F2C94C',
  },
  {
    label: defineMessage({ defaultMessage: 'Completed' }),
    value: STATUS_COMPLETED,
    color: '#27AE60',
  },
  {
    label: defineMessage({ defaultMessage: 'Cancelled' }),
    value: STATUS_CANCELLED,
    color: '#EB5757',
  },
];

export const TEST_COURSE_STATUS_CODE = 7;
export const TRIAL_COURSE_STATUS_CODE = 5;

export const COURSE_STATUS = [
  {
    label: defineMessage({ defaultMessage: 'Testing' }),
    value: TEST_COURSE_STATUS_CODE,
    color: 'rgba(255, 199, 0, 0.15)',
    textColor: '#E2B100',
  },
  {
    label: defineMessage({ defaultMessage: 'Trial' }),
    value: TRIAL_COURSE_STATUS_CODE,
    color: 'rgba(52, 55, 65, 0.15)',
    textColor: '#343741',
  },
];
export const STUDENT_TYPE_KID = 1;
export const STUDENT_TYPE_ADULT = 2;

export const STUDENT_TYPES = [
  {
    label: 'Trẻ em',
    id: STUDENT_TYPE_KID,
  },
  {
    label: 'Người lớn',
    id: STUDENT_TYPE_ADULT,
  },
];
export const TEACHER_VIE = 1;
export const TEACHER_PHIL = 2;
export const TEACHER_PRE = 3;
export const TEACHER_PRE_5$ = 4;
export const TEACHER_NAV = 5;
export const TEACHER_GROUPS = [
  {
    label: 'Việt Nam',
    value: TEACHER_VIE,
  },
  {
    label: 'Philippines',
    value: TEACHER_PHIL,
  },
  {
    label: 'Premium',
    value: TEACHER_PRE,
  },
  {
    label: 'Premium 5$',
    value: TEACHER_PRE_5$,
  },
  {
    label: 'Native',
    value: TEACHER_NAV,
  },
];
export const SUB_LEVEL_6_SOLD_OUT = 602;
