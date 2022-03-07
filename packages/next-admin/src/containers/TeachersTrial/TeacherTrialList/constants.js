import { FormattedMessage } from 'react-intl';

export const TRIAL_TEACHER_ALL_VALUE = 3;
export const TRIAL_TEACHER_AVAILABEL_VALUE = 2;
export const TRIAL_TEACHER_UNAVAILABEL_VALUE = 1;

export const TRIAL_TEACHERS_STATUS = [
  {
    label: <FormattedMessage defaultMessage="All" />,
    value: TRIAL_TEACHER_ALL_VALUE,
    color: '#006BB4',
  },
  {
    label: <FormattedMessage defaultMessage="Available" />,
    value: TRIAL_TEACHER_AVAILABEL_VALUE,
    color: '#219653',
  },
  {
    label: <FormattedMessage defaultMessage="Unavailable" />,
    value: TRIAL_TEACHER_UNAVAILABEL_VALUE,
    color: '#f44336',
  },
];

export const TEACHERS_EXCELLENT_SELECT_ALL_VALUE = undefined;
export const TEACHERS_EXCELLENT_SELECT_EXCELLENT_VALUE = 1;
// value = 0 but have to send 2 because EuiSuperSelect not render option with value null or undefined or 0
export const TEACHERS_EXCELLENT_SELECT_NON_EXCELLENT_VALUE = 2;

export const TEACHERS_EXCELLENT_SELECT_OPTIONS = [
  {
    label: <FormattedMessage defaultMessage="All" />,
    value: TEACHERS_EXCELLENT_SELECT_ALL_VALUE,
    color: '#006BB4',
  },
  {
    label: <FormattedMessage defaultMessage="Excellent" />,
    value: TEACHERS_EXCELLENT_SELECT_EXCELLENT_VALUE,
    color: '#219653',
  },
  {
    label: <FormattedMessage defaultMessage="Non-Excellent" />,
    value: TEACHERS_EXCELLENT_SELECT_NON_EXCELLENT_VALUE,
    color: '#f44336',
  },
];
export const TEACHERS_TOP = 1;
export const TEACHERS_TOP_NULL = null;
export const TEACHERS_TOP_SELECT_OPTIONS = [
  {
    label: <FormattedMessage defaultMessage="All" />,
    value: TEACHERS_TOP_NULL,
    color: '#006BB4',
  },
  {
    label: <FormattedMessage defaultMessage="Top" />,
    value: TEACHERS_TOP,
    color: '#219653',
  },
];
