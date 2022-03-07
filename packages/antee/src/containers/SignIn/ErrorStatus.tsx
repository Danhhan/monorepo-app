import { FormattedMessage } from 'react-intl';

const ErrorStatus = [
  {
    code: 406,
    message: (
      <FormattedMessage defaultMessage="Error no contact neither LR! Please contact customer care for help!" />
    ),
  },
  {
    code: 426,
    message: (
      <FormattedMessage defaultMessage="Error no LR! Please contact customer care for help!" />
    ),
  },
  {
    code: 404,
    message: (
      <FormattedMessage defaultMessage="Error no contact! Please contact customer care for help!" />
    ),
  },
];

export default ErrorStatus;
