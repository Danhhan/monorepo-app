import withSuspense from 'HOCs/withSuspense';
import withBreadcrumbs from 'HOCs/withBreadcrumbs';
import { FormattedMessage } from 'react-intl';
import TeacherDetail from './TeacherDetail';

const breadcrumbs = [
  {
    text: <FormattedMessage defaultMessage="Home" />,
    path: '/',
  },
  {
    text: <FormattedMessage defaultMessage="Tester detail" />,
  },
];

export default withBreadcrumbs(withSuspense(TeacherDetail))(breadcrumbs);
