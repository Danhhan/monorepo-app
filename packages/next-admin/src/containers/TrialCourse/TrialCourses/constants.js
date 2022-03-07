import { FormattedMessage } from 'react-intl';

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
    inputDisplay: <FormattedMessage defaultMessage="Saleman name" />,
  },
];
