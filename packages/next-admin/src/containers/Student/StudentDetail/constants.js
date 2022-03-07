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

export const ErrorStatus = [
  {
    code: 403,
    message: (
      <FormattedMessage defaultMessage="This contact has been care by someone" />
    ),
  },
  {
    code: 409,
    message: (
      <FormattedMessage defaultMessage="Student Account Already Exist" />
    ),
  },
  {
    code: 400,
    message: (
      <FormattedMessage defaultMessage="The email have already been taken" />
    ),
  },
];
