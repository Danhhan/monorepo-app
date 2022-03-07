import { defineMessage } from 'react-intl';

export const COURSE_STATUS_ALL = -1;
export const COURSE_STATUS_OPEN = 0;
export const COURSE_STATUS_NEW = 1;
export const COURSE_STATUS_COMPLETE = 10;

export const COURSE_STATUS_CANCEL = 2;
export const COURSE_STATUS_DELAY = 6;
export const COURSE_STATUS_CLOSE = 10;

export const COURSE_TYPE_ALL = -1;
export const COURSE_TYPE_TESTING = 7;
export const COURSE_TYPE_TRIAL = 5;
export const COURSE_TYPE_CHANGE_TEACHER = 2;
export const COURSE_TYPE_TRANSFER = 3;

export const COURSE_OFFICIAL = 1;

export const COURSE_TYPE = [
  {
    label: 'Loại',
    value: COURSE_TYPE_ALL,
    color: '#828282',
  },
  {
    label: 'Khóa học thử',
    value: COURSE_TYPE_TRIAL,
    color: '#828282',
  },
  {
    label: 'Buổi test',
    value: COURSE_TYPE_TESTING,
    color: '#828282',
  },
  {
    label: 'Đổi giáo viên',
    value: COURSE_TYPE_CHANGE_TEACHER,
    color: '#828282',
  },

  {
    label: 'Khóa chính',
    value:
      COURSE_OFFICIAL || COURSE_TYPE_TRANSFER || COURSE_TYPE_CHANGE_TEACHER,
    color: '#828282',
  },
];

export const COURSE_STATUS = [
  {
    label: defineMessage({ defaultMessage: 'Trạng thái' }),
    value: COURSE_STATUS_ALL,
    color: '#828282',
  },
  {
    label: defineMessage({ defaultMessage: 'Đang mở' }),
    value: COURSE_STATUS_OPEN,
    color: '#F2C94C',
  },
  {
    label: defineMessage({ defaultMessage: 'Đã hủy' }),
    value: COURSE_STATUS_CANCEL,
    color: '#E43F34',
  },

  {
    label: defineMessage({ defaultMessage: 'Tạm hoãn' }),
    value: COURSE_STATUS_DELAY,
    color: '#828282',
  },
  {
    label: defineMessage({ defaultMessage: 'Hoàn thành' }),
    value: COURSE_STATUS_COMPLETE,
    color: 'primary',
  },
];
