import { htmlIdGenerator } from '@antoree/ant-ui';
import { STUDENT_TYPE_ADULT, STUDENT_TYPE_KID } from 'configs/app.constants';

export const COMUNICATION = 12;
export const TOEIC = 8;
export const IELTS = 7;

export const STUDY_PROGRAMS = [
  {
    id: COMUNICATION,
    label: 'Giao tiếp (COM)',
    subLabel: 'GIAO TIẾP',
  },
  {
    id: TOEIC,
    label: (
      <>
        <span>TOEIC</span>{' '}
        <span style={{ color: '#00C081' }}>(+10% học phí)</span>
      </>
    ),
    subLabel: 'TOEIC',
  },
  {
    id: IELTS,
    label: (
      <>
        <span>IELTS</span>{' '}
        <span style={{ color: '#00C081' }}>(+20% học phí)</span>
      </>
    ),
    subLabel: 'IELTS',
  },
];
export const OTHER = 9;
export const RADIO_HOURS = [
  {
    referValue: STUDENT_TYPE_KID,
    id: htmlIdGenerator()(),
    value: 30,
    label: '30',
    checked: true,
  },
  {
    referValue: STUDENT_TYPE_KID,
    id: htmlIdGenerator()(),
    value: 60,
    label: '60',
    checked: false,
  },
  {
    referValue: STUDENT_TYPE_KID,
    id: htmlIdGenerator()(),
    value: 120,
    label: '120',
    checked: false,
  },
  {
    referValue: STUDENT_TYPE_KID,
    id: htmlIdGenerator()(),
    value: 180,
    label: '180',
    checked: false,
  },
  {
    referValue: STUDENT_TYPE_KID,
    id: htmlIdGenerator()(),
    value: 240,
    label: '240',
    checked: false,
  },
  // adult
  {
    referValue: STUDENT_TYPE_ADULT,
    id: htmlIdGenerator()(),
    value: 36,
    label: '36',
    checked: true,
  },
  {
    referValue: STUDENT_TYPE_ADULT,
    id: htmlIdGenerator()(),
    value: 72,
    label: '72',
    checked: false,
  },
  {
    referValue: STUDENT_TYPE_ADULT,
    id: htmlIdGenerator()(),
    value: 108,
    label: '108',
    checked: false,
  },
  {
    referValue: STUDENT_TYPE_ADULT,
    id: htmlIdGenerator()(),
    value: 144,
    label: '144',
    checked: false,
  },
];
export const ORIGINAL = 1;
export const SPECIAL = 2;
export const TEACHER_DURATION_1 = 3;
export const TEACHER_FEE_1 = 4;
export const TEACHER_DURATION_2 = 5;
export const TEACHER_FEE_2 = 7;
export const TOTAL_DURATION = 8;
export const LAST_PRICE = 9;
export const TOTAL_SPECIAL = 10;

// ĐẶT TÊN TẠM THÔI, NẾU NGƯỜI DÙNG THAY ĐỔI THÌ CÁC BIẾN HIỆN TẠI SẼ KHÔNG CÒN ĐÚNG NGHĨA !!!
export const BASIC = 1;
export const CONFIDENT = 7;
export const FLUENTLY = 8;
export const MASTER = 9;

export const DEFAULT_PRICE_DATA = [
  {
    id: ORIGINAL,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    label: 'Giá gốc',
  },
  {
    id: SPECIAL,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    label: 'Giá ưu đãi khoá dài',
  },
  {
    id: TEACHER_DURATION_1,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    teacherGroup: undefined,
    label: `Giờ học giáo viên`,
  },
  {
    id: TEACHER_FEE_1,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    teacherGroup: undefined,
    label: 'Học phí giáo viên',
  },
  {
    id: TEACHER_DURATION_2,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    teacherGroup: undefined,
    label: 'Giờ học giáo viên',
  },
  {
    id: TEACHER_FEE_2,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,
    teacherGroup: undefined,

    label: 'Học phí giáo viên',
  },
  {
    id: TOTAL_DURATION,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    label: 'Tổng giờ học',
  },
  {
    id: LAST_PRICE,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    label: 'Giá cuối',
  },
  {
    id: TOTAL_SPECIAL,
    value1: undefined,
    value2: undefined,
    value3: undefined,
    value4: undefined,

    label: 'Tổng ưu đãi',
  },
];
