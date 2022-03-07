import { defineMessage, FormattedMessage } from 'react-intl';

export const STUDENT_TYPE_KID = 1;
export const STUDENT_TYPE_ADULT = 2;

export const STUDENT_TYPES = [
  {
    label: defineMessage({ defaultMessage: 'Kid' }),
    value: STUDENT_TYPE_KID,
  },
  {
    label: defineMessage({ defaultMessage: 'Adult' }),
    value: STUDENT_TYPE_ADULT,
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

export const STUDENT_OPTION = [
  {
    value: 0,
    inputDisplay: 'All',
  },
  {
    value: 1,
    inputDisplay: 'New',
  },
  {
    value: 2,
    inputDisplay: 'Booked',
  },
  {
    value: 3,
    inputDisplay: 'Tested',
  },
  {
    value: 4,
    inputDisplay: 'Trial',
  },
  {
    value: 5,
    inputDisplay: 'Student',
  },
];

export const TERM_OPTION_VALUE = 1;
export const LRID_OPTION_VALUE = 2;
export const SALEMAN_OPTION_VALUE = 3;
export const SEARCH_OPTIONS = [
  {
    value: TERM_OPTION_VALUE,
    inputDisplay: (
      <FormattedMessage defaultMessage="Phone Number, Name or Student ID" />
    ),
  },
  {
    value: LRID_OPTION_VALUE,
    inputDisplay: <FormattedMessage defaultMessage="Learning Request ID" />,
  },
  {
    value: SALEMAN_OPTION_VALUE,
    inputDisplay: <FormattedMessage defaultMessage="Saleman name or email" />,
  },
];
