import { FormattedMessage } from 'react-intl';

export const STATUS_CONSTANTS = [
  {
    label: <FormattedMessage defaultMessage="Available" />,
    value: 0,
    colorCode: '#fff',
  },
  // {
  //   label: <FormattedMessage defaultMessage='Unavailable'/>,
  //   value: 1,
  //   colorCode: '#88888b',
  // },
  {
    label: <FormattedMessage defaultMessage="Selected" />,
    value: 2,
    colorCode: '#00c081',
  },
];
