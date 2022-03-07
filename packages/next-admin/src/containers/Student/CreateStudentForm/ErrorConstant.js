import { FormattedMessage } from 'react-intl';

const ErrorStatus = [
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

const DeleteErrorStatus = [
  {
    code: 404,
    message: <FormattedMessage defaultMessage="Not Found Contact" />,
  },
  {
    code: 406,
    message: <FormattedMessage defaultMessage="Not Acceptable" />,
  },
  {
    code: 403,
    message: <FormattedMessage defaultMessage="Not Permission Access" />,
  },
];

export { DeleteErrorStatus, ErrorStatus };
