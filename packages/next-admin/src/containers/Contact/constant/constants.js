import { defineMessage, FormattedMessage } from 'react-intl';

export const STATUS_NEWLY = 0;
export const STATUS_CARING = 1;
export const STATUS_PENDING = 2;
export const STATUS_STOP = 3;

export const CONTACT_STATUS = [
  {
    label: defineMessage({ defaultMessage: 'Newly' }),
    value: STATUS_NEWLY,
    color: '#828282',
  },
  {
    label: defineMessage({ defaultMessage: 'Caring' }),
    value: STATUS_CARING,
    color: '#006BB4',
  },

  {
    label: defineMessage({ defaultMessage: 'Pending' }),
    value: STATUS_PENDING,
    color: '#F2C94C',
  },
  {
    label: defineMessage({ defaultMessage: 'Stop' }),
    value: STATUS_STOP,
    color: '#ED0000',
  },
];
export const FILTER_CARED_BY_NULL = -1;
export const FILTER_LEADER_TAB = 1;
export const FILTER_CTV_TAB = 2;
export const FILTER_BUTTONS = [
  {
    label: defineMessage({ defaultMessage: 'Tất cả' }),
    id: 1,
    value: undefined,
    isOn: true,
    paramName: '',
    isDisplay: true,
  },
  {
    label: defineMessage({ defaultMessage: 'Marketing' }),
    id: 2,
    value: FILTER_CARED_BY_NULL,
    isOn: false,
    paramName: 'caredBy',
    isDisplay: false,
  },

  {
    label: defineMessage({ defaultMessage: 'Leader' }),
    id: 3,
    value: FILTER_LEADER_TAB,
    isOn: false,
    paramName: 'leaderTab',
    isDisplay: false,
  },
  {
    label: defineMessage({ defaultMessage: 'CTV' }),
    id: 4,
    value: FILTER_CTV_TAB,
    isOn: false,
    paramName: 'ctvTab',
    isDisplay: false,
  },
];
export const STUDENT_STATUS_NEW = 1;
export const STUDENT_STATUS_BOOKED = 2;
export const STUDENT_STATUS_TESTED = 3;
export const STUDENT_STATUS_TRIAL = 4;
export const STUDENT_STATUS_STUDENT = 5;
export const STUDENT_STATUS = [
  {
    label: defineMessage({ defaultMessage: 'New' }),
    value: STUDENT_STATUS_NEW,
    color: '#828282',
  },
  {
    label: defineMessage({ defaultMessage: 'Booked' }),
    value: STUDENT_STATUS_BOOKED,
    color: '#006BB4',
  },

  {
    label: defineMessage({ defaultMessage: 'Tested' }),
    value: STUDENT_STATUS_TESTED,
    color: '#F2C94C',
  },
  {
    label: defineMessage({ defaultMessage: 'Trial' }),
    value: STUDENT_STATUS_TRIAL,
    color: '#9B51E0',
  },
  {
    label: defineMessage({ defaultMessage: 'Student' }),
    value: STUDENT_STATUS_STUDENT,
    color: '#219653',
  },
];

export const TERM_OPTION_VALUE = 1;
export const LRID_OPTION_VALUE = 2;
export const SEARCH_OPTIONS = [
  {
    value: TERM_OPTION_VALUE,
    inputDisplay: (
      <FormattedMessage defaultMessage="STĐ, Tên, ID học viên, Tên, email salesman" />
    ),
  },
  {
    value: LRID_OPTION_VALUE,
    inputDisplay: <FormattedMessage defaultMessage="LR ID" />,
  },
];
export const GENDER_MALE = 1;
export const GENDER_FEMALE = 2;
export const GENDER_OTHER = 3;

export const GENDER = [
  {
    value: GENDER_MALE,
    label: defineMessage({ defaultMessage: 'Male' }),
  },
  {
    value: GENDER_FEMALE,
    label: defineMessage({ defaultMessage: 'Female' }),
  },
  {
    value: GENDER_OTHER,
    label: defineMessage({ defaultMessage: 'Other' }),
  },
];
export const HISTORY_TYPES = [
  {
    label: defineMessage({ defaultMessage: 'Convert from LearningRequest' }),
    value: 'type_convert',
  },
  {
    label: defineMessage({ defaultMessage: 'Update contact information' }),
    value: 'type_update',
  },
  {
    label: defineMessage({ defaultMessage: 'Reassigned to' }),
    value: 'type_reassign',
  },
  {
    label: defineMessage({ defaultMessage: 'Divided to' }),
    value: 'type_divide',
  },
  // {
  //   label: defineMessage({ defaultMessage: 'Convert from' }),
  //   value: 'type_test',
  // },
  {
    label: defineMessage({ defaultMessage: 'Created by' }),
    value: 'type_create',
  },
  {
    label: defineMessage({
      defaultMessage: 'Update learning request information',
    }),
    value: 'type_learning_request_update',
  },
  // {
  //   label: defineMessage({ defaultMessage: 'Convert from' }),
  //   value: 'type_bulk_update',
  // },
  {
    label: defineMessage({ defaultMessage: 'Create' }),
    value: 'type_learning_request_create',
  },
  {
    label: defineMessage({ defaultMessage: 'Update level learning request' }),
    value: 'type_learning_request_update_level',
  },
];
export const TAGS = [
  {
    value: 1,
    label: defineMessage({ defaultMessage: 'Trẻ em' }),
  },
  {
    value: 2,
    label: defineMessage({ defaultMessage: 'Người lớn' }),
  },
];
export const CUSTOMER_REJECT = 1;
export const CANNOT_GET_IN_TOUCH = 2;
export const CONTACT_TRASH = 3;
export const CUSTOMER_CONSIDERING = 4;
export const REASONRADIOS = [
  {
    id: CUSTOMER_REJECT,
    label: 'Khách hàng từ chối',
  },
  {
    id: CANNOT_GET_IN_TOUCH,
    label: 'Không liên lạc được',
  },
  {
    id: CONTACT_TRASH,
    label: 'Chuyển contact rác',
    disabled: true,
  },
  {
    id: CUSTOMER_CONSIDERING,
    label: 'Khách hàng đang cân nhắc',
  },
];
export const REASON_NOTE_LR_LIST = [
  {
    reasonId: CUSTOMER_REJECT,
    value: 1,
    label: 'Tài chính',
  },
  {
    reasonId: CUSTOMER_REJECT,
    value: 2,
    label: 'Không có thời gian',
  },
  {
    reasonId: CUSTOMER_REJECT,
    value: 3,
    label: 'Không tin tưởng',
  },
  {
    reasonId: CUSTOMER_REJECT,
    value: 4,
    label: 'Chưa quyết định được (Cần hỏi người thân)',
  },
  {
    reasonId: CUSTOMER_REJECT,
    value: 5,
    label: 'Không vội vàng',
  },
  {
    reasonId: CUSTOMER_REJECT,
    value: 6,
    label: 'Không có nhu cầu',
  },
  // {
  //   reasonId: CUSTOMER_REJECT,
  //   value: 7,
  //   label: 'Không nhấc máy' ,
  // },
  // {
  //   reasonId: CUSTOMER_REJECT,
  //   value: 8,
  //   label: 'Không tin tưởng' ,
  // },
  {
    reasonId: CANNOT_GET_IN_TOUCH,
    value: 9,
    label: 'Không nhấc máy',
  },
  {
    reasonId: CANNOT_GET_IN_TOUCH,
    value: 10,
    label: 'Thuê bao',
  },
  {
    reasonId: CONTACT_TRASH,
    value: 11,
    label: 'Số không có thực, số không đúng',
  },
  {
    reasonId: CONTACT_TRASH,
    value: 12,
    label: 'Khách hàng không thuộc đối tượng (dưới 4 tuổi)',
  },
  {
    reasonId: CANNOT_GET_IN_TOUCH,
    value: 13,
    label: 'Gọi lại sau',
  },
  {
    reasonId: CONTACT_TRASH,
    value: 14,
    label: 'Không có nhu cầu học tiếng anh',
  },
  {
    reasonId: CUSTOMER_CONSIDERING,
    value: 15,
    label: 'Khách hàng đang cân nhắc',
  },
];
export const NEW_NOTE_ID = 'new-note-id';
export const HISTORY_NOTE_ID = 'history-note-id';

export const CREATE_ACCOUNT = 1;
export const BOOK_TEST = 2;
export const BOOK_TRIAL = 3;
export const CREATE_CONTRACT = 4;
export const CREATE_TRANSFER = 5;
export const VIEW_TRANSFER = 6;
export const LR_MENU_ITEM = [
  {
    id: CREATE_ACCOUNT,
    key: 'create-account',
    icon: 'user',
    label: 'Tạo tài khoản học viên',
    disabled: true,
    levels: [1],
  },
  {
    id: BOOK_TEST,
    key: 'book-test',
    icon: 'calendar',
    label: 'Đặt lịch test',
    disabled: true,
    levels: [5, 4, 3],
  },
  {
    id: BOOK_TRIAL,
    key: 'book-trial',
    icon: 'calendar',
    label: 'Đặt lịch học thử',
    disabled: true,
    levels: [5, 4, 3],
  },
  {
    id: CREATE_CONTRACT,
    key: 'create-contract',
    icon: 'indexOpen',
    label: 'Tạo hợp đồng',
    disabled: true,
    levels: [5, 6],
  },
  {
    id: CREATE_TRANSFER,
    key: 'create-transfer',
    icon: 'indexFlush',
    label: 'Bàn giao khoá học',
    disabled: true,
    levels: [6],
  },
  {
    id: VIEW_TRANSFER,
    key: 'view-transfer',
    icon: 'indexFlush',
    label: 'Xem bàn giao khoá học',
    disabled: true,
    levels: [6],
  },
];
export const STUDY_PROGRAM = [
  {
    value: 1,
    label: 'Kid',
  },
  {
    value: 2,
    label: 'Work',
  },
  {
    value: 3,
    label: 'IELTS',
    disabled: true,
  },
  {
    value: 4,
    label: 'Toefl',
  },
];
