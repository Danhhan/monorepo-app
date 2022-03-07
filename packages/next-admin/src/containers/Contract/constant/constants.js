import { htmlIdGenerator } from '@antoree/ant-ui';
import { defineMessage } from 'react-intl';
import * as yup from 'yup';

export const LIST_SESSIONS = [
  {
    value: 1,
    label: '2 buổi / tuần',
  },
  {
    value: 2,
    label: '3 buổi / tuần',
  },
  {
    value: 3,
    label: '1 buổi / tuần (chỉ 30h, 36h, 60h, 108h, 120h',
  },
  {
    value: 5,
    label: '5 buổi / tuần (chỉ 30h, 120h)',
  },
  {
    value: 15,
    label: '1.5 buổi / tuần (chỉ 36h, chỉ 60h)',
  },
];
export const TEACHER_GROUPS = [
  {
    value: 1,
    label: 'Vietnam',
  },
  {
    value: 2,
    label: 'Philippines',
  },
  {
    value: 3,
    label: 'Premium',
  },
  {
    value: 4,
    label: 'Native',
  },
];

export const LIST_PAID = [
  {
    value: 1,
    label: 'Đã thanh toán',
  },
  {
    value: 2,
    label: 'Chưa thanh toán',
  },
];
export const ONE_TIME_PAYMENT = 1;
export const MANY_TIME_PAYMENT_AUTO = 2;
export const MANY_TIME_PAYMENT_MANUAL = 3;

export const LIST_CONTRACT_PAYMENT_TYPES = [
  {
    id: htmlIdGenerator()(),
    value: ONE_TIME_PAYMENT,
    label: 'Một lần',
    checked: true,
  },
  {
    id: htmlIdGenerator()(),
    value: MANY_TIME_PAYMENT_AUTO,
    label: 'Nhiều lần (tự động)',
    checked: false,
  },
  {
    id: htmlIdGenerator()(),
    value: MANY_TIME_PAYMENT_MANUAL,
    label: 'Nhiều lần (tuỳ chỉnh)',
    checked: false,
  },
];
export const CONTACT_TYPE_PERSONAL = 1;
export const CONTACT_TYPE_COMPANY = 2;

export const PROGRESS_PAYMENT_FEE_INFORMATION = [
  {
    value: 1,
    text: defineMessage({ defaultMessage: 'Số tháng chia học phí' }),
    twoMonth: defineMessage({ defaultMessage: '2T' }),
    threeMonth: defineMessage({ defaultMessage: '3T' }),
    fourMonth: defineMessage({ defaultMessage: '4T' }),
    fiveMonth: defineMessage({ defaultMessage: '5T' }),
    sixMonth: defineMessage({ defaultMessage: '6T' }),
    sevenMonth: defineMessage({ defaultMessage: '7T' }),
    eightMonth: defineMessage({ defaultMessage: '8T' }),
    nineMonth: defineMessage({ defaultMessage: '9T' }),
    tenMonth: defineMessage({ defaultMessage: '10T' }),
    elevenMonth: defineMessage({ defaultMessage: '11T' }),
    twelveMonth: defineMessage({ defaultMessage: '12T' }),
  },
  {
    value: 1,
    text: defineMessage({ defaultMessage: 'Phí phụ thu(Thường)' }),
    twoMonth: defineMessage({ defaultMessage: '2%' }),
    threeMonth: defineMessage({ defaultMessage: '3%' }),
    fourMonth: defineMessage({ defaultMessage: '4%' }),
    fiveMonth: defineMessage({ defaultMessage: '5%' }),
    sixMonth: defineMessage({ defaultMessage: '6%' }),
    sevenMonth: defineMessage({ defaultMessage: '7%' }),
    eightMonth: defineMessage({ defaultMessage: '8%' }),
    nineMonth: defineMessage({ defaultMessage: '9%' }),
    tenMonth: defineMessage({ defaultMessage: '10%' }),
    elevenMonth: defineMessage({ defaultMessage: '11%' }),
    twelveMonth: defineMessage({ defaultMessage: '12%' }),
  },
  {
    value: 1,
    text: defineMessage({ defaultMessage: 'Phí phụ thu(Ngày vàng)' }),
    twoMonth: defineMessage({ defaultMessage: 'Miễn phí' }),
    threeMonth: defineMessage({ defaultMessage: 'Miễn phí' }),
    fourMonth: defineMessage({ defaultMessage: 'Miễn phí' }),
    fiveMonth: defineMessage({ defaultMessage: 'Miễn phí' }),
    sixMonth: defineMessage({ defaultMessage: 'Miễn phí' }),
    sevenMonth: defineMessage({ defaultMessage: '1%' }),
    eightMonth: defineMessage({ defaultMessage: '2%' }),
    nineMonth: defineMessage({ defaultMessage: '3%' }),
    tenMonth: defineMessage({ defaultMessage: '4%' }),
    elevenMonth: defineMessage({ defaultMessage: '5%' }),
    twelveMonth: defineMessage({ defaultMessage: '6%' }),
  },
];
export const DEPARTMENT_WORK = [
  {
    value: 'TVTS',
    label: 'Sale',
  },
  {
    value: 'CMD', // tên cũ
    label: 'ACS',
  },
];
export const HCMO = 'HCMO';
export const HNO = 'HNO';
export const LIST_CONSULTING_BRANCHES = [
  {
    value: 'HCMO',
    label: 'TP HCM',
  },
  {
    value: 'HNO',
    label: 'Hà Nội',
  },
];
export const FORM_DEFAULT_VALUES = {
  full_name_contract: '',
  tax_code_company: '',
  representative: '',
  postion: '',
  id_no: '',
  issued_date: '',
  issued_by: '',
  email: '',
  phone: '',
  city: '',
  district: '',
  ward: '',
  address: '',
  full_name_serviece_user: '',
  birth_day: '',
  city_serviceuser: '',
  district_serviceuser: '',
  ward_serviceuser: '',
  address_serviece_user: '',
  id_no_serviece_user: '',
  issued_date_serviece_user: '',
  issued_by_serviece_user: '',
  price: 0,
  last_duration: 0,
  payment_date: '',
  sessions: '',
  detail_vi: '',
  detail_en: '',
  type_teacher: '',
  paid: '',
  info_paid: '',
  specialPrice: '',
  total_services_provided: '',
  total_payment: '',
  fee: [],
  installment_fee: 0,
  payments: '',
  request_id: '',
  contract_type_id: CONTACT_TYPE_PERSONAL || CONTACT_TYPE_COMPANY,
  price_id: '',
  discount: '',
  duration: 0,
  add_duration: 0,
  numberPayment_id: ONE_TIME_PAYMENT,
  time_start: '',
  appendix_vi: '',
  appendix_en: '',
  typePre: 0,
  payment: [],
  consulting_branch: '',
  implementation_department: '',
  payment_new: [],
};
export const VALIDATION_SCHEMA = yup.object().shape({
  // both
  request_id: yup.string().required('Required'),
  price_id: yup.string().required('Required'),
  payment_date: yup.string().required('Required'),
  sessions: yup.string().required('Required'),
  time_start: yup.string().required('Required'),
  implementation_department: yup.string().required('Required'),
  consulting_branch: yup.string().required('Required'),
  paid: yup.string().required('Required'),
  type_teacher: yup.string().required('Required'),
  full_name_contract: yup.string().required('Required'),
  full_name_serviece_user: yup.string().required('Required'),
  phone: yup.string().required('Required'),
  email: yup.string().required('Required'),
  // personal
  // city: yup.string().when('contract_type_id', val => {
  //   if (val === CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
  //   return yup.string().notRequired('Required');
  // }),
  // district: yup.string().when('contract_type_id', val => {
  //   if (val === CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
  //   return yup.string().notRequired('Required');
  // }),
  // ward: yup.string().when('contract_type_id', val => {
  //   if (val === CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
  //   return yup.string().notRequired('Required');
  // }),
  // company'
  tax_code_company: yup.string().when('contract_type_id', val => {
    if (val !== CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
    return yup.string().notRequired('Required');
  }),
  representative: yup.string().when('contract_type_id', val => {
    if (val !== CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
    return yup.string().notRequired('Required');
  }),
  postion: yup.string().when('contract_type_id', val => {
    if (val !== CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
    return yup.string().notRequired('Required');
  }),
  // city_serviceuser: yup.string().when('contract_type_id', val => {
  //   if (val !== CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
  //   return yup.string().notRequired('Required');
  // }),
  // district_serviceuser: yup.string().when('contract_type_id', val => {
  //   if (val !== CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
  //   return yup.string().notRequired('Required');
  // }),
  // ward_serviceuser: yup.string().when('contract_type_id', val => {
  //   if (val !== CONTACT_TYPE_PERSONAL) return yup.string().required('Required');
  //   return yup.string().notRequired('Required');
  // }),
});
export const PAYMENT_AMOUNT = 1;
export const PAYMENT_HOUR = 2;
export const PAYMENT_MONTH = 3;
