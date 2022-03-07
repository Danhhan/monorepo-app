import { FormattedMessage } from 'react-intl';

export const ERROR_STATUS = [
  {
    code: 404,
    message: (
      <FormattedMessage defaultMessage="The teacher available time has been booked" />
    ),
  },
  {
    code: 409,
    message: (
      <FormattedMessage defaultMessage="This time slot is already booked, please cancel to choose a new one" />
    ),
  },
];
