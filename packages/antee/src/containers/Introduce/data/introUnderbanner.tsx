import React, { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';

const introUnderbanner = [
  {
    icon: 'stats',
    title: <FormattedMessage defaultMessage="7 năm" />,
    text: <FormattedMessage defaultMessage="Phát triển" />,
  },
  {
    icon: 'clock',
    title: <FormattedMessage defaultMessage="1.100.000+" />,
    text: <FormattedMessage defaultMessage="Giờ học đăng ký" />,
  },
  {
    icon: 'users',
    title: <FormattedMessage defaultMessage="10.000+" />,
    text: <FormattedMessage defaultMessage="Học viên" />,
  },
];

export default introUnderbanner;
