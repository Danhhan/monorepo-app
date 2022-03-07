import { defineMessage, FormattedMessage } from 'react-intl';

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

const STATUS_NEWLY = 1;
const STATUS_COMPLETED = 2;
const STATUS_COMPLETED_BUT_STUDENT_ABSENT = 3;
const STATUS_COMPLETED_BUT_STUDENT_WAS_ABSENT = 8; // should be 4
const STATUS_COMPLETED_AUTOMATICALLY = 5;
const STATUS_NOT_HAPPENED = 7; // should be 10
const STATUS_NOT_HAPPENED_AUTOMATICALLY = 11;

export const STATUS = [
  {
    label: defineMessage({ defaultMessage: 'Newly' }),
    value: STATUS_NEWLY,
    color: '#828282',
  },
  {
    label: defineMessage({ defaultMessage: 'Completed' }),
    value: STATUS_COMPLETED_BUT_STUDENT_WAS_ABSENT,
    color: '#27AE60',
  },
  {
    label: defineMessage({ defaultMessage: 'Completed' }),
    value: STATUS_COMPLETED,
    color: '#27AE60',
  },
  {
    label: defineMessage({ defaultMessage: 'Completed' }),
    value: STATUS_COMPLETED_BUT_STUDENT_ABSENT,
    color: '#27AE60',
  },
  {
    label: defineMessage({ defaultMessage: 'Completed' }),
    value: STATUS_COMPLETED_AUTOMATICALLY,
    color: '#27AE60',
  },
  {
    label: defineMessage({ defaultMessage: 'Not happend' }),
    value: STATUS_NOT_HAPPENED,
    color: '#EB5757',
  },
  {
    label: defineMessage({ defaultMessage: 'Not happend' }),
    value: STATUS_NOT_HAPPENED_AUTOMATICALLY,
    color: '#EB5757',
  },
];

export const TESTER_TYPES = [
  {
    label: <FormattedMessage defaultMessage="Normal" />,
    value: 0,
  },
  {
    label: <FormattedMessage defaultMessage="Excellent" />,
    value: 1,
  },
];
