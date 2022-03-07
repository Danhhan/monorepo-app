import { defineMessage, MessageDescriptor } from 'react-intl';

export type CourseType = {
  label: MessageDescriptor;
  value: number;
  color: string;
  backgroundColor: string;
  duration?: string;
};

export const NEW_TYPE = 1;
export const CHANGE_TEACHER_TYPE = 2;
export const CHANGE_TRANSFER_TYPE = 3;
export const TRIAL_TYPE = 5;
export const TESTING_TYPE = 7;

export const COURSE_TYPES: CourseType[] = [
  {
    label: defineMessage({ defaultMessage: 'Main course' }),
    value: NEW_TYPE,
    color: '#0AA263',
    backgroundColor: '#00C081',
  },
  {
    label: defineMessage({ defaultMessage: 'Main course' }),
    value: CHANGE_TEACHER_TYPE,
    color: '#0AA263',
    backgroundColor: '#00C081',
  },
  {
    label: defineMessage({ defaultMessage: 'Main course' }),
    value: CHANGE_TRANSFER_TYPE,
    color: '#0AA263',
    backgroundColor: '#00C081',
  },
  {
    label: defineMessage({ defaultMessage: 'TRIAL' }),
    value: TRIAL_TYPE,
    color: '#F46036',
    backgroundColor: '#F46036',
    duration: '30',
  },
  {
    label: defineMessage({ defaultMessage: 'TEST' }),
    value: TESTING_TYPE,
    color: '#E2B100',
    backgroundColor: '#FCC700',
    duration: '20',
  },
];

export type CourseStatus = {
  label: MessageDescriptor;
  value: number;
  color: string;
};

export const STATUS_OPEN = 0; // open
export const STATUS_CANCELLED = 2; // end when not learn
export const STATUS_DELAY = 6;
export const STATUS_CLOSED = 10; // end totally (close)
export const STATUS_ALL = -1;

export const COURSE_STATUSES: CourseStatus[] = [
  {
    label: defineMessage({ defaultMessage: 'All' }),
    value: STATUS_ALL,
    color: '#343741',
  },
  {
    label: defineMessage({ defaultMessage: 'Open' }),
    value: STATUS_OPEN,
    color: '#0AA263',
  },
  {
    label: defineMessage({ defaultMessage: 'Closed' }),
    value: STATUS_CLOSED,
    color: '#ED0000',
  },
  {
    label: defineMessage({ defaultMessage: 'Cancelled' }),
    value: STATUS_CANCELLED,
    color: '#ED0000',
  },
  {
    label: defineMessage({ defaultMessage: 'Delayed' }),
    value: STATUS_DELAY,
    color: '#E2B100',
  },
];
