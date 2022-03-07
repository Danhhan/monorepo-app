import * as yup from 'yup';
import { FormattedMessage } from 'react-intl';

export const schema = yup.object().shape({
  courseId: yup
    .number()
    .typeError(() => (
      <FormattedMessage defaultMessage="Vui lòng nhập kí tự số" />
    ))
    .integer(() => (
      <FormattedMessage defaultMessage="Test ID phải là số nguyên dương" />
    ))
    .moreThan(0, () => (
      <FormattedMessage defaultMessage="Test ID phải là số nguyên dương" />
    ))
    .required(() => (
      <FormattedMessage defaultMessage="Vui lòng nhập Test ID" />
    )),
});
