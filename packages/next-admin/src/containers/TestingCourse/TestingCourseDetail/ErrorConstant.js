import { FormattedMessage } from 'react-intl';

const ErrorStatus = [
  {
    code: 401,
    message: <FormattedMessage defaultMessage="Access Denied!" />,
  },
  {
    code: 500,
    message: <FormattedMessage defaultMessage="Invalid CourseID" />,
  },
];

export default ErrorStatus;
