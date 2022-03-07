import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';

export const schema = yup.object().shape({
  courseId: yup
    .number()
    .typeError(() => (
      <FormattedMessage defaultMessage="Please fill numeric characters" />
    ))
    .integer(() => (
      <FormattedMessage defaultMessage="Course ID must be a positive integer" />
    ))
    .moreThan(0, () => (
      <FormattedMessage defaultMessage="Course ID must be a positive integer" />
    ))
    .required(() => (
      <FormattedMessage defaultMessage="Please fill Course ID" />
    )),
});
