import { FormattedMessage } from 'react-intl';

export const TERM_OPTION_VALUE = 1;
export const LRID_OPTION_VALUE = 2;
export const SEARCH_OPTIONS = [
  {
    value: TERM_OPTION_VALUE,
    inputDisplay: (
      <FormattedMessage defaultMessage="SDT, tên, id, email khách" />
    ),
  },
  {
    value: LRID_OPTION_VALUE,
    inputDisplay: <FormattedMessage defaultMessage="Tên, email sales" />,
  },
];
