import { defineMessage } from 'react-intl';

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

export const COURSE_TYPES = [
  {
    label: defineMessage({ defaultMessage: 'KHÓA CHÍNH' }),
    color: '#00C081',
    background: 'rgba(0, 192, 129, 0.15)',
    value: NEW_TYPE,
  },
  {
    label: defineMessage({ defaultMessage: 'ĐỔI GIÁO VIÊN' }),
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
    label: defineMessage({ defaultMessage: 'ĐỔI CHỦ ĐỀ' }),
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

export const COURSE_STATUS = [
  // hoàn thành
  {
    label: defineMessage({ defaultMessage: 'HOÀN THÀNH' }),
    background: 'rgba(0, 192, 129, 0.15)',
    color: '#00C081',
    value: COMPLETED_STATUS,
  },
  {
    label: defineMessage({ defaultMessage: 'MỚI MỞ' }),
    background: 'rgba(0, 192, 129, 0.15)',
    color: '#00C081',
    value: STATUS_OPEN,
  },
  // tạm hoãn
  {
    label: defineMessage({ defaultMessage: 'TẠM HOÃN' }),
    background: 'rgba(62, 62, 62, 0.1)',
    color: '#3E3E3E',
    value: DELAY_STATUS,
  },
  // hủy
  {
    label: defineMessage({ defaultMessage: 'ĐÃ HỦY' }),
    background: 'rgba(237, 0, 0, 0.1)',
    color: '#ED0000',
    value: CANCEL_STATUS,
  },
];
