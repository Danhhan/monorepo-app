import withSuspense from 'HOCs/withSuspense';
import withBreadcrumbs from 'HOCs/withBreadcrumbs';
import { FormattedMessage } from 'react-intl';
import StudentDetail from './StudentDetail';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Students" />,
    path: '/students',
  },
  {
    text: <FormattedMessage defaultMessage="Student detail" />,
  },
];

export default withBreadcrumbs(withSuspense(StudentDetail))(breadcrumbs);
