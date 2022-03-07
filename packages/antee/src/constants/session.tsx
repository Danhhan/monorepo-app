import { defineMessage } from 'react-intl';

export const UPCOMING = 1; // chưa diễn ra
export const HAPPENING = 2; // đang diễn ra
export const HAPPENED = 3; // đã diễn ra
export const UNHAPPENED = 4; // ssj
export const JOINED = 11;

export const ABSENT_BY_TEACHER = 1;
export const ABSENT_BY_STUDENT = 0;

export const PNG_VALUE = 1;
export const PDF_VALUE = 2;
export const WORD_VALUE = 3;
export const JPEG_VALUE = 4;

export const NEW_TYPE = 1;
export const CHANGE_TEACHER_TYPE = 2;
export const CHANGE_TRANSFER_TYPE = 3;
export const CHANGE_TOPIC_TYPE = 6;

export const TRIAL_TYPE = 5;
export const TESTING_TYPE = 7;

export const CANCEL_STATUS = 2;
export const DELAY_STATUS = 6;
export const COMPLETED_STATUS = 10;
export const STATUS_OPEN = 0;

export const TODAY_SESSION_TYPES = [
  {
    label: defineMessage({ defaultMessage: 'KHÓA CHÍNH' }),
    color: '#00C081',
    background: 'rgba(0, 192, 129, 0.15)',
    value: NEW_TYPE,
  },
  {
    label: defineMessage({ defaultMessage: 'KHÓA CHÍNH' }),
    color: '#00C081',
    background: 'rgba(0, 192, 129, 0.15)',
    value: CHANGE_TEACHER_TYPE,
  },
  {
    label: defineMessage({ defaultMessage: 'KHÓA CHÍNH' }),
    color: '#00C081',
    background: 'rgba(0, 192, 129, 0.15)',
    value: CHANGE_TRANSFER_TYPE,
  },
  {
    label: defineMessage({ defaultMessage: 'KHÓA CHÍNH' }),
    color: '#00C081',
    background: 'rgba(0, 192, 129, 0.15)',
    value: CHANGE_TOPIC_TYPE,
  },
  {
    label: defineMessage({ defaultMessage: 'HỌC THỬ' }),
    color: '#FFC700',
    background: 'rgba(255, 199, 0, 0.1)',
    value: TRIAL_TYPE,
  },
  {
    label: defineMessage({ defaultMessage: 'BUỔI TEST' }),
    color: 'black',
    background: '#DADADA',
    value: TESTING_TYPE,
  },
];

export const SESSION_STATUS = [
  // hoàn thành
  {
    label: 'Sắp diễn ra',
    background: 'rgba(0, 192, 129, 0.15)',
    color: '#00C081',
    value: UPCOMING,
  },
  {
    label: 'Đang diễn ra',
    background: 'rgba(0, 192, 129, 0.15)',
    color: '#00C081',
    value: HAPPENING,
  },
  // tạm hoãn
  {
    label: 'Đã hoàn thành',
    background: 'rgba(62, 62, 62, 0.1)',
    color: '#3E3E3E',
    value: HAPPENED,
  },
  // hủy
  {
    label: 'ĐÃ HỦY',
    background: 'rgba(237, 0, 0, 0.1)',
    color: '#ED0000',
    value: UNHAPPENED,
  },
];
