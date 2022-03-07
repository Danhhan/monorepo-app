import { defineMessage, FormattedMessage } from 'react-intl';

export const UPCOMING = 1;
export const HAPPENING = 2;
export const HAPPENED = 3;
export const UNHAPPENED = 4;
export const JOINED = 11;

export const SESSION_STATUS = [
  {
    label: defineMessage({ defaultMessage: 'Upcoming' }),
    value: UPCOMING,
    color: '#FFC700',
    background: 'rgba(255, 199, 0, 0.1)',
  },
  {
    label: defineMessage({ defaultMessage: 'Ongoing' }),
    value: HAPPENING,
    // color: '#064CFF',
    color: '#FFC700',
    background: 'rgba(255, 199, 0, 0.1)',
  },
  {
    label: defineMessage({ defaultMessage: 'Completed' }),
    value: HAPPENED,
    color: '#00C081',
    background: 'rgba(0, 192, 129, 0.15)',
  },
  {
    label: defineMessage({ defaultMessage: 'Not Happened' }),
    value: UNHAPPENED,
    color: '#ED0000',
    background: 'rgba(237, 0, 0, 0.1)',
  },
  {
    label: defineMessage({ defaultMessage: 'Joined' }),
    value: JOINED,
    color: '#00C081',
    background: 'rgba(0, 192, 129, 0.15)',
  },
  {
    label: defineMessage({ defaultMessage: 'Unknow' }),
  },
];

export const ERROR_STATUS = [
  {
    code: 400,
    message: (
      <FormattedMessage defaultMessage="Exceeds the limit of course duration" />
    ),
  },
];
