import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';
import {
  GENDER_FEMALE,
  GENDER_MALE,
  GENDER_OTHER,
} from 'configs/app.constants';

import {
  STUDENT_TYPE_KID,
  STUDENT_TYPE_ADULT,
} from '../../containers/Student/Students/constants';

export const STUDENT_STATUS_NEW = 1;
export const STUDENT_STATUS_BOOKED = 2;
export const STUDENT_STATUS_TESTED = 3;
export const STUDENT_STATUS_TRIAL = 4;
export const STUDENT_STATUS_STUDENT = 5;

export const STUDENT_STATUS = [
  {
    label: <FormattedMessage defaultMessage="New" />,
    value: STUDENT_STATUS_NEW,
    color: '#828282',
  },
  {
    label: <FormattedMessage defaultMessage="Booked" />,
    value: STUDENT_STATUS_BOOKED,
    color: '#006BB4',
  },

  {
    label: <FormattedMessage defaultMessage="Tested" />,
    value: STUDENT_STATUS_TESTED,
    color: '#F2C94C',
  },
  {
    label: <FormattedMessage defaultMessage="Trial" />,
    value: STUDENT_STATUS_TRIAL,
    color: '#9B51E0',
  },
  {
    label: <FormattedMessage defaultMessage="Student" />,
    value: STUDENT_STATUS_STUDENT,
    color: '#219653',
  },
];

const configLength = 20;

const SHEMA_SUB_USER_DYNAMIC = Array.from(
  { length: configLength },
  (x, i) => i,
).map(i => ({
  [`idSubUser${i + 1}`]: yup.number().notRequired(),
  [`firstNameSubUser${i + 1}`]: yup.string().when('subUserCount', {
    is: val => val?.includes(i),
    then: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
  }),
  [`lastNameSubUser${i + 1}`]: yup.string().when('subUserCount', {
    is: val => val?.includes(i),
    then: yup
      .string()
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
  }),
  [`studentTypeSubUser${i + 1}`]: yup.mixed().when('subUserCount', {
    is: val => val?.includes(i),
    then: yup
      .mixed()
      .oneOf([STUDENT_TYPE_KID, STUDENT_TYPE_ADULT], 'Invalid studentType')
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
  }),
  [`genderSubUser${i + 1}`]: yup.mixed().when('subUserCount', {
    is: val => val?.includes(i),
    then: yup
      .mixed()
      .oneOf([GENDER_MALE, GENDER_FEMALE, GENDER_OTHER], 'Invalid gender')
      .required(<FormattedMessage defaultMessage="This Field Is Require" />),
  }),
}));

const SHEMA_SUB_USER_DEFAULT_DYNAMIC = Array.from(
  { length: configLength },
  (x, i) => i,
).map(i => ({
  [`idSubUser${i + 1}`]: undefined,
  [`firstNameSubUser${i + 1}`]: undefined,
  [`lastNameSubUser${i + 1}`]: undefined,
  [`studentTypeSubUser${i + 1}`]: undefined,
  [`genderSubUser${i + 1}`]: undefined,
  [`learningRequestSubUser${i + 1}`]: undefined,
  [`statusSubUser${i + 1}`]: 1,
}));

export const SHEMA_SUB_USER_DEFAULT = {
  subUserCount: [],
  ...Object.assign({}, {}, ...SHEMA_SUB_USER_DEFAULT_DYNAMIC),
};

export const SHEMA_SUB_USER = {
  subUserCount: yup.array().of(yup.number()),
  ...Object.assign({}, {}, ...SHEMA_SUB_USER_DYNAMIC),
};

export const DeleteErrorStatus = [
  {
    code: 404,
    message: <FormattedMessage defaultMessage="Not Found Contact" />,
  },
  {
    code: 406,
    message: <FormattedMessage defaultMessage="Not Acceptable" />,
  },
  {
    code: 403,
    message: <FormattedMessage defaultMessage="Not Permission Access" />,
  },
];
