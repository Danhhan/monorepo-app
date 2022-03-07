import React from 'react';

import { Icon } from '../Icon';

export type ErrorShowProps = {
  message?: any;
  title?: any;
};

const ErrorShow: React.FC<ErrorShowProps> = ({ message, title }) => {
  return (
    <div className="flex justify-center flex-col items-center py-40">
      <Icon size="xxl" className="text-red-600" type="alert" />
      <p className="text-red-600 text-lg	">{title || 'Error occured!'}</p>
      <p className="mt-4  text-lg">{message || 'Please contact for help!'}</p>
    </div>
  );
};

export default ErrorShow;
