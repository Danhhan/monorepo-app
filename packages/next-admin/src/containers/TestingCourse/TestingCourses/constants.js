import { FormattedMessage } from 'react-intl';

export const TERM_OPTION_VALUE = 1;
export const LRID_OPTION_VALUE = 2;
export const SALEMAN_OPTION_VALUE = 3;
export const SEARCH_OPTIONS = [
  {
    value: 1,
    inputDisplay: (
      <FormattedMessage defaultMessage="Phone Number, Name or Student ID" />
    ),
  },
  {
    value: 2,
    inputDisplay: <FormattedMessage defaultMessage="Learning Request ID" />,
  },
  {
    value: 3,
    inputDisplay: <FormattedMessage defaultMessage="Saleman name" />,
  },
];
